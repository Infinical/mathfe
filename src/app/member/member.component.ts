import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Course } from '../models/course';
import { House } from '../models/house';
import { Skill } from '../models/skill';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ag-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  selectedHouse: House;

  dashboard: any;

  houses: any;

  courses: any;
  selectedCourse: Course;
  selectedTeach: House;
  selectedVideo: Skill;
  user: Observable<any>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
}
