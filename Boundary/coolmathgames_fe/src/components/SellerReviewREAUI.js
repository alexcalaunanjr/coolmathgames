import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SellerReviewREAUI({ review, setReview, token }) {
    let {agentName} = useParams()
    const [submit, setSubmit] = useState(false);
    const username = localStorage.getItem('username')

    useEffect(() => {
        if (submit) {
            axios.post(`http://127.0.0.1:5000/SellerReviewREA/${agentName}`, {
                "reviewerUsername": username,
                "review": review
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
            })
            .catch(error => {
                console.error('Error review rea:', error);
            });
        }
    }, [submit]);

    function handleSubmitReview () {
        setSubmit(true);
    }

    function displayReviewREA(){
        return(
            <form class="mb-6">
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label for="review" class="sr-only">Your Review</label>
                    <textarea id="review" 
                        rows="6" 
                        value={review}
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                        placeholder="Write a review..." 
                        onChange={(e) => setReview(e.target.value)}
                        required></textarea>
                </div>
                <button type="submit"
                    class="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" 
                    onClick={handleSubmitReview}>
                    Submit Review
                </button>
            </form>
        )
    }

    return (
        displayReviewREA()
    )
}

export default SellerReviewREAUI