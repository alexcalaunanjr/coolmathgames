from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_
from app.entity.favorite import Favorite

class PropertyListing(db.Model):
    __tablename__ = 'PropertyListing'
    id = db.Column(db.Integer, primary_key=True)
    property = db.Column(db.String(50), db.ForeignKey('Properties.propertyName', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    ownerSeller = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    REA = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    sold = db.Column(db.Boolean, nullable=False)
    viewsCount = db.Column(db.Integer, nullable=False)
    property_obj = db.relationship("Properties", backref="listings")
    REA_account = db.relationship("UserAccount", foreign_keys=[REA], backref="property_listings_REA")

    #Retrieve information on every new property
    @classmethod
    def retrieveNewProperties(cls):
        newProperties = cls.query.filter_by(sold=False).all()
        propertiesDict = []
        for listing in newProperties:
            REAInfo = listing.REA_account
            propertyDict = {
                'RealEstateAgent': listing.REA_account.fullName,
                'AgentUsername': listing.REA,
                'REAImage': REAInfo.profileImage,
                'propertyName': listing.property,
                'propertyImage': listing.property_obj.propertyImage,
                'price': listing.property_obj.price,
                'location': listing.property_obj.location,
                'aboutProperty': listing.property_obj.aboutProperty,
                'noOfBedrooms': listing.property_obj.noOfBedrooms,
                'noOfBathrooms': listing.property_obj.noOfBathrooms,
                'area': listing.property_obj.area,
                'unitFeatures': listing.property_obj.unitFeatures,
                'facilities': listing.property_obj.facilities,
                'viewsCount': listing.viewsCount,
                'sold': listing.sold
            }
            propertiesDict.append(propertyDict)
        if propertiesDict:
            return jsonify({"properties": propertiesDict})
        else:
            return jsonify({"properties": "Not Found"})
        
    #Retrieve information on every new property
    @classmethod
    def retrieveSoldProperties(cls):
        soldProperties = cls.query.filter_by(sold=True).all()
        propertiesDict = []
        for listing in soldProperties:
            REAInfo = listing.REA_account
            propertyDict = {
                'RealEstateAgent': listing.REA_account.fullName,
                'AgentUsername': listing.REA,
                'REAImage': REAInfo.profileImage,
                'propertyName': listing.property,
                'propertyImage': listing.property_obj.propertyImage,
                'price': listing.property_obj.price,
                'location': listing.property_obj.location,
                'aboutProperty': listing.property_obj.aboutProperty,
                'noOfBedrooms': listing.property_obj.noOfBedrooms,
                'noOfBathrooms': listing.property_obj.noOfBathrooms,
                'area': listing.property_obj.area,
                'unitFeatures': listing.property_obj.unitFeatures,
                'facilities': listing.property_obj.facilities,
                'viewsCount': listing.viewsCount,
                # 'favoritesCount': listing.favoritesCount,
                'sold': listing.sold
            }
            propertiesDict.append(propertyDict)
        if propertiesDict:
            return jsonify({"properties": propertiesDict})
        else:
            return jsonify({"properties": "Not Found"})

    #function to return a seller's owned properties and all its information
    @classmethod
    def retrieveMyProperties(cls, username):
        sellerPropertiesList = cls.query.filter_by(ownerSeller=username).all()
        sellerPropertiesDict = []
        for listing in sellerPropertiesList:
            REAInfo = listing.REA_account
            sellerPropertyDict = {
                'RealEstateAgent': listing.REA_account.fullName,
                'AgentUsername': listing.REA,
                'REAImage': REAInfo.profileImage,
                'propertyName': listing.property,
                'propertyImage': listing.property_obj.propertyImage,
                'price': listing.property_obj.price,
                'location': listing.property_obj.location,
                'aboutProperty': listing.property_obj.aboutProperty,
                'noOfBedrooms': listing.property_obj.noOfBedrooms,
                'noOfBathrooms': listing.property_obj.noOfBathrooms,
                'area': listing.property_obj.area,
                'unitFeatures': listing.property_obj.unitFeatures,
                'facilities': listing.property_obj.facilities,
                'viewsCount': listing.viewsCount,
                'sold': listing.sold
            }
            sellerPropertiesDict.append(sellerPropertyDict)
        return jsonify({"sellerProperties": sellerPropertiesDict})

    #Retrieve new Property information based of search
    @classmethod
    def searchNewListings(cls, queryNew):
        propertyListings = cls.query.filter(and_(cls.property.like(f"%{queryNew}%"), cls.sold==False)).all()
        propertiesDict = []
        for listing in propertyListings:
            REAInfo = listing.REA_account
            propertyListingsDict = {
                'RealEstateAgent': listing.REA_account.fullName,
                'AgentUsername': listing.REA,
                'REAImage': REAInfo.profileImage,
                'propertyName': listing.property,
                'propertyImage': listing.property_obj.propertyImage,
                'price': listing.property_obj.price,
                'location': listing.property_obj.location,
                'aboutProperty': listing.property_obj.aboutProperty,
                'noOfBedrooms': listing.property_obj.noOfBedrooms,
                'noOfBathrooms': listing.property_obj.noOfBathrooms,
                'area': listing.property_obj.area,
                'unitFeatures': listing.property_obj.unitFeatures,
                'facilities': listing.property_obj.facilities,
                'viewsCount': listing.viewsCount,
                'sold': listing.sold
            }
            propertiesDict.append(propertyListingsDict)
        if propertiesDict:
            return jsonify({"properties": propertiesDict})
        else:
            return jsonify({"properties": "Not Found"})

    #Retrieve sold Property information based of search
    @classmethod
    def searchSoldListings(cls, querySold):
        propertyListings = cls.query.filter(and_(cls.property.like(f"%{querySold}%"), cls.sold==True)).all()
        propertiesDict = []
        for listing in propertyListings:
            REAInfo = listing.REA_account
            propertyListingsDict = {
                'RealEstateAgent': listing.REA_account.fullName,
                'AgentUsername': listing.REA,
                'REAImage': REAInfo.profileImage,
                'propertyName': listing.property,
                'propertyImage': listing.property_obj.propertyImage,
                'price': listing.property_obj.price,
                'location': listing.property_obj.location,
                'aboutProperty': listing.property_obj.aboutProperty,
                'noOfBedrooms': listing.property_obj.noOfBedrooms,
                'noOfBathrooms': listing.property_obj.noOfBathrooms,
                'area': listing.property_obj.area,
                'unitFeatures': listing.property_obj.unitFeatures,
                'facilities': listing.property_obj.facilities,
                'viewsCount': listing.viewsCount,
                'sold': listing.sold
            }
            propertiesDict.append(propertyListingsDict)
        if propertiesDict:
            return jsonify({"properties": propertiesDict})
        else:
            return jsonify({"properties": "Not Found"})
    
    #Retrieve information for a single new property
    @classmethod
    def viewNewProperty(cls, propertyName:str, username:str):
        newProperty = cls.query.filter(and_(cls.property==propertyName, cls.sold==False)).first()
        cls.increaseViewCount(propertyName)
        if newProperty:
            REAInfo = newProperty.REA_account
            isFavorited = Favorite.query.filter_by(property=propertyName, buyer=username).first() is not None
            property = jsonify({
                'RealEstateAgent': newProperty.REA_account.fullName,
                'AgentUsername': newProperty.REA,
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
                'favorited': isFavorited,
                'sold': newProperty.sold
            })
            return property
        else:
            return jsonify({"Property": "Not Found"})
    
    #Retrieve information for a single old property
    @classmethod
    def viewSoldProperty(cls, propertyName:str, username:str):
        oldProperty = cls.query.filter(and_(cls.property==propertyName, cls.sold==True)).first()
        cls.increaseViewCount(propertyName)
        if oldProperty:
            REAInfo = oldProperty.REA_account
            isFavorited = Favorite.query.filter_by(property=propertyName, buyer=username).first() is not None
            property = jsonify({
                'RealEstateAgent': oldProperty.REA_account.fullName,
                'AgentUsername': oldProperty.REA,
                'REAImage': REAInfo.profileImage,
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
                'favorited': isFavorited,
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
        
    #increase View Count
    @classmethod
    def increaseViewCount(cls, propertyName):
        property = cls.query.filter(cls.property==propertyName).first()
        if property:
            property.viewsCount += 1
            db.session.commit()
            return jsonify({"ViewCountIncrease": True})
        else:
            return jsonify({"ViewCountIncrease": False})

    # ---- REAL ESTATE AGENT ----
    #create my property
    @classmethod
    def createListing(self, newListing):
        if newListing:
            db.session.add(newListing)
            db.session.commit()
            return True
        else:
            return False
    
    #return rea's owned listing list
    @classmethod
    def retrieveREAListingList(cls, username):
        REAListingList = cls.query.filter_by(REA=username).all()
        REAListingListDict = [{
            'RealEstateAgent': listings.REA_account.fullName,
            'AgentUsername': listings.REA,
            'REAImage': listings.REA_account.profileImage,
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
                'RealEstateAgent': REAListing.REA_account.fullName,
                'AgentUsername': REAListing.REA,
                'REAImage': REAListing.REA_account.profileImage,
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
            return jsonify({'reaListingUpdated': True})
        
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
            'RealEstateAgent': listings.REA_account.fullName,
            'AgentUsername': listings.REA,
            'REAImage': listings.REA_account.profileImage,
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
            # 'favoritesCount': listings.favoritesCount,
            'sold': listings.sold
        } for listings in propertyListings]
        if propertyListingsDict:
            return jsonify({"properties": propertyListingsDict})
        else:
            return jsonify({"properties": "Not Found"})