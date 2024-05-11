from .sqlAlchemy import db
from flask import jsonify
from flask_bcrypt import Bcrypt
from sqlalchemy import and_

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

    #retrieve a user account based of username
    @classmethod
    def retrieveUserAccount(self, username:str):
        user = UserAccount.query.filter_by(username=username).first()
        if user:
            account = jsonify({
                'profile': user.profile,
                'img': user.profileImage,
                'fullName': user.fullName,
                'username': user.username,
                'email': user.email,
                'phoneNo': user.phoneNo,
                'status': user.status
            })

            return account
        else:
            return jsonify({'message': 'User not found'}), 404
    
    @classmethod
    def checkSuspended(self, username:str):
        user = UserAccount.query.filter_by(username=username).first()
        if user:
            return user.status == "active"

        else:
            return jsonify({'message': 'User not found'}), 404

    #verify login account
    @classmethod
    def verifyLoginInfo(self, profile:str, username:str, password:str):
        user = UserAccount.query.filter_by(username=username).first() #check if username matches in the database
        if user and bcrypt.check_password_hash(user.password, password) and profile == user.profile:
            return True
        else:
            return False
    
    #retrieve account list
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
    
    #retrieve REA list
    @classmethod
    def retrieveREAList(cls):
        REAList = cls.query.filter(cls.profile=="Real Estate Agent")
        READict = [{'username': rea.username, 
                    'email': rea.email, 
                    'phoneNo': rea.phoneNo, 
                    'status': rea.status} for rea in REAList]
        return jsonify({"READict": READict})
    
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
            if 'profileImage' in updatedData:
                account.profileImage = updatedData['profileImage']
            db.session.commit()
            return jsonify({'accountUpdated': True})
    
    #Retrieve new account information based of search
    @classmethod
    def searchUserAccount(cls, query):
        userAccountList = cls.query.filter(cls.username.like(f"%{query}%")).all()
        userAccountDict = [{
            'profile' : account.profile,
            'fullName' : account.fullName,
            'username' : account.username,
            'email' : account.email,
            'status' : account.status
        } for account in userAccountList]
        if userAccountDict:
            return jsonify({"userAccounts": userAccountDict})
        else:
            return jsonify({"userAccounts": "Not Found"})
    
    #Retrieve new REA information based of search
    @classmethod
    def searchREA(cls, query):
        REAList = cls.query.filter(and_(cls.username.like(f"%{query}%"), cls.profile=="Real Estate Agent")).all()
        READict = [{
            'username' : rea.username,
            'email' : rea.email,
            'phoneNo': rea.phoneNo, 
            'status' : rea.status
        } for rea in REAList]
        if READict:
            return jsonify({"userREA": READict})
        else:
            return jsonify({"userREA": "Not Found"})
    
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
    def createAccount(self, name, img, username, email, password, phone, profile):
        hashedPw = bcrypt.generate_password_hash(password)
        newUser = UserAccount(
            profile=profile,
            profileImage=img,
            fullName=name, 
            username=username, 
            password=hashedPw, 
            email=email,
            phoneNo=phone,
        )
        db.session.add(newUser)
        db.session.commit()
        return True
    
