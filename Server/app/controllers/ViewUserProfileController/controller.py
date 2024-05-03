from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.userProfiles import UserProfiles

class ViewUserProfileController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveProfile(self, profileName):
        profileDesc = UserProfiles.retrieveProfile(profileName)
        return profileDesc

class BaseViewUserProfileController(ViewUserProfileController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewProfileDesc(self):
        if request.method == 'POST':
            data = request.get_json() #get json file
            profileName = data.get("profileName")
            profileDesc = self.retrieveProfile(profileName)
            return profileDesc