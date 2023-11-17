import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UtilService } from '../../util/util.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  public isAuth: boolean;
  public showLoader : boolean = false;
  
  constructor(private authService : AuthService, private utilService : UtilService) {}

  ngOnInit(): void {
    this.authService.isAuthStatus.subscribe((authStatus : boolean) => {
      this.isAuth = authStatus;
    })
    this.utilService.showLoader.subscribe((loaderStatus : boolean) => {
      this.showLoader = loaderStatus;
    })
  }

}
