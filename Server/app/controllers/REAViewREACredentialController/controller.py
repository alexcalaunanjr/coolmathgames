from app.entity.reaCredentials import REACredentials
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required


class REAViewREAcredentialController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveUserCredentials(self, username:str):
        cred = REACredentials.retrieveUserCredentials(username)
        return cred

class BaseREAViewREAcredentialController(REAViewREAcredentialController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewREACredentials(self, username):
        if request.method == 'GET':
            retrieveCred = self.retrieveUserCredentials(username)
            return jsonify({'cred': retrieveCred.get_json()})