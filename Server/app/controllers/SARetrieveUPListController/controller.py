from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.entity.userProfiles import UserProfiles

class SARetrieveUPListController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def retrieveProfileList(self):
        profileList = UserProfiles.retrieveProfileList()
        return profileList

class BaseSARetrieveUPListController(SARetrieveUPListController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getProfileList(self):
        accountList = self.retrieveProfileList()
        return accountList