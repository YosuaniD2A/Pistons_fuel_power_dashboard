import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortEvent } from 'src/app/shared/directives/shorting.directive';
import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
import { TableService } from 'src/app/shared/service/table.service';
import { DigitalCategoryDB } from 'src/app/shared/tables/digital-category';
import { DIGITALLIST, DigitalListDB } from 'src/app/shared/tables/digital-list';
import { ApiService } from 'src/app/shared/service/api.service';
@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss'],
  providers: [TableService, DecimalPipe],
})
export class DigitalListComponent implements OnInit {

  tableItem$: Observable<any[]>;
  total$: Observable<number>;
  public productList: any[] = [];

  constructor(public apiService: ApiService, public service: TableService, private modalService: NgbModal) {
  }

  async ngOnInit() { 
    this.tableItem$ = this.service.tableItem$;
    this.total$ = this.service.total$;
    await this.loadProducts();
    this.service.setUserData(this.productList)
  }

  async loadProducts() {
    const products = await this.apiService.getAllProductsByVariants();
    this.productList = products.data;    
  }

  async getAllCollections() {
    return await this.apiService.getAllCollections();
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }

  

}
