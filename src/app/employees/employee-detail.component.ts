import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee:Employee;
  constructor(private _route:ActivatedRoute, private _employeeService:EmployeeService,private _router:Router) { }

  ngOnInit(): void {
    // this._id= +this._route.snapshot.params['id'];
    // this.employee=this._employeeService.getEmployee(this._id);
    this._route.paramMap.subscribe(params =>{ 
      this._id= +params.get('id')
      this.employee=this._employeeService.getEmployee(this._id);
    })
  }
  private _id:number;
  ViewNextEmployee()
  {
    if(this._id<3)
    {
      this._id++;
    }
    else{
      this._id=1;
    }
    this._router.navigate(['employees',this._id]);
  }

}
