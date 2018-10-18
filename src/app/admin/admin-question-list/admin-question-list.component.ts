import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { QuestionService } from '../../services/question.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 

export interface DialogData { id: string }

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
  beURL = environment.apiURL;
  currentPage = 0;
  selectedQuestion: any; 

  constructor(private http: HttpClient, private questionService: QuestionService, public dialog: MatDialog) { 
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

  confirmDelete(question: any){
    let dialogRef = this.dialog.open(DialogDeleteQuestion, {
      width: '250px',
      data: { id: question.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onPaginateChange({pageIndex: this.currentPage});
    });
  }  
}

// dialog component
@Component({
  template: `<h2 mat-dialog-title>Delete Question</h2>
<mat-dialog-content>Are you sure?
<div style="margin-top: 0.5rem;" *ngIf="deleteResult && deleteResult.status ==='success'" class="alert alert-success" role="alert"> {{ deleteResult.message }} </div>
<div style="margin-top: 0.5rem;" *ngIf="deleteResult && deleteResult.status ==='error'" class="alert alert-danger" role="alert"> {{ deleteResult.message }} </div>
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>No</button>
  <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
  <button mat-button (click)="onYesClick()">Yes</button>
</mat-dialog-actions>`,
  selector: 'dialog-delete-question'
})

export class DialogDeleteQuestion {

  deleteResult: any;

  constructor(
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogDeleteQuestion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {

    this.questionService.deleteQuestion(this.data.id)
      .subscribe(res => {        

        this.deleteResult = {
          status: 'success',
          message: res["message"]
        };

      }, error => {
        this.deleteResult = {
          status: 'error',
          message: 'Server Error'
        };
      });    
  }
}