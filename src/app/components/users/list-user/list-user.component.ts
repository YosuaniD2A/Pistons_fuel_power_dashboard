import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TableService } from 'src/app/shared/service/table.service';
import { UserListDB, USERLISTDB } from 'src/app/shared/tables/list-users';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [TableService, DecimalPipe, MessageService]
})
export class ListUserComponent implements OnInit {
  public user_list = []
  visible: boolean = false;

  userSelected: number;

  public usersList: any[] = [];
  public tableItem$: Observable<any[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService, private authService: AuthService, private messageService: MessageService) {
  }

  async ngOnInit() {
    this.tableItem$ = this.service.tableItem$;
    this.total$ = this.service.total$;
    await this.loadUsers();
    this.service.setUserData(this.usersList)
  }

  async loadUsers() {
    const users = await this.getAllUsers();
    this.usersList = users.data;   
    console.log(this.usersList);
     
  }

  async getAllUsers() {
    return await this.authService.getUser();
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

  delete(id){
    console.log(id);
    
  }

  showConfirm(id: number) {
    this.userSelected = id;
    if (!this.visible) {
      this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: `You are about to delete this user, are you sure ?`, detail: 'Confirm to proceed' });
      this.visible = true;
    }
  }

  async onConfirm() {
    try {
      const result = await this.authService.deleteUser(this.userSelected);
      console.log(result);

      if (result.data.affectedRows !== 0) {
        this.messageService.add({ severity: 'success', summary: 'Coleccion eliminada', detail: `Se elimino el usuario correctamente` });
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

