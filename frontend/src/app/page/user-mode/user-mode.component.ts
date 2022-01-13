import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  goTo_Home_Teacher(){
    this.router.navigate(["teacher/home"])
  }
  goTo_Home_Student(){
    this.router.navigate(["student/home"])
  }


}
