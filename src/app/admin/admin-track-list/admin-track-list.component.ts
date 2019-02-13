import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { House } from '../../models/house';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
import { AdminHouseSkillsTrackListComponent } from './modal/admin-house-skills-track-list/admin-house-skills-track-list.component';
import { AdminAddSkillComponent } from './modal/admin-add-skill/admin-add-skill.component';
import { SkillTrackService } from '../../services/skill-track.service';

@Component({
  selector: 'ag-admin-track-list',
  templateUrl: './admin-track-list.component.html',
  styleUrls: ['./admin-track-list.component.css']
})
export class AdminTrackListComponent implements OnInit {
  loading = true;
  tracks: Track[];
  public houses: House[];
  message: '';

  ShowColumns = {
    Track: true,
    Description: true,
    Status: true,
    Field: true,
    Level: true,
    Classes: true,
    Action: true
  } 
  constructor(private skillTrackService: SkillTrackService, private trackService: TrackService, private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.trackService.getTracks().subscribe(x => {
      this.tracks = x;
      this.loading = false;
    })
  }
  openViewSkills(trackid): void {
    const dialogRef = this.dialog.open(AdminHouseSkillsTrackListComponent, {
      data: { trackid: trackid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAddSkill(trackid) {
    const dialogRef = this.dialog.open(AdminAddSkillComponent, {
      width: '400px',
      data: { trackid: trackid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteAllSkills(trackid) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: ": Do you really want to delete all skills from this track? ", title: "Delete All Tracks" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.skillTrackService.deleteAllSkills(trackid).subscribe((x: any) => {
            //this.tracks = x.tracks;
            this.loading = false;
            this.message = x.message;
            window.scrollTo(0, 0)
            //accepted
          }, (err) => {
            console.error(err);
            window.scrollTo(0, 0)
          })
        } else {
          //rejected
        }
      });
  }
}
