import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setting-lesson',
  templateUrl: './setting-lesson.component.html',
  styleUrls: ['./setting-lesson.component.scss']
})
export class SettingLessonComponent implements OnInit {
  lid = ""
  clid = ""
  uid = ""
  res_data = []
  name : any = ""
  select_deadline = 'None'
  select_mindmap = 'None'
  status_deadline = false
  datetime_ : any= "None"
  res_lesson : any = {}
  type_question : number = 1
  res_dataquestion : any
  constructor(private a_router : ActivatedRoute,
              private service  : UserService,
              private router   : Router) { }

  async ngOnInit() {
    this.lid = this.a_router.snapshot.params["lid"]
    this.clid = this.a_router.snapshot.params["clid"]
    this.uid = this.a_router.snapshot.params["uid"]
    this.name = await this.service.name_lesson(this.lid)
    this.res_lesson = await this.service.data_lesson(this.lid)
    this.select_deadline = await this.res_lesson.deadline
    this.datetime_ = new Date(await this.res_lesson.deadline)
    this.res_dataquestion = await this.service.find_question(this.lid)
  }
  Check(){
    this.status_deadline = !this.status_deadline
    console.log(this.status_deadline)
  }
  Set_Datetime(datetime : string){
    this.datetime_ = new Date(datetime)
  }
  Change_datetime(){
    if (this.select_deadline == 'None'){
      this.select_deadline = 'None'
    }
  }
  async add_question(){
    let data = {
      "pattern" : {
        "type" : this.type_question
      },
      "time" : "",
      "point" : 0
    }
    let res = await this.service.add_question(this.lid,data)
    this.res_dataquestion = await this.service.find_question(this.lid)
    console.log("Status > "+res )
  }
  goTo_editclassroom(){
    this.router.navigate(["edit/lesson/"+this.clid+"/"+this.uid])
  }
  goTo_login(){
    this.router.navigate(["login"])
  }
}
