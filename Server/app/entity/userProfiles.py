from .sqlAlchemy import db

#User profiles table
class UserProfiles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.String(20), nullable=False, unique=True)

    #Retrieve user list
    @classmethod
    def retrieveProfileList(self):
        return [profile.profile for profile in UserProfiles.query.all()]

    #Create new user profile
    @classmethod
    def createProfile(self, newProfile):
        db.session.add(newProfile)
        db.session.commit()
        return True