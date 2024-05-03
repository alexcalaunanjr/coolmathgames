from app.entity.reaCredentials import REACredentials
from flask import Blueprint,request,jsonify
from app.entity.account import UserAccount
from flask_jwt_extended import jwt_required

# bcrypt = Bcrypt()

class REAUpdateREAcredentialController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveUserAccount(self, username:str):
        account = UserAccount.retrieveUserAccount(username)
        return account
    
    def retrieveUserCredentials(self, username:str):
        cred = REACredentials.retrieveUserCredentials(username)
        return cred
    
    #update account
    def updateUserCredentials(self, username:str, experience:str, license:str, language:str, special:str, about:str, award:str):
        if experience and license and language and special and about and award:
            updatedData = {
                'experience': experience,
                'license': license,
                'language': language,
                'special': special,
                'about': about,
                'award': award,
            }
        updateAcc = REACredentials.updateUserCredentials(username, updatedData)
        return updateAcc
    
    def updateAccount(self, username:str, name:str, email:str, phone:str):
        if name and email and phone:
            updatedData = {
                'fullName': name,
                'email': email,
                'phoneNo': phone,
            }
        updateAcc = UserAccount.updateAccount(username, updatedData)
        return updateAcc

class BaseREAUpdateREAcredentialController(REAUpdateREAcredentialController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateREACredentials(self, username):
        if request.method == 'POST':
            data = request.get_json()

            fullName = data.get("fullName")
            email = data.get("email")
            phoneNo = data.get("phoneNo")
            experience = data.get("experience")
            license = data.get("license")
            language = data.get("language")
            special = data.get("special")
            about = data.get("about")
            award = data.get("award")

            updateCred = self.updateUserCredentials(username, experience, license, language, special, about, award)
            updateAcc = self.updateAccount(username, fullName, email, phoneNo)
            update = updateCred and updateAcc
            return update
        if request.method == 'GET':
            retrieveAccount = self.retrieveUserAccount(username)
            retrieveCred = self.retrieveUserCredentials(username)
            return jsonify({'account': retrieveAccount.get_json(),
                        'cred': retrieveCred.get_json()})
