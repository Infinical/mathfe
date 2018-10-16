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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  questions: any;
  displayedColumns: string[] = ['question', 'answer', 'skill', 'track', 'field', 'level', 'difficulty', 'status', 'source', 'author', 'action'];
  dataSource = new MatTableDataSource<any>();
  beURL = "http://localhost:8000";
  currentPage = 0;

  constructor(private http: HttpClient, private questionService: QuestionService) { 
    this.onPaginateChange({pageIndex: 0});    
  }

  ngOnInit() {

  }

  onPaginateChange(e: any){
    this.currentPage = e.pageIndex;
    this.questionService.getQuestions(this.currentPage).subscribe((data) => {
      this.questions = data.questions;
      this.dataSource = new MatTableDataSource<any>(data.questions);
      this.dataSource.sort = this.sort;
      this.updatePaginator();
    });
  }

  updatePaginator(){
    this.paginator.length = ((this.currentPage + 2) * this.questions.length);
    const dom: any = document.querySelector('.mat-paginator-range-label');
    if (dom) dom.style.display = 'none';
  }
}
