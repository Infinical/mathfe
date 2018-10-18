import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ag-admin-question-form',
  templateUrl: './admin-question-form.component.html',
  styleUrls: ['./admin-question-form.component.css']
})
export class AdminQuestionFormComponent implements OnInit {

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
  question: any;
  
  ngOnInit() {
  }

  constructor(private http: HttpClient, 
              private questionService: QuestionService,
              private route: ActivatedRoute) { 

  	questionService.getQuestionOptions().subscribe((data) => {
      this.difficulties = data.difficulties;
      this.levels = data.skills;
      this.statuses = data.statuses;
      this.types = data.type;
    });

    this.route.params.subscribe((params) => {
      const id = String(params['id']);
      
      if (id) {
        this.questionService.getQuestion(id)
          .subscribe((data) => {
            console.log(data);
            this.question = data;
          }, error => {

          });
      }

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
  			
  			break;
  	}
  }

  createQuestion(form: any){
    console.log(form);
    this.questionService.addQuestion(form).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
