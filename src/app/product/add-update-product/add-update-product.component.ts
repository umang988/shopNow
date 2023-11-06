import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Global } from 'src/app/core/constants/globalConstants';
import { FileuploadService } from 'src/app/shared/services/fileupload.service';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {

  public productForm : FormGroup;
  public isEditable : boolean = false;
  public forTypes : any[] = Global.FOR_TYPES;
  public categoryList : any[] = Global.CATEGORIES;
  public subCategoryList : any[] = [];
  public filesCount : string;

  constructor(private fileUploadService : FileuploadService, private productService : ProductService, private toastr : ToastrService) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      price : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      gender : new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subCategory : new FormControl('', [Validators.required]),
    })
  }

  get productFormControls(){
    return this.productForm.controls;
  }

  onCategorySelect(e :any){
    this.subCategoryList = Global[e.target.value];
  }

  onImageSelect(e : any){
    let fd = new FormData();
    for(let file of e.target.files){
      fd.append('image', file);
    }
    this.fileUploadService.fileupload(fd).subscribe((res : any) => {
      this.productForm.value['image'] = res.images;
      this.filesCount = res.images.length + ' ' + (res.images.length === 1 ? 'file' : 'files');
    });
  }

  onSubmit(){
    if(this.productForm.valid){
      this.productService.addProduct(this.productForm.value).subscribe((res : any) => {
        this.toastr.success(res.message, "SUCCESS");
        this.productForm.reset();
      })
    }
  }

}
