import { Component, Input, OnInit } from '@angular/core';
import { FormControl ,FormsModule} from '@angular/forms';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() data_qid : any = ''
  @Input() lid : string = ''
  question : any = new FormControl('')
  equation = new FormControl('')
  max = new FormControl('0')
  min = new FormControl('0')
  variable = new FormControl('')
  point_float = new FormControl('0')
  surefile = new FormControl('')
  hour = new FormControl('0')
  minute = new FormControl('0')
  data : any = ""
  type = 1
  type_number  = 1
  list_surenamefile = ["png","jpeg","pdf","pptx",'xlsx',"doc"]
  pick_surefile = ""
  add_point = "None"
  point = new FormControl('0')
  path_file : any = ''
  sure_file = ''
  constructor(private service : UserService) { }
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
      "equation" : this.data_qid.ans_correct,
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
  async ngOnInit(){
    console.log(this.data_qid)
    this.type = this.data_qid.pattern.type
    this.question = this.data_qid.pattern.question
    let namefile = this.data_qid.pattern.path_question
    if (namefile !== undefined && namefile !== ''){
      this.sure_file = this.data_qid.pattern.path_question.split(".")[1]
      this.path_file = "http://127.0.0.1:5000/upload/"+namefile
    }
    else {
      this.path_file = ""
    }

    console.log(this.path_file)
    if(this.pattern[5]["list_type_file"] == undefined){
      this.pattern[5]["list_type_file"] = []
    }

    this.pattern[this.type]["path_question"] = this.data_qid.pattern.path_question
    if (this.type == 1){
      this.pattern[this.type]["ans_correct"] = this.data_qid.pattern.ans_correct
      this.pattern[this.type]["ans_incorrect"] = this.data_qid.pattern.ans_incorrect
    }
    else if (this.type == 2){
      this.pattern[this.type]["ans_correct"] = this.data_qid.pattern.ans_correct
      this.pattern[this.type]["ans_incorrect"] = this.data_qid.pattern.ans_incorrect
    }
    else if (this.type == 3){
      this.pattern[this.type]["equation"] = this.data_qid.pattern.equation
      this.pattern[this.type]["variable"] = this.data_qid.pattern.variable
    }
    else if (this.type == 5){
      this.pattern[this.type]["list_type_file"] = this.data_qid.pattern.list_type_file
    }
  }
  Update_Type(){
    this.data_qid.pattern.type = this.type
    if(this.type == 1){
      this.pattern[1]["ans_correct"] = []
    }
  }
  Edit_Quiz(qid : string){
    this.pattern[this.type]["question"] = this.question
    this.data = {
      "pattern" : this.pattern[this.type],
      "time" : {
        "hour" : parseInt(this.hour.value),
        "minute" : parseInt(this.minute.value)
      },
      "point" : parseInt(this.point.value)
    };
    console.log(this.data)
    this.service.edit_question(this.lid,qid,this.data)
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
  Add_Surefile(){
    if(this.pattern[5]["list_type_file"] == undefined){
      this.pattern[5]["list_type_file"] = []
    }
    if(this.pattern[5]["list_type_file"].indexOf(this.pick_surefile)  < 0){
      this.pattern[5]["list_type_file"].push(this.pick_surefile)
      console.log(this.pattern[5]["list_type_file"])
      console.log(this.pick_surefile)
    }

  }
  Delete_incorrect(element : number,index : number){
    this.pattern[index]["ans_incorrect"] = this.arrayRemove( this.pattern[index]["ans_incorrect"], element)
  }
  Delete_correct(element : number,index : number){
    this.pattern[index]["ans_correct"] = this.arrayRemove( this.pattern[index]["ans_correct"], element)
  }
  Delete_surefile(element : number){
    this.pattern[5]["list_type_file"] = this.arrayRemove( this.pattern[5]["list_type_file"], element)
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

  Add_Variable(){
    if (this.max.value > this.min.value  && this.variable.value != ''){
      this.pattern[3]["variable"] = {
          "max" : this.max.value,
          "min" : this.min.value,
          "key" : this.variable.value
        }
      this.pattern[3]["equation"] = this.equation.value
      if(this.type_number == 1){
        this.pattern[3]["variable"]["type"] = "int"
      }
      else if (this.type_number == 2){
        this.pattern[3]["variable"]["type"] = "float"
        this.pattern[3]["variable"]["point"] = this.point_float.value
      }
    }
  }
  Question_(d : string){
    this.question = d
  }
  Equation_Change(d : string){
    this.pattern[3]["equation"] = d
  }
  Add_File(path : string){
    this.pattern[this.type]["path_question"] = path
  }
  Delete_file(qid : string){
    this.service.DeleteFile(this.pattern[this.type]["path_question"])
    this.pattern[this.type]["question"] = this.question
    this.pattern[this.type]["path_question"] = ''
    this.data = {
      "pattern" : this.pattern[this.type],
      "time" : {
        "hour" : parseInt(this.hour.value),
        "minute" : parseInt(this.minute.value)
      },
      "point" : parseInt(this.point.value)
    };
    this.service.edit_question(this.lid,qid,this.data)
  }
}
