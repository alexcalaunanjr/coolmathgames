from flask import request, jsonify
from flask_bcrypt import Bcrypt
from app.entity.account import UserAccount
from app.entity.userProfiles import UserProfiles
from flask import Blueprint
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

class CreateUserProfileController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def createProfile(self, profile:str):
        if profile:
            newProfile = UserProfiles(
                profile=profile
            )
            createProf = UserProfiles.createProfile(newProfile)
        return createProf
    
    def retrieveCred(self, username):
        if username:
            cred = UserAccount.retrieveCred(username)
        return cred

class BaseCreateUserProfileController(CreateUserProfileController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def createUserProfile(self):
        if request.method == 'POST':
            data = request.get_json()
            newProfile = data.get('newProfile')
            profCreated = self.createProfile(newProfile)
            return jsonify({"profileCreated": profCreated})