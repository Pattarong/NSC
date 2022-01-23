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
  select_datetime = "None"
  res_data : any = {
    "name" : "Not",
    "surename" : "Found"
  }
  data_add_lesson:any = {
    "deadline" : "None",
    "lesson_picture" : "",
    "name" : ""
  }
  status_layout = [true,false,false];


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
    console.log(this.res_lesson)
  }
  goToLink(Link : string,Param : boolean){
    if (Param){
      this.router.navigate([Link+"/"+this.uid]);
    }
    else{
      this.router.navigate([Link]);
    }
  }
  async add_lesson(){
    this.data_add_lesson["name"] = this.name_lesson.value;

    this.service.add_lesson(this.clid,this.data_add_lesson);
    this.data_update();
  }
  async delete_lesson(lid : string){
    this.service.delete_lesson(lid)
    this.res_data = await this.data_update()
  }
  status_change(index : number){
    for(let i = 0;i < 3;i++){
      this.status_layout[i] = false
    }
    this.status_layout[index] = true
  }
  async data_update(){
    this.res_lesson = await this.service.call_lesson(this.clid);
    window.location.reload();
  }
  goTO_setting_lesson(lid : string){
    this.router.navigate(["setting/lesson/"+this.clid+"/"+lid+"/"+this.uid])
  }
  Datetime(datetime : string){
      this.data_add_lesson["deadline"] = datetime
  }
  Change_status(){
    if(this.select_datetime == 'None'){
      this.data_add_lesson["deadline"] = 'None'
      console.log(this.data_add_lesson["deadline"])
    }

  }
}
