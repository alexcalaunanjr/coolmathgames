from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.userProfiles import UserProfiles

class SAUpdateUPController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    @classmethod
    def updateProfile(self, profileName, updateData):
        updateProfile = UserProfiles.updateProfile(profileName, updateData)
        return updateProfile
    
    @classmethod
    def retrieveProfile(self, profileName):
        profileRetrieved = UserProfiles.retrieveProfile(profileName)
        return profileRetrieved

class BaseSAUpdateUPController(SAUpdateUPController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateProfileData(self, profileName):
        if request.method == 'POST':
            data = request.get_json()
            updatedProfile = self.updateProfile(profileName, data)
            return updatedProfile
        if request.method == 'GET':
            return self.retrieveProfile(profileName)