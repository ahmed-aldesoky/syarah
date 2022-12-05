import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment,CommentsResponse,PostCommentPayload } from '../models/comments';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl= `${environment.strapiUrl}/comments`


  constructor(private http:HttpClient) { }

  getComment(): Observable<CommentsResponse>{
    return this.http.get<CommentsResponse>(this.apiUrl)
   }

   postComment(comment:PostCommentPayload):Observable<any>{
    return this.http.post<any>(this.apiUrl,comment);
  }
  deleteComment(key:string):Observable<any>{
    return this.http.delete<CommentsResponse>(`${this.apiUrl}/${key}`);
  }
}
