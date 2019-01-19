import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeService } from '../../services/type.service';
import { Type } from '../../models/type';
@Component({
  selector: 'ag-admin-type-create',
  templateUrl: './admin-type-create.component.html',
  styleUrls: ['./admin-type-create.component.css']
})
export class AdminTypeCreateComponent implements OnInit {
  public status: string;
  public message: string;

  constructor(
    private typeService: TypeService,
    private router: Router) { }

  ngOnInit() { }

  public createType(type: Type): void {

    this.typeService.addType(type)
      .subscribe(
        type => {
          this.typeService.updateStatus = type['message'];
          setTimeout(() => this.typeService.updateStatus = '', 2000);
          this.router.navigate(['/admin/types']);
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
