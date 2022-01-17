import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;
  res_data : any = {
    "name" : "Not",
    "surename" : "Found"
  }
  status:any = {
    "home" : true,
    "edit" : false
  }
  uid = "";
  call_clid = "";
  constructor(
    private observer : BreakpointObserver,
    private a_router : ActivatedRoute,
    private service  : UserService,
    private router   : Router) { }

  async ngOnInit() {
    this.uid = this.a_router.snapshot.params["id"];
    this.res_data =   await this.service.teacher_home(this.uid);
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
  Select_Layout(layout : string){
    this.status.edit = false;
    this.status.home = false;
    this.status[layout] = true;
  }
  Edit_Classroom(clid : string){
    this.router.navigate(["edit/lesson/"+clid+"/"+this.uid]);
  }

}
