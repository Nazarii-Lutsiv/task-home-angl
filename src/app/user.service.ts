import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from './User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user';
  authenticated = false;

  constructor(private http: HttpClient,
              private router: Router) {

  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}` + `/regist`, user);
  }

  // authenticate(credentials, callback) {
  //   const headers = new HttpHeaders(credentials ? {
  //     authorization: 'Basic' + btoa(credentials.userName + ':' + credentials.password)
  //   } : {});
  //
  //   this.http.get('http://localhost:8080/user', {headers: headers}).subscribe(response => {
  //     if (response['name']) {
  //       this.authenticated = true;
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.authenticated = false;
  //     }
  //     return callback && callback();
  //   });

}
