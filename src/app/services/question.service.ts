import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class QuestionService {

	constructor(private http: HttpClient){}

	getQuestions(currentPage):Observable<any> {
    	return this.http.get<any>(environment.apiURL + '/questions?page=' + currentPage)
    	.map((response) => response)
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
    }

    deleteQuestion(id: String): Observable<any[]> {
	  const apiUrl = `${environment.apiURL}/questions`;
	  const url = `${apiUrl}/${id}`;
	  return this.http.delete<any>(url)
	    .map((response) => response);
	    //.catch((error: any) =>  Observable.throw({message: 'Server Error'}));
	}
}