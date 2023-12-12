import { error, Console } from 'console';
import { User } from './../_models/User';
import { response } from 'express';
import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  model : any = {}
  @Output () cancelRegister = new EventEmitter();
  
  constructor (private _accountService : AccountService ,
    private toastr : ToastrService) {} ;

  ngOnInit(): void {  
  }

  register(){
   this._accountService.register(this.model).subscribe({
    next : () => {
    this.cancel();
    },
    error : error => {this.toastr.error(error.error);
    console.log(error);
  }
   }) 
  }
  cancel(){
   this.cancelRegister.emit(false);
  }

}
