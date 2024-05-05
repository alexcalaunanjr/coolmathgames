from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerViewSoldListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewSoldProperty(self, propertyName):
        property = PropertyListing.viewSoldProperty(propertyName)
        return property

class BaseBuyerViewSoldListingController(BuyerViewSoldListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        property = self.viewSoldProperty(propertyName)
        return property