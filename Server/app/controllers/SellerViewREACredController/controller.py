from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.reaCredentials import REACredentials

class SellerViewREACredController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewREACred(self,username):
        reaCred = REACredentials.retrieveUserCredentials(username)
        return reaCred

class BaseSellerViewREACredController(SellerViewREACredController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getREACred(self, username):
        reaCred = self.viewREACred(username)
        return reaCred