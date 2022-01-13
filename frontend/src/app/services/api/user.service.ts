import { Injectable } from '@angular/core';
import axiosClient from "../../httpclient/http_client"
import { LoginUser } from 'src/app/interface/login-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  db = axiosClient
  Api = "http://127.0.0.1:5000"
  constructor() { }
  async login_user(data : LoginUser){
    let check_email_password = await this.db.post(this.Api+"/login",{"email" : data.email,"password" : data.password});
    return check_email_password.data;
  }
}
