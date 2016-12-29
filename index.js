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
});


app.listen(3000);





//
//https://github.com/expressjs/multer/issues/203
//
//http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
//
//http://stackoverflow.com/questions/40076807/node-expressjs-parsing-a-multipart-form-data-post-data-using-body-parser-middl












/*var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});*/




//
//app.use(bodyParser.urlencoded({
//    extended: true
//}));
//
///**bodyParser.json(options)
// * Parses the text as JSON and exposes the resulting object on req.body.
// */
//app.use(bodyParser.json());














// Handle initial get request








//
//
//var storage = multer.diskStorage({
//    destination: function(req, res, callback){
//      callback(null, './uploads');  
//    },
//    filename: function(req, file, callback){
//        callback(null, file.fieldname + '-' + Date.now());
//    }
//});
//
//
//var upload = multer({storage : storage}).single('userPhoto');
//
//app.listen(3000);
//app.get('/', function(req,res){
//    res.sendFile(__dirname + "/index.html");
//    console.log("request to upload image recvied.. welcome to imgin!");
//});
//
//
//app.post('/api/photos', function(req,res){
//    console.log("request to upload image recvied.. upload in progress.");
//    
//    
////    upload(req,res,function(err){
////        if(err){
////            return res.end("Error uploading file");
////        }
////        res.end("file uploaded"); 
////    });
//});

//
//app.get('/', function(req,res){
//	res.send("hello img-in!")
//    console.log("logging on");
//});
//
//
//
//app.get('/hello', function(req,res){
//	res.send("GET-Request :: hello img-in!")
//    console.log("logging on");
//
//});
//
//app.post('/hello', function(req,res){
//	res.send(" PoST-Request :: hello img-in!")
//    console.log("logging on");
//});
//
//app.post('/image', function(req, res){
//    console.log("request to upload image recvied..");
//});




