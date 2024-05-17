from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.review import Review

class SellerViewReviewsController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveReviews(self, reaUsername:str):
        reviews = Review.retrieveReviews(reaUsername) # Retrieve a list of reviews
        return reviews

class BaseSellerViewReviewsController(SellerViewReviewsController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getReviews(self, reaUsername):
        reviews = self.retrieveReviews(reaUsername)
        return reviews