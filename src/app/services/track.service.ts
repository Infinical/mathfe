import { Injectable } from '@angular/core';
import { Track } from '../models/track';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrackService {

    constructor(private http: HttpClient) { }

    getTracks():Observable<any> {
    	return this.http.get('http://localhost:8000/tracks')
    	.map((response) => response)
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }

	addTrack(track: Object): Observable<Track[]> {
	    return this.http.post<Track[]>('http://localhost:8000/tracks', track)
	      .map((response) => response)
	      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}

	getTrack(id: String): Observable<any> {
	  return this.http.get('http://localhost:8000/tracks/' + id)
	    .map((response) => response['track'])
        .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}

	updateTrack(track: Object): Observable<Track[]> {
	  const apiUrl = 'http://localhost:8000/tracks';
	  const url = `${apiUrl}/${track['id']}`;
	  return this.http.put<Track[]>(url, track)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
	}

	deleteTrack(id: String): Observable<Track[]> {
	  const apiUrl = 'http://localhost:8000/tracks';
	  const url = `${apiUrl}/${id}`;
	  return this.http.delete<Track[]>(url)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
	}

	createTrack():Observable<any> {
    	return this.http.get('http://localhost:8000/tracks/create')
    	.map((response) => response)
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }
}
