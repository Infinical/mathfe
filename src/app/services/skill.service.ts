import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SkillService {

    constructor(private http: HttpClient) { }

    getSkills():Observable<any> {
    	return this.http.get('http://devapi.pamelalim.me/skills')
    	.map((response) => response)	      
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }

	addSkill(skill: Object): Observable<Skill[]> {
	    return this.http.post('http://devapi.pamelalim.me/skills', skill)
	      .map((response) => response)
	      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}

	getSkill(id: String): Observable<any> {
	  return this.http.get('http://devapi.pamelalim.me/skills/' + id)
	    .map((response) => response['skill'])
        .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}

	updateSkill(skill: Object): Observable<Skill[]> {
	  const apiUrl = 'http://devapi.pamelalim.me/skills';
	  const url = `${apiUrl}/${skill['id']}`;
	  return this.http.put(url, skill)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
	}

	deleteSkill(id: String): Observable<Skill[]> {
	  const apiUrl = 'http://devapi.pamelalim.me/skills';
	  const url = `${apiUrl}/${id}`;
	  return this.http.delete(url)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
	}	

	createSkill():Observable<any> {
    	return this.http.get('http://devapi.pamelalim.me/skills/create')
    	.map((response) => response)
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }
}
