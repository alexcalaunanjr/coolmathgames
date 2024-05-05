from flask import request
from flask import Blueprint
from app.entity.rating import Rating
from flask_jwt_extended import jwt_required

class BuyerRateREAController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def postRating(self, raterUsername:str, reaUsername:str, rating:int):
        postRating = Rating.postRating(raterUsername, reaUsername, rating)
        return postRating

class BaseBuyerRateREAController(BuyerRateREAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def postRate(self, reaUsername):
        data = request.get_json()
        raterUsername = data.get('raterUsername')
        rating = data.get('rating')
        postRate = self.postRating(raterUsername, reaUsername, rating)
        return postRate