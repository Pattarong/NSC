import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router : Router,private service : UserService) { }
  Login_form = new FormGroup({
    "email" : new FormControl(''),
    "password" : new FormControl('')
  });
  Warning = "";

  ngOnInit(): void {
  }
  async Login(){
     let res = await this.service.login_user(this.Login_form.value);
    if (res["succes"]) {
      this.router.navigate(["student/home/"+res.id]);
      this.Warning = "";
    }
    else {
      this.Warning = "Try Again";
    }
  }
  goToLink(Link : string){
    this.router.navigate([Link])
  }

}
