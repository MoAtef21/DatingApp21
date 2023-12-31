
import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';


export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  
   if(component.editForm?.dirty){ 
  return confirm("Any changes you didn't save it will be lost Are you sure you want to leave ?!")
  }
  return true;
};
