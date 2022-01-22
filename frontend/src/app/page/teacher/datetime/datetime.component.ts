import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss']
})
export class DatetimeComponent implements OnInit {
  Date : any;
  constructor() { }

  ngOnInit(): void {
    this.Date = new Date("25/01/2022");
    console.log(this.Date)
  }
  OnChange(dateTime : any){
      console.log(dateTime)
  }
}
