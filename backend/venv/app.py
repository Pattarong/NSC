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

#Teacher Home Page================================================================================================================
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
@app.route("/home/teacher/delete_classroom",methods = ["DELETE"])
def delete_home_teacher () :
    data_json = request.get_json()
    try :
        get_database("users").update_many({},{"$pull":{"id_classroom":data_json["id_classroom"]}})
        list_lesson = get_database("classroom").find_one({"id_classroom":data_json["id_classroom"]},{"_id":0,"id_lesson":1})["id_lesson"]
        get_database("classroom").delete_one({"id_classroom":data_json["id_classroom"]})
        get_database("question").delete_many({"id_lesson":{"$in" : list_lesson}})
        get_database("max_question").delete_many({"id_classroom":data_json["id_classroom"]})
        get_database("file_lesson").delete_many({"id_lesson":{"$in" : list_lesson}})
        get_database("studentboard").delete_many({"id_classroom": data_json["id_classroom"]})
    except :
        return jsonify(False)
    return jsonify(True)

#USER in class==========================================================================
@app.route("/users_classroom/teacher",methods = ["POST"])
def users_classroom () :
    data_json = request.get_json()
    try :
        result = list(get_database("studentboard").find({"id_classroom":data_json["id_classroom"]},{"_id":0,"id_user":1,"id_lesson" :1,"id_classroom":1,"status": 1}))
        print(result)
    except :
        return jsonify(False)
    return jsonify(result)

#LESSON in class========================================================================

@app.route("/lesson_classroom/teacher",methods = ["POST"])
def get_lessson_classroom () :
    data_json = request.get_json()
    result = []
    try :
        list_lesson = get_database("classroom").find_one({"id_classroom": data_json["id_classroom"]},{"_id":0,"id_lesson":1})["id_lesson"]
        result = list(get_database("file_lesson").find({"id_lesson" : {"$in" : list_lesson}},{"_id":0,"id_lesson":1,"hide" : 1,"name":1,"deadline":1,"lesson_picture":1}))
    except :
        jsonify(False)
    return jsonify(result)

@app.route("/lesson_classroom/add/teacher",methods = ["POST"])
def add_lessson_classroom () :
    data_json = request.get_json()
    lid = "L"+str(max_CL_L_U("max_lesson"))
    deadline = None if data_json["deadline"] == "None"  else  data_json["deadline"] 
    mindmap = None if data_json["mindmap"] == "None"  else  "mindmap/"+lid 
    document = None if data_json["document_file"] == "None"  else  "doc/"+lid 
    lp = None if data_json["lesson_picture"] == "None"  else  "lp/"+lid 
    create = {
        "id_lesson" : lid,
        "document_file" : document,
        "vdo_file" : "vdo/"+lid,
        "deadline" : deadline,
        "mindmap" : mindmap,
        "hide" : True,
        "lesson_picture" : lp,
        "name" : data_json["name"]
    }
    try :
        get_database("file_lesson").insert_one(create)
        get_database("classroom").update_one({"id_classroom" : data_json["id_classroom"]},{"$push" : {"id_lesson" : lid}})
    except :
        return jsonify(False)
    return jsonify(True)