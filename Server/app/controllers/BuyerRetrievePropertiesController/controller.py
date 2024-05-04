from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.properties import Properties

class BuyerRetrievePropertiesController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveProperties(self):
        properties = Properties.retrieveProperties() # Retrieve a list of the sellers properties
        return properties

class BaseBuyerRetrievePropertiesController(BuyerRetrievePropertiesController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProperties(self):
        properties = self.retrieveProperties()
        return properties