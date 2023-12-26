import { AccountService } from './_services/account.service';
import { User } from './_models/User';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Console, error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dating App';
  users : any; 

  constructor(private http : HttpClient , private _accountService :AccountService) {
    
  }

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }
  
  /*getUsers(){
    this.http.get('https://localhost:5001/api/user').subscribe({
      next:response => this.users = response,
      error:error => console.log(error),
      complete:() => console.log('Request has Completed Good Mechoo')
    });
  }*/


  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user : User =  JSON.parse(userString);
    this._accountService.setCurrentUser(user);
  }

}
