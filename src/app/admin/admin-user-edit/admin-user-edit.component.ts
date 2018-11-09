import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'ag-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit, OnDestroy {
  status: string;
  message: string;
  id: any;
  params: any;

  user = new User('id', 'name', 'firstname', 'lastname','contact', 'email', 0, 'maxile_level', 'game_level', 'date_of_birth', 'last_test_date', 'next_test_date','image');

  constructor(private activatedRoute:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.userService.getUser(this.id).subscribe(
	  data => {
	    this.user = data;
	  },
	  error =>  console.log(<any>error));
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
