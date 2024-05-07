from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing


class REAViewViewCountsController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def viewViewCount(self, listing):
        viewCounts = PropertyListing.viewViewCount(listing)
        return viewCounts
    

class BaseREAViewViewCountsController(REAViewViewCountsController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def listingViewCounts(self, listing):
        propertyDetails = self.viewViewCount(listing)
        return propertyDetails