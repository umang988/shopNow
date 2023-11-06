import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private token : string = null;

  constructor(private authService : AuthService, private toastr : ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getToken.subscribe(token => {
      this.token = token;
    })
    let authReq = req.clone({
      headers : req.headers.set('Authorization', `Bearer ${this.token}`)
    })
    return next.handle(authReq).pipe(
      catchError((err : HttpErrorResponse) => {
        if (req.method === 'POST' || req.method === 'PUT') {
          this.toastr.error(err.error.message, "ERROR");
        }
        return throwError(err);
      })
    );
  }
}
