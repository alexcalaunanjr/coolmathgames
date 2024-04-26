from flask import request, jsonify, Blueprint
from flask_jwt_extended import unset_jwt_cookies

class LogoutController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def logoutUser(self):
        response = jsonify({"logout": True})
        unset_jwt_cookies(response)
        return response

class BaseControllerLogout(LogoutController):
    def logout(self):
        logout = self.logoutUser()
        return logout