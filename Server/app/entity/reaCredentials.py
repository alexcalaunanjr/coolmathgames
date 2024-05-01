from .sqlAlchemy import db
from flask import jsonify
from app.entity.account import UserAccount

#User table
class REACredentials(db.Model):

    __tablename__ = "REACredentials"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), db.ForeignKey('UserAccounts.username'), nullable=False)
    experience = db.Column(db.String(20), nullable=False)
    license = db.Column(db.String(20), nullable=False)
    language = db.Column(db.String(50), nullable=False)
    special = db.Column(db.String(200), nullable=False)
    about = db.Column(db.String(200), nullable=False)
    award = db.Column(db.String(200), nullable=False)
                        
    # Create new rea credentials
    @classmethod
    def createCreds(self, accUsername, experience, license, language, special, about, award):
        reaAdded = REACredentials(username=accUsername, experience=experience, license=license, language=language, special=special, about=about, award=award)
        db.session.add(reaAdded)
        db.session.commit()
        return True

    #retrieve a user account based of username
    @classmethod
    def retrieveUserCredentials(self, username:str):
        rea = REACredentials.query.filter_by(username=username).first()
        user = UserAccount.query.filter_by(username=username).first()
        if rea and user:
            return jsonify({
                'fullName': user.fullName,
                'username': user.username,
                'email': user.email,
                'phoneNo': user.phoneNo,
                'experience': rea.experience,
                'license' : rea.license,
                'language' : rea.language,
                'special' : rea.special,
                'about' : rea.about,
                'award' : rea.award
            })
        if user:
            return jsonify({
                'fullName': user.fullName,
                'username': user.username,
                'email': user.email,
                'phoneNo': user.phoneNo,
                'experience':'',
                'license':'',
                'language':'',
                'special':'',
                'about':'',
                'award':'',
            })
        return jsonify({'message': 'User not found'}), 404
    
    #update account
    @classmethod
    def updateUserCredentials(cls, accUsername, updatedData):
        account = UserAccount.query.filter_by(username=accUsername).first()
        credentials = cls.query.filter_by(username=accUsername).first()
        if not account:
            return jsonify({'message': 'Account not found'}), 404
        if not credentials:
            if 'fullName' in updatedData:
                account.fullName = updatedData['fullName']
            if 'email' in updatedData:
                account.email = updatedData['email']
            if 'phoneNo' in updatedData:
                account.phoneNo = updatedData['phoneNo']
            # Create account fields
            cls.createCreds(accUsername, updatedData['experience'], updatedData['license'], updatedData['language'], updatedData['special'], updatedData['about'], updatedData['award'])
            return jsonify({'reaCredentialsUpdated': True})
        
        # Update account fields
        if 'fullName' in updatedData:
            account.fullName = updatedData['fullName']
        if 'email' in updatedData:
            account.email = updatedData['email']
        if 'phoneNo' in updatedData:
            account.phoneNo = updatedData['phoneNo']
        if 'experience' in updatedData:
            credentials.experience = updatedData['experience']
        if 'license' in updatedData:
            credentials.license = updatedData['license']
        if 'language' in updatedData:
            credentials.language = updatedData['language']
        if 'special' in updatedData:
            credentials.special = updatedData['special']
        if 'about' in updatedData:
            credentials.about = updatedData['about']
        if 'award' in updatedData:
            credentials.award = updatedData['award']
        
        db.session.commit()
        return jsonify({'reaCredentialsUpdated': True})