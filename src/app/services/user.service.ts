import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/users`)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getUser(id: String): Observable<any> {
    return this.http.get(`${environment.apiURL}/users/` + id)
      .map((response) => response['user'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateUser(user: FormData, userId: Number): Observable<User[]> {
    const apiUrl = `${environment.apiURL}/users`
    const url = `${apiUrl}/${userId}`;
    return this.http.post<any[]>(url, user)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }
  deleteUser(id: String): Observable<User[]> {
    const apiUrl = `${environment.apiURL}/users`
    const url = `${apiUrl}/${id}`;
    return this.http.delete<User[]>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}