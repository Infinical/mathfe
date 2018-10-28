import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl  } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'ag-admin-question-form',
  templateUrl: './admin-question-form.component.html',
  styleUrls: ['./admin-question-form.component.css'],
  encapsulation : ViewEncapsulation.None
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
  formResponse: any;
  apiURL: string = environment.apiURL;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Question',
    translate: 'no',
    customClasses: [ // optional
      {
        name: "white",
        class: "white",
      },
    ]
  };
  
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      
      if (id != undefined) {
        this.editMode = true;
        this.questionService.getQuestion(id)
          .subscribe((data) => {
            if (data.question_image) this.imgURL = environment.apiURL + data.question_image;
            this.question = data;                         
            
          }, error => {

          });
      }
    });

    this.QuestionForm = this.formBuilder.group({

        answer0: [''],
        answer0_image: [''],
        answer1: [''],
        answer1_image: [''],
        answer2: [''],
        answer2_image: [''],
        answer3: [''],
        answer3_image: [''],
        correct_answer: [''],
        difficulty_id: ['', Validators.required],
        question: ['', Validators.required],
        question_image: ['', Validators.required],
        skill_id: ['', Validators.required],
        status_id: ['', Validators.required],
        type_id: ['', Validators.required],
    });
  }

  constructor(private http: HttpClient, 
              private questionService: QuestionService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

    questionService.getQuestionOptions().subscribe((data) => {
      this.difficulties = data.difficulties;
      this.levels = data.skills;
      this.statuses = data.statuses;
      this.types = data.type;

      if (this.editMode){

        this.selectedLevel = this.levels.find((level) => 
          level.tracks.find((track) => 
            track.skills.find((skill) => 
              skill.id == this.question.skill_id))
          );

        if (this.selectedLevel){
          this.selectedTrack = this.selectedLevel.tracks.find((track) => 
            track.skills.find((skill) => 
              skill.id == this.question.skill_id));
        }

        if (this.selectedTrack){
          this.selectedTrack.skills.find((skill) => 
            skill.id == this.question.skill_id);
        }
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

  submitForm(){
    if (!this.editMode){
      this.createQuestion();
    }else{
      this.updateQuestion();
    }
  }

  createQuestion(){

    const fileName = this.selectedFile.name.substring(0, this.selectedFile.name.indexOf('.'));
    const imageURL = '/images/questions/imp1_question_image/';
    const questionValue = (this.question.question.indexOf('&lt;') >= 0) ? 
                          this.question.question.replace(/&lt;/g, '<').replace(/&gt;/g, '>') :
                          this.question.question;

    const form = {
      answer0: this.question.answer0,
      answer0_image: (this.answerOneImg) ? this.answerOneImg : '',
      answer1: this.question.answer1,
      answer1_image: (this.answerTwoImg) ? this.answerTwoImg : '',
      answer2: this.question.answer2,
      answer2_image: (this.answerThreeImg) ? this.answerThreeImg : '',
      answer3: this.question.answer3,
      answer3_image: (this.answerFourImg) ? this.answerFourImg : '',
      correct_answer: this.question.correct_answer,
      difficulty_id: this.question.difficulty_id,
      question: questionValue,
      question_image: this.selectedFile,
      skill_id: this.question.skill_id,
      status_id: this.question.status_id,
      type_id: this.question.type_id
    };

    this.questionService.addQuestion(form).subscribe(res => {
      console.log(res);
      this.formResponse = {
        status: 'success',
        message: res["message"]
      };

    }, error => {
      this.formResponse = {
          status: 'error',
          message: 'Server Error'
        };
    });
  }

  updateQuestion(){
    this.question.question = (this.question.question.indexOf('&lt;') >= 0) ? 
                             this.question.question.replace(/&lt;/g, '<').replace(/&gt;/g, '>') :
                             this.question.question;
    var form = new FormData();
    form.append('_method', 'PATCH');
    form.append('answer0', this.question.answer0);
    form.append('answer0_image', (this.answerOneImg) ? this.answerOneImg : '');
    form.append('answer1', this.question.answer1);
    form.append('answer1_image', (this.answerTwoImg) ? this.answerTwoImg : '');
    form.append('answer2', this.question.answer2);
    form.append('answer2_image', (this.answerThreeImg) ? this.answerThreeImg : '');
    form.append('answer3', this.question.answer3);
    form.append('answer3_image', (this.answerFourImg) ? this.answerFourImg : '');
    form.append('correct_answer', this.question.correct_answer);
    form.append('difficulty_id', String(this.question.difficulty_id));
    form.append('question', this.question.question);
    form.append('question_image', this.selectedFile);
    form.append('skill_id', String(this.question.skill_id));
    form.append('status_id', String(this.question.status_id));
    form.append('type_id', String(this.question.type_id));

    this.questionService.updateQuestion(form, this.question.id).subscribe(res => {
      this.question = res.question;
      this.formResponse = {
          status: 'success',
          message: res["message"]
        };
    }, error => {
      this.formResponse = {
          status: 'error',
          message: 'Server Error'
        };
    });
  }

  validForm(){
    return (
              (this.QuestionForm.status !== 'VALID') || 
              (this.question.type_id == 1 && this.question.correct_answer === null) ||
              (this.question.type_id == 2 && 
                (
                  isNaN(Number(this.question.answer0)) ||
                  isNaN(Number(this.question.answer1)) ||
                  isNaN(Number(this.question.answer2)) ||
                  isNaN(Number(this.question.answer3))
                )
              )
            );
  }

  isNumeric(value: String){
    return isNaN(Number(value)) ? false : true;
  }
}