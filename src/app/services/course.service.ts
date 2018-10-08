import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourses():Observable<any> {
    	return this.http.get('http://localhost:8000/courses')
    	.map((response) => response)	      
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }

    getOpenCourses():Observable<any> {
    	return this.http.get('http://localhost:8000/opencourses')
    	.map((response) => response)	      
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }

	addCourse(course: Object): Observable<Course[]> {
	    return this.http.post('http://localhost:8000/courses', course)
	      .map((response) => response)
	      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}
	getCourse(id: String): Observable<any> {
	  return this.http.get('http://localhost:8000/courses/' + id)
	    .map((response) => response['course'])
        .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}
	updateCourse(course: Object): Observable<Course[]> {
	  const apiUrl = 'http://localhost:8000/courses';
	  const url = `${apiUrl}/${course['id']}`;
	  return this.http.put(url, course)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
	}

	updateCourseImage(courseimage: Object, course_id: String): Observable<any[]> {
	  const apiUrl = 'http://localhost:8000/courseimage';
	  const url = `${apiUrl}/${course_id}`;
	  return this.http.put(url, courseimage)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
	}

	deleteCourse(id: String): Observable<Course[]> {
	  const apiUrl = 'http://localhost:8000/courses';
	  const url = `${apiUrl}/${id}`;
	  return this.http.delete(url)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
	}	
}