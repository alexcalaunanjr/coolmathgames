from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing


class REARetrieveListingListController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def retrieveListingList(self, username):
        listingList = PropertyListing.retrieveREAListingList(username)
        return listingList
    
class BaseREARetrieveListingListController(REARetrieveListingListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getListingList(self, username):
        listOfListing = self.retrieveListingList(username)
        return listOfListing