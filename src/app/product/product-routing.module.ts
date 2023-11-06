import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'shop/:gender', component: ListProductComponent},
  { path: 'details/:productId', component: DisplayComponent},
  { path: 'add', component: AddUpdateProductComponent},
  { path: 'edit/:id', component: AddUpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
