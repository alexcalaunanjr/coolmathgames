from .sqlAlchemy import db
from flask import jsonify

class Properties(db.Model):
    __tablename__ = 'Properties'
    propertyName = db.Column(db.String(50), primary_key=True, nullable=False)
    propertyImage = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(20), nullable=False)
    aboutProperty = db.Column(db.Text, nullable=False)
    noOfBedrooms = db.Column(db.Integer, nullable=False)
    noOfBathrooms = db.Column(db.Integer, nullable=False)
    area = db.Column(db.Integer, nullable=False)
    unitFeatures = db.Column(db.Text, nullable=False)
    facilities = db.Column(db.Text, nullable=False)

    #create property
    @classmethod
    def createProperty(self, propertyName:str, propertyImage:str, price:int, location:str, aboutProperty:str, noOfBedrooms:int, noOfBathrooms:int, area:int, unitFeatures:str, facilities:str ):
        if propertyName and propertyImage and price and location and aboutProperty and noOfBedrooms and noOfBathrooms and area and unitFeatures and facilities:
            newProperty = Properties(
                propertyName = propertyName,
                propertyImage = propertyImage,
                price = price,
                location = location,
                aboutProperty = aboutProperty,
                noOfBedrooms = noOfBedrooms,
                noOfBathrooms = noOfBathrooms,
                area = area,
                unitFeatures = unitFeatures,
                facilities = facilities
            )
        if newProperty:
            db.session.add(newProperty)
            db.session.commit()
            return jsonify({"propertyCreated":True})
        else:
            return jsonify({"propertyCreated":False})

    #delete property
    @classmethod
    def deleteProperty(self, property):
        Properties.query.filter_by(propertyName=property).delete()
        db.session.commit()
        return True