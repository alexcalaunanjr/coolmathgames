from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.entity.propertyListing import PropertyListing


class REAUpdateListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def retrieveListing(self, propertyName):
        property = PropertyListing.retrieveListing(propertyName)
        return property
    
    def updateListing(self, propertyName:str, propertyImage:str, price:int, location:str, aboutProperty:str, noOfBedrooms:int, noOfBathrooms:int, area:int, unitFeatures:str, facilities:str, sold:bool):
        if propertyName and propertyImage and price and location and aboutProperty and noOfBedrooms and noOfBathrooms and area and unitFeatures and facilities and sold is not None:
            updatedProperty = {
                'property' : propertyName,
                'propertyImage' : propertyImage,
                'price' : price,
                'location' : location,
                'aboutProperty' : aboutProperty,
                'noOfBedrooms' : noOfBedrooms,
                'noOfBathrooms' : noOfBathrooms,
                'area' : area,
                'unitFeatures' : unitFeatures,
                'facilities' : facilities,
                'sold': sold,
            }
            updatedPropertyDetails = PropertyListing.updateListing(propertyName, updatedProperty)
        return updatedPropertyDetails
    
class BaseREAUpdateListingController(REAUpdateListingController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def updateAListing(self, propertyName):
        if request.method == 'GET':
            retrieved = self.retrieveListing(propertyName)
            return retrieved

        if request.method == 'POST':
            data = request.get_json()

            propertyImage = data.get('propertyImage')
            price = data.get('price')
            location = data.get('location')
            aboutProperty = data.get('aboutProperty')
            noOfBedrooms = data.get('noOfBedrooms')
            noOfBathrooms = data.get('noOfBathrooms')
            area = data.get('area')
            unitFeatures = data.get('unitFeatures')
            facilities = data.get('facilities')
            sold = data.get('sold')

            updated = self.updateListing(propertyName, propertyImage, price, location, aboutProperty, noOfBedrooms, noOfBathrooms, area, unitFeatures, facilities, sold) 
            return updated