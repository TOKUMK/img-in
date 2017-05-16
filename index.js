var express     = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    util        = require('util'),
    formidable  = require('formidable');

var app = express();

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
      res.sendFile(__dirname + "/index.html");
});

app.get('/hello',function(req,res){
      res.sendFile(__dirname + "/hello.html");
});


var listener = app.listen(3000, function(){
	console.log('listening on port ' + listener.address().port);
});



