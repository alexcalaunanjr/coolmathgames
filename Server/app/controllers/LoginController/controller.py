from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from app.entity.userProfiles import UserProfiles
from app.entity.account import UserAccount
import json

class LoginController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def sendLoginInfo(self, profile:str, username:str, password:str):
        username = username
        password = password
        profile = profile

        if username and password and profile:
            if UserAccount.verifyLoginInfo(profile, username, password) and UserAccount.checkSuspended(username):
                access_token = create_access_token(identity=username)
                return access_token

    def retrieveProfileList(self):
            #take choices from the database
            user_profiles = UserProfiles.retrieveProfileList()

            return user_profiles

class BaseControllerLogin(LoginController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def login(self):
        if request.method == 'POST':
            data = request.get_json() #get json file
            username = data.get("username")
            password = data.get("password")
            profile = data.get("profile")
            accessToken = self.sendLoginInfo(profile, username, password) #pass values onto sendLoginInfo
            return jsonify({"access_token": accessToken})
        if request.method == 'GET':
            profileList = self.retrieveProfileList()
            return profileList