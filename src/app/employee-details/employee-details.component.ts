import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../Employee';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Departament} from '../Departament';
import {DeparService} from '../depar.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: Employee;
  departments: Departament[];
  empForm: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private location: Location,
    private formBuilder: FormBuilder,
    private depService: DeparService
  ) { }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      empName: ['empName', Validators.required],
      departamentEntity: ['departamentEntity', Validators.required],
      empActive: ['empActive']
    });
    this.getEmployee();
    this.initDepList();
  }

  get f() {
    return this.empForm.controls;
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  initDepList() {
    this.depService.getDepartList().subscribe(departments => this.departments = departments);
  }

  cancel(): void {
    this.location.back();
  }

  save(): void {
    this.submitted = true
    if (this.empForm.invalid) {
      return;
    }
    const id = +this.route.snapshot.paramMap.get('id');
    this.empService.editEmployee(id, this.empForm.value)
      .subscribe(() => this.cancel());
  }
}
