const mongoose = require ('mongoose')
const {appConfig} =require ('../../config.js')

const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name:String,
    size:Number,
    unitaryPrice: Number,
    imgURL: String,
    description: String
}, {
    timestamps: true
})
ProductSchema.methods.setImgUrl = function setImgUrl(filename){
    const {host,port}=appConfig
    this.imgURL=`${host}:${port}/public/${filename}`
}
module.exports=mongoose.model('Product', ProductSchema)