import React from "react";
import { Modal } from "flowbite-react";
import Button from "./Button";

function PopUp({header, description, openModal, onClose}) {

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
        <Modal.Footer className="flex w-1/2 mx-auto">
            <Button
                color="bg-brown" 
                text="Update"
                onClick={onClose} />
            <Button
                color="bg-red-700"
                text="Suspend"
                onClick={onClose} />
        </Modal.Footer>
      </Modal>
    )
}

export default PopUp;