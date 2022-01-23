import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss']
})
export class DatetimeComponent implements OnInit {
  Date : any;
  @Output() Datetime = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.Date = new Date("25/01/2022");
    console.log(this.Date)
  }
  OnChange(dateTime : any){
      console.log(dateTime)
      this.Datetime.emit(dateTime)
  }
}
