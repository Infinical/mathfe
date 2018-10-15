import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'ag-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.css']
})
export class AdminCourseListComponent implements OnInit {
  beURL = "http://localhost:8000/";

  courses: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

  resetUpdateStatus() {
    this.courseService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.courseService.updateStatus;
  }

}
