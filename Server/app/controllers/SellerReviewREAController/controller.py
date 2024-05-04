from flask import request, jsonify
from flask import Blueprint
from app.entity.rateReviews import RateReviews
from flask_jwt_extended import jwt_required


class SellerReviewREAController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def postReview(self, reviewerUsername:str, reaUsername:str, review:str):
        postReview = RateReviews.postReview(reviewerUsername, reaUsername, review)
        return postReview

class BaseSellerReviewREAController(SellerReviewREAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def postReviewText(self, reaUsername):
        data = request.get_json()
        reviewerUsername = data.get('reviewerUsername')
        review = data.get('review')
        postReview = self.postReview(reviewerUsername, reaUsername, review)
        return postReview