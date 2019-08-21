import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    // private service: UserService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
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
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm['username'], this.loginForm['password']).subscribe(v => console.log(v));
    // this.service.authenticate(this.loginForm, () => {
    //   this.router.navigateByUrl('/');
    // })
    // console.log(this.loginForm.value);
  }
}
