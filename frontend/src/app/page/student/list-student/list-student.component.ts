import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  res_data:any = {}
  constructor(
    private service : UserService
  ) { }

  ngOnInit(): void {

  }

}