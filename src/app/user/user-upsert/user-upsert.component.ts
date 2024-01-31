import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { DataService } from 'src/app/service/dataService';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss']
})
export class UserUpsertComponent {
  upsertForm!: FormGroup;
  constructor(
    private dataService: DataService,
    private FormBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}
  ngOnInit(){
    console.log(this.dataService.selectedUser);
    console.log(this.route.snapshot.queryParams['id']);
    this.dataService.selectedUser = this.dataService.userList.find((user) => {return user.id == this.route.snapshot.queryParams['id']}) || {};

    this.upsertForm = this.FormBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
    if(this.dataService.selectedUser && this.dataService.selectedUser.id == this.route.snapshot.queryParams['id'])
    {
      this.upsertForm.patchValue(this.dataService.selectedUser);
    }
  }

  ngAfterViewInit() {
    let phoneInput = document.getElementById('phone-input');
    phoneInput?.addEventListener('keypress', (event) => {
      if(isNaN(Number(event.key))) {
        event.preventDefault();
      }
    })
  }

  upsertUser(){
    console.log(this.dataService.selectedUser);
    let maxId = Math.max(...this.dataService.userList.map(i => {return i.id}));
    console.log(maxId);
    let user: IUser = {
      id: this.dataService.selectedUser.id || maxId + 1,
      FirstName: this.upsertForm.value.FirstName,
      LastName: this.upsertForm.value.LastName,
      Address: this.upsertForm.value.Address,
      Email: this.upsertForm.value.Email,
      Phone: this.upsertForm.value.Phone
    }
    if(!this.dataService.selectedUser.id){
      this.dataService.insertUser(user);
    } else{
      this.dataService.updateUser(user);
    }
    
    console.log(user);
  }

}
