from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_

class Rating(db.Model):
    __tablename__ = 'Rating'
    id = db.Column(db.Integer, primary_key=True)
    rea = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    rater = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    @classmethod #to post a rating (stars)
    def postRating(cls, raterUsername, reaUsername, rating):
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

