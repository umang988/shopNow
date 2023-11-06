import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartDetails: any;
  public userDetails: any;

  constructor(private cartService: CartService,
    private toastr : ToastrService ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.getCartData();
  }

  getCartData() {
    this.cartService.getCartByUser(this.userDetails._id).subscribe((res: any) => {
      this.cartDetails = res.result;
    })
  }

  increaseQuantity(itemId) {
    
    let itemIndex = this.findItem(itemId)
    if (itemIndex > -1) {
      this.cartDetails.items[itemIndex].quantity += 1;
      this.updateCart();
    }
  }

  decreaseQuantity(itemId){
    let itemIndex = this.findItem(itemId)
    if (itemIndex > -1) {
      this.cartDetails.items[itemIndex].quantity -= 1;
      this.updateCart()
    }
  }

  findItem(itemId){
    return this.cartDetails.items.findIndex((ele) => {
      return ele._id == itemId;
    })
  }

  removeItem(itemId){
    let itemIndex = this.findItem(itemId);
    if(itemIndex > -1){
      this.cartDetails.items.splice(itemIndex,1);
      this.updateCart();
    }
  }

  updateCart(){
    console.log(this.cartDetails._id, this.cartDetails.items)
    this.cartService.updateCart(this.cartDetails._id, { items : this.cartDetails.items }).subscribe((res : any) => {
      this.toastr.success(res.message, "SUCCESS");
      this.getCartData();
    })
  }

}
