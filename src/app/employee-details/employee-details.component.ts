import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../Employee';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: Employee;
  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  cancel(): void {
    this.location.back();
  }

  save(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empService.editEmployee(id, this.employee)
      .subscribe(() => this.cancel());
  }
}
