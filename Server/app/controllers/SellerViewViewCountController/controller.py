from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class SellerViewViewCountController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)
    
    #to view the viewcount
    def viewViewCount(self, propertyName):
        viewViewCount = PropertyListing.viewViewCount(propertyName)
        return viewViewCount
    
    #to increase the viewcount whenever this route is called
    def increaseViewCount(self, propertyName):
        increaseViewCount = PropertyListing.increaseViewCount(propertyName)
        return increaseViewCount

class BaseSellerViewViewCountController(SellerViewViewCountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getViewCount(self, propertyName):
        viewViewCount = self.viewViewCount(propertyName)
        return viewViewCount
    
    @jwt_required()
    def upViewCount(self, propertyName):
        increaseViewCount = self.increaseViewCount(propertyName)
        return increaseViewCount