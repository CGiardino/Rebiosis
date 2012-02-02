var MySQLPool = require("mysql-pool").MySQLPool;
var pool = new MySQLPool({
  poolSize: 10,
  user:     'root',
  password: '',
  database: 'test'
});

function symsearch(q,callback) {
	var query=pool.query(
		   q,
			function selectcb(err, results, fields) {
				if(err) {throw err;}
				console.log("Searching Result for "+q);
				if(results[0]!=undefined)
					callback(results[0].password);
				else
					callback(undefined);
			}
	);

}

exports.query=symsearch;