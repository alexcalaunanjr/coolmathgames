from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from .controller import UserProfileController

router = Blueprint('userProfile', __name__)

#create user profiles
@router.route('/createUserProfile', methods=['POST'])
@jwt_required()
def createUserProfile():
    controller = UserProfileController()
    if request.method == 'POST':
        data = request.get_json()
        # Extract login credentials from the json file
        newProfile = data.get('newProfile')
        profCreated = controller.createProfile(newProfile)
        return jsonify({"accountCreated": profCreated})
    
#route to return user credentials
@router.route('/userCredentials/<username>', methods=['GET'])
def retrieveCred(username):
    controller = UserProfileController()
    if request.method == 'GET':
        retrieveEmail = controller.retrieveCred(username)
        return retrieveEmail