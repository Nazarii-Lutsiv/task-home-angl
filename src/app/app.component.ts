import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task-home-1';
  currentUser;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    // this.userService.authenticate(undefined, undefined);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // this.http.post('logout', {}).lift(() => {
    //   this.userService.authenticated = false;
    //   this.router.navigateByUrl('/login');
    // }).subscribe();
  }
}
