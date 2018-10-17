import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { QuestionService } from '../../services/question.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material'; 

@Component({
  selector: 'ag-admin-question-list',
  templateUrl: './admin-question-list.component.html',
  styleUrls: ['./admin-question-list.component.css']
})
export class AdminQuestionListComponent implements OnInit {

  @ViewChild(MatPaginator) topPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  questions: any;
  displayedColumns: string[] = ['question', 'answer', 'skill', 'track', 'field', 'level', 'difficulty', 'status', 'source', 'author', 'action'];
  dataSource = new MatTableDataSource<any>();
  beURL = "http://localhost:8000";
  currentPage = 0;
  selectedQuestion: any;
  deleteResult: any;

  constructor(private http: HttpClient, private questionService: QuestionService) { 
    this.onPaginateChange({pageIndex: 0});    
  }

  ngOnInit() {

  }

  onPaginateChange(e: any, origin?: string){
    this.currentPage = e.pageIndex;
    this.questionService.getQuestions(this.currentPage).subscribe((data) => {
      this.questions = data.questions;
      this.dataSource = new MatTableDataSource<any>(data.questions);
      this.dataSource.sort = this.sort;
      this.updatePaginator(origin);
    });
  }

  updatePaginator(origin: string){
    this.topPaginator.length = ((this.currentPage + 2) * this.questions.length);
    const dom: any = document.querySelector('.mat-paginator-range-label');
    if (dom) dom.style.display = 'none';    
  }

  removeModal(){
    let dom: any = document.querySelector('#modal-container');    
    dom.classList.add('hidden');
    
    dom = document.querySelector('#overlay');
    dom.classList.add('hidden');

    //set modal default values
    dom = document.querySelector('#deleteButton');    
    dom.classList.remove('hidden');

    dom = document.querySelector('#cancelButton');    
    dom.innerHTML = "Cancel";

    this.deleteResult = null;
  }

  confirmDelete(question: any){
    this.selectedQuestion = question;

    let dom: any = document.querySelector('#modal-container');    
    dom.classList.remove('hidden');

    dom = document.querySelector('#overlay');
    dom.classList.remove('hidden');
  }

  deleteQuestion(){

    this.questionService.deleteQuestion(this.selectedQuestion.id)
      .subscribe(res => {

        this.onPaginateChange({pageIndex: this.currentPage});

        this.deleteResult = {
          status: 'success',
          message: res["message"]
        };

        let dom: any = document.querySelector('#deleteButton');    
        dom.classList.add('hidden');

        dom = document.querySelector('#cancelButton');    
        dom.innerHTML = "Close";

      }, error => {
        this.deleteResult = {
          status: 'error',
          message: error["message"]
        };
      });
    }
}
