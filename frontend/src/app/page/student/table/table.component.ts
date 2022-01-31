import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() uid = ''

  constructor(
    private service : UserService
  ) { }
  data_table : any
  async ngOnInit() {
    this.data_table = await this.service.Table(this.uid)
    console.log(this.data_table)
    console.log(1)
  }

}
