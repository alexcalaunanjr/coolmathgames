from .sqlAlchemy import db
from flask import jsonify

#User table
class REACredentials(db.Model):

    __tablename__ = "REACredentials"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), db.ForeignKey('UserAccounts.username'), nullable=False)
    reaImage = db.Column(db.Text, nullable=False)
    experience = db.Column(db.String(20))
    license = db.Column(db.String(20))
    language = db.Column(db.String(50))
    special = db.Column(db.String(200))
    about = db.Column(db.String(200))
    award = db.Column(db.String(200))
    account_obj = db.relationship("UserAccount", backref="reaCredentials")
                        
    # Create new rea credentials
    @classmethod
    def createCreds(self, accUsername, reaImage, experience, license, language, special, about, award):
        reaAdded = REACredentials(username=accUsername, reaImage=reaImage, experience=experience, license=license, language=language, special=special, about=about, award=award)
        db.session.add(reaAdded)
        db.session.commit()
        return True

    #retrieve a user account based of username
    @classmethod
    def retrieveUserCredentials(self, username:str):
        rea = REACredentials.query.filter_by(username=username).first()
        if not rea:
            # Create account fields
            self.createCreds(accUsername = username, reaImage="image" ,experience="", license="", language="", special="", about="", award="")
        
        if rea:
            return jsonify({
                'username': rea.username,
                'experience': rea.experience,
                'license' : rea.license,
                'language' : rea.language,
                'special' : rea.special,
                'about' : rea.about,
                'award' : rea.award,
                'reaImage' : rea.reaImage,

                'fullName': rea.account_obj.fullName,
                'email': rea.account_obj.email,
                'phoneNo': rea.account_obj.phoneNo,
            })
        
        return jsonify({'message': 'User not found'}), 404
    
    #update account
    @classmethod
    def updateUserCredentials(cls, accUsername, updatedData):
        credentials = cls.query.filter_by(username=accUsername).first()
        if not credentials:
            # Create account fields
            cls.createCreds(accUsername, updatedData['reaImage'], updatedData['experience'], updatedData['license'], updatedData['language'], updatedData['special'], updatedData['about'], updatedData['award'])
            return jsonify({'reaCredentialsUpdated': True})
        
        # Update account fields
        if 'reaImage' in updatedData:
            credentials.reaImage = updatedData['reaImage']
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

        if 'fullName' in updatedData:
            credentials.account_obj.fullName = updatedData['fullName']
        if 'email' in updatedData:
            credentials.account_obj.email = updatedData['email']
        if 'phoneNo' in updatedData:
            credentials.account_obj.phoneNo = updatedData['phoneNo']
        
        db.session.commit()
        return jsonify({'reaCredentialsUpdated': True})