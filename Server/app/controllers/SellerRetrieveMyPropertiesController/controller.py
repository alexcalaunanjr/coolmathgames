from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.listings import Listings

class SellerRetrieveMyPropertiesController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveMyProperties(self, username):
        myProperties = Listings.retrieveMyProperties(username) # Retrieve a list of the sellers properties
        return myProperties

class BaseSellerRetrieveMyPropertiesController(SellerRetrieveMyPropertiesController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getMyProperties(self, username):
        myProperties = self.retrieveMyProperties(username)
        return myProperties