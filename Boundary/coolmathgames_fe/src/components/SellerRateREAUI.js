import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SellerRateREAUI ({ rating, setRating, token }) {
    let {agentName} = useParams()
    const [submit, setSubmit] = useState(false);
    const username = localStorage.getItem('username')

    useEffect(() => {
        if (submit) {
            axios.post(`http://127.0.0.1:5000/SellerRateREA/${agentName}`, {
                "raterUsername": username,
                "rating": rating
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
            })
            .catch(error => {
                console.error('Error rating rea:', error);
            });
        }
    }, [submit]);

    const handleStarClick = (star) => {
        setSubmit(false);
        setRating(star);
    }
    const handleSubmitRating = () => {
        setSubmit(true);
    }

    return (
        <div>
            <div className="flex flex-row-reverse justify-center p-7">
                {[5, 4, 3, 2, 1].map((star) => (
                    <svg
                        key={star}
                        className={`w-7 h-7 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300 ${star <= rating ? 'text-yellow-300' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleStarClick(star)}
                    >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                ))}
            </div>

            <div className="flex justify-center">
                <button type='submit' 
                    class="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" 
                    onClick={handleSubmitRating}>
                    Submit Rating
                </button>
            </div>
        </div>

    )
}

export default SellerRateREAUI;