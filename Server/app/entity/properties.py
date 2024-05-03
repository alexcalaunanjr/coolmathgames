from .sqlAlchemy import db
from flask import jsonify

class Properties(db.Model):
    __tablename__ = 'Properties'
    propertyName = db.Column(db.String(50), primary_key=True, nullable=False)
    propertyImage = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(20), nullable=False)
    aboutProperty = db.Column(db.String(300), nullable=False)
    noOfBedrooms = db.Column(db.Integer, nullable=False)
    noOfBathrooms = db.Column(db.Integer, nullable=False)
    area = db.Column(db.Integer, nullable=False)
    unitFeatures = db.Column(db.String(300), nullable=False)
    facilities = db.Column(db.String(300), nullable=False)
    viewsCount = db.Column(db.Integer, nullable=False)
    favoritesCount = db.Column(db.Integer, nullable=False) 

    #Retrieve information for a single Seller's property
    @classmethod
    def retrieveProperty(cls, propertyName:str):
        property = cls.query.filter_by(propertyName=propertyName).first()
        if property:
            property = jsonify({
                'propertyName': property.propertyName,
                'propertyImage': property.propertyImage,
                'price': property.price,
                'location': property.location,
                'aboutProperty': property.aboutProperty,
                'noOfBedrooms': property.noOfBedrooms,
                'noOfBathrooms': property.noOfBathrooms,
                'area': property.area,
                'unitFeatures': property.unitFeatures,
                'facilities': property.facilities,
                'viewsCount': property.viewsCount,
                'favoritesCount': property.favoritesCount
            })
            return property
        else:
            return jsonify({"SellerProperty": "Not Found"})
