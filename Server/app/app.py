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
from .controllers.SellerRetrieveMyPropertiesController.controller import BaseSellerRetrieveMyPropertiesController
from .controllers.SellerViewMyPropertyController.controller import BaseSellerViewMyPropertyController
from .controllers.SellerViewREACredController.controller import BaseSellerViewREACredController
from .controllers.SellerRateREAController.controller import BaseSellerRateREAController
from .controllers.SellerReviewREAController.controller import BaseSellerReviewREAController
from .controllers.BuyerRetrievePropertiesController.controller import BaseBuyerRetrievePropertiesController
from .entity.sqlAlchemy import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.entity.account import UserAccount
from app.entity.userProfiles import UserProfiles
from app.entity.reaCredentials import REACredentials
from app.entity.properties import Properties
from app.entity.listings import Listings
from app.entity.rateReviews import RateReviews

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
SellerRetrieveMyPropertiesController = BaseSellerRetrieveMyPropertiesController('sellerRetrieveMyPropertiesController', __name__)
SellerViewMyPropertyController = BaseSellerViewMyPropertyController('sellerViewMyPropertyController', __name__)
SellerViewREACredController = BaseSellerViewREACredController('sellerViewREACredController', __name__)
SellerRateREAController = BaseSellerRateREAController('sellerRateREAController', __name__)
SellerReviewREAController = BaseSellerReviewREAController('sellerReviewREAController', __name__)
BuyerRetrievePropertiesController = BaseBuyerRetrievePropertiesController('buyerRetrievePropertiesController', __name__)

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
SellerRetrieveMyPropertiesController.route('/SellerRetrieveProperties/<username>', methods=['GET'])(SellerRetrieveMyPropertiesController.getMyProperties)
SellerViewMyPropertyController.route('/SellerViewProperty/<propertyName>', methods=['GET'])(SellerViewMyPropertyController.getProperty)
SellerViewREACredController.route('/SellerViewREACred/<username>', methods=['GET'])(SellerViewREACredController.getREACred)
SellerRateREAController.route('/SellerRateREA/<reaUsername>', methods=['POST'])(SellerRateREAController.postRate)
SellerReviewREAController.route('/SellerReviewREA/<reaUsername>', methods=['POST'])(SellerReviewREAController.postReviewText)
BuyerRetrievePropertiesController.route('/BuyerRetrieveProperties', methods=['GET'])(BuyerRetrievePropertiesController.getProperties)

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
app.register_blueprint(SellerRetrieveMyPropertiesController)
app.register_blueprint(SellerViewMyPropertyController)
app.register_blueprint(SellerViewREACredController)
app.register_blueprint(SellerRateREAController)
app.register_blueprint(SellerReviewREAController)
app.register_blueprint(BuyerRetrievePropertiesController)

# from .Base64Converter import image_to_base64

with app.app_context():
    db.create_all()
    # property_data = {
    #     'propertyName': "Mirage Towers",
    #     'propertyImage': image_to_base64('D:/Sippy/UniStuff/CSIT314/project/coolmathgames/imgs/MirageTowers.jpg'),
    #     'price': 5000,
    #     'location': "Great World",
    #     'aboutProperty': "this is Mirage",
    #     'noOfBedrooms': 3,
    #     'noOfBathrooms': 3,
    #     'area': 5000,
    #     'unitFeatures': "has free wifi, and cleaning service",
    #     'facilities': "swimming pool, pool table",
    #     'viewsCount': 80,
    #     'favoritesCount': 30
    # }

    # property_data_2 = {
    #     'propertyName': "Hillview Ave",
    #     'propertyImage': image_to_base64('D:/Sippy/UniStuff/CSIT314/project/coolmathgames/imgs/hillviewHeights.jpg'),
    #     'price': 2000,
    #     'location': "Hillview",
    #     'aboutProperty': "this is hillview",
    #     'noOfBedrooms': 6,
    #     'noOfBathrooms': 2,
    #     'area': 2000,
    #     'unitFeatures': "has free wifi, and cleaning service",
    #     'facilities': "swimming pool, pool table",
    #     'viewsCount': 40,
    #     'favoritesCount': 10
    # }

    # property_data_3 = {
    #     'propertyName': "Lion Towers",
    #     'propertyImage': image_to_base64('D:/Sippy/UniStuff/CSIT314/project/coolmathgames/imgs/LionTowers.jpg'),
    #     'price': 1000,
    #     'location': "Novena",
    #     'aboutProperty': "this is Lions",
    #     'noOfBedrooms': 7,
    #     'noOfBathrooms': 2,
    #     'area': 7000,
    #     'unitFeatures': "has free wifi, and cleaning service",
    #     'facilities': "swimming pool",
    #     'viewsCount': 80,
    #     'favoritesCount': 50
    # }

    # property_data_4 = {
    #     'propertyName': "Jardin",
    #     'propertyImage': image_to_base64('D:/Sippy/UniStuff/CSIT314/project/coolmathgames/imgs/Jardin.jpg'),
    #     'price': 2500,
    #     'location': "Novena",
    #     'aboutProperty': "this is Jardin",
    #     'noOfBedrooms': 3,
    #     'noOfBathrooms': 2,
    #     'area': 2000,
    #     'unitFeatures': "has free wifi, and cleaning service",
    #     'facilities': "swimming pool",
    #     'viewsCount': 70,
    #     'favoritesCount': 50
    # }

    # reaData = { 
    #     'id' : 1,
    #     'username' : "alex",
    #     'reaImage' : image_to_base64('D:/Sippy/UniStuff/CSIT314/project/coolmathgames/imgs/aleks.jpg'),
    #     'experience' : "good experience",
    #     'license' : "Pretty good",
    #     'language' : "espaniol",
    #     'special' : "you are my specialz",
    #     'about' : "this is aleks",
    #     'award' : "none"
    # }

    # property_obj = Properties(**property_data)
    # property_obj_2 = Properties(**property_data_2)
    # property_obj_3 = Properties(**property_data_3)
    # property_obj_4 = Properties(**property_data_4)
    # db.session.add(property_obj)
    # db.session.add(property_obj_2)
    # db.session.add(property_obj_3)
    # db.session.add(property_obj_4)
    # reaObj = REACredentials(**reaData)
    # db.session.add(reaObj)

    # Commit the changes
    # db.session.commit()

    # Close the session
    # db.session.close()

