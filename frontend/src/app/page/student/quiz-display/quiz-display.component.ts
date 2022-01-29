import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss']
})
export class QuizDisplayComponent implements OnInit {
  @Input() data_q : any = {
    "pattern" : {
      "type" : ""
    }
  }
  list_random : any
  constructor(
    private service : UserService
  ) { }

  async ngOnInit() {
    this.list_random = await this.service.random()
    console.log(this.list_random)
  }

}
