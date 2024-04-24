from flask import request, jsonify, Blueprint
from .controller import LoginController

router = Blueprint('login', __name__)
    
@router.route('/login', methods=['GET', 'POST'])
def login():
    controller = LoginController() #get login controller
    if request.method == 'POST':
        data = request.get_json() #get json file
        username = data.get("username")
        password = data.get("password")
        profile = data.get("profile")
        accessToken = controller.sendLoginInfo(profile, username, password) #pass values onto sendLoginInfo
        return jsonify({"access_token": accessToken})
    if request.method == 'GET':
        profileList = controller.retrieveProfileList()
        return profileList



