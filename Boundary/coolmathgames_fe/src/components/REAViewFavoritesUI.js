import React from 'react';
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from 'axios';

function REAViewFavoritesUI({ propertyName, openModal, onClose, token }) {
  const [favorites, setFavorites] = useState('');

  useEffect(() => {
    document.title = 'REA view favorite count';

    axios.get(`http://127.0.0.1:5000/REAViewFavoriteCount/${propertyName}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (response) {
            setFavorites(response.data.favorites)
        }
    })
    .catch((error) => {
        console.error('Error fetching property listing:', error);
    })
}, []);

function displayREAViewFavorites() {
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
                          <svg class="w-[24px] h-[24px] text-red-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                          </svg>
                          Favorites
                      </button>
                  </div>
              </div>
              <div className='pt-10'>
                  Total Favorites: {favorites}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      {displayREAViewFavorites()}
    
    </>
  );
} 
export default REAViewFavoritesUI;