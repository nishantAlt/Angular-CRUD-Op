import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';

import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  @Input() employee : Employee;

  @Output() nofity: EventEmitter<string>=new EventEmitter<string>();

  constructor() { }

  handleClick(){
    this.nofity.emit(this.employee.name);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousEmployee = <Employee>changes['employee'].previousValue;
    const currentEmployee = <Employee>changes['employee'].currentValue;
    console.log('Previous: '+(previousEmployee?previousEmployee.name:'NULL'));
    console.log('Current: '+currentEmployee.name)
    console.warn("=====")
  }
}
