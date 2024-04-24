from flask import Flask
from .config import Config
from .controllers.LoginController.routes import router as loginBP
from .controllers.LogoutController.routes import router as logoutBP
from .controllers.CreateUserAccountController.controller import router as userAccBP
from .controllers.CreateUserProfileController.routes import router as userProfBP
from .entity.sqlAlchemy import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
jwt = JWTManager(app)
app.config.from_object(Config)
db.init_app(app)
CORS(app, supports_credentials=True)

app.register_blueprint(loginBP)
app.register_blueprint(logoutBP)
app.register_blueprint(userAccBP)
app.register_blueprint(userProfBP)


