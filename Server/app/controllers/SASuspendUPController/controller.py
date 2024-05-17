from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from app.entity.userProfiles import UserProfiles

class SASuspendUPController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    #suspend profile
    def suspendProfile(self, profile):
        updateAcc = UserProfiles.suspendProfile(profile)
        return updateAcc

class BaseSASuspendUPController(SASuspendUPController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def suspendUserProfile(self):
        data = request.get_json()
        username = data.get("profile")
        updateProf = self.suspendProfile(username)
        return updateProf