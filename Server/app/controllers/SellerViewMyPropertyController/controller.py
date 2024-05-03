from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.properties import Properties

class SellerViewMyPropertyController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveProperty(self, propertyName):
        sellerProperty = Properties.retrieveProperty(propertyName)
        return sellerProperty

class BaseSellerViewMyPropertyController(SellerViewMyPropertyController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperty(self, propertyName):
        property = self.retrieveProperty(propertyName)
        return property