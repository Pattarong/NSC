import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  name_classroom = new FormControl('')
  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;
  uid = "";
  res_data? : any;
  constructor(
    private observer : BreakpointObserver,
    private a_router : ActivatedRoute,
    private service  : UserService,
    private router   : Router) { }

  async ngOnInit() {
    this.uid = this.a_router.snapshot.params["id"];
    this.res_data =  await this.service.teacher_home(this.uid);
    console.log(this.res_data)
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 2000px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  goToLink(Link : string,Param : boolean){
    if (Param){
      this.router.navigate([Link+"/"+this.uid]);
    }
    else{
      this.router.navigate([Link]);
    }
  }
  async add_classroom(){
    let res = await this.service.add_classroom({"name_classroom" : this.name_classroom.value},this.uid)
    console.log(res)
    window.location.reload();

  }

}
