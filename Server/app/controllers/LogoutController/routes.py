from flask import request, jsonify, Blueprint
from .controller import LogoutController

router = Blueprint('logout', __name__)

@router.route('/logout', methods=['GET', 'POST'])
def logout():
    controller = LogoutController()
    logout = controller.logoutUser()
    return logout