from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.entity.account import UserAccount

class SellerSearchREAController(Blueprint):
    def __init__(self, *args, **kwargs):
         super().__init__(*args, **kwargs)

    def searchREA(self, query):
        searchREA = UserAccount.searchREA(query) #query based of search keywords
        return searchREA

class BaseSellerSearchREAController(SellerSearchREAController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def query(self):
        data = request.get_json()
        query = data.get('query')
        searchREA = self.searchREA(query)
        return searchREA