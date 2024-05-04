from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class BuyerSearchNewPropertyController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchNewListings(self, queryNew):
        searchPropertyListings = PropertyListing.searchNewListings(queryNew) #query based of search keywords
        return searchPropertyListings

class BaseBuyerSearchNewPropertyController(BuyerSearchNewPropertyController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def queryNew(self):
        data = request.get_json()
        queryNew = data.get('queryNew')
        searchPropertyListings = self.searchNewListings(queryNew)
        return searchPropertyListings