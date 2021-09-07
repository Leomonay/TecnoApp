const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const LineSchema = Schema({
    name:{
        type: String,
        required: true,
        autopopulate: true,
    },
    code: {
        type: String,
        required: true,
    },
    ServicePoints:[{
        type: Schema.Types.ObjectId,
        ref: "ServPoint"
    }]
}, {
    timestamps: true
})

module.exports=mongoose.model('Line', LineSchema)