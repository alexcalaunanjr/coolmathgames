from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.favorite import Favorite


class REAViewFavoriteCountController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def viewFavoriteCount(self, propertyName):
        favoriteCount = Favorite.viewFavoriteCount(propertyName)
        return favoriteCount
    

class BaseREAViewFavoriteCountController(REAViewFavoriteCountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getFavoriteCount(self, propertyName):
        favoriteCount = self.viewFavoriteCount(propertyName)
        return favoriteCount