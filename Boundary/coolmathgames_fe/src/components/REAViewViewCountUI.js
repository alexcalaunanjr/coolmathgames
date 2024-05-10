import React from 'react';
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from 'axios';

function REAViewViewCountUI({ propertyName, openModal, onClose, token }) {
  const [views, setViews] = useState('');

  useEffect(() => {
    document.title = 'REA view view count';

    axios.get(`http://127.0.0.1:5000/REAViewViewCount/${propertyName}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (response) {
            setViews(response.data.viewsCount)
        }
    })
    .catch((error) => {
        console.error('Error fetching property listing:', error);
    })
}, []);

function displayREAViewViews() {
    return (
        <>
        <Modal show={openModal} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <div className="flex -mb-px justify-center">
                    <div className="me-2">
                        <button
                            className={`flex p-4 border-b-2 rounded-t-lg border-gray-800 dark:border-gray-300`}
                        >
                            <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            Views
                        </button>
                    </div>
                </div>
                <div className='pt-10'>
                    Total Views : {views}
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}
return (
    <>
    {displayREAViewViews()}
    </>
    )
}
export default REAViewViewCountUI;
