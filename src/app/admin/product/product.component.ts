import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
// import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

//   fileName = 'ExcelSheet.xlsx';

// xuatExcel(): void{
//   let element = document.getElementById('excel-table');
//   const ws: XLSX.WorkSheet = XLSX.untils.table_to_sheet(element);

//   const wb: XLSX.WorkProduct = XLSX.untils.table_to_sheet(element);
//   XLSX.untils.product_append_sheet(wb,ws,'sheet1');

//   XLSX.writeFile(wb,this.fileName);

// }




@ViewChild('closeButtonAdd') closeButtonAdd;
@ViewChild('closeButtonEdit') closeButtonEdit;

addForm = new FormGroup ({
  name: new FormControl('', [Validators.required]),
  category_id: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required]),
  discount_price: new FormControl('', [Validators.required]),
  image: new FormControl('', [Validators.required]),
  quantity: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required])
})

editForm = new FormGroup ({
  name: new FormControl(''),
  category_id: new FormControl(''),
  price: new FormControl(''),
  discount_price: new FormControl(''),
  image: new FormControl(''),
  quantity: new FormControl(''),
  description: new FormControl(''),
  enable: new FormControl('')
})
  listProductCurrent;
  currentPage = 1;
  products;
  listProduct;
  selectedProduct;
  enable = "true"
  constructor(private router:Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.getListProduct();
  }
  //get
  getListProduct () {
    this.listProduct = []
    this.productService.get().then(res => {
      this.listProduct = res;
      this.paging();
    }) 
    .catch(err => {
      console.log(err)
    })
  }
  //delete
  delete(id?){
    let resutl = window.confirm("Bạn có chắc chắn xóa?");
    if(resutl){
      this.productService.detele(id).then(res=>{
        //thành công
        this.getListProduct();
      })
    }
  }

  //add
  addProduct(){
    let product = {
      name: this.addForm.value.name,
      category_id: this.addForm.value.category_id,
      price: this.addForm.value.price,
      discount_price: this.addForm.value.discount_price,
      image: this.addForm.value.image,
      quantity: this.addForm.value.quantity,
      description: this.addForm.value.description
    }
    this.productService.add(product).then(response=>{
      this.getListProduct();
    });
    this.closeModal("add");
    this.addForm.reset();
  }
  public closeModal(check): void {
   if(check == "add"){
     this.closeButtonAdd.nativeElement.click();
   } else
    this.closeButtonEdit.nativeElement.click();
  }

  //edit
  openForm(list?){
    this.selectedProduct = list;
    this.editForm.setValue({
      name: list.name,
      category_id: list.category_id,
      price: list.price,
      discount_price: list.discount_price,
      image: list.image,
      quantity: list.quantity,
      description: list.description,
      enable: list.enable
    })
  }

  editProduct(){
    let product = {
      id: this.editForm.value.id,
      name: this.editForm.value.name,
      category_id: this.editForm.value.category_id,
      price: this.editForm.value.price,
      discount_price: this.editForm.value.discount_price,
      image: this.editForm.value.image,
      quantity: this.editForm.value.quantity,
      description: this.editForm.value.description,
      enable: this.editForm.value.enable
    }
    this.productService.update(product).then(response=>{
      this.getListProduct();
    })
    this.closeModal("edit");
  }
  paging(event?){
    if(event) {
      this.currentPage = event;
    }
    this.listProductCurrent = this.listProduct.slice(5*(this.currentPage-1), 5*(this.currentPage));
  }
}
