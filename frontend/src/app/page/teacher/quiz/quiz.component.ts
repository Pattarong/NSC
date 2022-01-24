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
      "question" : this.data_qid.question,
      "ans_correct" : this.data_qid.ans_correct,
      "ans_incorrect" : this.data_qid.ans_incorrect,
      "path_question" : this.data_qid.path_question
    },
    {
      "type" : 2,
      "question" : this.data_qid.question,
      "ans_correct" : this.data_qid.ans_correct,
      "ans_incorrect" : this.data_qid.ans_incorrect,
      "path_question" : this.data_qid.path_question
    },
    {
      "type" : 3,
      "question" : this.data_qid.question,
      "ans_correct" : this.data_qid.ans_correct,
      "variable" :  this.data_qid.variable,
      "path_question" : this.data_qid.path_question

    },
    {
      "type" : 4,
      "question" : this.data_qid.question,
      "path_question" : this.data_qid.path_question
    },
    {
      "type" : 5,
      "question" : this.data_qid.question,
      "path_question" : this.data_qid.path_question,
      "list_type_file" : this.data_qid.list_type_file
    },
  ]
  ngOnInit(): void {
    console.log(this.data_qid)
    this.type = this.data_qid.pattern.type

  }
  Update_Type(){
    this.data_qid.pattern.type = this.type
  }
  Edit_Quiz(){
    console.log(this.type)
    if (this.type == 1){

    }
  }
  Add_incorrect_1(text : string){
    if (this.pattern[1]["ans_incorrect"] == undefined){
      this.pattern[1]["ans_incorrect"] = []
    }
    this.pattern[1]["ans_incorrect"].push(text)
  }
  Delete_incorrect_1(index : number){
    console.log(index)
    this.pattern[1]["ans_incorrect"] = this.arrayRemove( this.pattern[1]["ans_incorrect"], index)
    console.log( this.pattern[1]["ans_incorrect"])
  }
  arrayRemove(arr : any, value : number) {
    console.log(1)
    let arr_ps = []
    for(let i = 0;i < arr.length;i++){
      if (i != value){
        arr_ps.push(arr[i])
      }
    }
    return arr_ps
}
}
