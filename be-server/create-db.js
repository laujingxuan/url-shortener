var mysql = require("mysql");
const {
  dbUserName,
  dbPassword,
} = require("./config");

const databaseName = "url_shortener";

var con = mysql.createConnection({
  host: "localhost",
  user: dbUserName,
  password: dbPassword,
});

var con2 = mysql.createConnection({
  host: "localhost",
  user: dbUserName,
  password: dbPassword,
  database: databaseName,
});

const createSchema = (err) => {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");

      con.query("create database " + databaseName, function (err, result, fields) {
        if (err) throw err;
        console.log("Schema created");
      });
      con.end();
      resolve();
    });
  })
};

const createTable = (err) => {
  return new Promise((resolve, reject) => {
    con2.connect(function (err) {
      var sql = "CREATE TABLE url_relation (id INT AUTO_INCREMENT PRIMARY KEY, short_url VARCHAR(255), long_url VARCHAR(255))";
      con2.query(sql, function (err, result) {
        console.log("Table created");
      });
      con2.end();
      resolve();
    });
  })
};

const start = async () => {
  await createSchema()
  await createTable()
}

start()
