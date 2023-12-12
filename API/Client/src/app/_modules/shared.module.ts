import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
    }),
    ToastNoAnimationModule.forRoot({
      /* ... any configurations you might need for ToastrModule ... */
      /* For example: */
      timeOut:2000,
      positionClass:'toast-bottom-right',
      preventDuplicates: true,
    }) // Optionally, include this if you're using Toastr without animations
  ],
  exports : [
    BsDropdownModule,
    ToastrModule,
    ToastNoAnimationModule
  ]
})
export class SharedModule { }
