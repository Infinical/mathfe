import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FieldService } from '../../services/field.service';
import { Field } from '../../models/field';

@Component({
  selector: 'ag-admin-field-edit',
  templateUrl: './admin-field-edit.component.html',
  styleUrls: ['./admin-field-edit.component.css']
})
export class AdminFieldEditComponent implements OnInit, OnDestroy {
  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any; 
  formData: FormData = new FormData();


  field = new Field('id', 'field', 'description');

  constructor(
    private activatedRoute: ActivatedRoute,
    private fieldService: FieldService,
    private router: Router
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.fieldService.getField(this.id).subscribe(
      data => {
        this.field = data; 
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateField(field:Field) {  
    this.fieldService.updateField(field)
      .subscribe(
        field => {
          this.status = 'success';
          this.message = field['message'];
          this.fieldService.updateStatus = this.message = field['message'];
          setTimeout(() => this.fieldService.updateStatus = '', 2000);
          this.router.navigate(['/admin/fields']);
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
