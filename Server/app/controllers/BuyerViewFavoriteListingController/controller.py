from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.favorite import Favorite

class BuyerViewFavoriteListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewFavoriteProperty(self, propertyName:str):
        favorite = Favorite.viewFavoriteProperty(propertyName)
        return favorite

class BaseBuyerViewFavoriteListingController(BuyerViewFavoriteListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getFavoriteProperty(self, propertyName:str):
        favorite = self.viewFavoriteProperty(propertyName)
        return favorite