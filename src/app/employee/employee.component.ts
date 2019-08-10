import {Component, OnInit} from '@angular/core';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Location} from '@angular/common';
import {DeparService} from '../depar.service';
import {Departament} from '../Departament';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  submitted = false;

  employees: Employee[];
  departments: Departament[];

  constructor(
    private empService: EmployeeService,
    private depService: DeparService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.initDepList();
    this.getEmployee();
    this.empForm = this.formBuilder.group({
      empName: ['empName', Validators.required],
      empActive: ['empActive'],
      departamentEntity: ['departamentEntity']
    });
  }

  // convenience getter for easy access to form fields
  // getEmploeeName
  get f() {
    return this.empForm.controls;
  }

  initDepList() {
    this.depService.getDepartList().subscribe(departments => this.departments = departments);
  }

  getEmployee(): void {
    this.empService.getEmployeeList()
      .subscribe(employees => this.employees = employees);
  }

  add(): void {
    this.submitted = true;
    if (this.empForm.invalid) {
      return;
    }
    this.empService.createEmployee(this.empForm.value).subscribe(value => console.log(value));

    console.log(this.empForm.value);
    this.getEmployee();
  }

  cancel(): void {
    this.submitted = false;
    this.empForm.reset();
    // this.empForm.controls['empName'].setValue(null);
    // this.empForm.controls['empActive'].setValue(null);
    // this.location.back();
  }

  delete(emloyee: Employee): void {
    this.employees = this.employees.filter(e => e !== e);
    this.empService.deleteEmployee(emloyee.empId).subscribe();
  }
}
