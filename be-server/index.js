// To shorten a long URL, we should implement a hash function that hashes a long URL to a 7 char string
// Example of hash functions are CRC32, MD5, or SHA-1. However, the hash results of these functions are longer than 7
// Approach to make the hash function to 7 digits: take the first 7 digits => check if exists in DB => if yes, longURL append with predefined string like "added_string", then hash again and repeat the process
const express = require("express");
const crypto = require("crypto");
const { getShortURL, saveShortURL, getLongURL } = require("./sql-operation");
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "url_shortener",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Use SQL to persist the data
//returns a short URL when given a long URL API
app.post("/api/get_short_url", async (req, res) => {
  const { longURL } = req.body;
  if (longURL) {
    var hash = "";
    hash = await getShortURL(con, longURL);
    hashedURL = longURL;
    while (hash == "") {
      hash = crypto
        .createHash("md5")
        .update(hashedURL)
        .digest("hex")
        .slice(0, 7);
      dbURL = await getLongURL(con, hash);
      //if the hash exists in db, we add a secret string to the longURL
      if (dbURL != "") {
        hashedURL += "secret";
        hash = "";
        continue;
      }
      saveShortURL(con, longURL, hash);
    }
    res.status(200).json({ success: true, shortURL: hash });
  } else {
    //400 stands for bad request
    res
      .status(400)
      .json({ success: false, msg: "Please provide the longURL field" });
  }
});

//returns the long URL when given short URL API
app.post("/api/get_long_url", async (req, res) => {
  const { shortURL } = req.body;
  if (shortURL) {
    dbURL = await getLongURL(con, shortURL);
    if (dbURL == "") {
      res.status(200).json({
        success: false,
        longURLs: "original url for the short url not found",
      });
    } else {
      res.status(200).json({ success: true, longURLs: dbURL });
    }
  } else {
    res
      .status(400)
      .json({ success: false, msg: "Please provide the shortURL field" });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, msg: `invalid action` });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001...");
});
