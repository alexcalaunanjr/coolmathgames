import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { Button, Modal } from "flowbite-react";

import BuyerRateREAUI from './BuyerRateREAUI';
import { useParams } from 'react-router-dom';

function BuyerViewRatingsUI({openModal, onClose, REAName, token}) {
  let {agentName} = useParams()
  // handle rating
  const [rating, setRating] = useState(0);
  const [ratingsList, setRatingsList] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/BuyerRetrieveRatings/${agentName}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
      // sort date descending order
      const sortedRatings = response.data.ratingDict.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRatingsList(sortedRatings)
    })
    .catch(error => {
        console.error('Error retreiving ratings:', error);
    });
}, []);

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
    if (numRatings==0){
      return 0;
    }
    else{
      for (let i = 0; i < numRatings; i++) {
        totalStars += ratingsList[i].rating;
      }
      return (totalStars/numRatings).toFixed(1);
    }
  }
  
  function displayREARatingsUI() {
    return(
      <>
      <Modal show={openModal} onClose={onClose} dismissible>
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

          {/* post your rating */}
          <BuyerRateREAUI rating={rating} setRating={setRating} token={token} onClose={onClose}/>

          <div className='p-4'></div>

          {/* people's ratings */}
          <div>
            {ratingsList.map((ratings) => (
              <>
              <div className="flex">
                <p className="font-semibold">{ratings.raterName}</p>
                <p className="ms-5 text-gray-500 italic">{ratings.date}</p>
              </div>
              <div className="p-0.5"></div>
              <div className="flex">{createStars(ratings.rating)}</div>
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

export default BuyerViewRatingsUI;