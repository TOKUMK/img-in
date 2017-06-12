var express     = require('express'),
    
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;
    MongoClient = require('mongodb').MongoClient,
    
    assert      = require('assert'),
    util        = require('util'),
    formidable  = require('formidable');

var app = express();


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(' db connection established ' );
});


var Schema = mongoose.Schema;

var modelSchema = new Schema({
    name    : String
});

// compile model from schema
var SomeModel = mongoose.model('SomeModel', modelSchema);

// Save the new model instance, passing a callback
SomeModel.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

// to do
/*
    1. create user Model {name: username}
    2. save to db.
    3. retrieve and print output.
    4. create user schema
    5. take form registration data and save to db
    6. retrieve all user datas.
    7. look at how to integrate passport.



    frontend:

        load images dynamically (lazy load) 
        via some front end library plugin.
        tiling images.
*/


// database connection - how is this working ?


/*
mongoose.connect('mongodb://localhost/myappdatabase');

// if our user.js file is at app/models/user.js
var User = require('./models/user');


// create a new user
// create a new user called chris●●●●●
var chris = new User({
  name: 'Jonathan',
  username: 'jcjcjcjc',
  password: 'password' 
});



// this probably requires its own file.
// user schema
var userSchema = new Schema({
    name : String,
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    //admin : Boolean,
    //created_at : Date
});


// create a model using the Schema, otherwise its useless.
var User = mongoose.model('User', userSchema);

// make model available to our users in our Node application
module.exports = User;

*/







app.use('/img', express.static(__dirname + '/img'));

// refactor html folder
//app.use('/html', express.static(__dirname + '/html'));



app.get('/',function(req,res){
      res.sendFile(__dirname + "/home.html");
});



// Handle use case for file uploading.
// TODO: Persist file meta-data.
// TODO: allow only upload of image formats .png, .jpg, ..
app.post("/upload", function (req, res) {
    
    //console.log(req.body.user.name)

    var form = new formidable.IncomingForm();
    var cat, filename;

    form.parse(req, function (req,fields, err){
        filename = fields.filename;
        cat = fields.cat;
        console.log("cattype = " + fields.cat); 
        console.log("filename = " + fields.filename); 
    });

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.end("File is uploaded");
});



app.get('/login',function(req,res){
      res.sendFile(__dirname + "/login.html");
});

app.post('/login',function(req,res){

    var form = new formidable.IncomingForm();
    var username, password;

    // form.parse(req,);

    form.parse(req, function (req,fields, err){
        username = fields.username;
        password = fields.password;
        console.log("cattype = "    + username); 
        console.log("filename = "   + password); 
    });


    // TODO : Perform Authentication and Authorisation on logged in user.
    


      res.end("logged in as " + username + " " + password);
});




app.get('/register',function(req,res){
      res.sendFile(__dirname + "/register.html");
});

app.post('/register',function(req,res){

    var form = new formidable.IncomingForm();
    var username, email, password;

   // form.parse(req,);

    form.parse(req, function (req,fields, err){
        username    = fields.username;
        email       = fields.email;
        password    = fields.password;

        console.log("cattype = "    + username); 
        console.log("filename = "   + email);
        console.log("filename = "   + password); 
    });


    // TODO Persist user data.
    /* 
        1. Check if username is unique.
        2. If yes - persist
        3. If no  - handle accordingly.

    */




    res.end("user registered");
});



app.get('/gallery',function(req,res){
      res.sendFile(__dirname + "/gallery.html");
});



app.get('/hello',function(req,res){
      res.sendFile(__dirname + "/hello.html");
});


var listener = app.listen(3000, function(){
	console.log('listening on port ' + listener.address().port);
});



