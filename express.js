var express = require('express');
var app = express();

app.get('/gmit', function (req, res) {
   res.send('Hello World GMIT');
});
app.get('/mit', function (req, res) {
   res.send('Hello World MIT');
});
app.get('/it', function (req, res) {
   res.send('Hello World IT');
});

app.listen(4400);
// var express=require('express');
// var app =express();
// app.get('/',function(req,res){
//     res.send("hi")
// }).listen(4400);