import React from 'react';
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function InsightPopUp({ favorites, views, openModal, onClose }) {


  const [activeTab, setActiveTab] = useState('favorites');
  const handleTabClick = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex -mb-px justify-center">
                <div className="me-2">
                    <button
                        className={`flex p-4 border-b-2 ${
                        activeTab === 'favorites'
                            ? 'border-gray-800 dark:border-gray-300'
                            : 'border-transparent text-gray-500'
                        } rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300`}
                        onClick={(e) => handleTabClick(e, 'favorites')}
                    >
                        <svg class="w-[24px] h-[24px] text-red-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                        </svg>
                        Favorites
                    </button>
                </div>
                <div className="me-2">
                    <button
                        className={`flex p-4 border-b-2 ${
                        activeTab === 'views'
                            ? 'border-gray-800 dark:border-gray-300'
                            : 'border-transparent text-gray-500'
                        } rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300`}
                        onClick={(e) => handleTabClick(e, 'views')}
                    >
                        <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        Views
                    </button>
                </div>
            </div>
            {/* Render content based on activeTab */}
            {activeTab === 'favorites' && 
                <div className='pt-10'>
                    Total Favorites: {favorites}
                </div>
                }
            {activeTab === 'views' && 
                <div className='pt-10'>
                    Total Views: {views}
                </div>
                }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InsightPopUp;
