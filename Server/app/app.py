from flask import Flask
from .config import Config
from .controllers.LoginController.controller import BaseControllerLogin
from .controllers.SACreateUAController.controller import BaseSACreateUAController
from .controllers.SACreateUPController.controller import BaseSACreateUPController
from .controllers.SARetrieveUAListController.controller import BaseSARetrieveUAListController
from .controllers.SARetrieveUPListController.controller import BaseSARetrieveUPListController
from .controllers.SAViewUPController.controller import BaseSAViewUPController
from .controllers.SAViewUAController.controller import BaseSAViewUAController
from .controllers.SAUpdateUAController.controller import BaseSAUpdateUAController
from .controllers.SAUpdateUPController.controller import BaseSAUpdateUPController
from .controllers.SASuspendUAController.controller import BaseSASuspendUAController
from .controllers.SASuspendUPController.controller import BaseSASuspendUPController
from .controllers.REAViewREACredentialController.controller import BaseREAViewREAcredentialController
from .controllers.REAUpdateREACredentialController.controller import BaseREAUpdateREAcredentialController
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
SACreateUAController = BaseSACreateUAController('createUserAccount', __name__)
SACreateUPController = BaseSACreateUPController('createUserProfile', __name__)
SARetrieveUAListController = BaseSARetrieveUAListController('retrieveUserAccountList', __name__)
SARetrieveUPListController = BaseSARetrieveUPListController('retrieveUserProfileList', __name__)
SAViewUPController = BaseSAViewUPController('viewUserProfileController', __name__)
SAViewUAController = BaseSAViewUAController('viewUserAccountController', __name__)
SAUpdateUAController = BaseSAUpdateUAController('updateUserAccountController', __name__)
SAUpdateUPController = BaseSAUpdateUPController('updateUserProfileController', __name__)
SASuspendUAController = BaseSASuspendUAController('suspendUserAccountController', __name__)
SASuspendUPController = BaseSASuspendUPController('suspendUserProfileController', __name__)
REAViewREACredentialController = BaseREAViewREAcredentialController('viewREACredentialControler', __name__)
REAUpdateREACredentialController = BaseREAUpdateREAcredentialController('updateREACredentialControler', __name__)

#define routes and functions
loginController.route('/login', methods=['GET', 'POST'])(loginController.login)
SACreateUAController.route('/SACreateUA', methods=['GET', 'POST'])(SACreateUAController.createUserAccount)
SACreateUPController.route('/SACreateUP', methods=['POST'])(SACreateUPController.createUserProfile)
SARetrieveUAListController.route('/SARetrieveUAList', methods=['GET'])(SARetrieveUAListController.getAccountList)
SARetrieveUPListController.route('/SARetrieveUPList', methods=['GET'])(SARetrieveUPListController.getProfileList)
SAViewUPController.route('/SAViewUP', methods=['POST'])(SAViewUPController.viewProfileDesc)
SAViewUAController.route('/SAViewUA/<username>', methods=['GET'])(SAViewUAController.viewUserAccount)
SAUpdateUAController.route('/SAUpdateUA/<oldUsername>', methods=['GET','POST'])(SAUpdateUAController.updateUserAccount)
SAUpdateUPController.route('/SAUpdateUP/<profileName>', methods=['GET','POST'])(SAUpdateUPController.updateProfileData)
SASuspendUAController.route('/SASuspendUA', methods=['POST'])(SASuspendUAController.suspendUserAccount)
SASuspendUPController.route('/SASuspendUP', methods=['POST'])(SASuspendUPController.suspendUserProfile)
REAViewREACredentialController.route('/REAViewREACredential/<username>', methods=['GET', 'POST'])(REAViewREACredentialController.viewREACredentials)
REAUpdateREACredentialController.route('/REAUpdateREACredential/<username>', methods=['GET', 'POST'])(REAUpdateREACredentialController.updateREACredentials)

app.register_blueprint(loginController)
app.register_blueprint(SACreateUAController)
app.register_blueprint(SACreateUPController)
app.register_blueprint(SARetrieveUAListController)
app.register_blueprint(SAViewUPController)
app.register_blueprint(SAViewUAController)
app.register_blueprint(SAUpdateUAController)
app.register_blueprint(SARetrieveUPListController)
app.register_blueprint(SAUpdateUPController)
app.register_blueprint(SASuspendUAController)
app.register_blueprint(SASuspendUPController)
app.register_blueprint(REAViewREACredentialController)
app.register_blueprint(REAUpdateREACredentialController)

with app.app_context():
    db.create_all()

