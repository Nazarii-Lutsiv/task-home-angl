import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../registration/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../registration/user.service';
import {HttpClient} from '@angular/common/http';


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
    private service: UserService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['userName', Validators.required],
      password: ['password', [Validators.required, Validators.minLength(8)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  submit() {
    // this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.service.authenticate(this.loginForm, () => {
    //   this.router.navigateByUrl('/');
    // })
    // console.log(this.loginForm.value);
  }
}
