import React, { useState, useEffect } from 'react';

function BuyerReviewREAUI({ openReviewModal, setOpenReviewModal }) {

    const handleSubmitReview = (review) => {
        console.log("Review:", review);
    }

    return (
        <form class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label for="review" class="sr-only">Your Review</label>
                <textarea id="review" rows="6"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                    placeholder="Write a review..." required></textarea>
            </div>
            <button type="submit"
                class="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleSubmitReview}>
                Submit Review
            </button>
        </form>
    )
}

export default BuyerReviewREAUI