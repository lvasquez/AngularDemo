var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database: 'master-db'
});


exports.getUser = function(req, res) {
	var user = req.body;
	
	connection.query('SELECT * FROM users WHERE username = ? and password = md5(?)', [user.username, user.password], function(err, results) {
	  if (err) throw err;
	  
	  if (results != '')
	  {
		  var response = { success: results[0].username };
		  res.send(response);
	  }
	  else
      {
		  var response = { error: '' };
	      res.send(response);
	  }	
	});
};
