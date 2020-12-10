let express = require('express');
let bodyParser = require('body-parser'); //cuando hagamos peticiones (http rest), poder parsear el cuerpo de la peticion, con el fin de poderlos tratar en Node.js
let mongoose = require('mongoose'); //para que la API acceda a la DB con el metodo de conexion


//Importacion de Esquema
const Product = require('./models/product')

let App = express() //inicializar express
const port = process.env.PORT || 3000


App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())

// ************* API ****************

//POST
App.post('/api/product', (req, res) => {

    console.log('POST /api/produt')
    console.log(req.body)

    let product = new Product();
    product.name = req.body.name
    product.price = req.body.price
    product.category = req.body.category
    product.image = req.body.image

    product.save( (err, productStored) => {
       if(err) res.status(500).send({message: `save error: ${err}`})
       
       res.status(200).send({product: productStored})
    });
})

//GET
App.get('/api/product', (req, res) => {

    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({
            message: `Error when requesting: ${err}`
        })

        if (!products) return res.status(404).send({
            message: 'There are no product'
        })

        res.status(200).send({ products })
    })
})

//GET One
App.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({
            message: `Error when requesting: ${err}`
        })
        
        if (!product) return res.status(404).send({
            message: 'Product does not exist'
        })

        res.status(200).send({ product })
    })
})

//PUT
App.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    let updateData = req.body

    Product.findByIdAndUpdate(productId, updateData, (err, productUpdated) => {
        if (err) return res.status(500).send({
            message: `Failed to update data: ${err}`
        })

        res.status(200).send({ product: productUpdated })
    })

})

//DELETE
App.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({
            message: `Error deleting: ${err}`
        })
        
        if (!product) return res.status(404).send({
            message: 'Product does not exist'
        })

        product.remove(err => {
            if (err) return res.status(500).send({
                message: `Error deleting: ${err}`
            })

            res.status(200).send({
                message: 'Product removed'
            })
        })
    })

})

//conexion de la API hacia MongoDB
mongoose.connect('mongodb://localhost:27017/TestMongo', (err, res) => {

    if (err) throw console.log('Database connection ok')

    const server = App.listen(port, () => {
        console.log(`Listening http://localhost:${ server.address().port }`)
    });
});