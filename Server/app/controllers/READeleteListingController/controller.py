from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from app.entity.properties import Properties
from app.entity.propertyListing import PropertyListing
from flask import request, jsonify

class READeleteListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def deleteListing(self, propertyName):
        delete = PropertyListing.deleteListing(propertyName)
        return delete

    def deleteProperty(self, property):
        delete = Properties.deleteProperty(property)
        return delete
    
class BaseREADeleteListingController(READeleteListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def deleteAProperty(self, propertyName):
        if request.method == 'GET':
            listingDeleted = self.deleteListing(propertyName)
            propertyDeleted = self.deleteProperty(propertyName)
        
            deleted = listingDeleted and propertyDeleted
            return jsonify({'propertyDeleted': deleted})
        
            