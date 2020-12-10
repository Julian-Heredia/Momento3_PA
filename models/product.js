const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Modelo del Esquema

const ProductSchema = Schema ({
    name: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['foods', 'technology', 'home']},
    image: String
})

//Exportar modelo
module.exports = mongoose.model('Product', ProductSchema)