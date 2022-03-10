const express = require('express')
const router = require('./routes/router')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//declaramos Carpeta public
app.use(express.static('public'))

const server = app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto ${server.address().port}`)
})

server.on('error', (error) => console.log(`hubo un error ${error}`))

app.use('/api/productos', router)

//Esta ruta de inicio nos redirige a index.html
app.get('/', (req, res) => {
    res.sendFile('./public/index')
})