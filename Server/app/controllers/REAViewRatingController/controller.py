from app.entity.rating import Rating
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required


class REAViewRatingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveRating(self, username:str):
        cred = Rating.retrieveRating(username)
        return cred

class BaseREAViewRatingController(REAViewRatingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewRating(self, username):
        if request.method == 'GET':
            retrieveRating = self.retrieveRating(username)
            return jsonify({'rating': retrieveRating.get_json()})