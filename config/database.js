const mysql = require('mysql');
const keys = require('./keys');

const connection = mysql.createConnection(keys.db);

connection.connect((err) => {
  if (err) {
    console.log('Database error: ' + err);
  } else {
    console.log('Database successfully connected');
  }
});

exports.execQueryWithParams = function(query, values) {
  return new Promise ((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    })
  })
}

exports.execQuery = function(query) {
  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    })
  })
}
