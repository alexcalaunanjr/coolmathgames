import json
from flask import Flask, render_template, url_for, redirect, flash, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from flask_bcrypt import Bcrypt
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import InputRequired, Length, ValidationError
from functools import wraps
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
import jwt
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'a87dswta8s7d8asdas87da8sd'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
db = SQLAlchemy(app)

loginManager = LoginManager()
loginManager.init_app(app)
loginManager.login_view = "login"

@loginManager.user_loader
def loadUser(userId):
    return User.query.get(int(userId))

#User table
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.String(20), nullable=False)
    fullName = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    phoneNo = db.Column(db.String(25), nullable=False)
    status = db.Column(db.String(10), nullable=False, default='active')

#User profiles table
class UserProfiles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.String(20), nullable=False, unique=True)

class RegisterForm(FlaskForm):
    profile = SelectField('Profile', choices=[], validators=[InputRequired()])
    fullName = StringField(validators=[InputRequired(), Length(
        min=2, max=40)] , render_kw={"placeholder": "Full Name"})
    username = StringField(validators=[InputRequired(), Length(
        min=4, max=20)] , render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(
        min=4, max=20)] , render_kw={"placeholder": "Password"})
    email = StringField(validators=[InputRequired(), Length(
        min=2, max=40)] , render_kw={"placeholder": "Email"})
    phoneNo = StringField(validators=[InputRequired(), Length(
        min=2, max=40)] , render_kw={"placeholder": "phoneNo"})
    status = StringField(default='active', render_kw={"readonly":True})
    submit = SubmitField("Register")

    def validate_username(self, username):
        existingUserName = User.query.filter_by(
            username=username.data).first()
        if existingUserName:
            raise ValidationError("Username already exists!")

#Form for login
class LoginForm(FlaskForm):
    profile = SelectField('Profile', choices=["System Admin"], validators=[InputRequired()])
    username = StringField(validators=[InputRequired(), Length(
        min=4, max=20)] , render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(
        min=4, max=20)] , render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")

#Form for user profiles
class ProfileForm(FlaskForm):
    profile = StringField(validators=[InputRequired(), Length(
        min=2, max=30)] , render_kw={"placeholder": "New User Profile"})
    submit = SubmitField("Create")

#limit access for certain profiles
def system_admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not current_user.is_authenticated or current_user.profile != 'System Admin':
            flash('You do not have permission to access this page.', 'error')
            return redirect(url_for('login'))
        return func(*args, **kwargs)
    return decorated_view

def authorize(profile):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            token = request.headers.get('Authorization')
            if token:
                try:
                    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                    if payload.get('profile') == profile:
                        return func(*args, **kwargs)
                    else:
                        return jsonify({'message': 'Unauthorized'}), 403
                except jwt.ExpiredSignatureError:
                    return jsonify({'message': 'Token expired'}), 401
                except jwt.InvalidTokenError:
                    return jsonify({'message': 'Invalid token'}), 401
            else:
                return jsonify({'message': 'Token required'}), 401
        return wrapper
    return decorator 

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
    
#route to return user credentials
@app.route('/userCredentials/<username>', methods=['GET'])
def getEmail(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'email': user.email}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        #take choices from the database
        user_profiles = [profile.profile for profile in UserProfiles.query.all()]
        # Add System Admin
        user_profiles.insert(0, 'System Admin')
        return jsonify({'user_profiles': user_profiles})
    
    elif request.method == 'POST':
        data = request.get_json()

        # Extract login credentials from the form
        username = data.get('username')
        password = data.get('password')
        profile = data.get('profile')

        if username and password and profile:
            user = User.query.filter_by(username=username).first()
            if user and bcrypt.check_password_hash(user.password, password) and profile == user.profile:
                login_user(user)
                access_token = create_access_token(identity=username)
                return jsonify({"authenticated": True, "access_token": access_token})
            else:
                return jsonify({"error": "Invalid Credentials", "authenticated": False}), 401
        return jsonify({'user_profiles': user_profiles, "authenticated": False}), 400

#Home page for System Admin
@app.route('/SAHomePage', methods=['GET', 'POST'])
@jwt_required()
def SAHomepage():
    username = current_user.username
    return render_template("SAHomepage.html", username=username)

#Home page for Buyer
@app.route('/BuyerHomepage', methods=['GET', 'POST'])
@jwt_required()
def BuyerHomepage():
    username = current_user.username
    return render_template("BuyerHomepage.html", username=username)

#Home page for Seller
@app.route('/SellerHomepage', methods=['GET', 'POST'])
@jwt_required()
def SellerHomepage():
    username = current_user.username
    return render_template("SellerHomepage.html", username=username)

#Logout
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    logout_user()
    return response

#User Profile List
@app.route('/userProfile')
def userProfile():
    return render_template('userProfile.html')

#create user profiles
@app.route('/createUserProfile', methods=['POST'])
@jwt_required()
def createUserProfile():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        newProfile = data.get('newProfile')
    if newProfile:
        newProfile = UserProfiles(
            profile=newProfile
        )
        db.session.add(newProfile)
        db.session.commit()
    return jsonify({'message': 'User profile created successfully'}), 201

#Create User Acc
@app.route('/createUserAccount', methods=['GET', 'POST'])
@jwt_required()
def createUserAccount():
    if request.method == 'GET':
        #take choices from the database
        user_profiles = [profile.profile for profile in UserProfiles.query.all()]
        # Add System Admin
        user_profiles.insert(0, 'System Admin')
        return jsonify({'user_profiles': user_profiles})
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        # Extract login credentials from the form
        fullName = data.get('fullName')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        phone = data.get('phone')
        profile = data.get('profile')

        if fullName and username and password and email and phone and profile:
            hashedPw = bcrypt.generate_password_hash(password)
            newUser = User(
                profile=profile,
                fullName=fullName, 
                username=username, 
                password=hashedPw, 
                email=email,
                phoneNo=phone,
            )
            db.session.add(newUser)
            db.session.commit()
        return jsonify({'message': 'User account created successfully'}), 201

if __name__ == '__main__':
    with app.app_context():
       db.create_all()
    app.run(debug=True)


