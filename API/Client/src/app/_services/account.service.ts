import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService { 
  baseUrl = 'https://localhost:5001/api/';
  private CurrentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:User)
  {
    return this.http.post<User>(this.baseUrl +'account/login', model).pipe(
      map((respone : User) => {
          const user = respone;
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.CurrentUserSource.next(user); }
        }))
  }
    
  register(model : any ){
   return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
    map(user => {
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.CurrentUserSource.next(user);
      }
      return user;
    })
   )
  }

  setCurrentUser(user : User){
   this.CurrentUserSource.next(user);
  };

  logout(model : User)
  {
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }
}
