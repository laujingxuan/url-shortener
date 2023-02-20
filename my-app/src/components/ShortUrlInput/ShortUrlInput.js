import { useState } from "react";
import URLService from "../../services/URLService";

const ShortUrlInput = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shortURL.length);
    if (shortURL.length === 24) {
      URLService.fetchLongURL(shortURL)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response.data);
            setLongURL(response.data.longURL);
          } else {
            console.log("Request with error");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("Invalid URL");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Convert Short URL Back To Original URL</h2>
        <div>
          <label htmlFor="shortURL">Short URL: </label>
          <input
            type="text"
            id="shortURL"
            value={shortURL}
            onChange={(e) => setShortURL(e.target.value)}
          />
          <p>{longURL}</p>
        </div>
        <div className="form-actions">
          <button type="submit">Convert</button>
        </div>
      </form>
    </>
  );
};

export default ShortUrlInput;
