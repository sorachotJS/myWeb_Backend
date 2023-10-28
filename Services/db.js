const { Client } = require('pg')

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'jsfamilydb',
  password: '123456',
  port: 5432,
  });

  

  db.connect().then((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("MySQL Connected!");
  });
  
  module.exports = db;