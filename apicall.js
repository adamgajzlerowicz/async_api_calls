var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var async = require('async')
var notifier = require('node-notifier');
notifier.notify({
  'title': 'My notification',
  'message': 'Hello, there!'
});
http.globalAgent.maxSockets = 5;

var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongoDBurl = 'mongodb://localhost:27017/testAPI';


var insertDocument = function(data, callback) {
	data.db.collection('numbers ').insertOne( {
		"content" : data.content
	}, function(err, result) {
		assert.equal(err, null);
		process.stdout.write('.');
		callback(result);
	});
}


var inputData = [];

for(i=1; i<=5000;i++){
	inputData.push('number' + i);
}

var options = {
	host: "o2.pl",
	path: "/static/desktop.css",
	port: 80,
}
function fetchData(number, callback){

	//return new Promise(function(resolve, reject){

		fetch  = function(resp){
			var body = '';
			resp.on('data',function(chunk){
				body += chunk;
			})
			resp.on('end',function(){
				var time = (new Date().getTime()/1000)

				MongoClient.connect(mongoDBurl, function(err, db) {
					assert.equal(null, err);
					db.db = db;
					db.data = time + body;
					insertDocument(db, function() {
						db.close()
						callback()
					});
				});







			})
			resp.on('error',function(err){
				console.log('error');
				console.log(err);

			})
		}
		var req = http.request(options, fetch);

		req.end();

	//})
}



async.mapLimit(inputData,100,fetchData,function(err, result){
	console.log('finished');
	db.close();
})
