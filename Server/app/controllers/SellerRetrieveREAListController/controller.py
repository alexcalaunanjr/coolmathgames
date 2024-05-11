from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SellerRetrieveREAListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveREAList(self):
        REAList = UserAccount.retrieveREAList()
        return REAList

class BaseSellerRetrieveREAListController(SellerRetrieveREAListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getREAList(self):
        REAList = self.retrieveREAList()
        return REAList