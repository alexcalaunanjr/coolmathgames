from .sqlAlchemy import db
from flask import jsonify
from sqlalchemy import and_

class Review(db.Model):
    __tablename__ = 'Review'
    id = db.Column(db.Integer, primary_key=True)
    rea = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    reviewer = db.Column(db.String(50), db.ForeignKey('UserAccounts.username'), nullable=False)
    review = db.Column(db.Text, nullable=False)
    
    @classmethod #to post a review
    def postReview(cls, reviewerUsername, reaUsername, review):
        post = cls.query.filter(and_(cls.reviewer==reviewerUsername, cls.rea==reaUsername)).first()
        if post: #checks if there is an existing row
            post.review = review
            db.session.commit()
            return jsonify({"updatedReview": True})
        else: # if row doesnt exist make a new post
            #make review
            newReview = Review (
                rea=reaUsername,
                reviewer=reviewerUsername,
                review=review
            )
            db.session.add(newReview)
            db.session.commit()
            return jsonify({"enteredReview": True})
