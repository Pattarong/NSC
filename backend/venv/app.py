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
def max_Q (lid) :
    max = get_database("max_question").find_one({"id_lesson":lid},{"_id" : 0,"max_question" : 1})["max_question"]
    get_database("max_question").update_one({"id_lesson":lid},{"$set" : {"max_question": max+1}})
    result = get_database("max_question").find_one({"id_lesson":lid},{"_id" : 0,"max_question" : 1})["max_question"]
    return result

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
    data_classroom = list(get_database("classroom").find({"owner": uid},{"_id" : 0,"id_lesson":0,"owner" : 0}))
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

@app.route("/lesson_classroom/teacher/<clid>",methods = ["POST"])
def get_lessson_classroom (clid) :
    data_json = request.get_json()
    result = []
    try :
        list_lesson = get_database("classroom").find_one({"id_classroom": clid},{"_id":0,"id_lesson":1})["id_lesson"]
        result = list(get_database("file_lesson").find({"id_lesson" : {"$in" : list_lesson}},{"_id":0,"id_lesson":1,"hide" : 1,"name":1,"deadline":1,"lesson_picture":1}))
    except :
        jsonify(False)
    return jsonify(result)

@app.route("/lesson_classroom/add/teacher/<clid>",methods = ["POST"])
def add_lessson_classroom (clid) :
    data_json = request.get_json()
    lid = "L"+str(max_CL_L_U("max_lesson"))
    deadline = None if data_json["deadline"] == "None"  else  data_json["deadline"] 
    lp = None if data_json["lesson_picture"] == "None"  else  "lp/"+lid 
    create = {
        "id_lesson" : lid,
        "document_file" : "doc/",
        "vdo_file" : "vdo/",
        "deadline" : deadline,
        "mindmap" : "mindmap"+lid,
        "hide" : True,
        "lesson_picture" : lp,
        "name" : data_json["name"]
    }
    try :
        get_database("file_lesson").insert_one(create)
        get_database("classroom").update_one({"id_classroom" :clid},{"$push" : {"id_lesson" : lid}})
    except :
        return jsonify(False)
    return jsonify(True)
@app.route("/lesson_classroom/delete/teacher/<lid>",methods = ["DELETE"])
def delete_lessson_classroom (lid) :
    try :
        get_database("file_lesson").delete_one({"id_lesson" : lid})
        get_database("question").delete_many({"id_lesson" : lid})
        get_database("max_question").delete_one({"id_lesson" : lid})
        get_database("classroom").update_one({"id_lesson" : {"$elemMatch" : {"$eq" : lid}}},{"$pull" : {"id_lesson" : lid}})
    except :
        jsonify(False)
    return jsonify(True)
#Edit Lesson and Question=================================================================
@app.route("/lesson_classroom/edit_lesson/teacher/<lid>",methods = ["PATCH"])
def edit_lessson_classroom (lid) :
    data_json = request.get_json()
    try :
        if  data_json["lesson"] != {} :
            get_database("file_lesson").update_one({"id_lesson" : lid},{"$set" : data_json["lesson"]})
        if data_json["question"] != [] :
            for question in data_json["question"] :
                if question["id_question"] == "None" :
                    question["id_lesson"] = lid
                    question["id_question"] = "Q"+str(max_Q(lid))
                    get_database("question").insert_one(question)
                else :
                    get_database("question").update_one({"id_lesson":lid,"id_question" : question["id_question"]},{"$set" : question})
        if data_json["list_delete"] != [] :
            get_database("question").delete_many({"id_lesson" : lid,"id_question" : {"$in" : data_json["list_delete"]}})
            pull = { "$pull" : 
            {"answer_student" : {"id_question" : {"$in" : data_json["list_delete"]}}}}
            get_database("studentboard").update_many({"id_lesson" : lid},pull)
            pull = { "$pull" : 
            {"point" : {"id_question" : {"$in" : data_json["list_delete"]}}}}
            get_database("studentboard").update_many({"id_lesson" : lid},pull)
    except :
        jsonify(False)
    return jsonify(True)
#1212121212121212121212
#11111111111111111111111111111111111111111111111111111
@app.route("/home/user/<uid>",methods = ["GET"])
def get_home_user (uid) :
    firstname = get_database("users").find_one({"id_user": uid},{"_id" : 0,"name":1 })
    lastname = get_database("users").find_one({"id_user": uid},{"_id" : 0,"surename":1 })
    studentID = get_database("users").find_one({"id_user": uid},{"_id" : 0,"id_student":1 })
    Email = get_database("users").find_one({"id_user": uid},{"_id" : 0,"email":1 })
    data_classroom = get_database("users").find_one({"_id" : 0,"id_classroom":1})
    get_id_classroom = data_classroom["id_classroom"]
    get_data_classroom = get_database("classroom").find({"id_classroom" : {"$in" : get_id_classroom}},{"_id" : 0,"id_classroom":1,"name_classroom" : 1 , "icon_classroom" : 1})
    result = {"name":firstname["name"],"list_classroom":get_data_classroom, "surename":lastname["surename"],"studentID":studentID["id_student"],"Email":Email["email"]}
    return jsonify(result)
print("F")