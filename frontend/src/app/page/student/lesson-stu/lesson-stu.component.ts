import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-lesson-stu',
  templateUrl: './lesson-stu.component.html',
  styleUrls: ['./lesson-stu.component.scss']
})
export class LessonStuComponent implements OnInit {
  clid : any
  uid : any
  res_data : any
  constructor(
    private a_router : ActivatedRoute,
    private service : UserService
  ) { }

  async ngOnInit() {
    this.clid =  this.a_router.snapshot.params["clid"];
    this.uid =  this.a_router.snapshot.params["uid"];
    this.res_data = await this.service.data_lesson_user(this.uid,this.clid)
    console.log(this.res_data)
  }
  goToLink(Link : string,status : boolean){

  }
}
