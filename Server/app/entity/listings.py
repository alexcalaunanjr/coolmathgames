from .sqlAlchemy import db
from flask import jsonify

class Listings(db.Model):
    __tablename__ = 'Listings'
    id = db.Column(db.Integer, primary_key=True)
    property = db.Column(db.String(50), db.ForeignKey('Properties.propertyName'), nullable=False)
    ownerSeller = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    REA = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    property_obj = db.relationship("Properties", backref="listings")

    #function to return a seller's owned properties and all its information
    @classmethod
    def retrieveMyProperties(cls, username):
        sellerPropertiesList = cls.query.filter_by(ownerSeller=username).all()
        sellerPropertiesDict = [{
            'RealEstateAgent': listings.REA,
            'propertyName': listings.property,
            'propertyImage': listings.property_obj.propertyImage,
            'price': listings.property_obj.price,
            'location': listings.property_obj.location,
            'aboutProperty': listings.property_obj.aboutProperty,
            'noOfBedrooms': listings.property_obj.noOfBedrooms,
            'noOfBathrooms': listings.property_obj.noOfBathrooms,
            'area': listings.property_obj.area,
            'unitFeatures': listings.property_obj.unitFeatures,
            'facilities': listings.property_obj.facilities,
            'viewsCount': listings.property_obj.viewsCount,
            'favoritesCount': listings.property_obj.favoritesCount
        } for listings in sellerPropertiesList]
        return jsonify({"sellerProperties": sellerPropertiesDict})