from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerViewNewListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewNewProperty(self, propertyName):
        property = PropertyListing.viewNewProperty(propertyName)
        return property

class BaseBuyerViewNewListingController(BuyerViewNewListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        property = self.viewNewProperty(propertyName)
        return property