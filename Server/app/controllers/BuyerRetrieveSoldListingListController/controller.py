from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerRetrieveSoldListingListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveSoldProperties(self):
        properties = PropertyListing.retrieveSoldProperties()
        return properties

class BaseBuyerRetrieveSoldListingListController(BuyerRetrieveSoldListingListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getSoldProperties(self):
        properties = self.retrieveSoldProperties()
        return properties