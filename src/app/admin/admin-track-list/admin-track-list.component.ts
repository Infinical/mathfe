import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';

@Component({
  selector: 'ag-admin-track-list',
  templateUrl: './admin-track-list.component.html',
  styleUrls: ['./admin-track-list.component.css']
})
export class AdminTrackListComponent implements OnInit {
  loading = true;
  tracks: Track[];

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.loading = true;
    this.trackService.getTracks().subscribe(x => {
      this.tracks = x;
      this.loading = false;
    })
  }

}
