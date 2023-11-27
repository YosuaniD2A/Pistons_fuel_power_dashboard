import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChipsModule } from 'primeng/chips';
import { ToastModule } from 'primeng/toast';
// search module
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DigitalCategoryComponent, DigitalListComponent, DigitalAddComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    NgbModule,
    GalleryModule,
    CKEditorModule,
    NgxDropzoneModule,
    ChipsModule,
    SharedModule,
    ToastModule
  ],
  exports: [],
  bootstrap: [],
  providers: [
    NgbActiveModal
  ]
})
export class ProductsModule { }
