from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.rating import Rating

class SellerViewRatingsController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveRatings(self, reaUsername:str):
        ratings = Rating.retrieveRatings(reaUsername) # Retrieve a list of ratings
        return ratings

class BaseSellerViewRatingsController(SellerViewRatingsController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getRatings(self, reaUsername):
        ratings = self.retrieveRatings(reaUsername)
        return ratings