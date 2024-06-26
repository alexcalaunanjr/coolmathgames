import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from 'axios';

function SASuspendUAUI( {openModal, onClose, text, token, setMessage}) {
  function handleSuspend() {
    const user = localStorage.getItem('clickedUser')
    axios.post('http://127.0.0.1:5000/SASuspendUA', {
      username: user
    }, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
    })
    .then((response) => {
      if (response.data.accountSuspended) {
        setMessage("User account suspended successfully!")
      }
      onClose();
    })
    .catch((error) => {
      console.error('there was an error:', error);
      setMessage('Error occured while trying to suspend');
    });
    closeSuspendPopUp();
  };


  function clickCancel(){
    onClose();
  }

  function closeSuspendPopUp(){
    onClose();
  }

  function displaySuspendPopUp(){
    return (
      <>
        <Modal show={openModal} size="md" onClose={onClose} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {text}
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleSuspend}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={clickCancel}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
  
  return(
    displaySuspendPopUp()
  );

}

export default SASuspendUAUI;
