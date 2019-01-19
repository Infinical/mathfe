import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit';

@Component({
  selector: 'ag-admin-unit-create',
  templateUrl: './admin-unit-create.component.html',
  styleUrls: ['./admin-unit-create.component.css']
})
export class AdminUnitCreateComponent  implements OnInit {
  public status: string;
  public message: string;

  constructor(
    private unitService: UnitService,
    private router: Router) { }

  ngOnInit() { }

  public createUnit(unit: Unit): void {

    this.unitService.addUnit(unit)
      .subscribe(
        unit => {
          this.unitService.updateStatus = unit['message'];
          setTimeout(() => this.unitService.updateStatus = '', 2000);
          this.router.navigate(['/admin/units']);
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