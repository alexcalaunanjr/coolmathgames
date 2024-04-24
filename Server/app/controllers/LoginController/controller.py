from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.entity.userProfiles import UserProfiles
from app.entity.account import Account

class LoginController():
    def sendLoginInfo(self, profile:str, username:str, password:str):
        username = username
        password = password
        profile = profile

        if username and password and profile:
            if Account.verifyLoginInfo(profile, username, password):
                access_token = create_access_token(identity=username)
                return access_token
    def retrieveProfileList(self):
            #take choices from the database
            user_profiles = UserProfiles.retrieveProfileList()
            # Add System Admin (REMOVE THIS LATER)
            user_profiles.insert(0, 'System Admin')
            return jsonify({'user_profiles': user_profiles})