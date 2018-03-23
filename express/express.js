const express = require ('express');
const app = express();

app.get('/', function(req, res){
	res.send('Send gogo page!');
});


app.get('/about_me', function(req, res) {
	res.sendFile('index.html' , { root : __dirname});
});

app.get('/about', function(req, res) {
	res.send(JSON.stringify(req.query.name) +', Hello!');
});


app.listen(3000, function (){
	console.log('Example app is running on port 3000!');
});
