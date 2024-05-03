from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.properties import Properties

class SellerViewREACredController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewREACred(self, reaName):
        sellerProperty = Properties.viewREACred(reaName)
        return sellerProperty

class BaseSellerViewREACredController(SellerViewREACredController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getREACred(self, propertyName):
        property = self.retrieveProperty(propertyName)
        return property