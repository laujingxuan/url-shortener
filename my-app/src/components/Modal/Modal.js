import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ modalContent, closeModal }) => {
  //closeModal is a function that close the alert
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 5000);
  });

  return (
    <div className={styles.modal}>
      <p>{modalContent}</p>
    </div>
  );
};

export default Modal;
