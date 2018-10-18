import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../services/question.service';

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
  answerFourImg: File = null;
  levels: any;
  difficulties: any;
  statuses: any;
  types: any;
  selectedLevel: any;
  selectedTrack: any;
  selectedSkill: any;

  ngOnInit() {
  }

  constructor(private http: HttpClient, private questionService: QuestionService) { 
  	questionService.createQuestionOptions().subscribe((data) => {
      this.difficulties = data.difficulties;
      this.levels = data.skills;
      this.statuses = data.statuses;
      this.types = data.type;
    });
  }

  onFileSelected(files: FileList){
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  levelChange(e: any){
    this.selectedTrack = null;
    this.selectedSkill = null;
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
      case 4:
        this.answerFourImg = files.item(0);
        break;
  		default:
  			// code...
  			break;
  	}
  }

  createQuestion(form: any){
    console.log(form);
  }
}
