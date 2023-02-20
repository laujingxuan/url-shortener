import axios from "axios";

const URL_SHORTENER_SERVICE = "http://localhost:3001/api/";

class URLService {
  fetchShortURL(url) {
    var body = { longURL: url };
    console.log("fetchShortURL");
    return axios.post(URL_SHORTENER_SERVICE + "get_short_url", body);
  }
  fetchLongURL(url) {
    var body = { shortURL: url };
    console.log("fetchLongURL");
    return axios.post(URL_SHORTENER_SERVICE + "get_long_url", body);
  }
}

export default new URLService();
