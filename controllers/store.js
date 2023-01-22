const Product = require('../models/product')
const errorHandler = require('../errors/errorHandler')
const CustomError = require('../errors/CustomError')

const getProducts = async (req,res)=>{
        let {name, numericFilter, sort, fields,limit,page} = req.query
        let queryObject = {}
        //filter all items with name that match
        if (name) {
            queryObject.name = {$regex: name, $options: 'i'}
        }
        if (numericFilter) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '<': '$lt',
                '<=': '$lte',
                '=': '$eq'
            }
            const usefulFields = ['price', 'quantity', 'rating', 'creationDate']
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;  //regex of arithmetic comparators
            let filters = numericFilter.replace(regEx,
                (match) => `--${operatorMap[match]}--`)
            filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('--')
                if (usefulFields.includes(field)) {
                    queryObject[field] = {operator: field === 'creationDate' ? Date(value) : Number(value)}
                }
            })
        }

        //selecting items to be affiched
        limit = Number(limit) || 10
        page = Number(page) || 1
        const skip = limit * (page - 1)

        //sorting items
        let sortBy = sort ? sort.split(',').join(' ') : 'name'
        if(sortBy === 'price'){
            sortBy = ['price' , -1]
        }

        //find all items that match with filters
        let products = await Product.find(queryObject).sort(sortBy).skip(skip).limit(limit)


        //selecting only the necessary fields from items
        if (fields) {
            const fieldsList = fields.split(',').join(' ')
            products = await products.select(fieldsList)
        }

        res.status(200).json({success: true, products: products})
}

const addProduct = async (req,res)=>{
    try {
        const product = new Product(req.body)
        product.save(function (err,doc){
        })
        res.status(201).json({success: true, product: product})
    } catch (err){
        errorHandler(err,res)
    }
}

const modifyProduct = async (req,res)=>{
    const {id : productId} = req.params
    const updatedProduct = await Product.findOneAndUpdate({id : productId} , req.body , {new : true , runValidators : true})
    if(!updatedProduct){
        errorHandler(new CustomError(404 , 'no product with this ID' , res))
    }
    res.status(204).json({success: true , updatedProduct : updatedProduct})
}

const deleteProduct = async (req,res)=>{
    const {id : productId} = req.params
    const deletedProduct = await Product.findByIdAndDelete({id : productId})
    if(!deletedProduct){
        errorHandler(new CustomError(404 , 'no Product with this ID') , res)
    }
    res.status(204).json({success : true , deletedProduct : deletedProduct})
}

module.exports = {getProducts , addProduct , modifyProduct , deleteProduct}