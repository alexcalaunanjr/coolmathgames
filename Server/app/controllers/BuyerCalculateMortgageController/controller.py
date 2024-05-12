from flask import request
from flask import Blueprint
from app.entity.propertyListing import PropertyListing
from flask_jwt_extended import jwt_required

class BuyerCalculateMortgageController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def calculateMortgage(self, loanAmount:int, interestRate:int, loanTenure:int):
        calculateMortgage = PropertyListing.calculateMortgage(loanAmount, interestRate, loanTenure)
        return calculateMortgage

class BaseBuyerCalculateMortgageController(BuyerCalculateMortgageController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @jwt_required()
    def getMortgage(self):
        data = request.get_json()
        loanAmount = data.get('loanAmount')
        interestRate = data.get('interestRate')
        loanTenure = data.get('loanTenure')
        calculateMortgage = self.calculateMortgage(loanAmount, interestRate, loanTenure)
        return calculateMortgage