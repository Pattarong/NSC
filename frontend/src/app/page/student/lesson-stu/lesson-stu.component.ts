import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-lesson-stu',
  templateUrl: './lesson-stu.component.html',
  styleUrls: ['./lesson-stu.component.scss']
})
export class LessonStuComponent implements OnInit {
  clid : any
  uid : any
  res_data : any= {
    "data" : {
      "name" : "",
      "surename" : ""
    }}
  constructor(
    private a_router : ActivatedRoute,
    private service : UserService,
    private router : Router
  ) { }

  async ngOnInit() {
    this.clid =  this.a_router.snapshot.params["clid"];
    this.uid =  this.a_router.snapshot.params["uid"];
    this.res_data = await this.service.data_lesson_user(this.uid,this.clid)
    console.log(this.res_data)
  }
  Start_Learn(lid : string){
    this.router.navigate(["learn/lesson/"+this.uid+"/"+this.clid+"/"+lid])
  }
  goToHome(){
    this.router.navigate(["student/home/"+this.uid])
  }
}
