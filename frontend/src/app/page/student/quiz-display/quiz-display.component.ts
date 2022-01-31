import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss']
})
export class QuizDisplayComponent implements OnInit {
  @Input() data_q : any = {
    "pattern" : {
      "type" : 1,
      "variable" : {
        "min" : 0,
        "max" : 0
      }
    }
  }
  @Input() uid = ""
  @Input() lid = ""
  pick_1 = ""
  pick_3 = new FormControl('')
  pick_4 = new FormControl('')
  pick_5 = new FormControl('')
  data : any
  list_random : any = []
  answer : any = {
    "answer" : '',
    "variable" : ''
  }
  number_random : any = 0
  async ngOnInit() {
    this.data = await this.service.data_question(this.uid,this.lid,this.data_q.id_question)

    this.data_q = await this.data["data_question"]
    this.list_random = await this.data["data_question"]["pattern"]["choice"]
    this.data_q.pattern.type = await parseInt(this.data_q.pattern.type)
    if (this.data_q.pattern.type == 3){
      this.number_random = await Number(this.randomNumber(this.data_q.pattern.variable.min,this.data_q.pattern.variable.max)).toFixed(3)
    }
  }
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,private service : UserService) {
    this.form = fb.group({
      random : [''],
    })
  }
  get f(){
    return this.form.controls;
  }


  randomNumber(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }
  Answer_Question(){
    if(this.data_q.pattern.type == 1){
      this.answer["answer"] = this.pick_1
    }
    else if(this.data_q.pattern.type == 2){
      this.answer["answer"] = this.form.value["random"]
    }
    else if(this.data_q.pattern.type == 3){
      this.answer["answer"] = this.pick_3.value
      this.answer["variable"] = this.number_random
    }
    else if (this.data_q.pattern.type == 4){
      this.answer["answer"] = this.pick_4.value
    }
    else if (this.data_q.pattern.type == 5){
      this.answer["answer"] = this.pick_5.value
    }
    this.service.Send_Answer(this.lid,this.uid,this.data_q.id_question,this.answer)
  }
}
