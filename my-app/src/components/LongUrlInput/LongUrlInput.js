import { useState } from "react";
import validator from "validator";
import URLService from "../../services/URLService";

const LongUrlInput = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longURL && validator.isURL(longURL)) {
      URLService.fetchShortURL(longURL)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response.data);
            setShortURL(response.data.shortURL);
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
        <h2>Convert URL to Short URL</h2>
        <div>
          <label htmlFor="longURL">Your URL: </label>
          <input
            type="text"
            id="longURL"
            value={longURL}
            onChange={(e) => setLongURL(e.target.value)}
          />
          <p>{shortURL}</p>
        </div>
        <div className="form-actions">
          <button type="submit">Convert</button>
        </div>
      </form>
    </>
  );
};

export default LongUrlInput;
