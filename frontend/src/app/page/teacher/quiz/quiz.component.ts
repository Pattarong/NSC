import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() data_qid : any = ""
  type : number | undefined
  constructor() { }
  pattern = [
    {},
    {
      "type" : 1,
      "question" : "",
      "ans_correct" : "",
      "ans_incorrect" : [],
      "path_question" : ""
    },
    {
      "type" : 2,
      "question" : "",
      "ans_correct" : [],
      "ans_incorrect" : [],
      "path_question" : ""
    },
    {
      "type" : 3,
      "question" : "",
      "ans_correct" : "a+1",
      "variable" : {
        "max" : 0,
        "min" : 0,
        "type" : ""
      },
      "path_question" : ""

    },
    {
      "type" : 4,
      "question" : "",
      "path_question" : ""
    },
    {
      "type" : 5,
      "question" : "",
      "path_question" : "",
      "list_type_file" : []
    },
  ]
  ngOnInit(): void {
    console.log(this.data_qid)
    this.type = this.data_qid.pattern.type
  }
  Update_Type(){
    this.data_qid.pattern.type = this.type
  }
}
