

from flask import Flask, jsonify, request
from bson import objectid
import hashlib
from jinja2.environment import create_cache
import random
from pymongo import results
import jwt
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
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
    max = get_database("file_lesson").find_one({"id_lesson":lid},{"_id" : 0,"max_question" : 1})["max_question"]
    get_database("file_lesson").update_one({"id_lesson":lid},{"$set" : {"max_question": max+1}})
    result = get_database("file_lesson").find_one({"id_lesson":lid},{"_id" : 0,"max_question" : 1})["max_question"]
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
    user = get_database("users").find_one({"email" : data_json["email"],"password":password},{"_id" : 0,"id_user" : 1})
    if user == None :
        return jsonify({"succes" : False})
    return jsonify({"succes" : True, "id" : user["id_user"]})

#Teacher Home Page================================================================================================================
@app.route("/home/teacher/<uid>",methods = ["GET"])
def get_home_teacher (uid) :
    teacher = get_database("users").find_one({"id_user": uid},{"_id" : 0,"name":1,"surename" : 1})
    data_classroom = list(get_database("classroom").find({"owner": uid},{"_id" : 0,"id_lesson":0,"owner" : 0}))
    result = {"name":teacher["name"],"surename":teacher["surename"],"list_classroom":data_classroom}
    return jsonify(result)

@app.route("/home/teacher/add_classroom/<uid>",methods = ["POST"])
def post_home_teacher (uid) :
    try :
        data_json = request.get_json()
        id_classroom = "CL"+str(max_CL_L_U("max_classroom"))
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
@app.route("/home/teacher/delete_classroom/<clid>",methods = ["DELETE"])
def delete_home_teacher (clid) :
    try :
        get_database("users").update_many({},{"$pull":{"id_classroom":clid}})
        list_lesson = get_database("classroom").find_one({"id_classroom":clid},{"_id":0,"id_lesson":1})["id_lesson"]
        get_database("classroom").delete_one({"id_classroom":clid})
        get_database("question").delete_many({"id_lesson":{"$in" : list_lesson}})
        get_database("file_lesson").delete_many({"id_lesson":{"$in" : list_lesson}})
        get_database("studentboard").delete_many({"id_classroom": clid})
    except :
        return jsonify(False)
    return jsonify(True)

#USER in class==========================================================================
@app.route("/users_classroom/teacher/<clid>",methods = ["GET"])
def users_classroom (clid) :
    try :
        result = {}
        result["status_user"] = list(get_database("studentboard").aggregate([
            {"$match" : {"id_classroom" : clid}},
            {"$group" : { "_id":  "$id_user","list_lesson" : { "$push": {"id_lesson" : "$id_lesson","status" : "$status"}}}},
            ])) 
        result["name_users"] = list(get_database("users").find({"id_classroom" : { "$elemMatch" : {"$eq" : clid}}},{"_id" : 0,"id_user" : 1,"name" : 1,"surename": 1,"id_student" : 1}))
    except :
        return jsonify(False)
    return jsonify(result)

#LESSON in class========================================================================

@app.route("/lesson_classroom/teacher/<clid>",methods = ["GET"])
def get_lessson_classroom (clid) :
    result = []
    try :
        list_lesson = get_database("classroom").find_one({"id_classroom": clid},{"_id":0,"id_lesson":1})["id_lesson"]
        result = list(get_database("file_lesson").find({"id_lesson" : {"$in" : list_lesson}},{"_id":0,"id_lesson":1,"hide" : 1,"name":1,"deadline":1,"lesson_picture":1}))
    except :
        jsonify(False)
    return jsonify( result)

@app.route("/lesson_classroom/add/teacher/<clid>",methods = ["POST"])
def add_lessson_classroom (clid) :
    data_json = request.get_json()
    lid = "L"+str(max_CL_L_U("max_lesson"))
    create = {
        "id_lesson" : lid,
        "document_file" : "doc/",
        "vdo_file" : "vdo/",
        "deadline" : data_json["deadline"],
        "mindmap" : "mindmap"+lid,
        "hide" : True,
        "lesson_picture" : data_json["lesson_picture"],
        "name" : data_json["name"],
        "max_question" : 0
    }
    try :
        get_database("file_lesson").insert_one(create)
        get_database("classroom").update_one({"id_classroom" :clid},{"$push" : {"id_lesson" : lid}})
    except :
        return jsonify(False)
    return jsonify(True)
@app.route("/lesson_classroom/delete/teacher/<lid>",methods = ["GET"])
def delete_lessson_classroom (lid) :
    try :
        get_database("file_lesson").delete_one({"id_lesson" : lid})
        get_database("question").delete_many({"id_lesson" : lid})
        get_database("studentboard").delete_many({"id_lesson" : lid})
        get_database("classroom").update_one({"id_lesson" : {"$elemMatch" : {"$eq" : lid}}},{"$pull" : {"id_lesson" : lid}})
    except :
        jsonify(False)
    return jsonify(True)
@app.route("/lesson_classroom/edit/teacher/<lid>",methods = ["GET"])
def edit_lessson_classroom (lid) :
    
    return
#add_question=================================================================
@app.route("/question_classroom/add/teacher/<lid>",methods = ["POST"])
def add_question_classroom (lid) :
    data_json = request.get_json()
    try :
        qid = "Q"+str(max_Q(lid))
        create = {
            "id_lesson" : lid,
            "id_question" : qid,
            "pattern" : data_json["pattern"],
            "point" : data_json["point"],
            "time" : data_json["time"]
        }
        get_database("question").insert_one(create)
        get_database("studentboard").update_many({"id_lesson" : lid},{ "$push" : {"point" : {"id_question" : qid , "point" : 0}}})
        get_database("studentboard").update_many({"id_lesson" : lid},{ "$push" : {"answer_student" : {"id_question" : qid , "answer" : ""}}})
    except :                                                       
        return jsonify(False)
    return jsonify(True)

@app.route("/question_classroom/edit/teacher/<lid>/<qid>",methods = ["PATCH"])
def edit_question_classroom (lid,qid) :
    data_json = request.get_json()
    try :
        get_database("question").update_many({"id_lesson" : lid,"id_question" : qid},{"$set" : data_json})
    except :
        jsonify(False)
    return jsonify(True)

@app.route("/question_classroom/delete/teacher/<lid>/<qid>",methods = ["DELETE"])
def delete_question_classroom (lid,qid) :
    try :
        get_database("studentboard").update_many({"id_lesson" : lid,"answer_studen" : {"$elemMatch" : {"id_question" : qid}}},{"$pull" : {"answer_studen" : {"id_question" : qid}}})
        get_database("studentboard").update_many({"id_lesson" : lid,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$pull" : {"point" : {"id_question" : qid}}})
        get_database("question").delete_many({"id_lesson" : lid,"id_question" : qid})
    except :
        jsonify(False)
    return jsonify(True)

@app.route("/question_classroom/find/teacher/<lid>",methods = ["GET"])
def find_question_classroom (lid) :
    try :
        result = list(get_database("question").find({"id_lesson" : lid},{"_id" : 0,"id_question" : 1,"pattern" : 1}))
    except :
        jsonify(False)
    return jsonify(result)
@app.route("/question_classroom/add_point/student/<uid>/<lid>/<qid>",methods = ["POST"])
def add_point_user (uid,lid,qid) :
    data_json = request.get_json()
    try :
        get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : data_json["point"]}})
    except :
        jsonify(False)
    return jsonify(True)
@app.route("/question_classroom/add_answer/student/<uid>/<lid>/<qid>",methods = ["POST"])
def check_answer_user (uid,lid,qid) :
    data_json = request.get_json()
    try : 
        type_question = get_database("question").find_one({"id_lesson" : lid,"id_question" : qid},{"_id" : 0,"pattern.type" : 1 })["pattern"]["type"]
        data_question = get_database("question").find_one({"id_lesson" : lid,"id_question" : qid},{"_id" : 0,"pattern" : 1})["pattern"]
        point = get_database("question").find_one({"id_lesson" : lid,"id_question" : qid},{"_id" : 0,"point" : 1})["point"]
        get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"answer_student" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"answer_student.$.answer" : data_json["answer"]}})
        if int(type_question) == 1 :
            if (data_question["ans_correct"][0] == data_json["answer"]) :
                get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : point}})           
            else :
                get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : 0}})
 
        elif int(type_question) == 2 :
            count = 0
            for ans in data_json["answer"] :
                if ans in data_question["ans_correct"] :
                    count = count+1
            if count == len(data_question["ans_correct"]) :
                get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : point}})
            else :
                get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : 0}})
        elif int(type_question) == 3 :
            
            text = str(data_question["equation"]) 
            equation = text.replace(data_question["variable"]["key"],data_json["variable"])
            aswer = eval(equation)
            if float(aswer) == float(data_json["answer"]):
                get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : point}})
                print(1)
            else : 
                get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : 0}})
                print(2)
        elif int(type_question) == 4 :
            get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : 0}})
        elif int(type_question) == 5 :
            get_database("studentboard").update_many({"id_user" : uid,"id_lesson" : lid ,"point" : {"$elemMatch" : {"id_question" : qid}}},{"$set" : {"point.$.point" : 0}})
        return jsonify(False)
    except :
        jsonify(False)
    return jsonify(True)

@app.route("/authen/user",methods = ["POST"])
def Authen_user() :
    data_json = request.get_json()
    try :
        password = hashlib.sha256(data_json["password"].encode()).hexdigest()
        uid = get_database("users").find_one({"email" : data_json["email"] , "password" : password},{"_id" : 0,"id_user" : 1})
        if uid != None :
            encode_jwt = jwt.encode({"uid" : uid["id_user"]},"GTO_Great_Teacher_Online_P48w90G56",algorithm="HS256")
            return jsonify({"token" : encode_jwt})
        else :
            return jsonify(False)
    except :
        return jsonify(False)


#user##########################################################################
@app.route("/home/users/classroom/allclassroom/<uid>",methods = ["GET"])
def get_home_user_classeachtime (uid) :
    data_profile = get_database("users").find_one({"id_user": uid},{"_id" : 0,"password":0 ,"id_classroom" : 0})
    data_classroom = get_database("users").find_one({"id_user": uid},{"_id" : 0,"id_classroom" : 1})["id_classroom"]
    get_nameclassroom = list(get_database("classroom").find({"id_classroom" : {"$in" : data_classroom}},{"_id":0 , "name_classroom": 1, "icon_classroom" : 1, "id_classroom" : 1}))
    result = {"data":data_profile , "dataclassroom" :get_nameclassroom }
    return jsonify(result)

@app.route("/home/users/classroom/<uid>/<clid>",methods = ["GET"])
def get_home_user_classroom_in (uid,clid) :
    data_profile = get_database("users").find_one({"id_user": uid},{"_id" : 0,"password":0 ,"id_classroom" : 0})
    data_in_classroom = get_database("classroom").find_one({ "id_classroom" : clid},{"_id" : 0,"owner" : 0,"id_lesson" : 0})
    data_classroom_lesson = (get_database("classroom").find_one({"id_classroom" :clid},{"_id":0 , "id_lesson" : 1}))["id_lesson"]
    get_namelesson = list(get_database("file_lesson").find({ "id_lesson" : { "$in" : list(data_classroom_lesson)}},{"_id":0 , "id_lesson" : 1 ,"name" :1}))
    result = {"data":data_profile , "in_classroom" : data_in_classroom , "lesson" : data_classroom_lesson, "name_lesson" : get_namelesson}
    return jsonify(result)
############################

@app.route("/name_classroom/<clid>",methods = ["GET"])
def name_classroom (clid) :
    name = get_database("classroom").find_one({"id_classroom" : clid},{"_id" : 0,"name_classroom" : 1})["name_classroom"]
    return jsonify({"name_classroom" : name})

@app.route("/name_lesson/<lid>",methods = ["GET"])
def name_lesson (lid) :
    name = get_database("file_lesson").find_one({"id_lesson" : lid},{"_id" : 0,"name" : 1})["name"]
    return jsonify(name)

@app.route("/data_lesson/<lid>",methods = ["GET"])
def data_lesson (lid) :
    result = get_database("file_lesson").find_one({"id_lesson" : lid},{"_id" : 0})
    return jsonify(result)


@app.route("/home/users/classroom/lesson/<uid>/<lid>/<qid>",methods = ["GET"])
def get_home_user_lesson_question (uid,lid,qid) :
    data_profile = get_database("users").find_one({"id_user": uid},{"_id" : 0,"password":0 ,"id_classroom" : 0})
    get_file_lesson = get_database("file_lesson").find_one({ "id_lesson" : lid},{"_id":0 , "hide" :0 ,"max_question": 0})
    check_type = list(get_database("question").find({"id_question" : qid ,"id_lesson" : lid},{"_id" : 0 ,"pattern" : {"type" : 1}}))
    print(check_type[0]["pattern"]["type"])
    print(type(check_type[0]["pattern"]["type"]))
    if check_type[0]["pattern"]["type"] == 1 or check_type[0]["pattern"]["type"] ==  2 :
        get_choice = list(get_database("question").find({"id_question" : qid ,"id_lesson" : lid},{"_id" : 0 ,"pattern" : {"ans_correct" : 1 , "ans_incorrect" : 1}}))
        get_sum_choice = get_choice[0]["pattern"]["ans_correct"] + get_choice[0]["pattern"]["ans_incorrect"]
        get_sum_choice_random = random.sample(get_sum_choice,len(get_sum_choice))
       
        data_question = list(get_database("question").aggregate([
            {
                "$match" : {"$and" : [{"id_lesson" :lid },{"id_question" : qid}]}
            },
            {
            "$project" : 
            {
                "_id" : 0 ,
                "id_lesson" : 1 ,
                "id_question" : 1 ,
                "time" : 1 ,
                "pattern" : 
                {
                    "type" : 1 ,
                    "question" : 1 ,
                    "choice" : get_sum_choice_random
                }
            }
            }
        ]))
    elif check_type[0]["pattern"]["type"] == 3 :
        get_choice = (get_database("question").find_one({"id_question" : qid ,"id_lesson" : lid},{"_id" : 0 ,"pattern" : {"variable" : 1 }})["pattern"]["variable"])
        variable = get_choice
        data_question = list(get_database("question").aggregate([
            {
                "$match" : {"$and" : [{"id_lesson" :lid },{"id_question" : qid}]}
            },
            {
            "$project" : 
            {
                "_id" : 0 ,
                "id_lesson" : 1 ,
                "id_question" : 1 ,
                "time" : 1 ,
                "pattern" : 
                {
                    "type" : 1 ,
                    "question" : 1 ,
                    "variable" : variable
                }
            }
            }
        ]))
    elif check_type[0]["pattern"]["type"] == 4 or check_type[0]["pattern"]["type"] ==  5 :
        data_question = list(get_database("question").aggregate([
            {
                "$match" : {"$and" : [{"id_lesson" :lid },{"id_question" : qid}]}
            },
            {
            "$project" : 
            {
                "_id" : 0 ,
                "id_lesson" : 1 ,
                "id_question" : 1 ,
                "time" : 1 ,
                "pattern" : 1
                
            }
            }
        ]))
    
    result = {"data_profile" : data_profile , "lesson" : get_file_lesson  , "data_question" : data_question[0]}
    return jsonify(result)

@app.route("/home/users/classroom/allclassroom/add_classroom/<uid>",methods = ["POST"])
def add_classroom_stu (uid) :
    data_json = request.get_json()
    print(data_json)
    count = 0 
    all_classroom = list(get_database("classroom").find({},{"_id" : 0 , "id_classroom" : 1}))
    classroom_in_user = list(get_database("users").find({"id_user" : uid},{"_id" : 0 , "id_classroom" : 1}))
    try :
       for j in range(len(classroom_in_user[0]["id_classroom"])) :
           if data_json["id_classroom"] == classroom_in_user[0]["id_classroom"][j]:
               return jsonify({"status" : "alreadly added"})
           elif data_json["id_classroom"] != classroom_in_user[0]["id_classroom"][j]:
               count+=1
       if count == len(classroom_in_user[0]["id_classroom"]) :
            for i in range(len(all_classroom)) :
                if data_json["id_classroom"] == all_classroom[i]["id_classroom"] :
                    get_database("users").update_many({"id_user" : uid},{ "$push" : {"id_classroom" : data_json["id_classroom"]}})
                    lesson = get_database("classroom").find_one({"id_classroom" :data_json["id_classroom"] },{"_id" : 0 , "id_lesson" : 1})["id_lesson"]
                    for p in range(len(lesson)) :
                        create = {
                        "id_user" : uid,
                        "id_classroom" : data_json["id_classroom"],
                        "id_lesson" : lesson[p],
                        "point" : [],
                        "answer_studen" : [],
                        "start" : "",
                        "end" : "" ,
                        "time" : "" ,
                        "lasttime" : "" ,
                        "status" : "True" ,
                        }
                        get_database("studentboard").insert_one(create)

                    return jsonify(True)           
                else :
                    pass
            return jsonify(False)
       else :
           return jsonify(False)
                
    except :
        return jsonify(False)
    
    return jsonify(True)

@app.route("/home/users/classroom/priority/<uid>",methods = ["GET"])
def get_home_user_class_priority (uid) :
    print(uid)
    print(type(uid))
    data_profile = get_database("users").find_one({"id_user": uid},{"_id" : 0,"password":0 ,"id_classroom" : 0})
    data_classroom = get_database("users").find_one({"id_user": uid},{"_id" : 0,"id_classroom" : 1})["id_classroom"]
    get_nameclassroom = list(get_database("classroom").find({"id_classroom" : {"$in" : data_classroom}},{"_id":0 , "name_classroom": 1, "id_classroom" : 1, "id_lesson" : 1}))
    get_stu_status = list(get_database("studentboard").find({"id_user":uid ,"id_classroom" : {"$in" : list(data_classroom)}},{"_id":0 ,"id_classroom" : 1,"id_lesson" : 1,"time" :1}))
    #print(len(get_nameclassroom))
    #print(get_nameclassroom[0])
    for i in range(len(get_nameclassroom)) :
        if len(get_nameclassroom[i]["id_lesson"]) == 0 :
            #print(get_nameclassroom[i]["id_classroom"],"empty lesson")
            pass
        else :
            #print(get_nameclassroom[i]["id_lesson"],"have lesson")
            
            for j in range(len(get_nameclassroom[i]["id_lesson"])) :
                name_lesson = list(get_database("file_lesson").aggregate([
                        {
                            "$match" : {"id_lesson" : get_nameclassroom[i]["id_lesson"][j] }
                        },
                        {
                        "$project" :
                            {
                                "_id" : 0 ,
                                "id_lesson" : 1 ,
                                "name" :1 ,
                                "deadline" : 1
                            }
                        
                        }    
                ]))
                if len(name_lesson) == 0 :
                    pass
                else :
                    #print(name_lesson[0])
                    get_nameclassroom[i]["id_lesson"][j] = name_lesson[0]
                    for p in range(len(get_stu_status)) :
                        if get_stu_status[p]["id_classroom"] == get_nameclassroom[i]["id_classroom"] and get_stu_status[p]["id_lesson"] == get_nameclassroom[i]["id_lesson"][j]["id_lesson"] :

                            get_nameclassroom[i]["id_lesson"][j]["time"] = (get_stu_status[p]["time"])
                        else :
                            pass
    result = {"data":data_profile , "dataclassroom" :get_nameclassroom   }
    return jsonify(result) 
@app.route("/edit/filelesson/<lid>",methods = ["PATCH"])
def Edit_lesson(lid) :
    data_json = request.get_json()
    get_database("file_lesson").update_one({"id_lesson" : lid},{"$set" : data_json})