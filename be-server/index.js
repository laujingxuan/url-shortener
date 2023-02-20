// To shorten a long URL, we should implement a hash function that hashes a long URL to a 7 char string
// Example of hash functions are CRC32, MD5, or SHA-1. However, the hash results of these functions are longer than 7
// Approach to make the hash function to 7 digits: take the first 7 digits => check if exists in DB => if yes, longURL append with predefined string like "added_string", then hash again and repeat the process
const express = require("express");

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
app.post("/api/get_short_url", (req, res) => {
  res.status(200).json({ success: true, shortURL: "temp" });
});

//returns the long URL when given short URL API
app.post("/api/get_long_url", (req, res) => {
  res.status(200).json({ success: true, longURLs: "temp" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, msg: `invalid action` });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000...");
});
