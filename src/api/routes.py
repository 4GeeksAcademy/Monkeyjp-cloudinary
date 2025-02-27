"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os

#Cloudinary
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url 

cloudinary.config( 
    cloud_name = os.getenv('CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'), 
    api_secret = os.getenv('CLOUDINARY_API_SECRET'), # Click 'View API Keys' above to copy your API secret
    secure=True
)



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/img', methods=["POST"])
def upload_image():
    img = request.files["img"]
    #print(img)
    img_url = cloudinary.uploader.upload(img)
    #print(img_url)


    return jsonify({"img": img_url["url"]}), 200