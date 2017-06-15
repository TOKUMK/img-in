var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var UserSchema = new Schema({
//     name:   String,
//     email:  String
// })

var ImageSchema = new Schema({
    directory:   	String,
    filename:  		String,
    category: 		String,
    uploadBy: 		String,
    uploadDate: 	String, 
})

module.exports = mongoose.model('Image', ImageSchema);