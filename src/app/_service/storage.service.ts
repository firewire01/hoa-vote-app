import { Injectable } from '@angular/core';
import { LoginResponse } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const USER_KEY = 'auth-user';

export const BASE_API = 'http://hoa-vote-app.ap-southeast-1.elasticbeanstalk.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): LoginResponse {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return new LoginResponse;
  }

  public getRoles(): string [] {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const userL =  JSON.parse(user) as LoginResponse;
      return  userL.roles;
    }

    return [];
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  
  public getHeaders(): HttpHeaders {
    const authToken = this.getUser().token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getUser().token
    });
  }

  public routedAdmin(){
    console.log(this.getRoles())
    if(!this.isLoggedIn()){
      console.log("not log in")
      this.router.navigate(['/login']);
    }

    if(!this.getRoles().includes('ADMIN')){
      console.log("voter")
      this.router.navigate(['/voter-home']);
    }
  }

  public routedUser(){
    if(!this.isLoggedIn()){
      this.router.navigate(['/login']);
    }else if(!this.getRoles().includes('VOTER')){
      this.router.navigate(['/admin-view']);
    }
  }

  public toLogIn(){
    if(!this.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  public logOut(){
    window.sessionStorage.removeItem(USER_KEY);
  }
}
