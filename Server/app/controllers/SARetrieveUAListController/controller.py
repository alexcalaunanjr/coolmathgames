from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SARetrieveUAListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveAccountList(self):
        accountList = UserAccount.retrieveAccountList()
        return accountList

class BaseSARetrieveUAListController(SARetrieveUAListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getAccountList(self):
        accountDict = self.retrieveAccountList()
        return accountDict