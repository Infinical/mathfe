import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { HelperService } from '../../services/helper.service';
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

  constructor(private userService: UserService, public dialog: MatDialog, private helperService: HelperService) { }

  ngOnInit() {
    this.bindUsers();
  }
  private bindUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => console.error(<any>error));

  }
  resetUpdateStatus() {
    this.userService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.userService.updateStatus;
  }

  public openDialog(id: String): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete User" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.userService.deleteUser(id).subscribe(
            data => {
              this.userService.updateStatus = data['message'];
              window.scrollTo(0, 0);
              setTimeout(() => this.userService.updateStatus = '', 2000);

            },
            error => {
              window.scrollTo(0, 0);
              this.userService.updateStatus = this.helperService.ParseErrorMsg(error);
            });
        } else {
          //rejected
        }
      });
  }

}
