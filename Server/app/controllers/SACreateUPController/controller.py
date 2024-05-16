from flask import request, jsonify
from flask_bcrypt import Bcrypt
from app.entity.userProfiles import UserProfiles
from flask import Blueprint
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

class SACreateUPController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def createProfile(self, profile:str, description:str):
        createProf = UserProfiles.createProfile(profile, description)
        return createProf

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
            return profCreated