const mysql = require('mysql2');
const keys = require('./keys');

// Connect to MySQL
const connection = mysql.createConnection(keys.db);

// On Connection
connection.connect((err) => {
	if (err) {
		console.log('error', "Database error: " +err);
	} else {
	console.log('info', "Database connected successfully");
	}
});

module.exports.execute = function(query, fields, callback) {
	connection.execute(query, fields, callback);
}
