import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from "flowbite-react";
import { useNavigate } from 'react-router-dom';


function REAViewREAReviewsUI({openModal, onClose, REAName, token, username}) {
    const [reviewList, setReviewList] = useState([]);
    // const [totalReviews, setTotalReviews] = useState('')
    useEffect(() => {
        axios.get( `http://127.0.0.1:5000/REAViewReview/${username}`,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const data = response.data.reviewListDict

                setReviewList(data)                
            })
            .catch((error) => {
                console.error('Error fetching reviews', error);
            });
      }, []);

    // total reviews
    const totalReviews = reviewList.map(reviewIDs => [reviewIDs.id]);

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

                    {/* people's reviews */}
                    <div>
                        {reviewList.map((review) => (
                            <>
                            <div className='flex'>
                                <p className='font-semibold'>{review.reviewer}</p>
                                <p className='ms-5 text-gray-500 italic'>{review.date}</p>
                            </div>
                            <div className="p-0.5"></div>
                            <div className="flex">{review.review}</div>
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

export default REAViewREAReviewsUI;