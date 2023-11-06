import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup;
  public showPassword : boolean = false;
  public isAuth : boolean = false;

  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
    this.authService.isAuthStatus.subscribe((authStatus) => {
      this.isAuth = true;
      this.router.navigate(['/home'])
    })
    this.loginForm = new FormGroup({
      email : new FormControl(null, [Validators.required]),
      password : new FormControl(null, [Validators.required]),
    })
  }

  togglePasswordVisiblity(){
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
    }
  }

}
