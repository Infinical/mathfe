import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission';

@Component({
  selector: 'ag-admin-permission-create',
  templateUrl: './admin-permission-create.component.html',
  styleUrls: ['./admin-permission-create.component.css']
})
export class AdminPermissionCreateComponent  implements OnInit {
  public status: string;
  public message: string;

  constructor(
    private permissionService: PermissionService,
    private router: Router) { }

  ngOnInit() { }

  public createPermission(permission: Permission): void {

    this.permissionService.addPermission(permission)
      .subscribe(
        permission => {
          this.permissionService.updateStatus = permission['message'];
          setTimeout(() => this.permissionService.updateStatus = '', 2000);
          this.router.navigate(['/admin/permissions']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          console.error(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
  }
}