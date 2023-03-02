import { useState } from "react";
import validator from "validator";
import URLService from "../../services/URLService";
import Modal from "../Modal/Modal";

const ShortUrlInput = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalContent: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shortURL && validator.isURL(shortURL)) {
      URLService.fetchLongURL(shortURL)
        .then((response) => {
          if (response.status === 200 && response.data.success === true) {
            setLongURL(response.data.longURL);
          } else {
            setModal({
              ...modal,
              isModalOpen: true,
              modalContent: `Error: ${response.data.msg}`,
            });
          }
        })
        .catch((e) => {
          setModal({
            ...modal,
            isModalOpen: true,
            modalContent: `Error: ${e}`,
          });
        });
    } else {
      setLongURL("");
      setModal({
        ...modal,
        isModalOpen: true,
        modalContent: `Invalid URL`,
      });
    }
  };

  const closeModal = () => {
    setModal({ ...modal, isModalOpen: false });
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
        <button className="button-23" type="submit">
          Convert
        </button>
      </form>
      <div>
        {modal.isModalOpen && (
          <Modal closeModal={closeModal} modalContent={modal.modalContent} />
        )}
      </div>
    </>
  );
};

export default ShortUrlInput;
