import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function READeleteListingUI( {openModal, onClose, text, token}) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  function handleDelete() {
    axios.get(`http://127.0.0.1:5000/READeleteListing/${localStorage.getItem('clickedProperty')}`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
    })
    .then((response) => {
      if (response.data.propertyDeleted) {
        setSuccess("Property deleted")
      }
      else {
        setError("Error occured while trying to delete")
      }
    })
    .catch((error) => {
      console.error('there was an error:', error);
    });
    closeDeletePopUp();
  };

  function closeDeletePopUp(){
    onClose();
    navigate('/REARetrieveListingListUI');
  }

  function clickCancel(){
    closeDeletePopUp();
  }

  function displayDeletePopUp(){
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
                <Button color="failure" onClick={handleDelete}>
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
    displayDeletePopUp()
  );

}

export default READeleteListingUI;
