import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required, Validators.minLength(8)]]
    }, {validator: this.MustMatch('password', 'confirmPass')});
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  checkPasswords() {
    const pass = this.f['password'].value;
    const confirmPass = this.f['confirmPass'].value;
    return pass === confirmPass ? null : {notSame: true};
  }

  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.user = {
      id: null,
      password: this.f['password'].value,
      username: this.f['username'].value,
      token: null
    };
    this.userService.createUser(this.user).subscribe(value => console.log(value));
    /*else {
      this.http.post('http://localhost:8080/regist', JSON.stringify(
        this.userForm
      ), {observe: 'response'}).subscribe(value => {
        console.log(value);
      });
    }*/

    // console.log(this.userForm.value);
    // this.router.navigate(['']);
  }
  cancel() {
    this.submitted = false;
    this.userForm.reset();
  }
}
