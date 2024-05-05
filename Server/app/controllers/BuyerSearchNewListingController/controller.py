from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerSearchNewListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchNewListings(self, queryNew):
        searchPropertyListings = PropertyListing.searchNewListings(queryNew) #query based of search keywords
        return searchPropertyListings

class BaseBuyerSearchNewListingController(BuyerSearchNewListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def queryNew(self):
        data = request.get_json()
        queryNew = data.get('queryNew')
        searchPropertyListings = self.searchNewListings(queryNew)
        return searchPropertyListings