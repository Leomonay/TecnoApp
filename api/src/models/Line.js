const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

var autoPopulateLine = function(next) {
    this.populate('area');
    next();
};

const LineSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    area:{
        type: Schema.Types.ObjectId,
        ref: "Line",
        required: true
    }
}, {
    timestamps: true
})

LineSchema.pre('find',autoPopulateLine)

module.exports=mongoose.model('Line', LineSchema)