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
  Api = "http://127.0.0.1:5000"
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
}
