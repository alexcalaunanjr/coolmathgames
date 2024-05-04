from flask import request, jsonify
from flask import Blueprint
from app.entity.rateReviews import RateReviews
from flask_jwt_extended import jwt_required


class SellerRateREAController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def postRating(self, raterUsername:str, reaUsername:str, rating:int):
        postRating = RateReviews.postRating(raterUsername, reaUsername, rating)
        return postRating

class BaseSellerRateREAController(SellerRateREAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def postRate(self, reaUsername):
        data = request.get_json()
        raterUsername = data.get('raterUsername')
        rating = data.get('rating')
        postRate = self.postRating(raterUsername, reaUsername, rating)
        return postRate