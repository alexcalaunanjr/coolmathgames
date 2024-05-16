from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from app.entity.properties import Properties
from app.entity.propertyListing import PropertyListing
from flask import request, jsonify

class REACreateListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def createProperty(self, propertyName:str, propertyImage:str, price:int, location:str, aboutProperty:str, noOfBedrooms:int, noOfBathrooms:int, area:int, unitFeatures:str, facilities:str ):
        createNewProperty = Properties.createProperty(propertyName, propertyImage, price, location, aboutProperty, noOfBedrooms, noOfBathrooms, area, unitFeatures, facilities)
        return createNewProperty
    
    def createListing(self, propertyName:str, ownerSeller:str, REA:str, sold:bool, viewsCount:int):
        createListing = PropertyListing.createListing(propertyName, ownerSeller, REA, sold, viewsCount)
        return createListing
    
class BaseREACreateListingController(REACreateListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def createAProperty(self):
        if request.method == 'POST':
            data = request.get_json()

            #create property
            propertyName = data.get('propertyName')
            propertyImage = data.get('propertyImage')
            price = data.get('price')
            location = data.get('location')
            aboutProperty = data.get('aboutProperty')
            noOfBedrooms = data.get('noOfBedrooms')
            noOfBathrooms = data.get('noOfBathrooms')
            area = data.get('area')
            unitFeatures = data.get('unitFeatures')
            facilities = data.get('facilities')
            propertyCreated = self.createProperty(propertyName, propertyImage, price, location, aboutProperty, noOfBedrooms, noOfBathrooms, area, unitFeatures, facilities)

            #create listing
            ownerSeller = data.get('ownerSeller')
            REA = data.get('REA')
            sold = False
            viewsCount = 0
            listingCreated = self.createListing(propertyName, ownerSeller, REA, sold, viewsCount)

            created = propertyCreated.get_json().get('propertyCreated') and listingCreated.get_json().get('listingCreated')
            return jsonify({'propertyCreated': created})
        
            