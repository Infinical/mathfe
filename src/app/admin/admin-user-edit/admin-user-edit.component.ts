import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  user = new User('id', 'name', 'firstname', 'lastname', 'contact', 'email', 0, 'maxile_level', 'game_level', 'date_of_birth', 'last_test_date', 'next_test_date', 'image');

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }
  fileToUplaod: File = null; 
  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.userService.getUser(this.id).subscribe(
      data => {
        this.user = data;
      },
      error => console.log(<any>error));
  }
  handelFileInput(file: FileList) {
    this.fileToUplaod = file.item(0); 
  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateUser(user) {
    const fData: FormData = new FormData();
    fData.append('_method', 'PUT');
    for (let key in user) {
      if (key != "image")
        fData.append(key, user[key]);
    }
    if (this.fileToUplaod != null) {
      fData.append("image", this.fileToUplaod);
    } else {
      fData.append("image", user.image);
    }
    this.userService.updateUser(fData, user.id)
      .subscribe(
        user => {
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
