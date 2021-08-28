const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const user = new Schema({
  userId: ObjectId,
  username: String,
  name: String,
  email: String,
  phone: String,
  access: {type: String, enum: ["view","admin","user","supervisor"]},

});