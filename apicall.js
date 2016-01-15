var mysql  = require('mysql');

var async = require('async');

// var connection = mysql.createConnection({
// 	host     : '10.0.0.2',
// 	user     : 'root',
// 	password : '123qwe!Q',
// 	database : 'testAPI'
// });


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123',
	database : 'testAPI'
});

var inputData = [];

for(i=1; i<=5000;i++){
	inputData.push('number' + i);
}

// var options = {
// 	url: 'http://10.0.0.2/test.txt',
// 	maxSockets: 1
// };

// var options = {
// 	host: "10.0.0.2",
// 	port: 80,
// 	path: "/test.txt",
// 	keepAlive: true,
// 	maxSockets: 10,
// 	maxFreeSockets: 1
// }

var options = {
	host: "localhost",
	port: 80,
	path: "/text.txt",
	keepAlive: true,
	maxSockets: 10,
	maxFreeSockets: 1
}



var limit = inputData.length;
var counter = 0;

function fetchData(number){

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
					//console.log(time + body + '  dupa')
					 process.stdout.write('.')
					resolve()
				});
			})
			resp.on('error',function(err){
				console.log('error');
			})
		}
		var req = http.request(options, fetch);

		req.end();

	})


	// return new Promise(function(resolve, reject){
	// 	request(options, function(error, response, body) {
	// 		if (error){
	// 			return reject(error);
	// 		}			
	// 		var time = (new Date().getTime()/1000)
	// 		connection.query("insert into testAPI (name) values ('" + time + body +"')", function(err, rows, fields) {
	// 			if (err) {
	// 				return reject(err);
	// 			};
	// 			console.log(time + body + '  dupa')
	// 			resolve()
	// 		});
	// 	})
	// })
}





Promise.all(inputData.map(number => fetchData(number))).then(function(results) {
	console.log('finished');
	connection.end();

})
.catch(function(error) {
	console.log('there wa an error');
	console.log(error);
	// One or more promises was rejected
});


//async solution


// async.each(inputData, function(number,callback){
	
// 	fetchData(number).then(function(response){

// 		var time = (new Date().getTime()/1000)

// 		connection.query("insert into testAPI (name) values ('" + time + response +"')", function(err, rows, fields) {

// 			if (err) {
// 				return reject(err);
// 			};

// 			console.log(time + response + '  dupa')

// 		});

// 	})
// }, function(err, item){
// 	console.log(err + item);
// });







//foreach solution:


// inputData.forEach(function(number){
// 	fetchData(number).then(function(response){

// 		var time = (new Date().getTime()/1000)

// 		connection.query("insert into testAPI (name) values ('" + time + response +"')", function(err, rows, fields) {

// 			if (err) {
// 				return reject(err);
// 			};

// 			console.log(time + response + '  dupa')

// 		});

// 	})
// })


