const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

var autoPopulateLine = function(next) {
    this.populate({path:'lines', select:'name'});
    next();
};

const AreaSchema = Schema({
    name:String,
    plant: {
        type: Schema.Types.ObjectId,
        ref: "Plant"
    },
}, {
    timestamps: true
})

//AreaSchema.pre('find',autoPopulateLine)

module.exports=mongoose.model('Area', AreaSchema)