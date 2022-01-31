import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-learn-lesson',
  templateUrl: './learn-lesson.component.html',
  styleUrls: ['./learn-lesson.component.scss']
})
export class LearnLessonComponent implements OnInit {
  uid = ""
  lid = ""
  clid = ""
  list_question : any
  constructor(
  private router : Router,
  private a_router : ActivatedRoute,
  private service : UserService) { }

  async ngOnInit() {
    this.clid =  this.a_router.snapshot.params["clid"];
    this.uid =  this.a_router.snapshot.params["uid"];
    this.lid =  this.a_router.snapshot.params["lid"];
    this.list_question = await this.service.find_question(this.lid)
    console.log(this.list_question)
  }
  goToLesson(){
    this.router.navigate(["lesson/stu/"+this.uid+"/"+this.clid])
  }

}
