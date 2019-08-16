import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from './Employee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empUrl = 'http://localhost:8080/employee';
  private employee: Employee;

  constructor(private http: HttpClient) {
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.empUrl}` + `/create`, employee);
  }

  editEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.empUrl}` + `/update/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.empUrl}` + `/delete/${id}`, {responseType: 'text'});
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.empUrl}` + `/all`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.empUrl}/${id}`);
  }

  setter(employee: Employee) {
    this.employee = employee;
  }

  getter() {
    return this.employee;
  }
}
