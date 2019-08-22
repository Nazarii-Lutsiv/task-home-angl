import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Location} from '@angular/common';
import {DeparService} from '../depar.service';
import {Departament} from '../Departament';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../authentication.service';
import {User} from '../User';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit/*, OnDestroy */{
  currentUser: User;
  currentUserSubscription: Subscription;
  submitted = false;
  empForm: FormGroup;
  employees: Employee[];
  departments: Departament[];
  // for mat-table
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['ID', 'Name', 'Active', 'Department', 'Actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private empService: EmployeeService,
    private depService: DeparService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.dataSource = new MatTableDataSource<Employee>(this.employees);
    // this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  ngOnInit(): void {
    this.initDepList();
    this.getEmployee();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.empForm = this.formBuilder.group({
      empName: ['empName', Validators.required],
      departamentEntity: ['departamentEntity', Validators.required],
      empActive: ['empActive']
    });

  }

  // ngOnDestroy(): void {
  //   this.currentUserSubscription.unsubscribe();
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.empForm.controls;
  }

  initDepList() {
    this.depService.getDepartList()
      .pipe(first())
      .subscribe(departments => this.departments = departments);
  }

  getEmployee(): void {
    this.empService.getEmployeeList()
      .pipe(first())
      .subscribe(employees => {
        employees.sort((emp1, emp2) => {
          if (emp1.empID > emp2.empID) {return 1; }
          if (emp1.empID < emp2.empID) {return -1; }
          return 0;
        })
        this.employees = employees;
        this.dataSource.data = employees;
        console.log(employees); });
  }

  add(): void {
    this.submitted = true;
    if (this.empForm.invalid) {
      return;
    }
    this.empService.createEmployee(this.empForm.value).subscribe(value => {
      this.dataSource.data.push(value);
      this.dataSource.data = [...this.dataSource.data];
      this.employees.push(value);
    });
    console.log(this.empForm.value);
  }

  cancel(): void {
    this.submitted = false;
    this.empForm.reset();
  }

  delete(emloyee: Employee): void {
    this.empService.deleteEmployee(emloyee.empID).subscribe();
    this.employees = this.employees.filter(e => e !== emloyee);
    this.dataSource.data = this.dataSource.data.filter(e => e !== emloyee);
    this.dataSource.data = [...this.dataSource.data];
  }
}
