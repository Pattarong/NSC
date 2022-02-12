import { Component, EventEmitter, Input, OnInit ,Output} from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';

import { UserService } from '../services/api/user.service';
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {
  uploadform = new FormGroup({
      file : new FormControl('',[Validators.required]),
      file_source : new FormControl('',[Validators.required])
    }
  );

  constructor(private service : UserService) { }
  @Input() uid = ''
  @Output() keyfile = new EventEmitter()
  status = false
  path : any
  ngOnInit(): void {
  }
  onFileChange(event:any){
    console.log("select file");
    console.log(event);
    if(event.target.files.length >0){
      const file = event.target.files[0];
      this.uploadform.patchValue({
        file_source: file
      })
    }
  }
  async onUpload() {
    const formData = new FormData()
    formData.append("file",this.uploadform.get('file_source')?.value)
    this.path = await this.service.UploadFile(formData)
    if (this.path.success != false){
      this.keyfile.emit(this.path.success)
    }
    alert("UPLOAD SUCCESS")
  }
}
