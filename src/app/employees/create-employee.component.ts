import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/deptartment.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  departments: Department[]=[
    {id:'D1',name:'Help Desk'},
    {id:'D2',name:'HR'},
    {id:'D3',name:'IT'},
    {id:'D4',name:'Payroll'},
  ]  
isActive=true;
  constructor() { }

  ngOnInit(): void {
  }

  saveEmployee(empForm:NgForm) {
    console.log(empForm.value);
  }
}
