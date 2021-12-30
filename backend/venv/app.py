from flask import Flask, jsonify, request
from bson import objectid
import hashlib

app = Flask(__name__)

if __name__ == "__main__" :
    app.run(host="0.0.0.0")