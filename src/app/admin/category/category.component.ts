import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('closeButtonAdd') closeButtonAdd;
  @ViewChild('closeButtonEdit') closeButtonEdit;
  addForm = new FormGroup ({
    name: new FormControl('',[Validators.required]),
  })

  editForm = new FormGroup ({
    name: new FormControl(''),
    enable: new FormControl('')
  })

  listCategoryCurrent; //listCurrent
  currentPage = 1;

  category;
  listCategory;
  selectedCategory;
  message : number;
  selectedId;

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getListCategory();
    this.categoryService.currentMessage.subscribe(message => this.message = message);
  }

  // get
  getListCategory () {
    this.listCategory = []
    this.categoryService.get().then(res => {
      this.listCategory = res;
      this.paging();
    }) 
    .catch(err => {
      console.log(err)
    })
  }
  

  //delete
  delete(id?) {
    let result = window.confirm("Bạn có chắc chắn xóa?");
    if(result){
      this.categoryService.delete(id).then( res => {
        // Success
       this.getListCategory();
      })
    }
    
  }

  //add
  addCategory(){
    let category =  {
      name: this.addForm.value.name
    }
    this.categoryService.add(category).then(res => {
      this.getListCategory();
    });
    this.closeModal("add");
    this.addForm.reset();
  };

  public closeModal(check): void {
    if(check == "add"){
      this.closeButtonAdd.nativeElement.click();
    }else
    this.closeButtonEdit.nativeElement.click();
  }

  //edit
  openForm(list?){
    this.selectedCategory=list;
    this.editForm.setValue({
      name: list.name,
      enable: list.enable
    })
  }

  editCategory(){
    let category =  {
      id: this.selectedCategory.id,
      name: this.editForm.value.name,
      enable: this.editForm.value.enable
    }
    this.categoryService.update(category).then(res => {
      this.getListCategory();
    })
    this.closeModal("edit");
  }

  paging(event?){
    if(event) {
      this.currentPage = event;
    }
    this.listCategoryCurrent = this.listCategory.slice(5*(this.currentPage-1), 5*(this.currentPage));
  }

  // bắn id cho productByCategoryId
    detail(id?){
    this.selectedId = id;
    this.categoryService.changeMessage(id);
    this.router.navigate(['admin/productByCategoryId']);
  }
}
