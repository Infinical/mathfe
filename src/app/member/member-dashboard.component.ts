import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Course } from '../models/course';
import { House } from '../models/house';
import { Skill } from '../models/skill';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ag-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  selectedHouse: House;

  dashboard: any;

  houses: any;

  courses: any;
  selectedCourse: Course;
  selectedTeach: House;
  selectedVideo: Skill;
  videolink:any;
  user: Observable<any>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  this.dashboardService.getUser().subscribe(
    data => {
      this.user = data;
    },
    error =>  console.log(<any>error));
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.selectedTeach = null;
    this.selectedHouse = null;
  }

  selectHouse(house: House) {
    this.selectedHouse = house;
    this.selectedTeach = null;
    this.selectedCourse = null;
  }

  selectTeach(house: House) {
    this.selectedTeach = house;
    this.selectedCourse = null;
    this.selectedHouse = null;
  }

  selectSkill(skill: Skill) {
    this.selectedVideo = skill;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
