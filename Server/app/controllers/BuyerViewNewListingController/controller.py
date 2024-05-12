from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerViewNewListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewNewProperty(self, propertyName:str, username:str):
        property = PropertyListing.viewNewProperty(propertyName, username)
        return property

class BaseBuyerViewNewListingController(BuyerViewNewListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        data = request.get_json()
        username = data.get('username')
        property = self.viewNewProperty(propertyName, username)
        return property