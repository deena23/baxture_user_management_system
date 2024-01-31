import { Injectable } from "@angular/core";
import { IUser } from "../models/IUser";
import * as data from '../data/MOCK_DATA.json';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MsgDialogComponent } from "../shared/msg-dialog/msg-dialog.component";

@Injectable({ providedIn: 'root'})
export class DataService{
    userList: IUser[] = data.default;
    notifySubject: Subject<boolean> = new Subject<boolean>;
    selectedUser!: any;
    constructor(
        private router: Router,
        private matDialog: MatDialog
    ){}

    deleteUser(user: IUser){
        let userIndex = this.userList.map((i) => { return i.id}).indexOf(user.id);
        console.log(userIndex);
        if(userIndex != -1) {
            this.userList.splice(userIndex, 1);
            this.notifySubject.next(true);
            const dialogRef = this.matDialog.open(MsgDialogComponent, {
                width: '30%',
                height: '25%',
                data: {
                    message: 'Deleted Successfully'
                }
            });
        }
    }

    editUser(user: IUser) {
        this.selectedUser = user;
        this.router.navigate(['/user-upsert'], { queryParams: {id: user.id}});
    }

    getUser() {
        return this.userList;
    }

    insertUser(user: IUser) {
        this.userList.push(user);
        this.notifySubject.next(true);
        const dialogRef = this.matDialog.open(MsgDialogComponent, {
            width: '30%',
            height: '25%',
            data: {
                message: 'Inserted Successfully'
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/user-list']);
        })
    }

    updateUser(user: IUser) {
        let userIndex = this.userList.map((i) => { return i.id}).indexOf(user.id);
        this.userList[userIndex] = {...user};
        this.notifySubject.next(true);
        const dialogRef = this.matDialog.open(MsgDialogComponent, {
            width: '30%',
            height: '25%',
            data: {
                message: 'Updated Successfully'
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/user-list']);
        })
    }
}   