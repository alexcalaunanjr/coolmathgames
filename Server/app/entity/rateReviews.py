from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_

class RateReviews(db.Model):
    __tablename__ = 'RateReviews'
    id = db.Column(db.Integer, primary_key=True)
    rea = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    raterReviewer = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    rating = db.Column(db.Integer, nullable=True)
    review = db.Column(db.Text, nullable=True)

    @classmethod #to post a rating (stars)
    def postRating(cls, raterUsername, reaUsername, rating):
        post = cls.query.filter(and_(cls.raterReviewer==raterUsername, cls.rea==reaUsername)).first()
        if post: #checks if there is an existing row
            post.rating = rating
            db.session.commit()
            return jsonify({"updatedRating": True})
        else: # if row doesnt exist make a new post
            #make rating
            newRate = RateReviews (
                rea=reaUsername,
                raterReviewer=raterUsername,
                rating=rating
            )
            db.session.add(newRate)
            db.session.commit()
            return jsonify({"enteredRating": True})
    
    @classmethod #to post a review
    def postReview(cls, reviewerUsername, reaUsername, review):
        post = cls.query.filter(and_(cls.raterReviewer==reviewerUsername, cls.rea==reaUsername)).first()
        if post: #checks if there is an existing row
            post.review = review
            db.session.commit()
            return jsonify({"updatedReview": True})
        else: # if row doesnt exist make a new post
            #make review
            newReview = RateReviews (
                rea=reaUsername,
                raterReviewer=reviewerUsername,
                review=review
            )
            db.session.add(newReview)
            db.session.commit()
            return jsonify({"enteredReview": True})
