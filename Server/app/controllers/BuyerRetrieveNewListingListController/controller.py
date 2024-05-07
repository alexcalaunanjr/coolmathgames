from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerRetrieveNewListingListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveNewProperties(self):
        properties = PropertyListing.retrieveNewProperties()
        return properties

class BaseBuyerRetrieveNewListingListController(BuyerRetrieveNewListingListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getNewProperties(self):
        properties = self.retrieveNewProperties()
        return properties