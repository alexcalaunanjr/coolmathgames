from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.reaCredentials import REACredentials

class BuyerViewREACredentialsController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveUserCredentials(self,username):
        reaCred = REACredentials.retrieveUserCredentials(username)
        return reaCred

class BaseBuyerViewREACredentialsController(BuyerViewREACredentialsController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getREACred(self, username):
        reaCred = self.retrieveUserCredentials(username)
        return reaCred