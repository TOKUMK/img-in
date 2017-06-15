var express     = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    util        = require('util'),
    formidable  = require('formidable');
    mongoose    = require('mongoose');
    User        = require('./User.model');
    Image       = require('./Image.model');

var app = express();

var db = 'mongodb://localhost/example';

mongoose.connect(db);

app.use('/img', express.static(__dirname + '/img'));

var listener = app.listen(3000, function(){
    console.log('listening on port ' + listener.address().port);

});




// -------------------- routes start here -----------------------------





/*

        Routes for user registration and user data.

*/

// return the view page for register
app.get('/register',function(req,res){
      res.sendFile(__dirname + "/register.html");
});



// handle user registration 
// form validation should be done on both front and back end.
app.post('/register',function(req,res){

    var form = new formidable.IncomingForm();
    //var username, email, password, repassword;
    var newUser     = new User();
    var datetime    = new Date();
        
   console.log("parsing registration form");
    form.parse(req, function (req,fields, err){
        
        // username    = fields.username;
        // email       = fields.email;
        // password    = fields.password;
        // repassword  = fields.repassword;

        // output of data in form fields.
        console.log("username :: " + fields.username); 
        console.log("email :: " + fields.email);
        console.log("password :: " + fields.password); 
        console.log("password retype ::  " + fields.repassword); 

        // build data object to be persisted.
        newUser.name        = fields.username;
        newUser.email       = fields.email;
        newUser.password    = fields.password;
        newUser.joinedDate  = datetime;

        
    });

    console.log(" \npersisting data to database . . .");

    newUser.save(function(err, user){
        if(err){
            console.log('\n ... error saving user data ...');
        }else{
            res.send(newUser);
            console.log('\n data persisted . . .');
        }
    });

    //res.end("user registered");
});


// get all users registered in the system.
app.get('/users', function(req,res){

    console.log("retreiving users registered on system..");

    User.find({})
        .exec(function(err, users){
            if(err){
                res.send("error occured on server");
            } else {
                console.log(users);
                res.json(users);
            }
        });



    //res.send("happy to be here ");


});





/*

        Routes for returning all image (image gallery)

*/



app.get('/gallery', function(req,res){

});







/*

        Route handling image upload and meta-data persistence.
    
*/






//app.use(formidable.parse());

// Handle use case for file uploading.
// TODO: Persist file meta-data.
app.post("/upload", function (req, res) {
    //console.log(req.body.user.name)

    var form = new formidable.IncomingForm();
    var cat, filename;
    var newImage = new Image();
    var dateTime = new Date();



   // form.parse(req,);

    form.parse(req, function (req,fields, err){
        filename = fields.filename;
        cat = fields.cat;
        console.log("cattype = " + fields.cat); 
        console.log("filename = " + fields.filename); 

        newImage.directory = "./uploads";
        newImage.filename = fields.filename;
        newImage.category = fields.cat;
        newImage.uploadBy = "G0dM0de";
        newImage.uploadDate = dateTime;
    });







    // Store image in dir /uploads/.
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.end("File is uploaded");

    newImage.save(function(err, user){
        if(err){
            console.log('\n ... error saving image meta-data ...');
        }else{
            res.send(newImage);
            console.log('\n data persisted . . .');
        }
    });


});


app.get('/',function(req,res){
      res.sendFile(__dirname + "/home.html");
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
        console.log("cattype = " + fields.username); 
        console.log("filename = " + fields.password); 
    });
      res.end("logged in");
});






app.get('/hello',function(req,res){

        //User.collection.drop();
      res.sendFile(__dirname + "/hello.html");
});





