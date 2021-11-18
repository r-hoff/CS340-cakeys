const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// connect to database
let connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT
});

// open MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to database.');
});

module.exports = connection;
