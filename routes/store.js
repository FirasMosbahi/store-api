const express = require('express')
const {getProducts,addProduct,modifyProduct,deleteProduct} = require('../controllers/store')

const storeRouter = express.Router()
storeRouter.route('/').get(getProducts).post(addProduct)
storeRouter.route('/:id/').patch(modifyProduct).delete(deleteProduct)

module.exports = storeRouter