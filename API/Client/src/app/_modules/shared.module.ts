import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
    }),
    ToastNoAnimationModule.forRoot({
      /* ... any configurations you might need for ToastrModule ... */
      /* For example: */
      timeOut:2000,
      positionClass:'toast-bottom-right',
      preventDuplicates: true,
    }), // Optionally, include this if you're using Toastr without animations
      NgxSpinnerModule.forRoot({
        type:'pacman' 
      })
  ],
  exports : [
    BsDropdownModule,
    ToastrModule,
    ToastNoAnimationModule,
    TabsModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
