from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.userProfiles import UserProfiles

class UpdateUserProfileController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    @classmethod
    def updateProfile(self, profileName, updateData):
        updateProfile = UserProfiles.updateProfile(profileName, updateData)
        return updateProfile

class BaseUpdateUserProfileController(UpdateUserProfileController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateProfileData(self):
        if request.method == 'POST':
            data = request.get_json()
            profileName = data.get("profileName")
            updateData = data.get("updatedData")
            updatedProfile = self.updateProfile(profileName, updateData)
            return updatedProfile