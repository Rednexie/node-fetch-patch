const mysql = require('mysql2');
const convert = require('../modules/convert')
module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(convert(url));
    connection.connect((err) => {
      if (err) {
        return reject(err);
        throw new Error(err)
      }
      //console.log('Connected to MySQL server');
      return resolve(connection)
    });
  })
}