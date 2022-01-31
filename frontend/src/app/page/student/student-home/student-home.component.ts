import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;
  uid = "";
  res_data : any ;
  PageLayout = [true,false]
  search_classroom  = new FormControl('')
  constructor(
    private observer : BreakpointObserver,
    private a_router : ActivatedRoute,
    private service  : UserService,
    private router   : Router) { }

  async ngOnInit() {
    this.uid = this.a_router.snapshot.params["id"];
    this.res_data = await this.service.data_classroom_user(this.uid)
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
  Change_Layout(index : number ){
    if (index == 0){
      this.PageLayout = [true,false]
    }
    else{
      this.PageLayout = [false,true]
    }
  }
  Add_Classroom_Home(){
    let status = this.service.Add_Classroom_New(this.uid,this.search_classroom.value)
    window.location.reload();
    console.log(status)
  }
}
