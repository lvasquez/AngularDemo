var express = require('express'),
    path = require('path'),
    http = require('http');
    customers = require('./routes/customers');
	users = require('./routes/users');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
/*
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
*/
app.post('/users', users.getUser);

// Http Methods
app.get('/customers', customers.findAll);
app.get('/customers/:id', customers.findById);
app.post('/customers', customers.addCustomer);
app.put('/customers/:id', customers.updateCustomer);
app.delete('/customers/:id', customers.deleteCustomer);

app.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
