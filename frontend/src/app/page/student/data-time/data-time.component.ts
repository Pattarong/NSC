import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-time',
  templateUrl: './data-time.component.html',
  styleUrls: ['./data-time.component.scss']
})
export class DataTimeComponent implements OnInit {
  @Input() type = 1
  @Input() data : any = ""
  respone : any = ''
  constructor() { }

  ngOnInit(): void {
    if(this.type == 1 && this.data != undefined  && this.data != "" ){
      this.respone = this.data.hour+" : "+this.data.minute
    }
    else if(this.type == 2 && this.data != "None" && this.data != undefined){
      var date1:any = new Date(this.data);
      var date2:any = new Date();
      this.respone = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24))+"D";
    }
    else{
      this.respone = "None"
    }
  }

}
