from flask import request, jsonify
from flask_bcrypt import Bcrypt
from app.entity.account import Account
from app.entity.userProfiles import UserProfiles

bcrypt = Bcrypt()

class UserProfileController:
    def createProfile(self, profile:str):
        if profile:
            newProfile = UserProfiles(
                profile=profile
            )
            createProf = UserProfiles.createProfile(newProfile)
        return createProf
    def retrieveCred(self, username):
        if username:
            cred = Account.retrieveCred(username)
        return cred