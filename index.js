/**
 * server express
 * forma siete
 * gestionar rutas de los verbos
 * GET, POST, PUT, PATCH, DELETE con Router
 */

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')  //cuando hagamos peticiones (http rest), poder parsear el cuerpo de la peticion, con el fin de poderlos tratar en node.js
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
//const mongoose = require('mongoose')  //api acceda a la DB con el metodo de conexion

/**
* product
* import the shema
*/
//const Product = require('./models/product')

/**
 * inicialiar express
 */
const app = express()

const port = process.env.PORT || 3000

/**
 * middlewares
*/
app.use(bodyParser.json())
app.use("/static", express.static(path.join(__dirname, "public")))
//app.use(bodyParser.urlencoded({ extended: false }))
//new
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


//app.use(express.json())

//new
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)

app.get('/', (req, res) => {
        res.redirect('/products')
    }
)

// server
const server = app.listen(port, () => {
    console.log(`Listening http://localhost:${server.address().port}`)
})


/**
 * API
 */
//post
/*app.post('/api/product', (req, res) => {
    
    //use shema and register product in the data base
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()    
    product.name = req.body.name    
    product.price = req.body.price
    product.category = req.body.category
    product.image = req.body.image

    product.save( (err, productStored) => {
        if (err) res.status(500).send({message: `save error: ${err}`})

        res.status(200).send({product: productStored})
    } )
})  */


//get users
/*app.get('/api/products', (req, res) => {
    //res.send(200, {products: []})

    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({
            message: `Error when requesting: ${err}`
        })

        if (!products) return res.status(404).send({
            message: 'There are no product'
        })

        res.status(200).send({ products })

    })

})  */

//get one 
/*app.get('/api/product/:productId', (req, res) => {
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
})  */

//put
/*app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    let updateData = req.body

    Product.findByIdAndUpdate(productId, updateData, (err, productUpdated) => {
        if (err) return res.status(500).send({
            message: `Failed to update data: ${err}`
        })

        res.status(200).send({ product: productUpdated })
    })

})  */

//delete
/*app.delete('/api/product/:productId', (req, res) => {
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

})  */


/**
 * Conexion desde la api hacia mongodb
 */
/*mongoose.connect('mongodb://localhost:27017/shopwcg', (err, res) => {    

    if (err) throw err    
    console.log('Database connection ok')

    const server = app.listen( port, () => {

        console.log( `Listening http://localhost:${ server.address().port }` )
    
    } )
})  */