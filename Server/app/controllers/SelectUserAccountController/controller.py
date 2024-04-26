from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SelectedUserAccountController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveUserCredentials(self, username):
        accountList = UserAccount.retrieveUserCredentials(username)
        return accountList

class BaseSelectedUserAccountController(SelectedUserAccountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getUserCredential(self, username):
        accountCreds = self.retrieveUserCredentials(username)
        return accountCreds