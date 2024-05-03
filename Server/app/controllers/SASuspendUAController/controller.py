from flask import request, Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SASuspendUAController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)
    
    #update account
    def suspendAccount(self, username):
        updateAcc = UserAccount.suspendAccount(username)
        return updateAcc

class BaseSASuspendUAController(SASuspendUAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def suspendUserAccount(self):
        data = request.get_json()
        username = data.get("username")
        updateAcc = self.suspendAccount(username)
        return updateAcc