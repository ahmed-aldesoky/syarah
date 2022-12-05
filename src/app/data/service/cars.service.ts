import { Injectable } from '@angular/core';
import { CarIDResponse, CarResponse } from '../models/cars';

import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl= `${environment.strapiUrl}/cars`

  constructor(private http:HttpClient) { }
  getCars(): Observable<CarResponse>{
    return this.http.get<CarResponse>(this.apiUrl)
   }

   getCarById(key: string): Observable<CarIDResponse>{
    return this.http.get<CarIDResponse>(`${this.apiUrl}/${key}`);
  }
 
}
