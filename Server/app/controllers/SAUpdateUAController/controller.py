from flask import request, Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount
from app.entity.userProfiles import UserProfiles

class SAUpdateUAController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveProfileList(self):
        user_profiles = UserProfiles.retrieveProfileList()
        # return user_profiles
        return jsonify(user_profiles)

    def retrieveUserAccount(self, username):
        account = UserAccount.retrieveUserAccount(username)
        return account
    
    #update account
    def updateAccount(self, oldUsername:str, name:str, newUsername:str, email:str, password:str, phone:str, profile:str, profileImage:str):
        if name and newUsername and password and email and phone and profile:
            updatedData = {
                'fullName': name,
                'username': newUsername,
                'email': email,
                'password': password,
                'phoneNo': phone,
                'profile': profile,
                'profileImage':profileImage
            }
        updateAcc = UserAccount.updateAccount(oldUsername, updatedData)
        return updateAcc
        

class BaseSAUpdateUAController(SAUpdateUAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateUserAccount(self, oldUsername):
        if request.method == 'POST':
            data = request.get_json()
            fullName = data.get("fullName")
            newUsername = data.get("username")
            email = data.get("email")
            password = data.get("password")
            phone = data.get("phone")
            profile = data.get("profile")
            profileImage = data.get("profileImage")
            updateAcc = self.updateAccount(oldUsername, fullName, newUsername, email, password, phone, profile, profileImage)
            return updateAcc
        if request.method == 'GET':
            account =  self.retrieveUserAccount(oldUsername)
            user_profiles = self.retrieveProfileList()
            return jsonify({'account': account.get_json(),
                        'user_profiles': user_profiles.get_json()})