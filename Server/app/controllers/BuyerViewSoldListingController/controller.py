from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerViewSoldListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewSoldProperty(self, propertyName:str, username:str):
        property = PropertyListing.viewSoldProperty(propertyName, username)
        return property

class BaseBuyerViewSoldListingController(BuyerViewSoldListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        data = request.get_json()
        username = data.get('username')
        property = self.viewSoldProperty(propertyName, username)
        return property