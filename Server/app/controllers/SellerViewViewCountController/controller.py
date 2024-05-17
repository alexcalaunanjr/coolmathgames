from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class SellerViewViewCountController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)
    
    #to view the viewcount
    def viewViewCount(self, propertyName:str):
        viewViewCount = PropertyListing.viewViewCount(propertyName)
        return viewViewCount

class BaseSellerViewViewCountController(SellerViewViewCountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getViewCount(self, propertyName):
        viewViewCount = self.viewViewCount(propertyName)
        return viewViewCount