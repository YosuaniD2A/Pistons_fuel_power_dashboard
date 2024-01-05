import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    SharedModule,
    TableModule,
    ToastModule,
    ChipsModule,
    DropdownModule
  ]
})
export class GalleryModule { }
