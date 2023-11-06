import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm! : FormGroup;
  public showPassword : boolean = false;
  public showConfirmPassword : boolean = false;

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname : new FormControl('', [Validators.required]),
      lastname : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
    })
  }

  get signupFormControls() {
    return this.signupForm.controls;
  }

  togglePasswordVisiblity(){
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisiblity(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSignup() {
    if(this.signupForm.valid){
      this.authService.signup(this.signupForm.value);
    }
  }

}
