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
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss'],
  providers: [TableService, DecimalPipe, MessageService],
})
export class DigitalListComponent implements OnInit {

  visible: boolean = false;
  tableItem$: Observable<any[]>;
  total$: Observable<number>;
  public productList: any[] = [];

  variantSelected: number;

  constructor(
    public apiService: ApiService, 
    public service: TableService, 
    private modalService: NgbModal,
    private messageService: MessageService) {
  }

  async ngOnInit() { 
    this.tableItem$ = this.service.tableItem$;
    this.total$ = this.service.total$;
    await this.loadProducts();
    this.service.setUserData(this.productList)
  }

  async loadProducts() {
    const products = await this.apiService.getAllProductsByVariants();
    products.data.forEach(elem => {
      elem.imagesUrl = elem.imagesUrl.split(',');
    })
    this.productList = products.data;   
    console.log(this.productList);
      
    
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

  showConfirm(id: number) {
    this.variantSelected = id;
    if (!this.visible) {
      this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: `You are about to delete this product, are you sure ?`, detail: 'Confirm to proceed' });
      this.visible = true;
    }
  }

  async onConfirm() {
    try {
      const result = await this.apiService.deleteVariant(this.variantSelected);
      console.log(result);

      if (result.data.affectedRows !== 0) {
        this.messageService.add({ severity: 'success', summary: 'Coleccion eliminada', detail: `Se elimino la colecion correctamente` });
        this.messageService.clear('confirm');
        this.visible = false;

        setTimeout(() => {
          this.reload();
        }, 1000);
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Se produjo un error: ${error.message}` });
    }
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  reload() {
    window.location.reload();
  }

}
