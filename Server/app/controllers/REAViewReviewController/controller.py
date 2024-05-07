from app.entity.review import Review
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required


class REAViewReviewController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveReview(self, username:str):
        cred = Review.retrieveReview(username)
        return cred

class BaseREAViewReviewController(REAViewReviewController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewReview(self, username):
        if request.method == 'GET':
            retrieveReview = self.retrieveReview(username)
            return retrieveReview