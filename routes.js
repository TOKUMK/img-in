var express = require('express');
var router = express.Router();




// do not append path to routes, it causes error.
router.get('/', function(req,res){
    res.send("GET :: using router"); 
    console.log("logging on");
});



router.post('/', function(req,res){
    res.send("POST :: using router");
    console.log("logging on");
});

//export this router to use in our index.js
module.exports = router;