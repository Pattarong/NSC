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
     let respone = await this.service.login_user(this.Login_form.value);
    if (respone) {
      this.router.navigate(["user-mode"]);
      this.Warning = "";
    }
    else {
      this.Warning = "Try Again";
    }
  }

}
