var mysql  = require('mysql');
var async = require('async')

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123',
	database : 'testAPI'
});

var inputData = [];

for(i=1; i<=2000;i++){
	inputData.push('number' + i);
}

var options = {
	//host: "localhost",
	//path: "/text.txt",
	host: "o2.pl",
	path: "/static/desktop.css?v=0.0.417",
	port: 80,
	keepAlive: false,
	maxSockets: 999,
	maxFreeSockets: 1
}
function fetchData(number, callback){

	return new Promise(function(resolve, reject){
		var http = require('http');

		fetch  = function(resp){
			var body = '';
			resp.on('data',function(chunk){
				body += chunk;
			})
			resp.on('end',function(){
				var time = (new Date().getTime()/1000)
				connection.query("insert into testAPI (name) values ('" + time + body +"')", function(err, rows, fields) {
					if (err) {
						return reject(err);
					};
					process.stdout.write('.')
					callback()
				});
			})
			resp.on('error',function(err){
				console.log('error');
				console.log(err);

			})
		}
		var req = http.request(options, fetch);

		req.end();

	})
}

function foo(item, callback){

	return callback(false, 'foo');
}

async.mapLimit(inputData,1000,fetchData,function(err, result){
	console.log('finished');
	connection.end();
})
