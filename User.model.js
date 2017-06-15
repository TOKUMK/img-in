var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var UserSchema = new Schema({
//     name:   String,
//     email:  String
// })

var UserSchema = new Schema({
    username:   String,
    email:  	String,
    password: 	String,
    joinedDate: String 
})

module.exports = mongoose.model('User', UserSchema);
