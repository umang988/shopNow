import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  public isAuth: boolean;
  
  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthStatus.subscribe((authStatus : boolean) => {
      this.isAuth = authStatus;
    })
  }

}
