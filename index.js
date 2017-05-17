var express     = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    util        = require('util'),
    formidable  = require('formidable');

var app = express();

app.use('/img', express.static(__dirname + '/img'));

//app.use(formidable.parse());

// Handle use case for file uploading.
// TODO: Persist file meta-data.
app.post("/upload", function (req, res) {
    //console.log(req.body.user.name)

    var form = new formidable.IncomingForm();
    var cat, filename;

   // form.parse(req,);

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

        console.log("cattype = " + fields.username); 
        console.log("filename = " + fields.email);
        console.log("filename = " + fields.password); 
    });

    res.end("user registered");
});

app.get('/hello',function(req,res){
      res.sendFile(__dirname + "/hello.html");
});


var listener = app.listen(3000, function(){
	console.log('listening on port ' + listener.address().port);
});



