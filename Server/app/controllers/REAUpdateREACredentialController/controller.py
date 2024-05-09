from app.entity.reaCredentials import REACredentials
from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required

# bcrypt = Bcrypt()

class REAUpdateREAcredentialController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def retrieveUserCredentials(self, username:str):
        cred = REACredentials.retrieveUserCredentials(username)
        return cred
    
    #update account
    def updateUserCredentials(self, username:str, reaImage:str, experience:str, license:str, language:str, special:str, about:str, award:str, fullName:str, email:str, phone:str):
        if experience and license and language and special and about and award:
            updatedData = {
                'experience': experience,
                'reaImage':reaImage,
                'license': license,
                'language': language,
                'special': special,
                'about': about,
                'award': award,
                'fullName': fullName,
                'email': email,
                'phoneNo': phone,
            }
        updateAcc = REACredentials.updateUserCredentials(username, updatedData)
        return updateAcc

class BaseREAUpdateREAcredentialController(REAUpdateREAcredentialController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateREACredentials(self, username):
        if request.method == 'POST':
            data = request.get_json()

            fullName = data.get("fullName")
            reaImage = data.get("reaImage")
            email = data.get("email")
            phoneNo = data.get("phoneNo")
            experience = data.get("experience")
            license = data.get("license")
            language = data.get("language")
            special = data.get("special")
            about = data.get("about")
            award = data.get("award")

            updateCred = self.updateUserCredentials(username, reaImage, experience, license, language, special, about, award, fullName, email, phoneNo)
            update = updateCred
            return update
        if request.method == 'GET':
            retrieveCred = self.retrieveUserCredentials(username)
            return retrieveCred
