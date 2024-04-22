import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useModalContext from "../hooks/UseModalContext";

function LogOutModal() {
    const {openModal, setOpenModal} = useModalContext()
    const navigate = useNavigate();

    function handleLogout() {
        axios.post('http://127.0.0.1:5000/logout')
        .then((response) => {
            localStorage.removeItem('token');
            //redirect user to login page
            console.log("Logout Successful!")
            navigate("/login"); 
            setOpenModal(false);
        })
        .catch((error) => {
            console.error('Error logging out: ', error);
            setOpenModal(false);
        })
    }

    return (
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure?</h3>
                    <div className="flex justify-center gap-4">
                        <Button color="gray" size="md" onClick={() => setOpenModal(false)}>No, cancel</Button>
                        <Button color="blue" size="md" onClick={handleLogout}>Yes, log me out</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default LogOutModal;