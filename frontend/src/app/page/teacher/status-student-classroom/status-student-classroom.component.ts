import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-status-student-classroom',
  templateUrl: './status-student-classroom.component.html',
  styleUrls: ['./status-student-classroom.component.scss']
})
export class StatusStudentClassroomComponent implements OnInit {
  @Input() clid = ""
  selected = 'option2';
  student_lesson:any = [];
  constructor(private service : UserService) { }
  res_data : any
  async ngOnInit(){
    this.res_data = await this.service.user_classroom(this.clid)
    console.log(this.res_data)
    console.log(this.selected)
  }
  lesson_status(){

  }

}
