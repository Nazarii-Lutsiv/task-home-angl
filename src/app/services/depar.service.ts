import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Departament} from '../Departament';

@Injectable({
  providedIn: 'root'
})
export class DeparService {

  private depUrl = 'http://localhost:8080/departament';

  constructor(private http: HttpClient) {}

  getDepartList(): Observable<Departament[]> {
    return this.http.get<Departament[]>(`${this.depUrl}` + `/all`);
  }

}
