const mongoose = require("mongoose");

const fv = mongoose.Schema({
  pokemon: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Favorito', fv);