# from .sqlAlchemy import db
# from flask import jsonify
# from sqlalchemy import and_

# class PropertyListing(db.Model):
#     __tablename__ = 'PropertyListing'
#     id = db.Column(db.Integer, primary_key=True)
#     property = db.Column(db.String(50), db.ForeignKey('Properties.propertyName'), nullable=False)
#     buyer = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
#     REA = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
#     sold = db.Column(db.Boolean, nullable=False)
#     property_obj = db.relationship("Properties", backref="listings")

#     #Retrieve information on every property
#     @classmethod
#     def retrieveProperties(cls):
#         properties = cls.query.all()
#         propertiesDict = [{
#             'RealEstateAgent': listings.REA,
#             'propertyName': listings.property,
#             'propertyImage': listings.property_obj.propertyImage,
#             'price': listings.property_obj.price,
#             'location': listings.property_obj.location,
#             'aboutProperty': listings.property_obj.aboutProperty,
#             'noOfBedrooms': listings.property_obj.noOfBedrooms,
#             'noOfBathrooms': listings.property_obj.noOfBathrooms,
#             'area': listings.property_obj.area,
#             'unitFeatures': listings.property_obj.unitFeatures,
#             'facilities': listings.property_obj.facilities,
#             'viewsCount': listings.property_obj.viewsCount,
#             'favoritesCount': listings.property_obj.favoritesCount,
#             'sold': listings.sold
#         } for listings in properties]
#         if propertiesDict:
#             return jsonify({"properties": propertiesDict})
#         else:
#             return jsonify({"properties": "Not Found"})
        
#     #function to return a seller's owned properties and all its information
#     @classmethod
#     def retrieveMyProperties(cls, username):
#         sellerPropertiesList = cls.query.filter_by(ownerSeller=username).all()
#         sellerPropertiesDict = [{
#             'RealEstateAgent': listings.REA,
#             'propertyName': listings.property,
#             'propertyImage': listings.property_obj.propertyImage,
#             'price': listings.property_obj.price,
#             'location': listings.property_obj.location,
#             'aboutProperty': listings.property_obj.aboutProperty,
#             'noOfBedrooms': listings.property_obj.noOfBedrooms,
#             'noOfBathrooms': listings.property_obj.noOfBathrooms,
#             'area': listings.property_obj.area,
#             'unitFeatures': listings.property_obj.unitFeatures,
#             'facilities': listings.property_obj.facilities,
#             'viewsCount': listings.property_obj.viewsCount,
#             'favoritesCount': listings.property_obj.favoritesCount,
#             'sold': listings.sold
#         } for listings in sellerPropertiesList]
#         return jsonify({"sellerProperties": sellerPropertiesDict})

#     #Retrieve new Property information based of search
#     @classmethod
#     def searchNewListings(cls, queryNew):
#         propertyListings = cls.query.filter(and_(cls.property.like(f"%{queryNew}%"), cls.sold==False)).all()
#         propertyListingsDict = [{
#             'RealEstateAgent': listings.REA,
#             'propertyName': listings.property,
#             'propertyImage': listings.property_obj.propertyImage,
#             'price': listings.property_obj.price,
#             'location': listings.property_obj.location,
#             'aboutProperty': listings.property_obj.aboutProperty,
#             'noOfBedrooms': listings.property_obj.noOfBedrooms,
#             'noOfBathrooms': listings.property_obj.noOfBathrooms,
#             'area': listings.property_obj.area,
#             'unitFeatures': listings.property_obj.unitFeatures,
#             'facilities': listings.property_obj.facilities,
#             'viewsCount': listings.property_obj.viewsCount,
#             'favoritesCount': listings.property_obj.favoritesCount,
#             'sold': listings.sold
#         } for listings in propertyListings]
#         if propertyListingsDict:
#             return jsonify({"properties": propertyListingsDict})
#         else:
#             return jsonify({"properties": "Not Found"})
    
#     #Retrieve sold Property information based of search
#     @classmethod
#     def searchSoldListings(cls, querySold):
#         propertyListings = cls.query.filter(and_(cls.property.like(f"%{querySold}%"), cls.sold==True)).all()
#         propertyListingsDict = [{
#             'RealEstateAgent': listings.REA,
#             'propertyName': listings.property,
#             'propertyImage': listings.property_obj.propertyImage,
#             'price': listings.property_obj.price,
#             'location': listings.property_obj.location,
#             'aboutProperty': listings.property_obj.aboutProperty,
#             'noOfBedrooms': listings.property_obj.noOfBedrooms,
#             'noOfBathrooms': listings.property_obj.noOfBathrooms,
#             'area': listings.property_obj.area,
#             'unitFeatures': listings.property_obj.unitFeatures,
#             'facilities': listings.property_obj.facilities,
#             'viewsCount': listings.property_obj.viewsCount,
#             'favoritesCount': listings.property_obj.favoritesCount,
#             'sold': listings.sold
#         } for listings in propertyListings]
#         if propertyListingsDict:
#             return jsonify({"properties": propertyListingsDict})
#         else:
#             return jsonify({"properties": "Not Found"})
    
#     #Retrieve information for a single new property
#     @classmethod
#     def viewNewProperty(cls, propertyName:str):
#         newProperty = cls.query.filter(and_(cls.property==propertyName, cls.sold==False)).first()
#         if newProperty:
#             property = jsonify({
#                 'RealEstateAgent': newProperty.REA,
#                 'propertyName': newProperty.property,
#                 'propertyImage': newProperty.property_obj.propertyImage,
#                 'price': newProperty.property_obj.price,
#                 'location': newProperty.property_obj.location,
#                 'aboutProperty': newProperty.property_obj.aboutProperty,
#                 'noOfBedrooms': newProperty.property_obj.noOfBedrooms,
#                 'noOfBathrooms': newProperty.property_obj.noOfBathrooms,
#                 'area': newProperty.property_obj.area,
#                 'unitFeatures': newProperty.property_obj.unitFeatures,
#                 'facilities': newProperty.property_obj.facilities,
#                 'viewsCount': newProperty.property_obj.viewsCount,
#                 'favoritesCount': newProperty.property_obj.favoritesCount,
#                 'sold': newProperty.sold
#             })
#             return property
#         else:
#             return jsonify({"Property": "Not Found"})
    
#     #Retrieve information for a single old property
#     @classmethod
#     def viewOldProperty(cls, propertyName:str):
#         oldProperty = cls.query.filter(and_(cls.property==propertyName, cls.sold==True)).first()
#         if oldProperty:
#             property = jsonify({
#                 'RealEstateAgent': oldProperty.REA,
#                 'propertyName': oldProperty.property,
#                 'propertyImage': oldProperty.property_obj.propertyImage,
#                 'price': oldProperty.property_obj.price,
#                 'location': oldProperty.property_obj.location,
#                 'aboutProperty': oldProperty.property_obj.aboutProperty,
#                 'noOfBedrooms': oldProperty.property_obj.noOfBedrooms,
#                 'noOfBathrooms': oldProperty.property_obj.noOfBathrooms,
#                 'area': oldProperty.property_obj.area,
#                 'unitFeatures': oldProperty.property_obj.unitFeatures,
#                 'facilities': oldProperty.property_obj.facilities,
#                 'viewsCount': oldProperty.property_obj.viewsCount,
#                 'favoritesCount': oldProperty.property_obj.favoritesCount,
#                 'sold': oldProperty.sold
#             })
#             return property
#         else:
#             return jsonify({"Property": "Not Found"})