import { Component, Input, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableModule} from '@angular/material/table';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-user-classroom',
  templateUrl: './user-classroom.component.html',
  styleUrls: ['./user-classroom.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class UserClassroomComponent implements OnInit {
  res_data : any
  @Input() clid = ""
  dataSource = [];
  columnsToDisplay = ['id_student','name', 'surename'];
  expandedElement: PeriodicElement | any ;
  constructor(private service : UserService) { }
  async ngOnInit() {
    console.log(this.clid)
      this.res_data = await this.service.user_classroom(this.clid);
      this.dataSource = this.res_data.name_users
      console.log(this.res_data)
  }

}
export interface PeriodicElement {
  name: string|undefined;
  surename : string|undefined;
}
