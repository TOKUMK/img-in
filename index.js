var express     = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert'),
    util        = require('util'),
    formidable  = require('formidable');
    mongoose    = require('mongoose');
    User        = require('./User.model');
    Image       = require('./Image.model');
    fs          = require('fs');

var app = express();

var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.use('/img', express.static(__dirname + '/img'));









// todo:
/*

    1. implement user auth and session tracking.
    2. <return user by username>
    3. return images by user upload
    4. return all images
    5. 

*/


// -------------------- routes start here -----------------------------





/*

        Routes for user registration and user data.

*/
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
        console.log("username :: " + fields.username); 
        console.log("password :: " + fields.password); 
    });
      res.end("logged in");
});

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

    res.sendFile()

});



app.post("/upload", function (req, res) {
    //console.log(req.body.user.name)

    var form = new formidable.IncomingForm();
    var cat, filename;

    form.parse(req, function (req,fields, err){
        filename = fields.filename;
        cat = fields.cat;
        console.log("upload :: cattype = " + fields.cat); 
        console.log("upload :: filename = " + fields.filename); 
    });

    form.on('fileBegin', function (upload, file){
        console.log("upload :: writing file to disk ...");
        console.log("upload :: to " + __dirname + '/uploads/ file name -> ' + file.name);

        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
           console.log('Uploaded ' + file.filename);
    });


    res.end("File is uploaded");


});


//app.use(formidable.parse());

// Handle use case for file uploading.
// TODO: Persist file meta-data.
// app.post("/upload", function (req, res) {
//     //console.log(req.body.user.name)

//     var form = new formidable.IncomingForm();
//     var cat, filename;
//     var newImage = new Image();
//     var dateTime = new Date();



//    // form.parse(req,);

//     form.parse(req, function (req,fields, err){
//         filename = fields.filename;
//         cat = fields.cat;
//         console.log("cattype = " + fields.cat); 
//         console.log("filename = " + fields.filename); 

//         newImage.directory = "./uploads";
//         newImage.filename = fields.filename;
//         newImage.category = fields.cat;
//         newImage.uploadBy = "G0dM0de";
//         newImage.uploadDate = dateTime;
//     });


//     // Store image in dir /uploads/.
//     form.on('fileBegin', function (name, file){
//         file.path = __dirname + '/uploads/' + file.filename;
//     });

//     form.on('file', function (name, file){
//         console.log('Uploaded ' + file.filename);
//     });



//     console.log("File is uploaded");

//     // persist document
//     newImage.save(function(err, user){
//         if(err){
//             console.log('\n ... error saving image meta-data ...');
//         }else{
            
//             res.end("File is uploaded");
//             res.send(newImage);
//             console.log('\n image file stored and meta data persisted . . .');
//         }
//     });


// });


app.get('/',function(req,res){
      res.sendFile(__dirname + "/home.html");
});








app.get('/hello',function(req,res){




    // if (process.argv.length <= 2) {
    // console.log("Usage: " + __filename + " path/to/directory");
    // process.exit(-1);
    // }
 
    //var path = process.argv[2];
    var paths = {};

    fs.readdir('./uploads', function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        paths[i] = items[i];
        console.log(items[i]);
    }
        
    res.json(paths);

    });


        //User.collection.drop();
      //res.sendFile(__dirname + "/hello.html");
});





var listener = app.listen(3000, function(){
    console.log('imgin:: listening on port ' + listener.address().port);
});