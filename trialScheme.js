// Very Imp
// To start mongodb
// mongod --dbpath ./db

////////////////////////////////////////////////////////////////////////////////////////////


// Making Mongoose
const mongoose = require('mongoose')

// Connecting the mongodb
//mongoose.connect('mongodb://devuser:devuser@192.168.0.30/sitesutramean?authMechanism=SCRAM-SHA-1')

mongoose.connect('mongodb://localhost:27017/myCrudCollection')

let Schema = mongoose.Schema;


// Create one schema for authentication
let myTrialSchema = new Schema({
    username:{type:String , required:true , unique:true},
    password:{type:String , required:true }
})

// Make sure you have to create a model after defining the schema
// UserAuth
let user = mongoose.model('UserAuth' , myTrialSchema)

module.exports = user
