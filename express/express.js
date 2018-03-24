const express = require ('express');
const app = express();


app.use('/about_me', express.static("demo"));

app.get('/', function(req, res){
	res.send('Hello!');
});


//app.get('/about_me', function(req, res) {
//	res.sendFile('index.html' , { root : __dirname});
//});

app.get('/about', function(req, res) {
	res.send(req.query.name +', Hello!');
});


app.listen(3000, function (){
	console.log('Example app is running on port 3000!');
});
