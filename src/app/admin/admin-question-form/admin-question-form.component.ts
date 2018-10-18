import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl  } from '@angular/forms';

@Component({
  selector: 'ag-admin-question-form',
  templateUrl: './admin-question-form.component.html',
  styleUrls: ['./admin-question-form.component.css']
})
export class AdminQuestionFormComponent implements OnInit {

  QuestionForm: FormGroup;
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
  question: Question = new Question();
  editMode = false;
  
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      
      if (id != undefined) {
        this.editMode = true;
        this.questionService.getQuestion(id)
          .subscribe((data) => {
            if (data.question_image) this.imgURL = environment.apiURL + data.question_image;
            data.question_image = '';
            data.answer0_image = '';
            data.answer1_image = '';
            data.answer2_image = '';
            data.answer3_image = '';

            this.question = data;            
            
          }, error => {

          });
      }
    });
  }

  constructor(private http: HttpClient, 
              private questionService: QuestionService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

    this.QuestionForm = this.formBuilder.group({

        answer0: [''],
        answer0_image: [''],
        answer1: [''],
        answer1_image: [''],
        answer2: [''],
        answer2_image: [''],
        answer3: [''],
        answer3_image: [''],
        correct_answer: ['', Validators.required],
        difficulty_id: ['', Validators.required],
        question: ['', Validators.required],
        question_image: ['', Validators.required],
        skill_id: ['', Validators.required],
        status_id: ['', Validators.required],
        type_id: ['', Validators.required],
    });

    questionService.getQuestionOptions().subscribe((data) => {
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
  			
  			break;
  	}
  }

  createQuestion(){
    console.log(this.question);
    this.questionService.addQuestion(this.question).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
