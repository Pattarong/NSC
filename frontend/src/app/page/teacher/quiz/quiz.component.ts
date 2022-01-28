import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() data_qid : any = ""
  question = new FormControl('')
  equation = new FormControl('')
  max = new FormControl('')
  min = new FormControl('')
  type : number | undefined
  type_number  = 1

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
    if(this.type == 1){
      this.pattern[1]["ans_correct"] = []
    }
  }
  Edit_Quiz(){
    console.log(this.type)
    console.log(this.question.value)
    console.log(this.pattern)
    console.log(this.equation.value)
    console.log(this.max.value)
    console.log(this.min.value)
  }
  Add_incorrect(text : string,index : number){
    if (this.pattern[index]["ans_incorrect"] == undefined){
      this.pattern[index]["ans_incorrect"] = []
    }
      this.pattern[index]["ans_incorrect"].push(text)

  }
  Add_correct(text : string,index : number){
    if (this.pattern[index]["ans_correct"] == undefined){
      this.pattern[index]["ans_correct"] = []
    }
    if (index == 1){
      this.pattern[index]["ans_correct"][0] = text
    }
    else{
      this.pattern[index]["ans_correct"].push(text)
    }

  }
  Delete_incorrect(element : number,index : number){
    this.pattern[index]["ans_incorrect"] = this.arrayRemove( this.pattern[index]["ans_incorrect"], element)
  }
  Delete_correct(element : number,index : number){
    this.pattern[index]["ans_correct"] = this.arrayRemove( this.pattern[index]["ans_correct"], element)
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
  Add_Question(type : number , key : string,data : any){

  }
}
