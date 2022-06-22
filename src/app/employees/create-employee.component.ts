import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../models/deptartment.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm:NgForm;
  dateofBirth: Date=new Date(2020, 0,30);
  employee : Employee;

  departments: Department[]=[
    {id:'D1',name:'Help Desk'},
    {id:'D2',name:'HR'},
    {id:'D3',name:'IT'},
    {id:'D4',name:'Payroll'},
  ]  

  previewPhoto=false;

isActive=true;
photoPath="";

togglePhotoPreview()
{
  this.previewPhoto=!this.previewPhoto
}

required:boolean=true;

  constructor(private _employeeService:EmployeeService,private _router:Router,private _route:ActivatedRoute) {

   }

  ngOnInit(): void {
    this._route.paramMap.subscribe((parameterMap)=>{
      const id=+parameterMap.get('id');
      this.getEmployee(id);
    })
  }

  private getEmployee(id:number)
  {
    if(id==0)
    {
      this.employee={
        id:0,
        name:"",
        gender:"",
        email:"",
        phoneNumber:"",
        contactPreference:"",
        dateOfBirth: this.dateofBirth,
        department:'d0',
        isActive:false,
        photoPath:"",
        password:"",
        cpassword:""
      };
      //this.createEmployeeForm.reset();
    }
    else{
      //this.employee=Object.assign({},this._employeeService.getEmployee(id));
      this._employeeService.getEmployee(id).subscribe((data)=>{
        this.employee=data;
      });
    }
  }

  saveEmployee(empForm:NgForm) {
    const newEmployee: Employee = Object.assign({},this.employee)
    console.log(empForm.value);
    console.log(empForm);
    this._employeeService.save(newEmployee).subscribe(
      (data:Employee)=>{
        console.log("From server: ")
        console.log(data)
        empForm.reset();
        this._router.navigate(['list']);
      }
    );
    
  }

 

}
