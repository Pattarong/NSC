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
  }
  OnChange(dateTime : any){
      console.log(dateTime)
      this.Datetime.emit(dateTime)
  }
}
