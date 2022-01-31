import { Injectable } from '@angular/core';
import axiosClient from "../../httpclient/http_client"
import { LoginUser,RegisterUser,AddClassroom } from 'src/app/interface/User';
import { Router } from '@angular/router';
Router
@Injectable({
  providedIn: 'root'
})
export class UserService {
  db = axiosClient
  Api = "https://great-teacher-online.herokuapp.com"
  res : any;
  constructor() { }
  async login_user(data : LoginUser){
    let check_email_password = await this.db.post(this.Api+"/login",{"email" : data.email,"password" : data.password});
    return check_email_password.data;
  }
  async teacher_home(uid : String){
    if (uid){
      this.res = await this.db.get(this.Api+"/home/teacher/"+uid);
    }
    else {
      return {}
    }
    return this.res.data;
  }
  async register_user(data : RegisterUser){
    let res = await this.db.post(this.Api+"/register",{
        "email" : data.email,
        "password" : data.password ,
        "surename" : data.surename,
        "name" : data.name,
        "id_student" : data.id_student});
    return res.data;
  }
  async add_classroom(data : AddClassroom,uid:string){
    let res = await this.db.post(this.Api+"/home/teacher/add_classroom/"+uid,{
        "name_classroom" : data.name_classroom});
    return res.data;
  }
  async delete_classroom(clid : string) {
      await this.db.delete(this.Api+"/home/teacher/delete_classroom/"+clid,)
  }
  async call_lesson(clid : string) {
    this.res = await this.db.get(this.Api+"/lesson_classroom/teacher/"+clid)
    return  this.res.data;
  }
  async name_classroom(clid : string){
    this.res = await this.db.get(this.Api+"/name_classroom/"+clid)
    return this.res.data;
  }
  async delete_lesson(lid : string){
    await this.db.get(this.Api+"/lesson_classroom/delete/teacher/"+lid)
  }
  async add_lesson(clid : string,data : any){
    await this.db.post(this.Api+"/lesson_classroom/add/teacher/"+clid,data)
  }
  async user_classroom(clid : string){
    this.res = await this.db.get(this.Api+"/users_classroom/teacher/"+clid)
    return this.res.data;
  }
  async name_lesson(lid : string){
    this.res = await this.db.get(this.Api+"/name_lesson/"+lid)
    return this.res.data
  }
  async data_lesson(lid : string){
    this.res = await this.db.get(this.Api+"/data_lesson/"+lid)
    return this.res.data
  }
  async add_question(lid : string,data : any){
    this.res = await this.db.post(this.Api+"/question_classroom/add/teacher/"+lid,data)
  }
  async find_question(lid : string){
    this.res = await this.db.get(this.Api+"/question_classroom/find/teacher/"+lid)
    return this.res.data
  }
  async data_classroom_user(uid : string){
    this.res = await this.db.get(this.Api+"/home/users/classroom/allclassroom/"+uid)
    return this.res.data
  }
  async data_lesson_user(uid : string,clid : string){
    this.res = await this.db.get(this.Api+"/home/users/classroom/"+uid+"/"+clid)
    return this.res.data
  }
  async edit_question(lid : string,qid : string,data : any){
    this.db.patch(this.Api+"/question_classroom/edit/teacher/"+lid+"/"+qid,data)
  }
  async data_question(uid : string,lid : string,qid : string){
    this.res = await this.db.get(this.Api+"/home/users/classroom/lesson/"+uid+"/"+lid+"/"+qid)
    return this.res.data
  }
  async Add_Classroom_New(uid : string,clid : string){
    this.res = await this.db.post(this.Api+"/home/users/classroom/allclassroom/add_classroom/"+uid,{"id_classroom" : clid})
    this.res.data
  }
  async Table(uid : string){
    this.res = await this.db.get(this.Api+"/home/users/classroom/priority/"+uid)
    return await this.res.data
  }
  async Edit_Filelesson(lid : string,data : any){
    this.res = await this.db.patch(this.Api+"/edit/filelesson/"+lid,data)
  }
  async Send_Answer (lid : string,uid : string,qid : string,data : any){
    this.res = await this.db.post(this.Api+"/question_classroom/add_answer/student/"+uid+"/"+lid+"/"+qid,data)
    return this.res.data
  }
}
