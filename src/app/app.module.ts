import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { RouterModule,Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-gaurd.service';
import { EmployeeDetailComponent } from './employees/employee-detail.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-gaurd.service';
const appRoutes:Routes=[
  { path:'list', component:ListEmployeesComponent,
  resolve: {employeeList: EmployeeListResolverService}  
},
  { path:'employees/:id', component:EmployeeDetailComponent ,
  canActivate: [EmployeeDetailsGuardService]
},
  { path:'edit/:id', component:CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
  {path: 'notFound',component:PageNotFoundComponent},
  { path:'', redirectTo: '/list', pathMatch:'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [EmployeeService,CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService,
    EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
