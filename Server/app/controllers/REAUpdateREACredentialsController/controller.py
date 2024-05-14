from app.entity.reaCredentials import REACredentials
from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required

# bcrypt = Bcrypt()

class REAUpdateREAcredentialsController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def retrieveUserCredentials(self, username:str):
        cred = REACredentials.retrieveUserCredentials(username)
        return cred
    
    #update account
    def updateUserCredentials(self, username:str, REAImage:str, experience:str, license:str, language:str, service:str, about:str, award:str, fullName:str, email:str, phone:str):
        if experience and license and language and service and about and award:
            updatedData = {
                'experience': experience,
                'REAImage':REAImage,
                'license': license,
                'language': language,
                'service': service,
                'about': about,
                'award': award,
                'fullName': fullName,
                'email': email,
                'phoneNo': phone,
            }
        updateAcc = REACredentials.updateUserCredentials(username, updatedData)
        return updateAcc

class BaseREAUpdateREAcredentialsController(REAUpdateREAcredentialsController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def updateREACredentials(self, username):
        if request.method == 'POST':
            data = request.get_json()

            fullName = data.get("fullName")
            REAImage = data.get("REAImage")
            email = data.get("email")
            phoneNo = data.get("phoneNo")
            experience = data.get("experience")
            license = data.get("license")
            language = data.get("language")
            service = data.get("service")
            about = data.get("about")
            award = data.get("award")

            updateCred = self.updateUserCredentials(username, REAImage, experience, license, language, service, about, award, fullName, email, phoneNo)
            update = updateCred
            return update
        if request.method == 'GET':
            retrieveCred = self.retrieveUserCredentials(username)
            return retrieveCred
