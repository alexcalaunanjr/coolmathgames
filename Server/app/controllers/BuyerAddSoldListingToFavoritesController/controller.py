from flask import request
from flask import Blueprint
from app.entity.favorite import Favorite
from flask_jwt_extended import jwt_required

class BuyerAddSoldListingToFavoritesController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def postFavorite(self, username:str, propertyName:str):
        postFavorite = Favorite.postFavorite(username, propertyName)
        return postFavorite

class BaseBuyerAddSoldListingToFavoritesController(BuyerAddSoldListingToFavoritesController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def postFavoriteListing(self, propertyName:str):
        data = request.get_json()
        username = data.get('username')
        propertyName = propertyName
        postFavorite = self.postFavorite(username, propertyName)
        return postFavorite