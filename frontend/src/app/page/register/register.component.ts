import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Register_form:any = new FormGroup({
    "name" : new FormControl(''),
    "surename" : new FormControl(''),
    "email" : new FormControl(''),
    "password" : new FormControl(''),
    "password_repeat" : new FormControl(''),
    "id_student" : new FormControl(''),
  });
  constructor(
    private router : Router,
    private service : UserService) { }

  ngOnInit(): void {
  }
  goToLink(Link : string){
    this.router.navigate([Link])
  }
  async register_user(){
    if (await this.Register_form["password"] === await this.Register_form["password_repeat"]){
      let res = await this.service.register_user(this.Register_form.value);
      console.log(this.Register_form["password"])
      console.log(res)
      if (res === true){
        this.goToLink("login");
      }
    }
    else{
      console.log("Status false");
    }
  }
}
