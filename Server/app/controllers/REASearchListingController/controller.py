from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing

class REASearchListingController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchListings(self, query, username):
        searchPropertyListings = PropertyListing.searchListings(query, username) #query based of search keywords
        return searchPropertyListings

class BaseREASearchListingController(REASearchListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def query(self, username):
        data = request.get_json()
        query = data.get('query')
        searchPropertyListings = self.searchListings(query, username)
        return searchPropertyListings