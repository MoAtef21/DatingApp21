import { error } from 'console';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(public _accountService: AccountService, private router : Router,
     private toastr : ToastrService) { }
  ngOnInit(): void {
  
  }


  login() {
    this._accountService.login(this.model).subscribe({
      next: response => this.router.navigateByUrl('/members'),
      
    }
    )
  }
  logout() {
    this._accountService.logout(this.model);
    this.router.navigateByUrl('/')
  }
}
