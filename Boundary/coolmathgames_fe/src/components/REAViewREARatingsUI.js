import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { Button, Modal } from "flowbite-react";


function REAViewREARatingsUI({openModal, onClose, REAName}) {
    // placeholders
    const ratingsList = [
      {
        id: 1,
        name: "John Doe",
        date: "05/05/2024",
        stars: 5,
      },
      {
        id: 2,
        name: "Johnny Depp",
        date: "04/05/2024",
        stars: 4,
      },
      {
        id: 3,
        name: "Johnathan Kho",
        date: "01/05/2024",
        stars: 3,
      },
      {
        id: 4,
        name: "John Cena",
        date: "30/04/2024",
        stars: 5,
      },
      {
        id: 5,
        name: "Jane Doe",
        date: "29/04/2024",
        stars: 4,
      },
      {
        id: 6,
        name: "Janice Wilson",
        date: "27/04/2024",
        stars: 3,
      },
      {
        id: 7,
        name: "Janette Liu",
        date: "26/04/2024",
        stars: 4,
      },
      {
        id: 8,
        name: "Jasmine Tea",
        date: "18/04/2024",
        stars: 1,
      },
    ];

    const createStars = (numStars) => {
      const starsRow = [];
  
      for (let i = 0; i < 5; i++) {
        if (i < numStars) {
          starsRow.push(<FaStar key={i} style={{ color: "#f2cc49", width: "22px", height: "22px" }} />);
        } 
        else {
          starsRow.push(<FaStar key={i} style={{ color: "#d2d5da", width: "22px", height: "22px" }} />);
        }
      }
      return starsRow;
    };

    // total average rating
    function calculateAvgStars(ratingsList) {
      let totalStars = 0;
      let numRatings = ratingsList.length;
      for (let i = 0; i < numRatings; i++) {
        totalStars += ratingsList[i].stars;
      }
      return (totalStars/numRatings).toFixed(1);
    }

    function displayREARatingsUI() {
      return(
        <>
        <Modal show={openModal} onClose={onClose}>
          <Modal.Header><p class="text-2xl font-semibold text-gray-900">{REAName}'s Ratings</p></Modal.Header>
          <Modal.Body>
            {/* total average rate */}
            <div className='flex'>
              {/* stars */}
              <FaStar style={{ color: "#f2cc49", width: "36px", height: "36px", marginTop: "2px", marginInlineEnd: "4px" }} />
              {/* numbers */}
              <p class="ms-1 text-4xl text-gray-900">{calculateAvgStars(ratingsList)}</p>
              <p class="ms-2 mt-2 text-2xl text-gray-900">out of 5</p>
            </div>

            <div className='p-4'></div>

            {/* people's ratings */}
            <div>
              {ratingsList.map((ratings) => (
                <>
                <div className="flex">
                  <p className="font-semibold">{ratings.name}</p>
                  <p className="ms-5 text-gray-500 italic">{ratings.date}</p>
                </div>
                <div className="p-0.5"></div>
                <div className="flex">{createStars(ratings.stars)}</div>
                <div className="p-3"></div>
                </>
              ))}
            </div>
          </Modal.Body>
        </Modal>
        </>
      )
    }

    return(
        displayREARatingsUI()
    )
}

export default REAViewREARatingsUI;