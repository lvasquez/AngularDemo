var pg = require('pg');
var conString = "postgres://user_rpt:r3p0rt3s@10.10.1.20/master-aimar";

exports.getUser = function(req, res) {
	var user = req.body;
	
	pg.connect(conString, function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query("SELECT * FROM usuarios_empresas WHERE pw_name = $1 and pw_passwd = MD5($2)", [user.username, user.password], function(err, result) {
		//call `done()` to release the client back to the pool
		done();

		if(err) {
		  return console.error('error running query', err);
		}
		if (result.rowCount > 0)
		{
			var response = { success: result.rows[0].pw_name };
			res.send(response);
		}
		else
		{
			var response = { error: '' };
			res.send(response);
		}
	  });
	});
};
