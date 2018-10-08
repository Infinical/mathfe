import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'ag-admin-course-edit',
  templateUrl: './admin-course-edit.component.html',
  styleUrls: ['./admin-course-edit.component.css']
})
export class AdminCourseEditComponent implements OnInit, OnDestroy {
  beURL = "http://localhost:8000/";
  status: string;
  message: string;
  id: any;
  params: any;
  selectedFile: File = null;
  imgURL :string = "images/upload.png";
  formData: FormData = new FormData();


  course = new Course('id', 'course', 'description', 'image', 'start_maxile_score', 'end_maxile_score');

  constructor(private activatedRoute:ActivatedRoute, private courseService:CourseService) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.courseService.getCourse(this.id).subscribe(
	  data => {
	    this.course = data;
      this.imgURL = this.beURL+this.course.image;
	  },
	  error =>  console.log(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateCourse(course) {
    if (course.image != this.imgURL){
      this.formData.append('image_file', this.selectedFile);
      this.courseService.updateCourseImage(this.formData, course.id)
        .subscribe(
          course  => {
            this.status = 'success';
            this.message = course['message'];
          },
          error => { 
            console.log(<any>error);
            this.status = 'success';
            this.message = error['message'];
          }
        );
    }
    this.courseService.updateCourse(course)
      .subscribe(
        course  => {
          this.status = 'success';
          this.message = course['message'];
        },
        error => { 
          console.log(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
    }

  onFileSelected(files: FileList){
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
