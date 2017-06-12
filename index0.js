var express     = require('express'),
    bodyParser  = require('body-parser'),
    multer      = require('multer'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    

    formidable  = require('express-formidable');

	//var multipart = require('connect-multiparty');

var app = express();


//app.use(formidable.parse());

        















app.post("/upload", function (req, res) {
    //console.log(req.body.user.name)

    var form = new formidable.IncomingForm();

    form.parse(req);

    // console.log("req.catype() = " + form.cat);



    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });


    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    // res.sendFile(__dirname + '/index.html');


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



