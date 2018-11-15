import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ag-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() user:User;
  status: string;
  message: string;
  id: any;
  params: any;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.params = this.user['id'];
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }
  updateUser(user) {
    this.userService.updateUser(user)
    .subscribe(
      user  => {
        this.status = 'success';
        this.message = user['message'];
      },
      error => { 
        console.log(<any>error);
        this.status = 'success';
        this.message = error['message'];
      }
    );
  }
}