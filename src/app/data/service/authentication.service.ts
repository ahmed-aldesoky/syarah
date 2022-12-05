import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { StorageService } from './storage.service';

interface AuthResponse {
  jwt: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = `${environment.strapiUrl}/auth/local`;
  private loginTracker = new BehaviorSubject(this.checkIfLoggedIn());

  loggedInStatus$ = this.loginTracker.asObservable();

  constructor(private http: HttpClient, private ss: StorageService) { }

  login(identifier: any, password: any) {
    return this.http.post<AuthResponse>(this.url, { identifier, password });
  }

  register(username: any, email: any, password: any,phone:any) {
    return this.http.post<AuthResponse>(`${this.url}/register`, { username, email, password,phone});
  }

  checkIfLoggedIn() {
    return this.ss.getItem('loggedIn') === 'true';
  }

  persistUser(resp: AuthResponse) {
    [
      ['userId', resp.user.id],
      ['userEmail', resp.user.email],
      ['username', resp.user.username],
      ['userPhone', resp.user.phone],
      ['loggedIn', 'true'],
      ['token', resp.jwt]
    ].forEach(item => this.ss.setItem(item[0], item[1]));

    this.loginTracker.next(true);
  }

  getPersistedUser(): User {
    return {
      id: this.ss.getItem('userId') || '',
      username: this.ss.getItem('username') || '',
      email: this.ss.getItem('userEmail') || '',
      phone: this.ss.getItem('userPhone') || '',

    };
  }

  getPersistedToken(): string {
    return this.ss.getItem('token') || '';
  }

  logout() {
    ['userId', 'userEmail', 'username','userPhone', 'loggedIn', 'token'].forEach(item => this.ss.removeItem(item));

    this.loginTracker.next(false);
  }

  getAuthHeader() {
    return {
      headers: { 'Authorization': `Bearer ${this.getPersistedToken()}` }
    };
  };
}