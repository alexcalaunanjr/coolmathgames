import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

import BuyerReviewREAUI from './BuyerReviewREAUI';


function BuyerRetrieveREAReviewsUI({openModal, onClose, REAName}) {
    // placeholders
    const reviewsList = [
        {
            id: 1,
            name: "John Doe",
            date: "05/05/2024",
            review: "poopypants did an amazing job with the sale of my father’s house. I am in overseas so I was concerned about how this process would go, but the way he handled our situation and went above and beyond for us was amazing."
        },
        {
            id: 2,
            name: "Jane Doe",
            date: "03/05/2024",
            review: "poopypants is very good at what he's doing."
        },
        {
            id: 3,
            name: "Carlosa Vincentia",
            date: "30/04/2024",
            review: "The world is full of monsters with friendly faces, and angels full of scars. *inserts emo music*"
        },
        {
            id: 4,
            name: "Carla Vincenzo",
            date: "30/04/2024",
            review: "Oshiete, oshiete yo sono shikumi wo. Boku no naka ni, dare ga iru no? Kowareta, kowareta yo kono sekai de. Kimi ga warau nanimo miezu ni..."
        },
        {
            id: 5,
            name: "Carlosse Vincentio",
            date: "28/04/2024",
            review: "Moe Moe Kyunnn ≽^•⩊•^≼"
        },
        {
            id: 6,
            name: "Carlos Vincent Frasenda",
            date: "22/04/2024",
            review: "I don't like Kevin, not one bit."
        },
    ];

    // total reviews
    const totalReviews = reviewsList.map(reviewIDs => [reviewIDs.id]);

    // check if rating is filled
    // const [ratingFilled, setRatingFilled] = useState(false);

    // handle review modal
    const [review, setReview] = useState(0);


    function displayREAReviewsUI() {
        return(
            <>
            <Modal show={openModal} onClose={onClose}>
                <Modal.Header><p class="text-2xl font-semibold text-gray-900">{REAName}'s Reviews</p></Modal.Header>
                <Modal.Body>
                    {/* total reviews */}
                    <div className='flex'>
                        <p class="ms-1 text-4xl text-gray-900">{totalReviews.length}</p>
                        <p class="ms-2 mt-2 text-2xl text-gray-900">Total Reviews</p>
                    </div>

                    <div className='p-4'></div>

                    {/* post your review */}
                    <BuyerReviewREAUI review={review} setReview={setReview}/>

                    <div className='p-4'></div>

                    {/* people's reviews */}
                    <div>
                        {reviewsList.map((reviews) => (
                            <>
                            <div className='flex'>
                                <p className='font-semibold'>{reviews.name}</p>
                                <p className='ms-5 text-gray-500 italic'>{reviews.date}</p>
                            </div>
                            <div className="p-0.5"></div>
                            <div className="flex">{reviews.review}</div>
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
        displayREAReviewsUI()
    )
}

export default BuyerRetrieveREAReviewsUI;