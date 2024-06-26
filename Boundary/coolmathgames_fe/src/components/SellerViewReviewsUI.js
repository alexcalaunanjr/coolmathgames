import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from "flowbite-react";

import SellerReviewREAUI from './SellerReviewREAUI';
import { useParams } from 'react-router-dom';

function SellerViewReviewsUI({openModal, onClose, REAName, token}) {
    let {agentName} = useParams()
    // handle review
    const [review, setReview] = useState('');
    const [reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/SellerViewReviews/${agentName}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // sort date descending order
            const sortedReview = response.data.reviewListDict.sort((a, b) => new Date(b.date) - new Date(a.date));
            setReviewsList(sortedReview)
        })
        .catch(error => {
            console.error('Error retrieving reviews:', error);
        });
    }, []);
    
    // total reviews
    const totalReviews = reviewsList.map(reviewIDs => [reviewIDs.id]);

    function displayREAReviewsUI() {
        return(
            <>
            <Modal show={openModal} onClose={onClose} dismissible> 
                <Modal.Header><p class="text-2xl font-semibold text-gray-900">{REAName}'s Reviews</p></Modal.Header>
                <Modal.Body>
                    {/* total reviews */}
                    <div className='flex'>
                        <p class="ms-1 text-4xl text-gray-900">{totalReviews.length}</p>
                        <p class="ms-2 mt-2 text-2xl text-gray-900">Total Reviews</p>
                    </div>

                    <div className='p-4'></div>

                    {/* post your review */}
                    <SellerReviewREAUI review={review} setReview={setReview} token={token} onClose={onClose}/>

                    <div className='p-4'></div>

                    {/* people's reviews */}
                    <div>
                        {reviewsList.map((reviews) => (
                            <>
                            <div className='flex'>
                                <p className='font-semibold'>{reviews.reviewerName}</p>
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

export default SellerViewReviewsUI;