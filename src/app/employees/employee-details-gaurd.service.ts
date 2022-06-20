import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        const employeeExist=!!this._employeeService.getEmployee(+route.paramMap.get('id'));
        if(employeeExist){
            return true;
        }
        else{
            this._router.navigate(['notFound']);
            return false;
        }
    }   

    constructor(private _employeeService: EmployeeService, private _router:Router){

    }
}