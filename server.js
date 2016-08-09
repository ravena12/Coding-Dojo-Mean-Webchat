
var express = require("express");
var path = require("path");
var app = express(); 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var messages = [];
app.get('/', function(req, res) {
 res.render("index");
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
	socket.on("signin", function (data){
	 	console.log(data);
		socket.emit('update', {response: data}); 
	});	
	socket.on("room", function (data){
	 	console.log(data);
	 	messages.push(data);
	 	// console.log(messages);
	 
	 	socket.emit('update2', {result: messages}); 
	});	

	socket.on('history', function (data) {
		socket.emit('story', {result: messages}); 
		console.log('****************');
		console.log(messages);
		console.log('****************');

	})
});