import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'ag-admin-course-delete',
  templateUrl: './admin-course-delete.component.html',
  styleUrls: ['./admin-course-delete.component.css']
})
export class AdminCourseDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.courseService.deleteCourse(this.id).subscribe(
      data => {
        this.courseService.updateStatus = data['message'];
        setTimeout(() => this.courseService.updateStatus = '', 2000);
        this.router.navigate(['/admin/courses']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        this.msg = "Server Error";
        if (error.error) {
          if (error.error.message) {
            this.msg = error.error.message;
          }
        }
        console.error(<any>error);
      }
    )
  };
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
