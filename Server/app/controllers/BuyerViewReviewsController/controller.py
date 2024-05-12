from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.review import Review

class BuyerViewReviewsController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveReviews(self, reaUsername):
        reviews = Review.retrieveReviews(reaUsername) # Retrieve a list of reviews
        return reviews

class BaseBuyerViewReviewsController(BuyerViewReviewsController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getReviews(self, reaUsername):
        reviews = self.retrieveReviews(reaUsername)
        return reviews