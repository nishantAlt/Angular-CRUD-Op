import { Injectable, OnInit } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService implements OnInit {
 
  constructor() {

  }
  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: 'D3',
      isActive: true,
      photoPath: 'assets/images/mark.png',
      password: '',
      cpassword: '',
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: 'D2',
      isActive: true,
      photoPath: 'assets/images/mary.png',
      password: '',
      cpassword: '',
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: 'D3',
      isActive: false,
      photoPath: 'assets/images/john.png',
      password: '',
      cpassword: '',
    },
  ];

  ngOnInit()
  {
    
  }

  getEmployees(): Observable<Employee[]> {
    return of(this.listEmployees).pipe(delay(2000));
  }

  getEmployee(id: number) :Employee{
    return this.listEmployees.find(e=>e.id===id);
  }

  save(employee: Employee){
    this.listEmployees.push(employee);
    console.log('added data');
  }
}
