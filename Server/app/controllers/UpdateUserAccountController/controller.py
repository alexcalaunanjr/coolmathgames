from flask import request, Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class UpdateUserAccountController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveUserCredentials(self, username):
        accountList = UserAccount.retrieveUserCredentials(username)
        return accountList
    
    #update account
    def updateAccount(self, oldUsername:str, name:str, newUsername:str, email:str, password:str, phone:str, profile:str):
        oldUsername = oldUsername
        if name and newUsername and password and email and phone and profile:
            updatedData = {
                'fullName': name,
                'username': newUsername,
                'email': email,
                'password': password,
                'phoneNo': phone,
                'profile': profile
            }
        updateAcc = UserAccount.updateAccount(oldUsername, updatedData)
        return updateAcc
        

class BaseUpdateUserAccountController(UpdateUserAccountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateUserAccount(self, oldUsername):
        data = request.get_json()
        fullName = data.get("fullName")
        newUsername = data.get("username")
        email = data.get("email")
        password = data.get("password")
        phone = data.get("phone")
        profile = data.get("profile")
        updateAcc = self.updateAccount(oldUsername, fullName, newUsername, email, password, phone, profile)
        return updateAcc