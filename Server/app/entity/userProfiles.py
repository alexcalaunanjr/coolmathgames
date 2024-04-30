from .sqlAlchemy import db
from flask import jsonify
from app.entity.account import UserAccount

#User profiles table
class UserProfiles(db.Model):
    __tablename__ = 'UserProfiles'
    profile = db.Column(db.String(20), primary_key=True, nullable=False)
    desc = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(10), nullable=False, default='active')

    #Retrieve user list
    @classmethod
    def retrieveActiveProfileList(cls):
        activeProfile = [profile.profile for profile in UserProfiles.query.filter_by(status='active').all()]
        return activeProfile

    #retrieve profile name list
    @classmethod
    def retrieveProfileList(cls):
        profileList = cls.query.all()
        profileDict = [{'profile': profile.profile,
                        'description': profile.desc,
                        'status': profile.status 
                        } for profile in profileList]
        return jsonify({"profileNames": profileDict})
    
    #retrieve profile data
    @classmethod
    def retrieveProfile(cls, profileName):
        profile = cls.query.filter_by(profile=profileName).first()
        if profile:
            return jsonify({"profile": profile.profile,
                            "desc": profile.desc})
    
    #retrieve profile desc
    @classmethod
    def retrieveProfileDesc(cls, profileName):
        profile = cls.query.filter_by(profile=profileName).first()
        if profile:
            return jsonify({"description": profile.desc})
        else:
            return jsonify({"error": "Profile not found"})

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
            return jsonify({'message': 'profile not Suspended'}), 404
        else:
            susProfile.status = "suspended"
            susAccount = UserAccount.query.filter(UserAccount.profile == profile).all()
            for account in susAccount:
                account.status = "suspended"
            db.session.commit()
            return jsonify({'profileSuspended': True})

    #Create new user profile
    @classmethod
    def createProfile(self, newProfile):
        db.session.add(newProfile)
        db.session.commit()
        return True
