import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from './User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }


  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      this.http.post('http://localhost:8080/regist', JSON.stringify(
        this.userForm
      ), {observe: 'response'}).subscribe(value => {
        console.log(value);
      });
    }
    console.log(this.userForm.value);
    this.router.navigate(['']);
  }

  //   this.submitted = true;
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  //
}
