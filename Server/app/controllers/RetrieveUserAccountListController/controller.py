from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class RetrieveUserAccountListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveAccountList(self):
        accountList = UserAccount.retrieveAccountList()
        return accountList

class BaseRetrieveUserAccountListController(RetrieveUserAccountListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getAccountList(self):
        accountList = self.retrieveAccountList()
        return accountList