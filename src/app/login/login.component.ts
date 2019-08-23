import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = false;
  returnUrl: string;

  constructor(
    // private service: UserService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router,
    // private location: Location
  ) {
    // redirect to employee page if already logged in
    if (this.authService.currentUserValue) {
      this.route.navigate(['/employee']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // console.log(this.loginForm.value);
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first()).subscribe(
        data => {
          // console.log(data);
          this.route.navigate(['/employee']);
        },
      error => {
          this.loading = false;
          this.errorMessage = true;
      }
    );
    // this.service.authenticate(this.loginForm, () => {
    //   this.router.navigateByUrl('/');
    // })
    // console.log(this.loginForm.value);
  }

  cancel() {
    this.errorMessage = false;
    this.loginForm.reset();
  }
}
