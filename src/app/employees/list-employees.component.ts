import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {




  employees?: Employee[];

  constructor(private _employeeService:EmployeeService,private _router:Router) {
    
   }
   dataFromChild:string="";
   handleNotify(eventData:string){
    this.dataFromChild=eventData
   }

  ngOnInit(): void {
    this.employees=this._employeeService.getEmployees();
    this.employeeToDisplay=this.employees[0];
  }

  onClick(employeeId: number)
  {
    this._router.navigate(['employees',employeeId])
  }
  employeeToDisplay: Employee;
  private arrayIndex=1;
  nextEmployee():void{
    if(this.arrayIndex<=2){
      this.employeeToDisplay = this.employees[this.arrayIndex];
    this.arrayIndex++;
    }
    else{
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex=1;
    }
  }
}
