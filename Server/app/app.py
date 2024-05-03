from flask import Flask
from .config import Config
from .controllers.LoginController.controller import BaseControllerLogin
from .controllers.CreateUserAccountController.controller import BaseCreateUserAccountController
from .controllers.CreateUserProfileController.controller import BaseCreateUserProfileController
from .controllers.RetrieveUserAccountListController.controller import BaseRetrieveUserAccountListController
from .controllers.RetrieveUserProfileListController.controller import BaseRetrieveUserProfileListController
from .controllers.ViewUserProfileController.controller import BaseViewUserProfileController
from .controllers.ViewUserAccountController.controller import BaseViewUserAccountController
from .controllers.UpdateUserAccountController.controller import BaseUpdateUserAccountController
from .controllers.UpdateUserProfileController.controller import BaseUpdateUserProfileController
from .controllers.SuspendUserAccountController.controller import BaseSuspendUserAccountController
from .controllers.SuspendUserProfileController.controller import BaseSuspendUserProfileController
from .controllers.ViewREACredentialController.controller import BaseViewREAcredentialController
from .controllers.UpdateREACredentialController.controller import BaseUpdateREAcredentialController
from .entity.sqlAlchemy import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
# from app.entity.account import UserAccount
# from app.entity.userProfiles import UserProfiles
# from app.entity.reaCredentials import REACredentials

app = Flask(__name__)
jwt = JWTManager(app)
app.config.from_object(Config)
db.init_app(app)
CORS(app, supports_credentials=True)

#instantiate controllers
loginController = BaseControllerLogin('login', __name__)
createUserAccountController = BaseCreateUserAccountController('createUserAccount', __name__)
createUserProfileController = BaseCreateUserProfileController('createUserProfile', __name__)
retrieveUserAccountListController = BaseRetrieveUserAccountListController('retrieveUserAccountList', __name__)
retrieveUserProfileListController = BaseRetrieveUserProfileListController('retrieveUserProfileList', __name__)
viewUserProfileController = BaseViewUserProfileController('viewUserProfileController', __name__)
viewUserAccountController = BaseViewUserAccountController('viewUserAccountController', __name__)
updateUserAccountController = BaseUpdateUserAccountController('updateUserAccountController', __name__)
updateUserProfileController = BaseUpdateUserProfileController('updateUserProfileController', __name__)
suspendUserAccountController = BaseSuspendUserAccountController('suspendUserAccountController', __name__)
suspendUserProfileController = BaseSuspendUserProfileController('suspendUserProfileController', __name__)
viewREACredentialController = BaseViewREAcredentialController('viewREACredentialControler', __name__)
updateREACredentialController = BaseUpdateREAcredentialController('updateREACredentialControler', __name__)

#define routes and functions
loginController.route('/login', methods=['GET', 'POST'])(loginController.login)
createUserAccountController.route('/createUserAccount', methods=['GET', 'POST'])(createUserAccountController.createUserAccount)
createUserProfileController.route('/createUserProfile', methods=['GET', 'POST'])(createUserProfileController.createUserProfile)
retrieveUserAccountListController.route('/retrieveAccountList', methods=['GET'])(retrieveUserAccountListController.getAccountList)
retrieveUserProfileListController.route('/retrieveProfileList', methods=['GET'])(retrieveUserProfileListController.getProfileList)
viewUserProfileController.route('/viewProfileDesc', methods=['POST'])(viewUserProfileController.viewProfileDesc)
viewUserAccountController.route('/viewUserAccount/<username>', methods=['GET'])(viewUserAccountController.viewUserAccount)
updateUserAccountController.route('/updateUserAccount/<oldUsername>', methods=['GET','POST'])(updateUserAccountController.updateUserAccount)
updateUserProfileController.route('/updateUserProfile/<profileName>', methods=['GET','POST'])(updateUserProfileController.updateProfileData)
suspendUserAccountController.route('/suspendUserAccount', methods=['POST'])(suspendUserAccountController.suspendUserAccount)
suspendUserProfileController.route('/suspendUserProfile', methods=['POST'])(suspendUserProfileController.suspendUserProfile)
viewREACredentialController.route('/viewREACredential/<username>', methods=['GET', 'POST'])(viewREACredentialController.viewREACredentials)
updateREACredentialController.route('/updateREACredential/<username>', methods=['GET', 'POST'])(updateREACredentialController.updateREACredentials)

app.register_blueprint(loginController)
app.register_blueprint(createUserAccountController)
app.register_blueprint(createUserProfileController)
app.register_blueprint(retrieveUserAccountListController)
app.register_blueprint(viewUserProfileController)
app.register_blueprint(viewUserAccountController)
app.register_blueprint(updateUserAccountController)
app.register_blueprint(retrieveUserProfileListController)
app.register_blueprint(updateUserProfileController)
app.register_blueprint(suspendUserAccountController)
app.register_blueprint(suspendUserProfileController)
app.register_blueprint(viewREACredentialController)
app.register_blueprint(updateREACredentialController)

with app.app_context():
    db.create_all()

