const mysql=require('mysql');
require('dotenv').config();

const db=mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database:process.env.database
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports=db;