module.exports = {
	fetch: function(resp){
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
}