import { Injectable } from '@angular/core';
import { Track } from '../models/track';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class HouseTrackService {

    constructor(private http: HttpClient) { }

  getTracks():Observable<any> {
    	return this.http.get<any>(`${environment.apiURL}/tracks`)
    	.map((response) => response)
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }

	addTrack(track: Object): Observable<Track[]> {
	    return this.http.post<Track[]>(`${environment.apiURL}/tracks`, track)
	      .map((response) => response)
	      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}

	getTrack(id: String): Observable<any> {
	  return this.http.get(`${environment.apiURL}/tracks/` + id)
	    .map((response) => response['track'])
        .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
	}

	updateTrack(track: Object): Observable<Track[]> {
	  const apiUrl = `${environment.apiURL}/tracks`;
	  const url = `${apiUrl}/${track['id']}`;
	  return this.http.put<Track[]>(url, track)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
	}

	deleteTrack(houseid: String, trackid: String): Observable<Track[]> {
	  const apiUrl = `${environment.apiURL}/houses`;
	  const url = `${apiUrl}/${houseid}/tracks/${trackid}`;
	  return this.http.delete<Track[]>(url)
	    .map((response) => response)
	    .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
	}

	createTrack():Observable<any> {
    	return this.http.get(`${environment.apiURL}/tracks/create`)
    	.map((response) => response)
    	.catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));;
    }
}