import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  res_data:any = {}
  @Input() data_classroom : any[] | undefined
  constructor(
    private service : UserService
  ) { }

  async ngOnInit() {
  }

}
