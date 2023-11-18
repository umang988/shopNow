import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public userId: string = null;

  public showSidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selectedForType: BehaviorSubject<string>;
  public showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public cartItemCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService) {
    this.userId = localStorage.getItem('userId');

    let gender = this.activatedRoute.snapshot.paramMap.get('gender');
    this.selectedForType = new BehaviorSubject(gender);
    this.getCartDetails();
  }

  getCartDetails() {
    this.cartService.getCartByUser(this.userId).subscribe((res: any) => {
      if(res.result?.items?.length > 0){
        let count = res.result.items.length;
        this.cartItemCount.next(count);
      } 
    })
  }
}
