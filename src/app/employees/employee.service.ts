import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { delay,throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
@Injectable()
export class EmployeeService implements OnInit {
  constructor(private _httpClient:HttpClient) {
    this._httpClient.get<Employee[]>('https://localhost:44337/api/employees').subscribe((data)=>{
      this.listEmployees=data;
    });
  }
  
  private listEmployees: Employee[];

  ngOnInit() {
    
  }

  // getEmployees(): Observable<Employee[]> {
  //   return of(this.listEmployees).pipe(delay(2000));
  // }

  getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>('https://localhost:44337/api/employees').pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Observable<Employee> {
    //return this.listEmployees.find((e) => e.id === id);
    return this._httpClient.get<Employee>('https://localhost:44337/api/employees/'+id).pipe(catchError(this.handleError));
  }


  private handleError(errorResponse: HttpErrorResponse)
  {
    if(errorResponse.error instanceof ErrorEvent)
    {
      console.log("Client Side Error: ",errorResponse.error.message);
    }
    else{
      console.log("Server Side Error: ",errorResponse);
    }
    return throwError(()=>new Error('There is a problem'));
  }

  save(employee: Employee) : Observable<Employee> | null {
    if (employee.id === 0) 
    {

      const maxId = this.listEmployees.reduce(function (e1, e2) {
        return e1.id > e2.id ? e1 : e2;
      }).id;
      employee.id = maxId + 1;
      delete employee.cpassword;
      return this._httpClient.post<Employee>('https://localhost:44337/api/employees',employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError));
      console.log(employee)
     // this.listEmployees.push(employee);
      console.log('added data');
    } 
    //return null;
    else {
      //this.listEmployees[foundIndex] = employee;
      return this._httpClient.put<Employee>('https://localhost:44337/api/employees/'+employee.id,employee,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError));
    }
  }

  deleteEmployee(id: number) : Observable<Employee> {
    const i=this.listEmployees.findIndex(e=>e.id===id);
    if(i!==-1)
    {
      return this._httpClient.delete<Employee>('https://localhost:44337/api/employees/'+id,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError));
    }
    else{
      return null;
    }
  }
}
