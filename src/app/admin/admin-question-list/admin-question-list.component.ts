import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { QuestionService } from '../../services/question.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { KatexOptions } from 'ng-katex';
import katex from 'katex';

export interface DialogData { id: string }

@Component({
  selector: 'ag-admin-question-list',
  templateUrl: './admin-question-list.component.html',
  styleUrls: ['./admin-question-list.component.css']
})
export class AdminQuestionListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) topPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  gridData: any;
  displayedColumns: string[] = ['question', 'answer', 'skill', 'track', 'field', 'level', 'difficulty', 'status', 'source', 'author', 'action'];
  dataSource = new MatTableDataSource<any>();
  beURL = environment.apiURL;
  currentPage = 1;
  selectedQuestion: any; 
  loading = true;
  options: KatexOptions = {
    displayMode: true,
    macros: {
        "\\f": "f(#1)"
    }
  };
  
  constructor(private http: HttpClient, 
              private questionService: QuestionService, 
              public dialog: MatDialog,
              private cdr: ChangeDetectorRef) { 
    this.onPaginateChange({pageIndex: this.currentPage});    
  }

  ngOnInit() {

  }

  ngOnChanges(){
    this.cdr.detectChanges();
  }

  onSearchChange(value){

    value = value.toLowerCase();
    let data = this.gridData.questions.filter(question => {
      if (question.question.toLowerCase().indexOf(value) != -1) return true;
      else if (question.skill.skill.toLowerCase().indexOf(value) != -1) return true;
      else {

        let found = false;
        question.skill.tracks.forEach(function(track){
          const level = track.level.level.toString();
          
          if (level.toLowerCase().indexOf(value) != -1) found = true;
        });

        return found;
      }    
    });

    this.dataSource = new MatTableDataSource<any>(data);
  }

  displayKatex(string: string, id?:number, parseHtml?: boolean, elementId?: string){

    if (!string) return true;
    var searchStrLen = string.length;
    var startIndex = 0, index, indexes = [];

    if (string.indexOf('$$') < 0) return false;
    else if (!parseHtml) return true;

    while ((index = string.indexOf('$$', startIndex)) > -1) {
        indexes.push(index);
        startIndex = index + 2;
    }

    if (indexes.length <= 1 || !parseHtml) return false;

    let html="";
    startIndex = 0;
    for (var i=0; i<indexes.length; i++){
      let katexString = string.substring(indexes[i]+2, indexes[i+1]);
      let text = string.substring(startIndex, indexes[i]) + " ";

      html += text + katex.renderToString(katexString, {
        throwOnError: false
      });

      i++;
      startIndex = indexes[i]+2;

      if (((i+1) == indexes.length) && (startIndex < searchStrLen)){
        html += string.substring(startIndex, searchStrLen);
      }
    }

    const katexDiv: any = document.getElementById(elementId);
    if (!katexDiv) return false;

    katexDiv.innerHTML = html;
    katexDiv.style.display = "";
    return true;
  }

  onPaginateChange(e: any, origin?: string){
    this.loading = true;
    this.currentPage = (e.pageIndex === 0) ? 1 : e.pageIndex;
    this.questionService.getQuestions(this.currentPage).subscribe((data) => {
      this.gridData = data;
      this.dataSource = new MatTableDataSource<any>(this.gridData.questions);
      this.dataSource.sort = this.sort;
      this.updatePaginator(origin);
      this.loading = false;
    });
  }

  updatePaginator(origin: string){
    this.topPaginator.length = ((this.currentPage + 2) * this.gridData.questions.length);
    this.topPaginator.pageIndex = this.currentPage;
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
  <button id="closeButton" mat-button mat-dialog-close>No</button>
  <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
  <button id="yesButton" mat-button (click)="onYesClick()">Yes</button>
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

        let dom: any = document.querySelector('#closeButton');    
        dom.innerHTML = "Close"

        dom = document.querySelector('#yesButton');
        dom.style.display = 'none';

      }, error => {
        this.deleteResult = {
          status: 'error',
          message: 'Server Error'
        };
      });    
  }
}