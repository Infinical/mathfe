import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from "../../../confirm-dialog/confirm-dialog.component"
import { Router } from '@angular/router';
import { debug } from 'util';
import { environment } from 'environments/environment';
import { Track } from '../../../../models/track';
import { Skill } from '../../../../models/skill';
import { SkillService } from '../../../../services/skill.service';
import { SkillTrackService } from '../../../../services/skill-track.service';

@Component({
  selector: 'ag-admin-house-skills-track-list',
  templateUrl: './admin-house-skills-track-list.component.html',
  styleUrls: ['./admin-house-skills-track-list.component.css']
})
export class AdminHouseSkillsTrackListComponent implements OnInit {
  loading = true; 
  skills = [];
  updateStatus: '';
  private _beURL = environment.apiURL + '/';
  message: '';

  constructor(private skillService: SkillTrackService, public dialogRef: MatDialogRef<AdminHouseSkillsTrackListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.loading = true;
    this.skillService.getSkillsByTrack(this.data.trackid).subscribe(x => {
      this.skills = x.skill;
      this.loading = false;
    })
  }
  public videoUrl(url: string): string {
    if (url)
      return this._beURL + url;
    else return this._beURL + "/videos/skills/logo.mp4"
  }
  ngOnInit() {
  }
  
  deleteSkill(skillid) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Do you really want to delete the track from this class?", title: "Delete Track" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.skillService.deleteSkillByTrackId(this.data.trackid, skillid).subscribe((x: any) => {
            this.skills = x.skills;
            this.message = x.message;
            this.loading = false;
            //accepted
          }, (err) => {
          })
        } else {
          //rejected
        }
      });
  }
}
