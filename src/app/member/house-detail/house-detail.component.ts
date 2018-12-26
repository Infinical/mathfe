import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { House } from '../../models/house';
import { Skill } from '../../models/skill';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'ag-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

  @Input() selectedHouse: any;
  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();
  rowgreen = "row-green";
  rowyellow = "row-yellow";

  constructor() {

  }
  getBgColor(track) {
    let trackPassedBgColor = "";
    if (track) {
      var green = 0;
      var yellow = 0;
      if (track.skills) {
        track.skills.forEach((skill, i) => {
          if (this.getSkillClass(skill, track) == this.rowgreen) {
            green++;
          } else if (this.getSkillClass(skill, track) == this.rowyellow) {
            yellow++;
          }
        })
      }
      //tracks in green if all the skills are green
      if (green > 0 && yellow == 0) {
        trackPassedBgColor = "bar-green";//
      }
      //yellow if any of the skills within is either green or yellow
      else if (yellow > 0 || green > 0) {
        trackPassedBgColor = "bar-yellow";//
      } else
        //default grey
        trackPassedBgColor = "bar-grey";///
    }
    return trackPassedBgColor;
  }
  ngOnInit() {

  }

  // unSelect(house: House) {
  // 	this.selectedEvent.emit(null);
  // }

  onVideo(skill: Skill) {
    this.selectedVideo.emit(skill);
  }

  getSkillClass(skill, track) {


    if (skill) {
      if (skill.skill_maxile) {
        if (skill.skill_maxile.skill_maxile) {
          if (skill.skill_maxile.skill_maxile >= track.level_id * 100) {
            return this.rowgreen;
          } else if (skill.skill_maxile.skill_maxile < track.level_id * 100 && skill.skill_maxile.noOfTries > 0) {
            return this.rowyellow;
          }
        }
      }
    }
    return "";
  }
  culculateTrackPassPercentageValue(tracks_passed, total_tracks) {
    return tracks_passed / total_tracks * 100;
  }
}
