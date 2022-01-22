import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-setting-lesson',
  templateUrl: './setting-lesson.component.html',
  styleUrls: ['./setting-lesson.component.scss']
})
export class SettingLessonComponent implements OnInit {
  lid = ""
  res_data = []
  name : any = ""
  constructor(private a_router : ActivatedRoute,
              private service  : UserService) { }

  async ngOnInit() {
    this.lid = this.a_router.snapshot.params["lid"]
    this.name = await this.service.name_lesson(this.lid)
    console.log(this.name)
  }

}
