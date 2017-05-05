var express     = require('express'),
    multer      = require('multer'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    //bodyParser  = require('body-parser'),
    formidable  = require('express-formidable');

	//var multipart = require('connect-multiparty');

var app = express();

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(formidable.parse());

//app.use(multer);

//app.use(require('connect').bodyParser());
//app.use(bodyParser.json()); // to support JSON bodies
//app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

//app.use(bodyParser.json());         
//app.use(bodyParser.urlencoded({ extended: true }));                                


//  -------------------------------------------------

// file storage - multer.
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + 'CAT_TYPE');
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

//  -------------------------------------------------



app.post("/", function (req, res) {
    console.log(req.body.user.name)
});


app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


// handle post data - file upload and get.cat
app.post('/api/photo', function(req,res){
    console.log("request to upload image recvied.. upload in progress.");
    
    console.log("req.catype() = " + req.cat);
    console.log("req.catype() = " + req.body.cat);
    console.log("req.catype() = " + req.body.txtval);


    // handle file persistence to disk.
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });



	/* TOTEST
 	var files = req.files;
    if (files) {//Checks to see if any attached files
        files.forEach(function (file) {
            console.log('FILE');
            console.log(JSON.stringify(file));//contents of file
            console.log(JSON.stringify(file.filename));
        });
    }
    console.log(req.body);
    res.sendFile(__dirname + "/resources/JSONStructures/genericResponse.json"); */



});


app.listen(3000);








