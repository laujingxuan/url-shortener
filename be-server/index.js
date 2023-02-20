const express = require("express");
const crypto = require("crypto");
const { getShortURL, saveShortURL, getLongURL } = require("./sql-operation");
const mysql = require("mysql");

const {
  dbUserName,
  dbPassword,
  serverPort,
  myServerDomain,
} = require("./config");

const app = express();
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: dbUserName,
  password: dbPassword,
  database: "url_shortener",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

app.options("/*", (_, res) => {
  res.sendStatus(200);
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
    res.status(200).json({ success: true, shortURL: myServerDomain + hash });
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
  console.log(req.body)
  if (shortURL) {
    hashedCode = shortURL.slice(-7);
    dbURL = await getLongURL(con, hashedCode);
    if (dbURL == "") {
      res.status(200).json({
        success: false,
        msg: "original url for the short url not found",
      });
    } else {
      res.status(200).json({ success: true, longURL: dbURL });
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

app.listen(serverPort, () => {
  console.log(`server is listening on port ${serverPort}...`);
});
