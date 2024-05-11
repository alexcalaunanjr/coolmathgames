from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.favorite import Favorite

class BuyerRetrieveFavoriteListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveFavoriteList(self, username:str):
        favoriteList = Favorite.retrieveFavoriteList(username)
        return favoriteList

class BaseBuyerRetrieveFavoriteListController(BuyerRetrieveFavoriteListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getFavoriteList(self):
        data = request.get_json()
        username = data.get('username')
        favoriteList = self.retrieveFavoriteList(username)
        return favoriteList