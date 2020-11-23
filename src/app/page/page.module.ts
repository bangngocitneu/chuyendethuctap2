import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page.component';



@NgModule({
  declarations: [
    PageComponent,
    FooterComponent,
    HeaderComponent,],
  imports: [
    CommonModule,
    PageRoutingModule,
    ReactiveFormsModule
  ]
})
export class PageModule { }
