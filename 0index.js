var express     = require('express'),
    bodyParser  = require('body-parser'),
    multer      = require('multer'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    formidable  = require('express-formidable');

	//var multipart = require('connect-multiparty');

var app = express();

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

					//app.use(formidable.parse());



//app.use(require('connect').bodyParser());
//app.use(bodyParser.json()); // to support JSON bodies
//app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());         

// app.use(multer);                                



//  -------------------------------------------------

// file storage - multer.
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
  	// save the file name with date and CAT_TYPE, not cat type is not operative.
    callback(null, file.fieldname + '-' + Date.now() + 'CAT_TYPE');
  }
});


var upload = multer({ storage : storage}).single('userPhoto');






//let multer = require('multer');

 let uploads = multer();

// app.post('/upload', uploads.fields([]), (req, res) => {
//   let formData = req.body;
//   console.log('form data', formData);

//      // handle file persistence to disk.
//     upload(req,res,function(err) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });


//   res.sendStatus(200);
// });







//  -------------------------------------------------

// // handle post data - file upload and get.cat
app.post('/upload', uploads.fields([]),function(req,res){

    console.log("request to upload image recevied . . .");
    console.log("upload in progress . . .");
    console.log("upload complete . . .");


    console.log("req.catype() = " + req.cat);
    console.log("req.catype() = " + req.body.cat);
    console.log("req.catype() = " + req.body.food);
    console.log("req.catype() = " + req.body.filename);

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

app.post("/", function (req, res) {
    console.log(req.body.user.name)
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








