import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.scss']
})
export class ListClassroomComponent implements OnInit {
  name_classroom = new FormControl('')
  @Input() uid = "";
  @Output() Edit_Classroom = new EventEmitter<string>();
  res_data : any = {
    "list_classroom" : []
  };
  id_classroom : string|undefined;
  constructor(
    private service : UserService
  ) { }

  async ngOnInit() {
    this.res_data =   await this.service.teacher_home(this.uid);
    console.log(this.res_data)
  }
  async add_classroom(){
    let res = await this.service.add_classroom({"name_classroom" : this.name_classroom.value},this.uid)
    console.log(res)
    this.res_data =  await this.service.teacher_home(this.uid);

  }
  edit_classroom(clid : string){
    this.Edit_Classroom.emit(clid)
  }
  async delete_classroom(clid : string){
    await this.service.delete_classroom(clid);
    this.res_data =  await this.service.teacher_home(this.uid);

  }
}
