const mysql = require('mysql');
const keys = require('./keys');

const pool = mysql.createPool(keys.db);

exports.execQueryWithParams = function(query, values) {
  return new Promise ((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      })
      if (error) {
        return reject(error);
      }
      connection.release();
    })
  })
}

exports.execQuery = function(query) {
  return new Promise ((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(query, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      })
      if (error) {
        return reject(error);
      }
      connection.release();
    })
  })
}
