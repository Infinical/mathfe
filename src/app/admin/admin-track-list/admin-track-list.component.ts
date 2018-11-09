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

  tracks: Observable<Track[]>;

  constructor(private trackService:TrackService) { }

  ngOnInit() {
    this.tracks = this.trackService.getTracks();
  }

}
