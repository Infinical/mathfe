import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldService } from 'app/services/field.service';

@Component({
  selector: 'ag-admin-field-delete',
  templateUrl: './admin-field-delete.component.html',
  styleUrls: ['./admin-field-delete.component.css']
})
export class AdminFieldDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private fieldService: FieldService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.fieldService.deleteField(this.id).subscribe(
      data => {
        this.fieldService.updateStatus = data['message'];
        setTimeout(() => this.fieldService.updateStatus = '', 2000);
        this.router.navigate(['/admin/fields']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        this.msg = "Server Error";
        if (error.error) {
          if (error.error.message) {
            this.msg = error.error.message;
          }
        }
        console.error(<any>error);
      }
    )
  };
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
