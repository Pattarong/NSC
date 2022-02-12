import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
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
  select_deadline : any = 'None'
  select_mindmap = 'None'
  status_deadline = false
  datetime_ : any= "None"
  res_lesson : any = {}
  type_question : number = 1
  res_dataquestion : any
  name_lesson = new FormControl('')
  path_file = ''
  constructor(private a_router : ActivatedRoute,
              private service  : UserService,
              private router   : Router) { }

  async ngOnInit() {
    this.lid = this.a_router.snapshot.params["lid"]
    this.clid = this.a_router.snapshot.params["clid"]
    this.uid = this.a_router.snapshot.params["uid"]
    this.res_dataquestion = await this.service.find_question(this.lid)
    this.name = await this.service.name_lesson(this.lid)
    this.name_lesson.setValue(this.name)
    this.res_lesson = await this.service.data_lesson(this.lid)
    this.select_deadline = await this.res_lesson.deadline
    this.datetime_ = new Date(await this.res_lesson.deadline)


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
  goToeditclassroom(){
    this.router.navigate(["edit/lesson/"+this.clid+"/"+this.uid])
  }
  goTologin(){
    this.router.navigate(["login"])
  }
  Save_File(path : string){
    this.path_file = path
  }
}
