import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {


  employees?: Employee[];
  filteredEmployees?: Employee[];
  constructor(private _router:Router, private _route:ActivatedRoute) {
    this.employees=this._route.snapshot.data['employeeList'];

    this._route.queryParamMap.subscribe((queryParam)=>{
      if(queryParam.has('searchTerm'))
      {
        this.searchTerm=queryParam.get('searchTerm');
      }
      else{
        this.filteredEmployees=this.employees;

      }
    })

   }
   dataFromChild:string="";
   handleNotify(eventData:string){
    this.dataFromChild=eventData
   }

  ngOnInit(): void {
    // this._employeeService.getEmployees().subscribe((empList)=>{
    //   this.employees=empList; 

     
    // });
  }
    // this.employeeToDisplay=this.employees[0];
    // if(this._route.snapshot.queryParamMap.has('searchTerm'))
    // {
    //   this.searchTerm=this._route.snapshot.queryParamMap.get('searchTerm');
    // }
    // else{
    //   this.filteredEmployees=this.employees;
    // }

    
 

  private _searchTerm:string;

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value: string){
    this._searchTerm=value;
    this.filteredEmployees=this.filterEmployees(value);
  }

  filterEmployees(searchString:string) :Employee[]{
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
  } 

  onClick(employeeId: number)
  {
    this._router.navigate(['employees',employeeId],{queryParams: {'searchTerm':this.searchTerm, 'testParam': 'testValue'}})
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

  changeEmployeeName()
  {
    // const newEmployeeArray: Employee[] = Object.assign([],this.employees);
    // newEmployeeArray[0].name='Jordan';
    // this.employees=newEmployeeArray;
    this.employees[0].name="Jordan";
    this.filteredEmployees=this.filterEmployees(this.searchTerm);
  }
}


