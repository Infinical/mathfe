import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ag-admin-question-create',
  templateUrl: './admin-question-create.component.html',
  styleUrls: ['./admin-question-create.component.css']
})
export class AdminQuestionCreateComponent implements OnInit {

  selectedFile: File = null;
  imgURL :string = "images/upload.png";
  answerOneImg: File = null;
  answerTwoImg: File = null;
  answerThreeImg: File = null;
  skills = [
    {
      id: 1,
      skill: "Reading and Writing Numbers"
    },
    {
      id: 2,
      skill: "Ordering"
    },
  ];

  difficulties = [
    {
      id: 1,
      short_description: "1 - Knowledge and Comprehension"
    },
    {
      id: 2,
      short_description: "2 - Application and Analysis"
    },
    {
      id: 3,
      short_description: "3 - Synthesis and evaluation"
    },
  ];

  constructor(private http: HttpClient) { 
  	
  }

  ngOnInit() {
  }

  onFileSelected(files: FileList){
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  answerImageSelected(files: FileList, option: number){
  	switch (option) {
  		case 1:
  			this.answerOneImg = files.item(0);
  			break;
  		case 2:
  			this.answerTwoImg = files.item(0);
  			break;
  		case 3:
  			this.answerThreeImg = files.item(0);
  			break;
  		default:
  			// code...
  			break;
  	}
  }
}
