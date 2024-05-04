from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SASearchUAController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchUserAccount(self, query):
        searchUA = UserAccount.searchUserAccount(query) #query based of search keywords
        return searchUA

class BaseSASearchUAController(SASearchUAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def query(self):
        data = request.get_json()
        query = data.get('query')
        searchUA = self.searchUserAccount(query)
        return searchUA