from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class SellerRetrieveListingListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveMyProperties(self, username:str):
        myProperties = PropertyListing.retrieveMyProperties(username) # Retrieve a list of the sellers properties
        return myProperties

class BaseSellerRetrieveListingListController(SellerRetrieveListingListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getMyProperties(self, username):
        myProperties = self.retrieveMyProperties(username)
        return myProperties