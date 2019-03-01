import { Component, OnInit } from '@angular/core';
import { EnrolmentService } from '../../services/enrolment.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-admin-enrolment-create',
  templateUrl: './admin-enrolment-create.component.html',
  styleUrls: ['./admin-enrolment-create.component.css']
})
export class AdminEnrolmentCreateComponent implements OnInit {
  public status: string;
  public message: string;
  loading: boolean = false;

  constructor(private enrolmentService: EnrolmentService,
    private router: Router, private helperService: HelperService) {

    this.enrolmentService.createEnrolment().subscribe(
      data => {
        debugger;
        // this.statuses = data['statuses'];
        // this.my_tracks = data['my_tracks'] || [];
        // this.public_tracks = data['public_tracks'] || [];
      },
      error => console.error(<any>error));
  }

  public createEnrolment(enrolment): void {
    this.loading = true;

  }

  ngOnInit() {
  }

}
