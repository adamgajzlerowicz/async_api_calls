var http = require('http');

var options = {
	host: "localhost",
	port: 80,
	path: "/text.txt",
	keepAlive: true,
	maxSockets: 10,
	maxFreeSockets: 1
}

fetch  = function(resp){
	var body = '';
	resp.on('data',function(chunk){
		body += chunk;			
	})
	
	resp.on('end',function(){
		console.log(body);		
	})
}
var req = http.request(options, fetch);
req.end();
