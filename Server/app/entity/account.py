from .sqlAlchemy import db
from sqlalchemy import ForeignKey, Column, Integer, String, Text
from flask import jsonify
from flask_bcrypt import Bcrypt
from sqlalchemy import event
from sqlalchemy.engine import Engine
import sqlite3

bcrypt = Bcrypt()

#User table
class UserAccount(db.Model):
    __tablename__ = 'UserAccounts'
    id = db.Column(db.Integer, primary_key=True)
    profileImage = db.Column(db.Text, nullable=True)
    profile = db.Column(db.String(20), db.ForeignKey('UserProfiles.profile', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    fullName = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    phoneNo = db.Column(db.String(25), nullable=False)
    status = db.Column(db.String(10), nullable=False, default='active')
    profilefk = db.relationship('UserProfiles', foreign_keys='UserAccount.profile')
    # accountProfileRel = db.relationship("UserProfiles", back_populates="profileAccountRel", cascade='all, delete, save-update', foreign_keys="UserAccount.profile")


    #retrieve a user account based of username
    @classmethod
    def retrieveUserAccount(self, username:str):
        user = UserAccount.query.filter_by(username=username).first()
        if user:
            return jsonify({
                'profile': user.profile,
                'fullName': user.fullName,
                'username': user.username,
                'email': user.email,
                'phoneNo': user.phoneNo,
                'status': user.status
            })
        else:
            return jsonify({'message': 'User not found'}), 404
    
    @classmethod
    def checkSuspended(self, username:str):
        user = UserAccount.query.filter_by(username=username).first()
        if user:
            return user.status

        else:
            return jsonify({'message': 'User not found'}), 404

    #verify login account
    @classmethod
    def verifyLoginInfo(self, profile:str, username:str, password:str):
        user = UserAccount.query.filter_by(username=username).first() #check if username matches in the database
        if user and bcrypt.check_password_hash(user.password, password) and profile == user.profile and user.status != "suspended":
            return True
        else:
            return False
    
    #retrieve accounts
    @classmethod
    def retrieveAccountList(cls):
        accountList = cls.query.all()
        accountDict = [{'id': account.id, 
                        'profile': account.profile, 
                        'fullName': account.fullName, 
                        'username': account.username, 
                        'email': account.email, 
                        'phoneNo': account.phoneNo, 
                        'status': account.status} for account in accountList]
        return jsonify({"accountDict": accountDict})
    
    #update account
    @classmethod
    def updateAccount(cls, accUsername, updatedData):
        account = cls.query.filter_by(username=accUsername).first()
        if not account:
            return jsonify({'message': 'Account not found'}), 404
        else:
            if 'profile' in updatedData:
                account.profile = updatedData['profile']
            if 'fullName' in updatedData:
                account.fullName = updatedData['fullName']
            if 'username' in updatedData:
                account.username = updatedData['username']
            if 'password' in updatedData:
                account.password = bcrypt.generate_password_hash(updatedData['password'])
            if 'email' in updatedData:
                account.email = updatedData['email']
            if 'phoneNo' in updatedData:
                account.phoneNo = updatedData['phoneNo']
            if 'status' in updatedData:
                account.status = updatedData['status']
            db.session.commit()
            return jsonify({'accountUpdated': True})
    
    #suspend a user account
    @classmethod
    def suspendAccount(cls, username):
        account = cls.query.filter_by(username=username).first()
        if not account:
            return jsonify({'message': 'Account not Suspended'}), 404
        else:
            account.status = "suspended"
            db.session.commit()
            return jsonify({'accountSuspended': True})

    #Create new user account
    @classmethod
    def createAccount(self, newUser):
        db.session.add(newUser)
        db.session.commit()
        return True
    
