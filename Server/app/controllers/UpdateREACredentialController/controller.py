from app.entity.reaCredentials import REACredentials
from flask import Blueprint,request
from flask_jwt_extended import jwt_required

# bcrypt = Bcrypt()

class UpdateREAcredentialController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveUserCredentials(self, username:str):
        cred = REACredentials.retrieveUserCredentials(username)
        return cred
    
    #update account
    def updateUserCredentials(self, username:str, fullName:str, email:str, phoneNo:str, experience:str, license:str, language:str, special:str, about:str, award:str):
        if fullName and email and phoneNo and experience and license and language and special and about and award:
            updatedData = {
                'fullName': fullName,
                'email': email,
                'phoneNo': phoneNo,
                'experience': experience,
                'license': license,
                'language': language,
                'special': special,
                'about': about,
                'award': award,
            }
        updateAcc = REACredentials.updateUserCredentials(username, updatedData)
        return updateAcc

class BaseUpdateREAcredentialController(UpdateREAcredentialController):
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

            updateAcc = self.updateUserCredentials(username, fullName, email, phoneNo, experience, license, language, special, about, award)
            return updateAcc
        if request.method == 'GET':
            retrieveCred = self.retrieveUserCredentials(username)
            return retrieveCred
