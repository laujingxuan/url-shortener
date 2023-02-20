const getShortURL = (con, longURL) => {
  var sql = "SELECT short_url FROM url_relation WHERE long_url = ?";
  return new Promise((resolve, reject) => {
    con.query(sql, longURL, (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      if (result.length != 0) {
        resolve(result[0].short_url);
      }
      resolve("");
    });
  });
};

const getLongURL = (con, shortURL) => {
  var sql = "SELECT long_url FROM url_relation WHERE short_url = ?";
  return new Promise((resolve, reject) => {
    con.query(sql, shortURL, (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      if (result.length != 0) {
        resolve(result[0].long_url);
      }
      resolve("");
    });
  });
};

const saveShortURL = (con, longURL, shortURL) => {
  var post = { short_url: shortURL, long_url: longURL };
  var sql = "INSERT INTO url_relation SET ?";
  return new Promise((resolve, reject) => {
    con.query(sql, post, (err) => {
      if (err) {
        console.log(err);
      }
    });
    resolve();
  });
};

module.exports = {
  getShortURL,
  saveShortURL,
  getLongURL,
};
