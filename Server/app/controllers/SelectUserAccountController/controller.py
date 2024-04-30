from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SelectedUserAccountController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveUserAccount(self, username):
        accountList = UserAccount.retrieveUserAccount(username)
        return accountList

class BaseSelectedUserAccountController(SelectedUserAccountController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getUserAccount(self, username):
        account = self.retrieveUserAccount(username)
        return account