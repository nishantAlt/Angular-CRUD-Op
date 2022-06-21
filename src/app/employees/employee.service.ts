import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService implements OnInit {
  constructor() {}
  
  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'male',
      contactPreference: 'email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date(1998,10,25),
      department: 'D3',
      isActive: true,
      photoPath: 'assets/images/mark.png',
      password: '',
      cpassword: '',
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'female',
      contactPreference: 'phoneNumber',
      phoneNumber: 2345978640,
      dateOfBirth: new Date(1979,11,13),
      department: 'D2',
      isActive: true,
      photoPath: 'assets/images/mary.png',
      password: '',
      cpassword: '',
    },
    {
      id: 3,
      name: 'John',
      gender: 'male',
      contactPreference: 'phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date(1976,3,26),
      department: 'D3',
      isActive: false,
      photoPath: 'assets/images/john.png',
      password: '',
      cpassword: '',
    },
  ];

  ngOnInit() {}

  getEmployees(): Observable<Employee[]> {
    return of(this.listEmployees).pipe(delay(2000));
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find((e) => e.id === id);
  }

  save(employee: Employee) {
    if (employee.id === 0) {
      const maxId = this.listEmployees.reduce(function (e1, e2) {
        return e1.id > e2.id ? e1 : e2;
      }).id;
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
      console.log('added data');
    } else {
      const foundIndex = this.listEmployees.findIndex(
        (e) => e.id === employee.id
      );
      this.listEmployees[foundIndex] = employee;
    }
  }

  deleteEmployee(id: number) {
    const i=this.listEmployees.findIndex(e=>e.id===id);
    if(i!==-1)
    {
      this.listEmployees.splice(i, 1);
    }
  }
}
