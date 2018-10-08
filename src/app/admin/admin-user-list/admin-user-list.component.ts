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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
	  data => {
	    this.users = data;
	  },
	  error =>  console.log(<any>error));
  }
}