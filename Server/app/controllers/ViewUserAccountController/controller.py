from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class ViewUserAccountController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveUserAccount(self, username):
        account = UserAccount.retrieveUserAccount(username)
        return account

class BaseViewUserAccountController(ViewUserAccountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def viewUserAccount(self, username):
        account = self.retrieveUserAccount(username)
        return account