const express = require('express')
const router = express.Router()

//declaramos array donde se almacenan datos, y las rutas
const productos = []

router.get('/', (req, res) => {
    //console.log(productos)
    res.json(productos)
})

router.post('/', (req, res) => {
    let product = {
        id:  (productos.length)+1,
        title: (req.body.title),
        price: (req.body.price),
        thumbnail: (req.body.thumbnail)
    }
    productos.push(product)
    res.type('json')
    res.send(JSON.stringify(product, null, 2))
})

router.get('/:id', (req, res) => {
    const product = productos[(req.params.id)-1]
    if (isNaN(req.params.id)) {
        res.json({ error: 'el parametro no es un numero' })
    } else {
        product !== undefined
            ? res.json(product)
            : res.json({ error: 'producto no encontrado'})
    }  
})


router.put('/:id', (req, res) => {
    let product = productos[(req.params.id)-1]
    const respuesta = {} 
    let producto = {id: req.params.id}   
    if (isNaN(req.params.id)) {
        res.json({ error: 'el parametro no es un numero' })
    } else if (product !== undefined) {
            respuesta.before = productos[(req.params.id)-1];            
            const promise1 = new Promise((resolve, reject) => {
                if (req.body.title !== undefined) {
                    producto.title = req.body.title
                    return producto
                } else {
                    producto.title = product.title
                    return producto
                }
            })
            const promise2 = new Promise((resolve, reject) => {
                if (req.body.price !== undefined) {
                    producto.price = req.body.price
                    return producto
                } else {
                    producto.price = product.price
                    return producto
                }
            })
            const promise3 = new Promise((resolve, reject) => {
                if (req.body.thumbnail !== undefined) {
                    producto.thumbnail = req.body.thumbnail
                    return producto
                } else {
                    producto.thumbnail = product.thumbnail
                    return producto
                }
            })
            Promise.all([promise1, promise2, promise3]).then(function(producto) {
                return producto
            })
            respuesta.update = producto
            productos.splice((req.params.id-1), 1, producto)
            res.send(respuesta)
    } else {
        res.json({ error: 'producto no encontrado'})
    }
})

router.delete('/:id', (req, res) => {
    let product = productos[(req.params.id)-1]
    if (isNaN(req.params.id)) {
        res.json({ error: 'el parametro no es un numero' })
    } else {
        product !== undefined
        ? productos.splice((req.params.id-1), 1, { 
            id: req.params.id,
            mensaje: 'el producto fue eliminado con anterioridad'
        })
        && res.json({
            id: req.params.id,
            mensaje: 'el producto fue eliminado exitosamente',
        })
        : res.json({ error: 'producto no encontrado'})
    }
})

//exportamos el router
module.exports = router