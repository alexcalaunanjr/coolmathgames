from flask import jsonify
from flask_jwt_extended import unset_jwt_cookies
from flask_login import logout_user

class LogoutController():
    def logoutUser(self):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response