from flask import Flask
from .config import Config


from .controllers.LoginController.controller import BaseControllerLogin

#SA
from .controllers.SACreateUAController.controller import BaseSACreateUAController
from .controllers.SACreateUPController.controller import BaseSACreateUPController
from .controllers.SARetrieveUAListController.controller import BaseSARetrieveUAListController
from .controllers.SARetrieveUPListController.controller import BaseSARetrieveUPListController
from .controllers.SAViewUPController.controller import BaseSAViewUPController
from .controllers.SAViewUAController.controller import BaseSAViewUAController
from .controllers.SAUpdateUAController.controller import BaseSAUpdateUAController
from .controllers.SAUpdateUPController.controller import BaseSAUpdateUPController
from .controllers.SASuspendUAController.controller import BaseSASuspendUAController
from .controllers.SASearchUAController.controller import BaseSASearchUAController
from .controllers.SASearchUPController.controller import BaseSASearchUPController
from .controllers.SASuspendUPController.controller import BaseSASuspendUPController


#REA
from .controllers.REAViewREACredentialsController.controller import BaseREAViewREAcredentialsController
from .controllers.REAUpdateREACredentialsController.controller import BaseREAUpdateREAcredentialsController
from .controllers.REACreateListingController.controller import BaseREACreateListingController
from .controllers.REARetrieveListingListController.controller import BaseREARetrieveListingListController
from .controllers.REAViewListingController.controller import BaseREAViewListingController
from .controllers.REAUpdateListingController.controller import BaseREAUpdateListingController
from .controllers.REASearchListingController.controller import BaseREASearchListingController
from .controllers.READeleteListingController.controller import BaseREADeleteListingController
from .controllers.REAViewRatingController.controller import BaseREAViewRatingController
from .controllers.REAViewReviewController.controller import BaseREAViewReviewController
from .controllers.REAViewViewCountController.controller import BaseREAViewViewCountController
from .controllers.REAViewFavoriteCountController.controller import BaseREAViewFavoriteCountController


#SELLER
from .controllers.SellerRetrieveListingListController.controller import BaseSellerRetrieveListingListController
from .controllers.SellerViewListingController.controller import BaseSellerViewListingController
from .controllers.SellerViewREACredentialsController.controller import BaseSellerViewREACredentialsController
from .controllers.SellerRateREAController.controller import BaseSellerRateREAController
from .controllers.SellerReviewREAController.controller import BaseSellerReviewREAController
from .controllers.SellerViewRatingsController.controller import BaseSellerViewRatingsController
from .controllers.SellerViewReviewsController.controller import BaseSellerViewReviewsController
from .controllers.SellerViewViewCountController.controller import BaseSellerViewViewCountController
from .controllers.SellerViewFavoriteCountController.controller import BaseSellerViewFavoriteCountController
from .controllers.SellerRetrieveREAListController.controller import BaseSellerRetrieveREAListController
from .controllers.SellerSearchREAController.controller import BaseSellerSearchREAController


#BUYER
from .controllers.BuyerRetrieveNewListingListController.controller import BaseBuyerRetrieveNewListingListController
from .controllers.BuyerRetrieveSoldListingListController.controller import BaseBuyerRetrieveSoldListingListController
from .controllers.BuyerViewNewListingController.controller import BaseBuyerViewNewListingController
from .controllers.BuyerSearchNewListingController.controller import BaseBuyerSearchNewListingController
from .controllers.BuyerViewSoldListingController.controller import BaseBuyerViewSoldListingController
from .controllers.BuyerSearchSoldListingController.controller import BaseBuyerSearchSoldListingController
from .controllers.BuyerViewREACredentialsController.controller import BaseBuyerViewREACredentialsController
from .controllers.BuyerRateREAController.controller import BaseBuyerRateREAController
from .controllers.BuyerReviewREAController.controller import BaseBuyerReviewREAController
from .controllers.BuyerViewRatingsController.controller import BaseBuyerViewRatingsController
from .controllers.BuyerViewReviewsController.controller import BaseBuyerViewReviewsController
from .controllers.BuyerAddNewListingToFavoritesController.controller import BaseBuyerAddNewListingToFavoritesController
from .controllers.BuyerAddSoldListingToFavoritesController.controller import BaseBuyerAddSoldListingToFavoritesController
from .controllers.BuyerRetrieveREAListController.controller import BaseBuyerRetrieveREAListController
from .controllers.BuyerSearchREAController.controller import BaseBuyerSearchREAController
from .controllers.BuyerRetrieveFavoriteListController.controller import BaseBuyerRetrieveFavoriteListController
from .controllers.BuyerViewFavoriteListingController.controller import BaseBuyerViewFavoriteListingController
from .controllers.BuyerCalculateMortgageController.controller import BaseBuyerCalculateMortgageController


#IMPORT
from .entity.sqlAlchemy import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.entity.account import UserAccount
from app.entity.userProfiles import UserProfiles
from app.entity.reaCredentials import REACredentials
from app.entity.properties import Properties
from app.entity.propertyListing import PropertyListing
from app.entity.rating import Rating
from app.entity.review import Review
from app.entity.favorite import Favorite


app = Flask(__name__)
jwt = JWTManager(app)
app.config.from_object(Config)
db.init_app(app)
CORS(app, supports_credentials=True)


#instantiate controllers
loginController = BaseControllerLogin('login', __name__)

#SA
SACreateUAController = BaseSACreateUAController('SAcreateUserAccount', __name__)
SACreateUPController = BaseSACreateUPController('SAcreateUserProfile', __name__)
SARetrieveUAListController = BaseSARetrieveUAListController('SAretrieveUserAccountList', __name__)
SARetrieveUPListController = BaseSARetrieveUPListController('SAretrieveUserProfileList', __name__)
SASearchUAController = BaseSASearchUAController('SAsearchUserAccountController', __name__)
SASearchUPController = BaseSASearchUPController('SAsearchUserProfileController', __name__)
SAViewUPController = BaseSAViewUPController('SAviewUserProfileController', __name__)
SAViewUAController = BaseSAViewUAController('SAviewUserAccountController', __name__)
SAUpdateUAController = BaseSAUpdateUAController('SAupdateUserAccountController', __name__)
SAUpdateUPController = BaseSAUpdateUPController('SAupdateUserProfileController', __name__)
SASuspendUAController = BaseSASuspendUAController('SAsuspendUserAccountController', __name__)
SASuspendUPController = BaseSASuspendUPController('SAsuspendUserProfileController', __name__)

#REA
REAViewREACredentialsController = BaseREAViewREAcredentialsController('REAviewREACredentialController', __name__)
REAUpdateREACredentialsController = BaseREAUpdateREAcredentialsController('REAupdateREACredentialController', __name__)
REACreateListingController = BaseREACreateListingController('REAcreateListingController', __name__)
REARetrieveListingListController = BaseREARetrieveListingListController('REARetrieveListingListController', __name__)
REAViewListingController = BaseREAViewListingController('REAViewListingController', __name__)
REAUpdateListingController = BaseREAUpdateListingController('REAUpdateListingController', __name__)
REASearchListingController = BaseREASearchListingController('REASearchListingController', __name__)
READeleteListingController = BaseREADeleteListingController('READeleteListingController', __name__)
REAViewRatingController = BaseREAViewRatingController('REAViewRatingController', __name__)
REAViewReviewController = BaseREAViewReviewController('REAViewReviewController', __name__)
REAViewViewCountController = BaseREAViewViewCountController('REAViewViewCountController', __name__)
REAViewFavoriteCountController = BaseREAViewFavoriteCountController('REAViewFavoriteCountController', __name__)


#SELLER
SellerRetrieveListingListController = BaseSellerRetrieveListingListController('sellerRetrieveListingController', __name__)
SellerViewListingController = BaseSellerViewListingController('sellerViewMyListingController', __name__)
SellerViewREACredentialsController = BaseSellerViewREACredentialsController('sellerViewREACredController', __name__)
SellerRateREAController = BaseSellerRateREAController('sellerRateREAController', __name__)
SellerReviewREAController = BaseSellerReviewREAController('sellerReviewREAController', __name__)
SellerViewRatingsController = BaseSellerViewRatingsController('sellerRetrieveRatingsController', __name__)
SellerViewReviewsController = BaseSellerViewReviewsController('sellerRetrieveReviewsController', __name__)
SellerViewViewCountController = BaseSellerViewViewCountController('sellerViewViewCountController', __name__)
SellerViewFavoriteCountController = BaseSellerViewFavoriteCountController('sellerViewFavoriteCountController', __name__)
SellerRetrieveREAListController = BaseSellerRetrieveREAListController('sellerRetrieveREAListController', __name__)
SellerSearchREAController = BaseSellerSearchREAController('sellerSearchREAController', __name__)


#BUYER
BuyerRetrieveNewListingListController = BaseBuyerRetrieveNewListingListController('buyerRetrieveNewListingListController', __name__)
BuyerRetrieveSoldListingListController = BaseBuyerRetrieveSoldListingListController('buyerRetrieveSoldListingListController', __name__)
BuyerViewNewListingController = BaseBuyerViewNewListingController('buyerViewNewListingController', __name__)
BuyerSearchNewListingController = BaseBuyerSearchNewListingController('buyerSearchNewListingController', __name__)
BuyerViewSoldListingController = BaseBuyerViewSoldListingController('buyerViewSoldListingController', __name__)
BuyerSearchSoldListingController = BaseBuyerSearchSoldListingController('buyerSearchSoldListingController', __name__)
BuyerViewREACredentialsController = BaseBuyerViewREACredentialsController('buyerViewREACredController', __name__)
BuyerRateREAController = BaseBuyerRateREAController('buyerRateREAController', __name__)
BuyerReviewREAController = BaseBuyerReviewREAController('buyerReviewREAController', __name__)
BuyerViewRatingsController = BaseBuyerViewRatingsController('buyerViewRatingsController', __name__)
BuyerViewReviewsController = BaseBuyerViewReviewsController('buyerViewReviewsController', __name__)
BuyerAddNewListingToFavoritesController = BaseBuyerAddNewListingToFavoritesController('buyerAddNewListingToFavoritesController', __name__)
BuyerAddSoldListingToFavoritesController = BaseBuyerAddSoldListingToFavoritesController('buyerAddSoldListingToFavoritesController', __name__)
BuyerRetrieveREAListController = BaseBuyerRetrieveREAListController('buyerRetrieveREAListController', __name__)
BuyerSearchREAController = BaseBuyerSearchREAController('buyerSearchREAController', __name__)
BuyerRetrieveFavoriteListController = BaseBuyerRetrieveFavoriteListController('buyerRetrieveFavoriteListController', __name__)
BuyerViewFavoriteListingController = BaseBuyerViewFavoriteListingController('buyerViewFavoriteListingController', __name__)
BuyerCalculateMortgageController = BaseBuyerCalculateMortgageController('buyerCalculateMortgageController', __name__)


#define routes and functions
loginController.route('/login', methods=['GET', 'POST'])(loginController.login)

#SA
SACreateUAController.route('/SACreateUA', methods=['GET', 'POST'])(SACreateUAController.createUserAccount)
SACreateUPController.route('/SACreateUP', methods=['POST'])(SACreateUPController.createUserProfile)
SARetrieveUAListController.route('/SARetrieveUAList', methods=['GET'])(SARetrieveUAListController.getAccountList)
SARetrieveUPListController.route('/SARetrieveUPList', methods=['GET'])(SARetrieveUPListController.getProfileList)
SASearchUAController.route('/SASearchUA', methods=['POST'])(SASearchUAController.query)
SASearchUPController.route('/SASearchUP', methods=['POST'])(SASearchUPController.query)
SAViewUPController.route('/SAViewUP', methods=['POST'])(SAViewUPController.viewProfileDesc)
SAViewUAController.route('/SAViewUA/<username>', methods=['GET'])(SAViewUAController.viewUserAccount)
SAUpdateUAController.route('/SAUpdateUA/<oldUsername>', methods=['GET','POST'])(SAUpdateUAController.updateUserAccount)
SAUpdateUPController.route('/SAUpdateUP/<profileName>', methods=['GET','POST'])(SAUpdateUPController.updateProfileData)
SASuspendUAController.route('/SASuspendUA', methods=['POST'])(SASuspendUAController.suspendUserAccount)
SASuspendUPController.route('/SASuspendUP', methods=['POST'])(SASuspendUPController.suspendUserProfile)


#REA
REAViewREACredentialsController.route('/REAViewREACredential/<username>', methods=['GET', 'POST'])(REAViewREACredentialsController.viewREACredentials)
REAUpdateREACredentialsController.route('/REAUpdateREACredential/<username>', methods=['GET', 'POST'])(REAUpdateREACredentialsController.updateREACredentials)
REACreateListingController.route('/REACreateListing', methods=['POST'])(REACreateListingController.createAProperty)
REARetrieveListingListController.route('/REARetrieveListingList/<username>', methods=['GET'])(REARetrieveListingListController.getListingList)
REAViewListingController.route('/REAViewListing/<propertyName>', methods=['GET'])(REAViewListingController.viewProperty)
REAUpdateListingController.route('/REAUpdateListing/<oldPropertyName>', methods=['GET', 'POST'])(REAUpdateListingController.updateAListing)
REASearchListingController.route('/REASearchListing/<username>', methods=['POST', 'GET'])(REASearchListingController.query)
READeleteListingController.route('/READeleteListing/<propertyName>', methods=['GET'])(READeleteListingController.deleteAProperty)
REAViewRatingController.route('/REAViewRating/<username>', methods=['GET'])(REAViewRatingController.viewRating)
REAViewReviewController.route('/REAViewReview/<username>', methods=['GET'])(REAViewReviewController.viewReview)
REAViewViewCountController.route('/REAViewViewCount/<listing>', methods=['GET'])(REAViewViewCountController.listingViewCounts)
REAViewFavoriteCountController.route('/REAViewFavoriteCount/<propertyName>', methods=['GET'])(REAViewFavoriteCountController.getFavoriteCount)


#SELLER
SellerRetrieveListingListController.route('/SellerRetrieveListing/<username>', methods=['GET'])(SellerRetrieveListingListController.getMyProperties)
SellerViewListingController.route('/SellerViewListing/<propertyName>', methods=['GET'])(SellerViewListingController.getProperty)
SellerViewREACredentialsController.route('/SellerViewREACred/<username>', methods=['GET'])(SellerViewREACredentialsController.getREACred)
SellerRateREAController.route('/SellerRateREA/<reaUsername>', methods=['POST'])(SellerRateREAController.postRate)
SellerReviewREAController.route('/SellerReviewREA/<reaUsername>', methods=['POST'])(SellerReviewREAController.postReviewText)
SellerViewRatingsController.route('/SellerViewRatings/<reaUsername>', methods=['GET'])(SellerViewRatingsController.getRatings)
SellerViewReviewsController.route('/SellerViewReviews/<reaUsername>', methods=['GET'])(SellerViewReviewsController.getReviews)
SellerViewViewCountController.route('/SellerViewViewCount/<propertyName>', methods=['GET'])(SellerViewViewCountController.getViewCount)
SellerViewFavoriteCountController.route('/SellerViewFavoriteCount/<propertyName>', methods=['GET'])(SellerViewFavoriteCountController.getFavoriteCount)
SellerRetrieveREAListController.route('/SellerRetrieveREAList', methods=['GET'])(SellerRetrieveREAListController.getREAList)
SellerSearchREAController.route('/SellerSearchREA', methods=['POST'])(SellerSearchREAController.query)


#BUYER
BuyerRetrieveNewListingListController.route('/BuyerRetrieveNewListingList', methods=['GET'])(BuyerRetrieveNewListingListController.getNewProperties)
BuyerRetrieveSoldListingListController.route('/BuyerRetrieveSoldListingList', methods=['GET'])(BuyerRetrieveSoldListingListController.getSoldProperties)
BuyerViewNewListingController.route('/BuyerViewNewListing/<propertyName>', methods=['POST'])(BuyerViewNewListingController.getProperty)
BuyerSearchNewListingController.route('/BuyerSearchNewListing', methods=['POST'])(BuyerSearchNewListingController.queryNew)
BuyerViewSoldListingController.route('/BuyerViewSoldListing/<propertyName>', methods=['POST'])(BuyerViewSoldListingController.getProperty)
BuyerSearchSoldListingController.route('/BuyerSearchSoldListing', methods=['POST'])(BuyerSearchSoldListingController.querySold)
BuyerViewREACredentialsController.route('/BuyerViewREACred/<username>', methods=['GET'])(BuyerViewREACredentialsController.getREACred)
BuyerRateREAController.route('/BuyerRateREA/<reaUsername>', methods=['POST'])(BuyerRateREAController.postRate)
BuyerReviewREAController.route('/BuyerReviewREA/<reaUsername>', methods=['POST'])(BuyerReviewREAController.postReviewText)
BuyerViewRatingsController.route('/BuyerRetrieveRatings/<reaUsername>', methods=['GET'])(BuyerViewRatingsController.getRatings)
BuyerViewReviewsController.route('/BuyerRetrieveReviews/<reaUsername>', methods=['GET'])(BuyerViewReviewsController.getReviews)
BuyerAddNewListingToFavoritesController.route('/BuyerPostNewFavorite/<propertyName>', methods=['POST'])(BuyerAddNewListingToFavoritesController.postFavoriteListing)
BuyerAddSoldListingToFavoritesController.route('/BuyerPostSoldFavorite/<propertyName>', methods=['POST'])(BuyerAddSoldListingToFavoritesController.postFavoriteListing)
BuyerRetrieveREAListController.route('/BuyerRetrieveREAList', methods=['GET'])(BuyerRetrieveREAListController.getREAList)
BuyerSearchREAController.route('/BuyerSearchREA', methods=['POST'])(BuyerSearchREAController.query)
BuyerRetrieveFavoriteListController.route('/BuyerRetrieveFavoriteList', methods=['GET'])(BuyerRetrieveFavoriteListController.getFavoriteList)
BuyerViewFavoriteListingController.route('/BuyerViewFavoriteListing/<propertyName>', methods=['GET'])(BuyerViewFavoriteListingController.getFavoriteProperty)
BuyerCalculateMortgageController.route('/BuyerCalculateMortgage', methods=['POST'])(BuyerCalculateMortgageController.getMortgage)


#SA
app.register_blueprint(loginController)
app.register_blueprint(SACreateUAController)
app.register_blueprint(SACreateUPController)
app.register_blueprint(SARetrieveUAListController)
app.register_blueprint(SAViewUPController)
app.register_blueprint(SAViewUAController)
app.register_blueprint(SASearchUAController)
app.register_blueprint(SASearchUPController)
app.register_blueprint(SAUpdateUAController)
app.register_blueprint(SARetrieveUPListController)
app.register_blueprint(SAUpdateUPController)
app.register_blueprint(SASuspendUAController)
app.register_blueprint(SASuspendUPController)


#REA
app.register_blueprint(REAViewREACredentialsController)
app.register_blueprint(REAUpdateREACredentialsController)
app.register_blueprint(REACreateListingController)
app.register_blueprint(REARetrieveListingListController)
app.register_blueprint(REAViewListingController)
app.register_blueprint(REAUpdateListingController)
app.register_blueprint(REASearchListingController)
app.register_blueprint(READeleteListingController)
app.register_blueprint(REAViewRatingController)
app.register_blueprint(REAViewReviewController)
app.register_blueprint(REAViewViewCountController)
app.register_blueprint(REAViewFavoriteCountController)


#SELLER
app.register_blueprint(SellerRetrieveListingListController)
app.register_blueprint(SellerViewListingController)
app.register_blueprint(SellerViewREACredentialsController)
app.register_blueprint(SellerRateREAController)
app.register_blueprint(SellerReviewREAController)
app.register_blueprint(SellerViewRatingsController)
app.register_blueprint(SellerViewReviewsController)
app.register_blueprint(SellerViewViewCountController)
app.register_blueprint(SellerViewFavoriteCountController)
app.register_blueprint(SellerRetrieveREAListController)
app.register_blueprint(SellerSearchREAController)


#BUYER
app.register_blueprint(BuyerRetrieveNewListingListController)
app.register_blueprint(BuyerRetrieveSoldListingListController)
app.register_blueprint(BuyerViewNewListingController)
app.register_blueprint(BuyerSearchNewListingController)
app.register_blueprint(BuyerViewSoldListingController)
app.register_blueprint(BuyerSearchSoldListingController)
app.register_blueprint(BuyerViewREACredentialsController)
app.register_blueprint(BuyerRateREAController)
app.register_blueprint(BuyerReviewREAController)
app.register_blueprint(BuyerViewRatingsController)
app.register_blueprint(BuyerViewReviewsController)
app.register_blueprint(BuyerAddNewListingToFavoritesController)
app.register_blueprint(BuyerAddSoldListingToFavoritesController)
app.register_blueprint(BuyerRetrieveREAListController)
app.register_blueprint(BuyerSearchREAController)
app.register_blueprint(BuyerRetrieveFavoriteListController)
app.register_blueprint(BuyerViewFavoriteListingController)
app.register_blueprint(BuyerCalculateMortgageController)


from .Base64Converter import image_to_base64

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
    # }

    # reaData = { 
    #     'id' : 1,
    #     'username' : "alex",
    #     'experience' : "good experience",
    #     'license' : "Pretty good",
    #     'language' : "espaniol",
    #     'service' : "you are my specialz",
    #     'about' : "this is aleks",
    #     'award' : "none"
    # }

    # 2,edrick,image,,,,,,

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

    # insert into propertyListing values  (1,"Hillview Ave","tiffany","alex",0,58);
    # insert into propertyListing values  (2,"Mirage Towers","tiffany","alex",0,50);
    # insert into propertyListing values  (3,"Lion Towers","kevin","alex",0,50);
    # insert into propertyListing values  (4,"Jardin","kevin","edrick",1,53);




    # insert into propertyListing values (1,"Hillview Ave","tiffany","alex",0,100,50);

    # insert into propertyListing values  (2,"Mirage Towers","tiffany","alex",0,70,20);

    # insert into propertyListing values  (3,"Lion Towers","kevin","alex",0,80,10);

    # insert into propertyListing values  (4,"Jardin","kevin","edrick",1,120,70);