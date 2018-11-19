import { Component, OnInit, Input, OnDestroy,Output,EventEmitter } from '@angular/core';
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
  @Output() editingmode= new EventEmitter<boolean>();

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
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.editingmode.emit(false);
        }, 3000);
      },
      error => { 
        console.log(<any>error);
        this.status = 'success';
        this.message = error['message'];
      }
    );
  }
}
