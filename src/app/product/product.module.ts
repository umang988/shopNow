import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductComponent } from './list-product/list-product.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [
    ProductComponent,
    AddUpdateProductComponent,
    ListProductComponent,
    DisplayComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
