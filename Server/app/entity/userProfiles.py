from .sqlAlchemy import db
from flask import jsonify
from app.entity.account import UserAccount

#User profiles table
class UserProfiles(db.Model):
    __tablename__ = 'UserProfiles'
    profile = db.Column(db.String(20), primary_key=True, nullable=False)
    desc = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(10), nullable=False, default='active')

    #retrieve profile list
    @classmethod
    def retrieveProfileList(cls):
        profile = [profile for profile in UserProfiles.query.all()]
        profileDict = [{'profile': profile.profile,
                        'status': profile.status 
                        } for profile in profile]
        return jsonify(profileDict)
    
    #retrieve profile data
    @classmethod
    def retrieveProfile(cls, profileName):
        profile = cls.query.filter_by(profile=profileName).first()
        if profile:
            return jsonify({"profile": profile.profile,
                            "desc": profile.desc})
        else:
            return jsonify({"error": "Profile not found"})
    
    #Retrieve profile information based of search
    @classmethod
    def searchUserProfile(cls, query:str):
        userProfileList = cls.query.filter(cls.profile.like(f"%{query}%")).all()
        userProfileDict = [{
            'profile' : profile.profile,
        } for profile in userProfileList]
        if userProfileDict:
            return jsonify({"userProfile": userProfileDict})
        else:
            return jsonify({"userProfile": "Not Found"})

    #update profile
    @classmethod
    def updateProfile(cls, profileName, updatedData):
        print("Updated data:", updatedData)
        profile = cls.query.filter_by(profile=profileName).first()
        if profile:
            profile.profile = updatedData['profile']
            profile.desc = updatedData['description']
            db.session.commit()
            return jsonify({"updatedProfile" : True})
        else:
            return jsonify({"updatedProfile" : False})
    
    #suspend a user account
    @classmethod
    def suspendProfile(cls, profile):
        susProfile = cls.query.filter_by(profile=profile).first()
        if not susProfile:
            return jsonify({'profileSuspended': False})
        else:
            susProfile.status = "suspended"
            susAccount = UserAccount.query.filter(UserAccount.profile == profile).all()
            for account in susAccount:
                account.status = "suspended"
            db.session.commit()
            return jsonify({'profileSuspended': True})

    #Create new user profile
    @classmethod
    def createProfile(self, profile:str, description:str):
        newProfile = UserProfiles(
            profile=profile,
            desc=description
        )
        if newProfile:
            db.session.add(newProfile)
            db.session.commit()
            return jsonify({'profileCreated': True})
        else:
            return jsonify({'profileCreated': False})
