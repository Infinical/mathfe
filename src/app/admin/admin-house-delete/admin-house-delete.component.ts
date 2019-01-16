import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'app/services/house.service';

@Component({
  selector: 'ag-admin-house-delete',
  templateUrl: './admin-house-delete.component.html',
  styleUrls: ['./admin-house-delete.component.css']
})
export class AdminHouseDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private houseService: HouseService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.houseService.deleteHouse(this.id).subscribe(
      data => { 
        this.houseService.updateStatus = data['message'];
        setTimeout(() => this.houseService.updateStatus = '', 2000);
        this.router.navigate(['/admin/houses']);
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
