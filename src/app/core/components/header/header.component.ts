import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { UtilService } from '../../util/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public showProfileMenu : boolean = false;
  public userId : string = null;
  public user : any;
  public cartDetails: any;

  constructor(private authService : AuthService, private cartService : CartService, private utilService : UtilService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
    this.getCartDetails();
  }

  getCartDetails(){
    this.cartService.getCartByUser(this.userId).subscribe((res : any) => {
      console.log(res);
      this.cartDetails = res.result;
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    })
  }

  onTypeChange(type){
    this.utilService.selectedForType.next(type);
  }

  toggleProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
  }

  onLogout(){
    this.authService.logout();
  }
}
