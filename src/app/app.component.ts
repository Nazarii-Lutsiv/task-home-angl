import { Component } from '@angular/core';
import {UserService} from './registration/user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task-home-1';

  constructor(private userService: UserService,
              private http: HttpClient,
              private router: Router) {
    // this.userService.authenticate(undefined, undefined);
  }

  loguot(): void {
    this.http.post('logout', {}).lift(() => {
        this.userService.authenticated = false;
        this.router.navigateByUrl('/login');
      }).subscribe();
  }
}
