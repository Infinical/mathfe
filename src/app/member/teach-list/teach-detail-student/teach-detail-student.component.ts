import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { House } from '../../../models/house';
import { Chart } from 'chart.js';
import { Skill } from '../../../models/skill';

import { TrackService } from '../../../services/track.service';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'ag-teach-detail-student',
  templateUrl: './teach-detail-student.component.html',
  styleUrls: ['./teach-detail-student.component.css']
})
export class TeachDetailStudentComponent implements OnInit {

  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Input() selectedTeach: any;
  @Input() user: any;
  chartdata: any;
  addTrackOn: boolean = false;
  editTrackOn: boolean = false;
  deleteTrackOn: boolean = false;
  selectedTrackEdit: any;
  delete_Track: any;
  addSkillOn: boolean = false;
  editSkillOn: boolean = false;
  deleteSkillOn: boolean = false;
  selectedSkillEdit: any;
  delete_skill: any;
  delete_skill_track: any;
  fields: any;
  levels: any;
  statuses: any;
  show_track_passed_modal = false;
  selectedTrackResult: any;

  constructor(private trackService: TrackService, private skillService: SkillService) {

  }

  parseDecimal(v) {
    if (v) {
      if (v.toString().indexOf(".") != -1) {
        return v.toFixed(2);
      } else {
        return v;
      }
    }
    return 0;
  }
  ngOnInit() {
  }
  showTrackPassedModal(track, status) {
    if (status) {
      this.selectedTrackResult = track.tracks_passed;
      this.show_track_passed_modal = true
    } else {
      this.show_track_passed_modal = false;
      
    }
  }
  // unSelect(house: House) {
  //   this.selectedEvent.emit(null);
  // }
}
