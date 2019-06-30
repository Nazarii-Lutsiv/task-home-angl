import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authenticated = false;

  constructor(private http: HttpClient,
              private router: Router) {

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
