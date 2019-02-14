import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'ng-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users: Observable<User[]>;
  status: string;
  message: string;

  ShowColumns = {
    User: true,
    Email: true,
    First_Name: true,
    Last_Name: true,
    Name: true,
    Admin: true,
    Maxile_Level: true,
    Game_Level: true,
    Date_of_Birth: true,
    Last_Test_Date: true,
    Edit: true
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
	  data => {
	    this.users = data;
	  },
	  error =>  console.error(<any>error));
  }
}
