from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_

class Favorites(db.Model):
    __tablename__ = 'Favorites'
    id = db.Column(db.Integer, primary_key=True)
    property = db.Column(db.String(50), db.ForeignKey('Properties.propertyName'), nullable=False)
    buyer = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    property_obj = db.relationship("Properties", backref="listings")

    # Create new favorites
    @classmethod
    def createCreds(self, property, buyer):
        favAdded = Favorites(property=property, buyer=buyer)
        db.session.add(favAdded)
        db.session.commit()
        return True
    
    def getFavoritePropertis(self, buyer):
        favoriteProperties = Favorites.query.filter_by(username=buyer)
        properties =   [{
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
            'favoritesCount': listings.property_obj.favoritesCount,
            'sold': listings.sold
        } for listings in favoriteProperties]
        return jsonify({"properties": properties})
    
    def getFAvoriteCount(self, property):
        favoriteCount = Favorites.query(db.func.count(property)).filter_by(property=property).group_by(property).first()
        return jsonify({'favorites':favoriteCount})
