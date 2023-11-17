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

  public productList: any;
  public gender: string;

  public skeletonArr: any = Array.from({ length: 10 });
  public productLoading: boolean = false;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.utilService.selectedForType.subscribe(res => {
      this.gender = res;
      console.log(this.gender)
      if (this.gender) {
        this.getProductList();
      } else {
        this.gender = this.activatedRoute.snapshot.paramMap.get('gender');
        this.getProductList();
      }
    })
  }

  public getProductList() {
    this.productLoading = true;
    this.productService.getAllProducts(this.gender).subscribe((res: any) => {
      this.productLoading = false;
      this.productList = res.result;
    }, (err) => {
      this.productLoading = false;
      this.productList = [];
    })
  }
}
