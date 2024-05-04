from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerSearchSoldPropertyController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchSoldListings(self, querySold):
        searchPropertyListings = PropertyListing.searchSoldListings(querySold) #query based of search keywords
        return searchPropertyListings

class BaseBuyerSearchSoldPropertyController(BuyerSearchSoldPropertyController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def querySold(self):
        data = request.get_json()
        querySold = data.get('querySold')
        searchPropertyListings = self.searchSoldListings(querySold)
        return searchPropertyListings