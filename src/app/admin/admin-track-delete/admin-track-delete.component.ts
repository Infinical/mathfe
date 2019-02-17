import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from 'app/services/track.service';

@Component({
  selector: 'ag-admin-track-delete',
  templateUrl: './admin-track-delete.component.html',
  styleUrls: ['./admin-track-delete.component.css']
})
export class AdminTrackDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private trackService: TrackService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.trackService.deleteTrack(this.id).subscribe(
      data => {
        this.trackService.updateStatus = data['message'];
        setTimeout(() => this.trackService.updateStatus = '', 2000);
        this.router.navigate(['/admin/tracks']);
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
