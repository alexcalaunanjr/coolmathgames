from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_
from datetime import date

class Rating(db.Model):
    __tablename__ = 'Rating'
    id = db.Column(db.Integer, primary_key=True)
    rea = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    rater = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=date.today())
    rating_obj = db.relationship("UserAccount",  backref="rate", foreign_keys=[rater])

    @classmethod #to post a rating (stars)
    def postRating(cls, raterUsername:str, reaUsername:str, rating:int):
        post = cls.query.filter(and_(cls.rater==raterUsername, cls.rea==reaUsername)).first()
        if post: #checks if there is an existing row
            post.rating = rating
            db.session.commit()
            return jsonify({"updatedRating": True})
        else: # if row doesnt exist make a new post
            #make rating
            newRate = Rating (
                rea=reaUsername,
                rater=raterUsername,
                rating=rating
            )
            db.session.add(newRate)
            db.session.commit()
            return jsonify({"enteredRating": True})
        
    #retrieve rating
    @classmethod
    def retrieveRatings(cls, reaUsername:str):
        ratingList = cls.query.filter(cls.rea==reaUsername).all()
        ratingDict = [{'id': rate.id, 
                        'rea': rate.rea, 
                        'rater': rate.rater, 
                        'raterName': rate.rating_obj.fullName,
                        'rating': rate.rating,
                        'date': rate.date.strftime('%a, %d %b %Y')
                        } for rate in ratingList]
        return jsonify({"ratingDict": ratingDict})