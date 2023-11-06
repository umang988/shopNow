import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/core/util/util.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  public productList : any;
  public gender : string;

  constructor(private productService: ProductService,
    private activatedRoute : ActivatedRoute,
    private utilService : UtilService
  ) { }

  ngOnInit(): void {
    this.utilService.selectedForType.subscribe(res => {
      this.gender = res;
      if(this.gender){
        this.getProductList();
      }
    })    
  }

  public getProductList(){
    this.productService.getAllProducts(this.gender).subscribe((res : any) => {
      this.productList = res.result;
    }, (err) => {
      this.productList = [];
    })
  }
}
