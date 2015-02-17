var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database: 'master-db'
});

// GET
exports.findAll = function(req, res) {	
	connection.query('select Id, name, address, phone, email, status from customers', function(err, results) {
	  if (err) throw err;
	  
	  res.send(results);
	});
};

// GET/Id
exports.findById = function(req, res) {
    var id = req.params.id;
	var sql    = 'SELECT Id, name, address, phone, email, status FROM customers WHERE Id = ' + connection.escape(id);
	connection.query(sql, function(err, results) {
	  if (err) throw err;		  
		res.send(results);
	});
};

// POST
exports.addCustomer = function(req, res) {
    var customer = req.body;
    if (customer.status == 'true')
		customer.status = 1;
	else
		customer.status = 0;
		
    console.log('Adding customer: ' + JSON.stringify(customer)); 	
	connection.query('INSERT INTO customers SET ?', customer, function(err, result) {
	  if (err) throw err;

		console.log('Success: ' + JSON.stringify(result));
		res.send(customer);
	});
};

// PUT
exports.updateCustomer = function(req, res) {
    var id = req.params.id;
    var customer = req.body;
    delete customer._id;
    	
    if (customer.status == 'true')
		customer.status = 1;
	else
		customer.status = 0;

	console.log('Updating customer: ' + id);
	connection.query('UPDATE customers SET name = ?, address = ?, phone = ?, email = ?, status = ? WHERE Id = ?', [customer.name, customer.address, customer.phone, customer.email, customer.status, id],  function (err, result) {
		if (err) throw err;

		console.log('Updated: ' + JSON.stringify(result));
		res.send(customer);
	})
};

// DELETE
exports.deleteCustomer = function(req, res) {
    var id = req.params.id;
    console.log('Deleting customer: ' + id);
	connection.query('DELETE FROM customers WHERE Id = ' + connection.escape(id), function (err, result) {
		if (err) throw err;

		console.log('deleted ' + result.affectedRows + ' rows');
		res.send(req.body);
	})	
};