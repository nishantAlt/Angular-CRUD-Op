import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  @Input() employee : Employee;
  @Input() searchTerm: string;
  @Output() nofity: EventEmitter<string>=new EventEmitter<string>();
  @Output() notifyDelete: EventEmitter<number>=new EventEmitter<number>();
  confirmDelete:boolean=false;
  selectedEmployeeId:number;
  panelExpanded:boolean=true;
  constructor(private _route:ActivatedRoute,private _router:Router,private _employeeService:EmployeeService) { }

  handleClick(){
    this.nofity.emit(this.employee.name);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const previousEmployee = <Employee>changes['employee'].previousValue;
    // const currentEmployee = <Employee>changes['employee'].currentValue;
    // console.log('Previous: '+(previousEmployee?previousEmployee.name:'NULL'));
    // console.log('Current: '+currentEmployee.name)
    // console.warn("=====")

    this.selectedEmployeeId=+this._route.snapshot.paramMap.get('id');
  }

  viewEmployee()
  {
    this._router.navigate(['/employees',this.employee.id],{queryParams: {'searchTerm':this.searchTerm}})
  }

  editEmployee(){
    this._router.navigate(['/edit',this.employee.id])
  } 

  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      (data:Employee)=>{
        console.log("From server: ")
        console.log(data)
      }
    );;
    this.notifyDelete.emit(this.employee.id);
  }
}
