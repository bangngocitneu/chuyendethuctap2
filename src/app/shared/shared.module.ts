import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [SharedComponent, SearchComponent, LoginComponent, PaginationComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    SearchComponent,
    PaginationComponent]
  

})
export class SharedModule { }
