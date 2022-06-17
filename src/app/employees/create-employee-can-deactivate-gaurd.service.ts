import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CreateEmployeeComponent } from './create-employee.component'; 

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent> {
    canDeactivate(
        component: CreateEmployeeComponent,
    ): boolean {
        if(component.createEmployeeForm.dirty){
           return confirm('Are you sure you want to discard your changes?'); 
        }
        else{
            return true;
        }
    }
}