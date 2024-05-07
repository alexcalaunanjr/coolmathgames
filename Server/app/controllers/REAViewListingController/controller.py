from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing


class REAViewListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveListing(self, propertyName):
        propertyDetails = PropertyListing.retrieveListing(propertyName)
        return propertyDetails
    

class BaseREAViewListingController(REAViewListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewProperty(self, propertyName):
        propertyDetails = self.retrieveListing(propertyName)
        return propertyDetails