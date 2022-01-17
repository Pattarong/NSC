import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {
  name_lesson = new FormControl('');
  clid = ""
  uid = ""
  name_classroom = {"name_classroom" : ""}
  res_data : any = {
    "name" : "Not",
    "surename" : "Found"
  }
  res_lesson:any
  constructor(
    private a_router : ActivatedRoute,
    private router :Router,
    private service : UserService
  ) { }

  async ngOnInit(){
    this.clid = this.a_router.snapshot.params["clid"];
    this.uid =  this.a_router.snapshot.params["uid"];
    this.res_data =   await this.service.teacher_home(this.uid);
    this.res_lesson = await this.service.call_lesson(this.clid);
    this.name_classroom = await this.service.name_classroom(this.clid);
    console.log(this.clid)
    console.log(this.uid)
    console.log(this.res_data)
  }
  goToLink(Link : string,Param : boolean){
    if (Param){
      this.router.navigate([Link+"/"+this.uid]);
    }
    else{
      this.router.navigate([Link]);
    }
  }
  add_lesson(){

  }
}
