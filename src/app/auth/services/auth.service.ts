import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url : string = `${environment.apiUrl}/auth`;
  private token : BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private isAuth : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http : HttpClient, private toastr : ToastrService, private router : Router) { }

  get isAuthStatus(){
    return this.isAuth.asObservable();
  }

  get getToken() {
    return this.token.asObservable();
  }

  login(data : any) {
    this._http.post(`${this.url}/login`, data).subscribe((res : any) => {
      if(res.result) {
        this.toastr.success(res.message, "SUCCESS");
        localStorage.setItem('user', JSON.stringify(res.result));
        localStorage.setItem('token', res.result.token);
        localStorage.setItem('expiresIn', res.result.expiresIn);
        localStorage.setItem('userId', res.result._id);
        this.token.next(res.result.token);
        this.isAuth.next(true);
        if(res.result.roleId == 3){
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/product/add'])
        }
      }
    });
  }

  autoLogin(){
    let token = localStorage.getItem('token');
    let expiresIn = localStorage.getItem('expiresIn');
    if(token && expiresIn) {
      this.token.next(token);
      this.isAuth.next(true);
    }
  }

  signup(data : any) {
    this._http.post(`${this.url}/signup`, data).subscribe((res : any) => {
      this.toastr.success(res.message, 'SUCCESS');
      this.router.navigate(['/home']);
    });
  }

  logout(){
    localStorage.clear();
    this.isAuth.next(false);
    this.token.next(null);
    this.router.navigate(['/login']);
  }
}
