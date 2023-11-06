import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url : string = `${environment.apiUrl}/cart`;
  public cartDetails : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http : HttpClient) { }

  getCartByUser(userId : string) {
    return this.http.get(`${this.url}/getCartDetailsByUserId/${userId}`);
  }

  initializeCart(data : any){
    return this.http.post(`${this.url}/addCart`, data);
  }

  addNewItem(cartId : string, data : any){
    return this.http.post(`${this.url}/addNewItem/${cartId}`, data);
  }

  updateCart(cartId : string, data : any){
    return this.http.put(`${this.url}/updateCart/${cartId}`, data);
  }
}
