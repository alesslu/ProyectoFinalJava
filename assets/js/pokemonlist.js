// Obtener los nombres de los pokemons de la api https://pokeapi.co/api/v2/generation/1/ y crear un select con ellos
const getPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/generation/1/");
    const data = await response.json();
    const pokemons = data.pokemon_species;
    return pokemons;
    };
    
    // Crear un select con los nombres de los pokemons
    const select = document.createElement("select");
    select.setAttribute("onchange","remove()");
    select.setAttribute("class","form-select")
    const createOptions = async () => {
    const pokemons = await getPokemons();
    pokemons.forEach((pokemon) => {
    const option = document.createElement("option");
    option.value = pokemon.name;
    option.textContent = pokemon.name.toUpperCase();
    select.appendChild(option);
    });
    };
    const option = document.createElement("option");
    option.value = "Elija un pokemon";
    option.textContent = "Elija un pokemon";
    option.selected = true;
    option.disabled = true;
    select.appendChild(option);
    createOptions();
    
    const div = document.getElementById("pokemons")
    div.appendChild(select);
    // Ver imagen del pokemon al seleccionarlo y mostrar su nombre
    const card = document.getElementById("cards");
    const img = document.createElement("img");
    const p = document.createElement("p");
    select.addEventListener("change", async (e) => {
    const pokemon = e.target.value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    img.src = data.sprites.other.dream_world.front_default;
    p.textContent = data.name;
    });

    card.appendChild(img);
    card.appendChild(p);

    function favorite(){
        const name = p.textContent;
        console.log(name)
        const data = {
            pokemon : name,
        }
        fetch("http://localhost:9000/api/favoritos", { //CREATE USER => POST
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
    }
    function remove(){
        document.querySelector('img').classList.remove('card-style')
    }