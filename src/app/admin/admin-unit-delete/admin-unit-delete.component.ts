import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'ag-admin-unit-delete',
  templateUrl: './admin-unit-delete.component.html',
  styleUrls: ['./admin-unit-delete.component.css']
})
export class AdminUnitDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private unitService: UnitService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.unitService.deleteUnit(this.id).subscribe(
      data => {
        this.unitService.updateStatus = data['message'];
        setTimeout(() => this.unitService.updateStatus = '', 2000);
        this.router.navigate(['/admin/units']);
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
