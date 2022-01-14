import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit {
  uid? : string;
  constructor(
    private a_router : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    this.uid = this.a_router.snapshot.params["id"];
  }
  goTo_Home_Teacher(){
    this.router.navigate(["teacher/home/"+this.uid])
    console.log("Teacher")
  }
  goTo_Home_Student(){
    this.router.navigate(["student/home/"+this.uid])
    console.log("Student")
  }


}
