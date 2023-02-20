var mysql = require("mysql");

const databaseName = "url_shortener";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("create database " + databaseName, function (err, result, fields) {
    if (err) throw err;
    console.log("Schema created");
  });
  con.end();
});

var con2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: databaseName,
});

con2.connect(function (err) {
  var sql =
    "CREATE TABLE url_relation (id INT AUTO_INCREMENT PRIMARY KEY, short_url VARCHAR(255), long_url VARCHAR(255))";
  con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con2.end();
});
