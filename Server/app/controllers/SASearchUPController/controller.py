from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.userProfiles import UserProfiles

class SASearchUPController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchUserProfiles(self, query:str):
        searchUP = UserProfiles.searchUserProfile(query) #query based of search keywords
        return searchUP

class BaseSASearchUPController(SASearchUPController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def query(self):
        data = request.get_json()
        query = data.get('query')
        searchUP = self.searchUserProfiles(query)
        return searchUP