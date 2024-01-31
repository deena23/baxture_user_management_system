import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/models/IUser';
import { DataService } from 'src/app/service/dataService';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  dataSource : any = [];
  displayedColumns: string[] = ['s.no', 'FirstName', 'LastName', 'Address', 'Email', 'Phone', 'Edit/Delete'];
  @ViewChild('#table') table!: MatTable<any>;
  constructor(
    private dataService: DataService
  ){}
  ngOnInit(){
    this.loadUser();
    this.dataService.notifySubject.subscribe((result: boolean) => {
      if(result) {
        this.loadUser();
      }
    });
  }

  loadUser() {
    this.dataSource = [];
    this.dataSource = this.dataService.getUser();
    this.dataSource.forEach((i: any, index: number) => {
      i.sno = index + 1;
    })
  }
  editUser(selectedUser: IUser){
    this.dataService.editUser(selectedUser);
  }
  deleteUser(selectedUser: IUser){
    this.dataService.deleteUser(selectedUser);
  }
}
