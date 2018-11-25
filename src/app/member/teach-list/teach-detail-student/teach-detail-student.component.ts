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

  constructor(private trackService: TrackService, private skillService: SkillService) {

  }
  

  ngOnInit() {
  }
  // unSelect(house: House) {
  //   this.selectedEvent.emit(null);
  // }
}
