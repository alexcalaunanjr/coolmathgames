from app.entity.reaCredentials import REACredentials
from flask import Blueprint, request
from flask_jwt_extended import jwt_required


class ViewREAcredentialController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def retrieveUserCredentials(self, username:str):
        cred = REACredentials.retrieveUserCredentials(username)
        return cred

class BaseViewREAcredentialController(ViewREAcredentialController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewREACredentials(self, username):
        if request.method == 'POST':
            retrieveCred = self.retrieveUserCredentials(username)
            return retrieveCred