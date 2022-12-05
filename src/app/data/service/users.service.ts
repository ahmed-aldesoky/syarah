import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl= `${environment.strapiUrl}/users`


  constructor(private http:HttpClient) { }

  getUsers(): Observable<UserResponse>{
    return this.http.get<UserResponse>(this.apiUrl)
   }
   getUsersbyId(key:any): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${key}`)
   }
}