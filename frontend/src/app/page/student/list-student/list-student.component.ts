import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  res_data:any = {}
  @Input() data_classroom : any[] | undefined
  @Input() uid : string | undefined
  constructor(
    private service : UserService,
    private router : Router
  ) { }

  async ngOnInit() {
  }
  goTo_Lesson(clid : string){
    this.router.navigate(["lesson/stu/"+this.uid+"/"+clid])
  }
}
