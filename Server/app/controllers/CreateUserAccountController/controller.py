from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import Account
from app.entity.userProfiles import UserProfiles
from flask import request, jsonify
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
router = Blueprint('userAccount', __name__)

#Create User Acc
@router.route('/createUserAccount', methods=['GET', 'POST'])
@jwt_required()
def createUserAccount():
    if request.method == 'POST':
        data = request.get_json()
        # Extract login credentials from the json file
        name = data.get('fullName')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        phone = data.get('phone')
        profile = data.get('profile')
        accCreated = createAccount(name, username, email, password, phone, profile)
        return jsonify({"accountCreated": accCreated})
    if request.method == 'GET':
        profileList = retrieveProfileList()
        return profileList
    
def createAccount(name:str, username:str, email:str, password:str, phone:str, profile:str):
        if name and username and password and email and phone and profile:
            hashedPw = bcrypt.generate_password_hash(password)
            newUser = Account(
                profile=profile,
                fullName=name, 
                username=username, 
                password=hashedPw, 
                email=email,
                phoneNo=phone,
            )
            createAcc = Account.createAccount(newUser)
        return createAcc

def retrieveProfileList():
    if request.method == 'GET':
        #take choices from the database
        user_profiles = UserProfiles.retrieveProfileList()
        # Add System Admin (REMOVE THIS LATER)
        user_profiles.insert(0, 'System Admin')
        return jsonify({'user_profiles': user_profiles})