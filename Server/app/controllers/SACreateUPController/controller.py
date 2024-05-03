from flask import request, jsonify
from flask_bcrypt import Bcrypt
from app.entity.account import UserAccount
from app.entity.userProfiles import UserProfiles
from flask import Blueprint
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

class SACreateUPController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def createProfile(self, profile:str, description:str):
        if profile:
            newProfile = UserProfiles(
                profile=profile,
                desc=description
            )
            createProf = UserProfiles.createProfile(newProfile)
        return createProf
    
    def retrieveAccount(self, username):
        if username:
            acc = UserAccount.retrieveUserAccount(username)
        return acc

class BaseSACreateUPController(SACreateUPController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def createUserProfile(self):
        if request.method == 'POST':
            data = request.get_json()
            newProfile = data.get('newProfile')
            newDescription = data.get('newDescription')
            profCreated = self.createProfile(newProfile, newDescription)
            return jsonify({"profileCreated": profCreated})