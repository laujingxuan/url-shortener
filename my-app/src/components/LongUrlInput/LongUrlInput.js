import { useState } from "react";
import validator from "validator";
import URLService from "../../services/URLService";
import Modal from "../Modal/Modal";

const LongUrlInput = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalContent: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longURL && validator.isURL(longURL)) {
      URLService.fetchShortURL(longURL)
        .then((response) => {
          if (response.status === 200 && response.data.success === true) {
            setShortURL(response.data.shortURL);
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
      setShortURL("");
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

export default LongUrlInput;
