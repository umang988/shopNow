import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/core/util/util.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {

  public productDetails: any;
  public productId: string = null;
  public cartDetails: any;
  public userId: string;
  public productIndex: number;
  public subscriptions: Subscription[] = [];

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private utilService : UtilService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    if (this.productId) {
      this.getProductDetails();
    }
    this.getCartDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  getProductDetails() {
    let productSubscription = this.productService.getProductDetails(this.productId).subscribe((res: any) => {
      this.productDetails = res.result;
    })
    this.subscriptions.push(productSubscription);
  }

  getCartDetails() {
    let cartSubscription = this.cartService.getCartByUser(this.userId).subscribe((res: any) => {
      this.cartDetails = res.result;
      this.productIndex = this.findItem(this.productDetails?._id);
    })
    this.subscriptions.push(cartSubscription);
  }

  increaseQuantity(productId) {
    let itemIndex = this.findItem(productId)
    if (itemIndex > -1) {
      this.cartDetails.items[itemIndex].quantity += 1;
      this.updateCart();
    }
  }

  decreaseQuantity(productId) {
    let itemIndex = this.findItem(productId)
    if (itemIndex > -1) {
      this.cartDetails.items[itemIndex].quantity -= 1;
      this.updateCart();
    }
  }

  findItem(productId) {
    return this.cartDetails?.items?.findIndex((ele) => {
      return ele.product._id == productId;
    })
  }

  goToCart() {
    this.router.navigate(['cart'])
  }

  addItemToCart(productId: string) {
    let data = {
      productId: productId,
      userId: this.userId
    }
    if (this.cartDetails?.items?.length > 0) {
      let cartId = this.cartDetails._id;
      this.cartService.addNewItem(cartId, data).subscribe((res: any) => {
        this.cartDetails = res.result;
        this.updateDetails(res.message);
      })
    } else {
      this.cartService.initializeCart(data).subscribe((res: any) => {
        this.cartDetails = res.result;
        this.updateDetails(res.message);
      })
    }
  }

  updateDetails(msg : string){
    this.productIndex = this.findItem(this.productDetails?._id);
    this.utilService.cartItemCount.next(this.cartDetails.items.length);
    this.toastr.success(msg, "SUCCESS");
  }

  updateCart(){
    this.cartService.updateCart(this.cartDetails._id, { items : this.cartDetails.items }).subscribe((res : any) => {
      this.toastr.success(res.message, "SUCCESS");
      this.getCartDetails();
    })
  }
}
