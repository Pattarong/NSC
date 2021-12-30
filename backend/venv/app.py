from flask import Flask, json, jsonify, request
from bson import objectid
import hashlib

from jinja2.environment import create_cache

app = Flask(__name__)

if __name__ == "__main__" :
    app.run(host="0.0.0.0")
def max_CL_L_U(type):
    max =  get_database("static_max").find_one({"_id" : objectid.ObjectId("61cdccbb8acd724d42dfc36f")},{"_id" : 0})
    max[type] = max[type]+1
    get_database("static_max").update_one({"_id" : objectid.ObjectId("61cdccbb8acd724d42dfc36f")},{"$set" : max})
    return max[type]
def get_database(collection) :
    from pymongo import MongoClient
    client = MongoClient("mongodb+srv://Pattarong:1@cluster0.qnbhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client["GTO"]
    return db[collection]

@app.route("/users",methods = ["GET"])
def get_users () :
    users = list(get_database("users").find({},{"_id" : 0}))
    return jsonify(users)

@app.route("/register",methods = ["POST"])
def post_users () :
    data_json = request.get_json()
    find = get_database("users").find_one({"email" : data_json["email"]},{"_id" : 0})
    try :
        if find != None :
            return jsonify(False)
        uid =  "U"+str(max_CL_L_U("max_user"))
        password = hashlib.sha256(data_json["password"].encode()).hexdigest()
        create = {
        "name": data_json["name"],
        "email": data_json["email"],
        "id_classroom": [],
        "id_student": data_json["id_student"],
        "password": password,
        "profile_picture": "profile/"+uid,
        "surename": data_json["surename"],
        "id_user": uid
        }
        get_database("users").insert_one(create)
    except :
        return jsonify(False)
    return jsonify(True)
@app.route("/login",methods = ["POST"])
def post_user_login () :
    data_json = request.get_json()
    password = hashlib.sha256(data_json["password"].encode()).hexdigest()
    user = get_database("users").find_one({"email" : data_json["email"],"password":password},{"_id" : 0})
    if user == None :
        return jsonify(False)
    return jsonify(True)

#Teacher Home Page
@app.route("/home/teacher/<uid>",methods = ["GET"])
def get_home_teacher (uid) :
    teacher = get_database("users").find_one({"id_user": uid},{"_id" : 0,"name":1})
    data_classroom = list(get_database("classroom").find({"owner": uid},{"_id" : 0,"name":1,"icon_classroom":1,"id_classroom":1}))
    result = {"name":teacher["name"],"list_classroom":data_classroom}
    return jsonify(result)

@app.route("/home/teacher/add_classroom/<uid>",methods = ["POST"])
def post_home_teacher (uid) :
    try :
        max_classroom = max_CL_L_U("max_classroom")
        data_json = request.get_json()
        id_classroom = "CL"+str(max_classroom)
        create = {
            "id_classroom" : id_classroom,
            "id_lesson" : [],
            "name_classroom" : data_json["name_classroom"],
            "owner" : uid
        }
        get_database("classroom").insert_one(create)
    except :
        return jsonify(False)
    return jsonify(True)
