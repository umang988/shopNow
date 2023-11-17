import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url : string = `${environment.apiUrl}/product`

  constructor(private http : HttpClient) { }

  addProduct(data : any) {
    return this.http.post(`${this.url}/addProduct`, data);
  }

  getAllProducts(genderFilter : string) : Observable<any>{
    let param = new HttpParams();
    param = param.append('gender', genderFilter);
    return this.http.get(`${this.url}/getProducts`, { params : param});
  }

  getProductDetails(id : string){
    return this.http.get(`${this.url}/getProductDetailsById/${id}`)
  }
}
