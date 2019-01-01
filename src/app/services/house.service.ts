import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { House } from '../models/house';
@Injectable()
export class HouseService {

  constructor(private http: HttpClient) { }
  updateHouse(house: House): Observable<House[]> {
	  const apiUrl = `${environment.apiURL}/houses`;
	  const url = `${apiUrl}/${house.id}`;
	  return this.http.put<House[]>(url, house)
	    .map((response) => response)
	    .catch((error: any) => throwError(error.error || {message: 'Server Error'}));
	}
}
