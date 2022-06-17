import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  employee : Employee={
    id:0,
    name:"",
    gender:"",
    email:"",
    phoneNumber:0,
    contactPreference:"",
    dateOfBirth: this.dateofBirth,
    department:'d0',
    isActive:false,
    photoPath:"",
    password:"",
    cpassword:""
  }

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

  constructor(private _employeeService:EmployeeService,private _router:Router) {

   }

  ngOnInit(): void {
  }

  saveEmployee(empForm:NgForm) {
    console.log(empForm.value);
    console.log(empForm);
    this._employeeService.save(this.employee);
    this._router.navigate(['list']);
  }
}
