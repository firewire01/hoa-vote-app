import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';
import { BASE_API } from './storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {



  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      BASE_API + 'login',
      {
        username,
        password
      },
      httpOptions
    );
  }

  active(username: string, email: string, password: string, temppass: string): Observable<any> {
    return this.http.post(
      BASE_API + 'activate',
      {
        username,
        email,
        password,
        temppass
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(BASE_API + 'logout', { }, httpOptions);
  }
}

export class LoginResponse {
  token: string;
  type = 'Bearer';
  id: number;
  username:string;
  email: string;
  roles: string[];
}
