import React from "react";
import { useState } from "react";
import { Modal } from "flowbite-react";
import Button from "./Button";
import SuspendPopUp from "./ProfileSuspendPopUp";
import { Link, useNavigate } from "react-router-dom";

function PopUp({header, description, openModal, onClose, token}) {
  const navigate = useNavigate();
  const [suspendPopUp, setSuspendPopUp] = useState(false);
  
  const handleSuspend = () => {
    setSuspendPopUp(true);
  }

  const handleReopenPopUp = () => {
    setSuspendPopUp(false);
  }

  const handleUpdate = () => {
    navigate("/updateProfile");
  }

  return (
      <Modal show={openModal} onClose={onClose}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-center gap-4">
        <Link to="/UpdateProfile">
          <Button
              color="bg-brown" 
              text="Update"
              onClick={handleUpdate} />
        </Link>
        <div>
          <Button
              color="bg-red-700"
              text="Suspend"
              onClick={handleSuspend} />
        </div>
        {suspendPopUp && (
            <SuspendPopUp
                openModal={suspendPopUp}
                onClose={handleReopenPopUp}
                text="Are you sure to suspend this user profile?"
                token={token}
            />
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default PopUp;