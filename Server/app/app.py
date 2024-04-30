from flask import Flask
from .config import Config
from .controllers.LoginController.controller import BaseControllerLogin
from .controllers.LogoutController.controller import BaseControllerLogout
from .controllers.CreateUserAccountController.controller import BaseCreateUserAccountController
from .controllers.CreateUserProfileController.controller import BaseCreateUserProfileController
from .controllers.UserAccountListController.controller import BaseUserAccountListController
from .controllers.RetrieveUserProfileListController.controller import BaseRetrieveUserProfileListController
from .controllers.ViewUserProfileController.controller import BaseViewUserProfileController
from .controllers.SelectUserAccountController.controller import BaseSelectedUserAccountController
from .controllers.UpdateUserAccountController.controller import BaseUpdateUserAccountController
from .controllers.UpdateUserProfileController.controller import BaseUpdateUserProfileController
from .controllers.SuspendUserAccountController.controller import BaseSuspendUserAccountController
from .controllers.SuspendUserProfileController.controller import BaseSuspendUserProfileController
from .entity.sqlAlchemy import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
# from app.entity.account import UserAccount
# from app.entity.userProfiles import UserProfiles
from sqlalchemy import event

app = Flask(__name__)
jwt = JWTManager(app)
app.config.from_object(Config)
db.init_app(app)
CORS(app, supports_credentials=True)

@event.listens_for(db.Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

#instantiate controllers
loginController = BaseControllerLogin('login', __name__)
createUserAccountController = BaseCreateUserAccountController('createUserAccount', __name__)
createUserProfileController = BaseCreateUserProfileController('createUserProfile', __name__)
logoutController = BaseControllerLogout('logout', __name__)
userAccountListController = BaseUserAccountListController('retrieveUserAccountList', __name__)
userProfileListController = BaseRetrieveUserProfileListController('retrieveUserProfileList', __name__)
viewUserProfileController = BaseViewUserProfileController('viewUserProfileController', __name__)
selectedUserAccountController = BaseSelectedUserAccountController('selectedUserAccountController', __name__)
updateUserAccountController = BaseUpdateUserAccountController('updateUserAccountController', __name__)
updateUserProfileController = BaseUpdateUserProfileController('updateUserProfileController', __name__)
suspendUserAccountController = BaseSuspendUserAccountController('suspendUserAccountController', __name__)
suspendUserProfileController = BaseSuspendUserProfileController('suspendUserProfileController', __name__)

#define routes and functions
loginController.route('/login', methods=['GET', 'POST'])(loginController.login)
createUserAccountController.route('/createUserAccount', methods=['GET', 'POST'])(createUserAccountController.createUserAccount)
createUserAccountController.route('/userAccount/<username>', methods=['GET'])(createUserAccountController.retrieveAccount) #might change (retrieve creds)
createUserProfileController.route('/createUserProfile', methods=['POST'])(createUserProfileController.createUserProfile)
logoutController.route('/logout', methods=['GET', 'POST'])(logoutController.logout)
userAccountListController.route('/retrieveAccountList', methods=['GET'])(userAccountListController.getAccountList)
userProfileListController.route('/retrieveProfileList', methods=['GET'])(userProfileListController.getProfileList)
viewUserProfileController.route('/viewProfileDesc', methods=['POST'])(viewUserProfileController.getProfileDesc)
selectedUserAccountController.route('/viewUserAccount/<username>', methods=['GET'])(selectedUserAccountController.getUserAccount)
updateUserAccountController.route('/updateUserAccount/<oldUsername>', methods=['POST'])(updateUserAccountController.updateUserAccount)
updateUserProfileController.route('/updateUserProfile', methods=['POST'])(updateUserProfileController.updateProfileData) #COMPLETWE THIS
suspendUserAccountController.route('/suspendUserAccount', methods=['POST'])(suspendUserAccountController.suspendUserAccount)
suspendUserProfileController.route('/suspendUserProfile', methods=['POST'])(suspendUserProfileController.suspendUserProfile)

app.register_blueprint(loginController)
app.register_blueprint(logoutController)
app.register_blueprint(createUserAccountController)
app.register_blueprint(createUserProfileController)
app.register_blueprint(userAccountListController)
app.register_blueprint(viewUserProfileController)
app.register_blueprint(selectedUserAccountController)
app.register_blueprint(updateUserAccountController)
app.register_blueprint(userProfileListController)
app.register_blueprint(updateUserProfileController)
app.register_blueprint(suspendUserAccountController)
app.register_blueprint(suspendUserProfileController)

# with app.app_context():
#     db.create_all()

