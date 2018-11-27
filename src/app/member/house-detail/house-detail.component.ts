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

  @Input() selectedHouse: House;
  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();

  constructor() { }

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
            return "row-green";
          } else if (skill.skill_maxile.skill_maxile < track.level_id * 100 && skill.skill_maxile.noOfTries > 0) {
            return "row-yellow";
          }
        }
      }
    }
    return "";
  }
}
