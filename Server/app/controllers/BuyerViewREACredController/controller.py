from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.reaCredentials import REACredentials

class BuyerViewREACredController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def viewREACred(self,username):
        reaCred = REACredentials.retrieveUserCredentials(username)
        return reaCred

class BaseBuyerViewREACredController(BuyerViewREACredController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getREACred(self, username):
        reaCred = self.viewREACred(username)
        return reaCred