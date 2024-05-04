from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerViewSoldPropertyController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewOldProperty(self, propertyName):
        property = PropertyListing.viewOldProperty(propertyName)
        return property

class BaseBuyerViewSoldPropertyController(BuyerViewSoldPropertyController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        property = self.viewOldProperty(propertyName)
        return property