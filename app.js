require('dotenv').config()
const express = require('express')
const {connect} = require('mongoose')
const errorHandler = require('./errors/errorHandler')
const notFound = require('./middlewares/notFound')
const storeRouter = require('./routes/store')

const app = express()

app.use(express.json())
app.use('/api/v1/products' , storeRouter)
app.use(notFound)

const start = (url , port)=>{
    console.log('database connected ...')
    app.listen(port, ()=>console.log(`server listening on port ${port}`))
    connect(url)
}

const url = process.env.DB_URI
const port = process.env.PORT || 5000

start(url,port)