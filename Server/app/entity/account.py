from .sqlAlchemy import db
from flask import jsonify
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

#User table
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.String(20), nullable=False)
    fullName = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    phoneNo = db.Column(db.String(25), nullable=False)
    status = db.Column(db.String(10), nullable=False, default='active')

    #retrieve a user account based of username (email for now)
    @classmethod
    def retrieveCred(self, username:str):
        user = Account.query.filter_by(username=username).first()
        if user:
            return jsonify({'email': user.email}), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    #verify login credentials
    @classmethod
    def verifyLoginInfo(self, profile:str, username:str, password:str):
        user = Account.query.filter_by(username=username).first() #check if username matches in the database
        if user and bcrypt.check_password_hash(user.password, password) and profile == user.profile:
            return True
        else:
            return False

    #Create new user account
    @classmethod
    def createAccount(self, newUser):
        db.session.add(newUser)
        db.session.commit()
        return True
        