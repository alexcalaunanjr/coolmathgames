from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_
from sqlalchemy import text
from app.entity.properties import Properties

class Favorite(db.Model):
    __tablename__ = 'Favorite'
    id = db.Column(db.Integer, primary_key=True)
    property = db.Column(db.String(50), db.ForeignKey('Properties.propertyName'), nullable=False)
    buyer = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    property_obj = db.relationship("Properties", backref="favorite")
    
    @classmethod
    def retrieveFavoriteList(cls, username):
        favoriteProperties = cls.query.join(cls.property_obj).filter(cls.buyer == username).all()
        properties =   [{
            'RealEstateAgent': listings.property_obj.listings[0].REA,
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
            'viewsCount': listings.property_obj.listings[0].viewsCount,
            'favoritesCount': cls.query.filter_by(property=listings.property).count(),
            'sold': listings.property_obj.listings[0].sold
        } for listings in favoriteProperties]
        return jsonify({"properties": properties})
    
    @classmethod
    def viewFavoriteProperty(cls, propertyName):
        favoriteProperty = cls.query.join(cls.property_obj).filter(cls.property==propertyName).first()
        if favoriteProperty:
            property = ({
                'RealEstateAgent': favoriteProperty.property_obj.listings[0].REA,
                'propertyName': favoriteProperty.property,
                'propertyImage': favoriteProperty.property_obj.propertyImage,
                'price': favoriteProperty.property_obj.price,
                'location': favoriteProperty.property_obj.location,
                'aboutProperty': favoriteProperty.property_obj.aboutProperty,
                'noOfBedrooms': favoriteProperty.property_obj.noOfBedrooms,
                'noOfBathrooms': favoriteProperty.property_obj.noOfBathrooms,
                'area': favoriteProperty.property_obj.area,
                'unitFeatures': favoriteProperty.property_obj.unitFeatures,
                'facilities': favoriteProperty.property_obj.facilities,
                'viewsCount': favoriteProperty.property_obj.listings[0].viewsCount,
                'favoritesCount': cls.query.filter_by(property=favoriteProperty.property).count(),
                'sold': favoriteProperty.property_obj.listings[0].sold
            })
            return jsonify({"properties": property})
        else:
            return jsonify({"properties": "Not found"})
    
    @classmethod
    def postFavorite(cls, username:str, propertyName:str):
        propertyExist = cls.query.join(cls.property_obj).filter(and_(Properties.propertyName==propertyName, cls.buyer==username)).first()
        if propertyExist:
            db.session.delete(propertyExist)
            db.session.commit()
            return jsonify({"enteredFavorite": False})
        else:
            newFavorite = Favorite (
                property = propertyName,
                buyer = username
            )
            db.session.add(newFavorite)
            db.session.commit()
            return jsonify({"enteredFavorite": True})
    
    @classmethod
    def viewFavoriteCount(cls, propertyName):
        favoriteCount = cls.query.filter_by(property=propertyName).count()
        return jsonify({'favorites':favoriteCount})
