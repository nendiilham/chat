var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var html = require('escape-html');

var server = http.createServer();
var io = socketio(server);

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }   
    server.on('request', function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.end(request.url == '/' ? html : '');  
    });

    server.listen(8000, function() {
      console.log('Server running at port 8000');
    });
});

io.on('connection', function(socket){

  socket.on('message', function(data) {
  	if(data && typeof data.nickname == 'string' && typeof data.message == 'string' && data.nickname && data.message) {
  		socket.broadcast.emit('message', data);
      console.log(data);
  	}
  })

});
