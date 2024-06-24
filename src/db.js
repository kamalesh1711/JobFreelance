const mysql = require('mysql');

// MySQL Connection Pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'studentdetails',
});

// Export the pool to be reused in application
module.exports = pool;
