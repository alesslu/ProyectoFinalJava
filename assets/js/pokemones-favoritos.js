function consultarPokemons() {
    lists__pokemons.innerHTML = '';
    fetch('http://localhost:8000/api/favoritos/find-by-user-id/' + localStorage.getItem('pokeapp_id'))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let favoritos = data;
            for (const index in favoritos) {
                llamarPokemon(favoritos[index].pokemon, favoritos[index]._id)
            }
        })
}

consultarPokemons()

const llamarPokemon = async (nombre, idPokemon) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        const data = await res.json()
        imprimir(data, idPokemon)
    } catch (error) {
        console.log(error)
    }
}

const imprimir = (pokemon, idPokemon) => {
    const lists_pokemons = document.getElementById('lists_pokemons')
    templateHtml = `
        <div class="col-md-3 mb-2">
            <div class="card">
            <button onclick="EliminarPokemon('${idPokemon}')" type="button" class="btn btn-primary btn-sm btn-block">Eliminar ${pokemon.name} <i class="fa fa-star"></i> </button>
            <h5 class="text-center">${pokemon.name}</h5>
            <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" style="height: 190px">
          </div>
        </div>`

    lists__pokemons.innerHTML += templateHtml

}
function AgregarPokemon(nuevoPokemon) {
    const data = {
        pokemon: nuevoPokemon,
    }
    fetch("http://localhost:8000/api/favoritos", { //CREATE USER => POST
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function EliminarPokemon(pokemonEliminado) {
    Swal.fire({
        title: '¿Está seguro(a) que desea eliminar el pokemon?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            fetch(`http://localhost:8000/api/favoritos/${pokemonEliminado}`, {
                method: 'DELETE',
            })
                .then(res => res.json()) // or res.json()
                .then(res => consultarPokemons())
        }
    });
}
