from flask import Flask
from .config import Config
from .controllers.LoginController.controller import BaseControllerLogin
from .controllers.LogoutController.controller import BaseControllerLogout
from .controllers.CreateUserAccountController.controller import BaseCreateUserAccountController
from .controllers.CreateUserProfileController.controller import BaseCreateUserProfileController
from .controllers.UserAccountListController.controller import BaseUserAccountListController
from .controllers.SelectUserAccountController.controller import BaseSelectedUserAccountController
from .controllers.UpdateUserAccountController.controller import BaseUpdateUserAccountController
from .entity.sqlAlchemy import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
jwt = JWTManager(app)
app.config.from_object(Config)
db.init_app(app)
CORS(app, supports_credentials=True)

#instantiate controllers
loginController = BaseControllerLogin('login', __name__)
createUserAccountController = BaseCreateUserAccountController('createUserAccount', __name__)
createUserProfileController = BaseCreateUserProfileController('createUserProfile', __name__)
logoutController = BaseControllerLogout('logout', __name__)
userAccountListController = BaseUserAccountListController('retrieveUserAccountList', __name__)
selectedUserAccountController = BaseSelectedUserAccountController('selectedUserAccountController', __name__)
updateUserAccountController = BaseUpdateUserAccountController('updateUserAccountController', __name__)

#define routes and functions
loginController.route('/login', methods=['GET', 'POST'])(loginController.login)
createUserAccountController.route('/createUserAccount', methods=['GET', 'POST'])(createUserAccountController.createUserAccount)
createUserAccountController.route('/userCredentials/<username>', methods=['GET'])(createUserAccountController.retrieveEmail) #might change (retrieve creds)
createUserProfileController.route('/createUserProfile', methods=['POST'])(createUserProfileController.createUserProfile)
logoutController.route('/logout', methods=['GET', 'POST'])(logoutController.logout)
userAccountListController.route('/retrieveAccountList', methods=['GET'])(userAccountListController.getAccountList)
selectedUserAccountController.route('/viewUserAccount/<username>', methods=['GET'])(selectedUserAccountController.getUserCredential)
updateUserAccountController.route('/updateUserAccount/<oldUsername>', methods=['POST'])(updateUserAccountController.updateUserAccount)

app.register_blueprint(loginController)
app.register_blueprint(logoutController)
app.register_blueprint(createUserAccountController)
app.register_blueprint(createUserProfileController)
app.register_blueprint(userAccountListController)
app.register_blueprint(selectedUserAccountController)
app.register_blueprint(updateUserAccountController)

# with app.app_context(): DELETE THIS
#     db.create_all()
