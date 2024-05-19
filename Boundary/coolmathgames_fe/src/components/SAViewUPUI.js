import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal } from "flowbite-react";
import Button from "./Button";
import SASuspendUPUI from "./SASuspendUPUI";
import { Link, useNavigate } from "react-router-dom";

function SAViewUPUI({header, description, openModal, onClose, token, setStatus}) {
  const navigate = useNavigate();
  const [suspendPopUp, setSuspendPopUp] = useState(false);
  const [clickedProfile, setClickedProfile] = useState(localStorage.getItem('clickedProfile'));
  const [clickedProfileDesc, setclickedProfileDescription] = useState('');
  
  // Prompt success suspend user profile
  const [message, setMessage] = useState('');

  const handleSuspend = () => {
    setSuspendPopUp(true);
  }

  const handleReopenPopUp = () => {
    setSuspendPopUp(false);
  }

  const handleUpdate = () => {
    navigate("/SAUpdateUPUI");
  }

  useEffect(() => {
    setClickedProfile();
    axios.post('http://127.0.0.1:5000/SAViewUP', {
                profileName: clickedProfile,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const data = response.data
                setclickedProfileDesc(data)
            })
            .catch((error) => {
                console.error('Error fetching profile description', error);
            });
  }, []);
  function setclickedProfileDesc(data){
    setclickedProfileDescription(data.desc)
  }

  function displayUPDetails(){
    return(
      <Modal show={openModal} onClose={onClose}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {clickedProfileDesc}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex flex-col">
        {/* Error Message */}
        <div className="flex justify-center">
          {message && <div className="text-green-500">{message}</div>}
        </div>

        {/* Button */}
        <div className="flex justify-center space-x-4 pt-5">
          <div className="w-40">
            <Button color="bg-blue-500 text-md" text="Update" onClick={handleUpdate}/>
          </div>
          <div className="w-40">
            <Button color="bg-red-700 text-black text-md" text="Suspend" onClick={handleSuspend}/>
          </div>
          {suspendPopUp && (
              <SASuspendUPUI
                  openModal={suspendPopUp}
                  onClose={handleReopenPopUp}
                  text="Are you sure to suspend this user profile?"
                  token={token}
                  setMessage={setMessage}
                  setStatus={setStatus}
              />
          )}
        </div>
      </Modal.Footer>
    </Modal>
    )
  }

  return (
    displayUPDetails()
  );
}

export default SAViewUPUI;