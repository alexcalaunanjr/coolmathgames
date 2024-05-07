from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_

class PropertyListing(db.Model):
    __tablename__ = 'PropertyListing'
    id = db.Column(db.Integer, primary_key=True)
    property = db.Column(db.String(50), db.ForeignKey('Properties.propertyName', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    ownerSeller = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    REA = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    sold = db.Column(db.Boolean, nullable=False)
    viewsCount = db.Column(db.Integer, nullable=False)
    favoritesCount = db.Column(db.Integer, nullable=False) 
    property_obj = db.relationship("Properties", backref="listings")
    REA_account = db.relationship("UserAccount", foreign_keys=[REA], backref="property_listings_REA")

    #Retrieve information on every new property
    @classmethod
    def retrieveNewProperties(cls):
        properties = cls.query.filter_by(sold=False).all()
        propertiesDict = [{
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
            'viewsCount': listings.viewsCount,
            'favoritesCount': listings.favoritesCount,
            'sold': listings.sold
        } for listings in properties]
        if propertiesDict:
            return jsonify({"properties": propertiesDict})
        else:
            return jsonify({"properties": "Not Found"})
        
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
            'viewsCount': listings.viewsCount,
            'favoritesCount': listings.favoritesCount,
            'sold': listings.sold
        } for listings in sellerPropertiesList]
        return jsonify({"sellerProperties": sellerPropertiesDict})

    #Retrieve new Property information based of search
    @classmethod
    def searchNewListings(cls, queryNew):
        propertyListings = cls.query.filter(and_(cls.property.like(f"%{queryNew}%"), cls.sold==False)).all()
        propertyListingsDict = [{
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
            'viewsCount': listings.viewsCount,
            'favoritesCount': listings.favoritesCount,
            'sold': listings.sold
        } for listings in propertyListings]
        if propertyListingsDict:
            return jsonify({"properties": propertyListingsDict})
        else:
            return jsonify({"properties": "Not Found"})
    
    #Retrieve sold Property information based of search
    @classmethod
    def searchSoldListings(cls, querySold):
        propertyListings = cls.query.filter(and_(cls.property.like(f"%{querySold}%"), cls.sold==True)).all()
        propertyListingsDict = [{
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
            'viewsCount': listings.viewsCount,
            'favoritesCount': listings.favoritesCount,
            'sold': listings.sold
        } for listings in propertyListings]
        if propertyListingsDict:
            return jsonify({"properties": propertyListingsDict})
        else:
            return jsonify({"properties": "Not Found"})
    
    #Retrieve information for a single new property
    @classmethod
    def viewNewProperty(cls, propertyName:str):
        newProperty = cls.query.filter(and_(cls.property==propertyName, cls.sold==False)).first()
        if newProperty:
            REAInfo = newProperty.REA_account
            property = jsonify({
                'RealEstateAgent': newProperty.REA,
                'REAImage': REAInfo.profileImage,
                'propertyName': newProperty.property,
                'propertyImage': newProperty.property_obj.propertyImage,
                'price': newProperty.property_obj.price,
                'location': newProperty.property_obj.location,
                'aboutProperty': newProperty.property_obj.aboutProperty,
                'noOfBedrooms': newProperty.property_obj.noOfBedrooms,
                'noOfBathrooms': newProperty.property_obj.noOfBathrooms,
                'area': newProperty.property_obj.area,
                'unitFeatures': newProperty.property_obj.unitFeatures,
                'facilities': newProperty.property_obj.facilities,
                'viewsCount': newProperty.viewsCount,
                'favoritesCount': newProperty.favoritesCount,
                'sold': newProperty.sold
            })
            return property
        else:
            return jsonify({"Property": "Not Found"})
    
    #Retrieve information for a single old property
    @classmethod
    def viewSoldProperty(cls, propertyName:str):
        oldProperty = cls.query.filter(and_(cls.property==propertyName, cls.sold==True)).first()
        if oldProperty:
            property = jsonify({
                'RealEstateAgent': oldProperty.REA,
                'propertyName': oldProperty.property,
                'propertyImage': oldProperty.property_obj.propertyImage,
                'price': oldProperty.property_obj.price,
                'location': oldProperty.property_obj.location,
                'aboutProperty': oldProperty.property_obj.aboutProperty,
                'noOfBedrooms': oldProperty.property_obj.noOfBedrooms,
                'noOfBathrooms': oldProperty.property_obj.noOfBathrooms,
                'area': oldProperty.property_obj.area,
                'unitFeatures': oldProperty.property_obj.unitFeatures,
                'facilities': oldProperty.property_obj.facilities,
                'viewsCount': oldProperty.viewsCount,
                'favoritesCount': oldProperty.favoritesCount,
                'sold': oldProperty.sold
            })
            return property
        else:
            return jsonify({"Property": "Not Found"})
    
    #view View Count
    @classmethod
    def viewViewCount(cls, propertyName:str):
        property = cls.query.filter(cls.property==propertyName).first()
        if property:
            property = jsonify({
                'viewsCount': property.viewsCount
            })
            return property
        else:
            return jsonify({"View Count": "Not Found"})

    # ---- REAL ESTATE AGENT ----
    #create my property
    @classmethod
    def createListing(self, newListing):
        db.session.add(newListing)
        db.session.commit()
        return True
    
    #return rea's owned listing list
    @classmethod
    def retrieveREAListingList(cls, username):
        REAListingList = cls.query.filter_by(REA=username).all()
        REAListingListDict = [{
            'RealEstateAgent': listings.REA,
            'propertyImage' : listings.property_obj.propertyImage,
            'propertyName': listings.property,
            'price': listings.property_obj.price,
            'location': listings.property_obj.location,
            'noOfBedrooms': listings.property_obj.noOfBedrooms,
            'noOfBathrooms': listings.property_obj.noOfBathrooms,
            'area': listings.property_obj.area,
        } for listings in REAListingList]
        return jsonify({"REAListingList": REAListingListDict})
    
    #view rea's owned listing
    @classmethod
    def retrieveListing(cls, propertyName):
        REAListing = cls.query.filter_by(property=propertyName).first()
        if REAListing:
            property = jsonify({
                'RealEstateAgent': REAListing.REA,
                'propertyName': REAListing.property,
                'propertyImage': REAListing.property_obj.propertyImage,
                'price': REAListing.property_obj.price,
                'location': REAListing.property_obj.location,
                'aboutProperty': REAListing.property_obj.aboutProperty,
                'noOfBedrooms': REAListing.property_obj.noOfBedrooms,
                'noOfBathrooms': REAListing.property_obj.noOfBathrooms,
                'area': REAListing.property_obj.area,
                'unitFeatures': REAListing.property_obj.unitFeatures,
                'facilities': REAListing.property_obj.facilities,
                'viewsCount': REAListing.viewsCount,
                'favoritesCount': REAListing.favoritesCount,
                'sold': REAListing.sold
            })
            return property
        else:
            return jsonify({"Property": "Not Found"})
        
    #update property
    @classmethod
    def updateListing(cls, propertyName, updatedPropertyDetails):
        listing = cls.query.filter_by(property=propertyName).first()
        
        if listing:
            if 'propertyImage' in updatedPropertyDetails:  
                listing.property_obj.propertyImage = updatedPropertyDetails['propertyImage']
            if 'price' in updatedPropertyDetails:    
                listing.property_obj.price = updatedPropertyDetails['price']
            if 'location' in updatedPropertyDetails:    
                listing.property_obj.location = updatedPropertyDetails['location']
            if 'aboutProperty' in updatedPropertyDetails:    
                listing.property_obj.aboutProperty = updatedPropertyDetails['aboutProperty']
            if 'noOfBedrooms' in updatedPropertyDetails:    
                listing.property_obj.noOfBedrooms = updatedPropertyDetails['noOfBedrooms']
            if 'noOfBathrooms' in updatedPropertyDetails: 
                listing.property_obj.noOfBathrooms = updatedPropertyDetails['noOfBathrooms']   
            if 'area' in updatedPropertyDetails:    
                listing.property_obj.area = updatedPropertyDetails['area']
            if 'unitFeatures' in updatedPropertyDetails:    
                listing.property_obj.unitFeatures = updatedPropertyDetails['unitFeatures']
            if 'facilities' in updatedPropertyDetails:    
                listing.property_obj.facilities = updatedPropertyDetails['facilities']
            if 'sold' in updatedPropertyDetails:    
                listing.sold = updatedPropertyDetails['sold']
            if 'property' in updatedPropertyDetails:
                listing.property_obj.propertyName = updatedPropertyDetails['property']

            db.session.commit()
            return jsonify({'reaListingUpdated': updatedPropertyDetails})
        
        else:
            return jsonify({'reaListingUpdated': False})
        
    #delete listing
    @classmethod
    def deleteListing(self, listing):
        PropertyListing.query.filter_by(property=listing).delete()
        db.session.commit()
        return True

    #Retrieve Property information based of search
    @classmethod
    def searchListings(cls, query, username):
        propertyListings = cls.query.filter(and_(cls.property.like(f"%{query}%"), cls.REA==username)).all()
        propertyListingsDict = [{
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
            'viewsCount': listings.viewsCount,
            'favoritesCount': listings.favoritesCount,
            'sold': listings.sold
        } for listings in propertyListings]
        if propertyListingsDict:
            return jsonify({"properties": propertyListingsDict})
        else:
            return jsonify({"properties": "Not Found"})