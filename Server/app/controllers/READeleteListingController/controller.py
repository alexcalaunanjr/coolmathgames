from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from app.entity.properties import Properties
from app.entity.propertyListing import PropertyListing
from flask import request, jsonify

class READeleteListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def deleteProperty(self, property):
        delete = Properties.deleteProperty(property)
        return jsonify({'propertyDeleted':delete})
    
class BaseREADeleteListingController(READeleteListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def deleteAProperty(self, propertyName):
        if request.method == 'GET':
            propertyDeleted = self.deleteProperty(propertyName)
        
            deleted = propertyDeleted
            return deleted
        
            