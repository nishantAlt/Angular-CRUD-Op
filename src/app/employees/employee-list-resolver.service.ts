import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList> {
        return this._employeeService.getEmployees().pipe(
            map((employeelist)=> new ResolvedEmployeeList(employeelist)),
            catchError((err:any)=>of(new ResolvedEmployeeList(null,err)))
        );
    }


    constructor(private _employeeService : EmployeeService)
    {
        
    }
}