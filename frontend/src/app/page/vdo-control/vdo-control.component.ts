import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vdo-control',
  templateUrl: './vdo-control.component.html',
  styleUrls: ['./vdo-control.component.scss']
})
export class VdoControlComponent implements OnInit {
  @Input() path_file = ''
  constructor() { }

  ngOnInit(): void {
  }

}
