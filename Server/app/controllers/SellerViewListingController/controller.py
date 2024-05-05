from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class SellerViewListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewMyNewProperty(self, propertyName):
        sellerProperty = PropertyListing.viewNewProperty(propertyName)
        return sellerProperty

class BaseSellerViewListingController(SellerViewListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        property = self.viewMyNewProperty(propertyName)
        return property