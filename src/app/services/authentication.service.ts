import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8080/user';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private authUser: { username: string; password: string; token: string };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>( `${this.apiUrl}` + `/login`,
      {username: username, password: password}, {
      observe: 'response'
    }).pipe(map(user => {
      if (user.headers.get('Authorization')) {
        const userToken = user.headers.get('Authorization').replace('Bearer ', '');
        localStorage.setItem('currentUser', JSON.stringify(userToken));
        this.authUser = {username: username,
          password: password,
          token: userToken}
        this.currentUserSubject.next(<User>{
          username: username,
          password: password,
          token: userToken
        });
      }
      return this.authUser;
    }));


  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
