from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount
from app.entity.userProfiles import UserProfiles
from flask import request
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
router = Blueprint('userAccount', __name__)

class SACreateUAController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def createAccount(self, name:str, img, username:str, email:str, password:str, phone:str, profile:str):
        createAcc = UserAccount.createAccount(name, img, username, email, password, phone, profile)
        return createAcc

    def retrieveProfileList(self):
        #take choices from the database
        user_profiles = UserProfiles.retrieveProfileList()
        return user_profiles

class BaseSACreateUAController(SACreateUAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def createUserAccount(self):
        if request.method == 'POST':
            data = request.get_json()
            # Extract login account from the json file
            name = data.get('fullName')
            img = data.get('img')
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            phone = data.get('phone')
            profile = data.get('profile')
            accCreated = self.createAccount(name, img, username, email, password, phone, profile)
            return accCreated
        if request.method == 'GET':
            profileList = self.retrieveProfileList()
            return profileList