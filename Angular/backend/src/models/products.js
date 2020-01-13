const { Schema, model } = require('mongoose');


const productSchema = new Schema({
  nombre: String,
  precio: Number,
  cdisponible: Number,
});

module.exports = model('Products', productSchema)
