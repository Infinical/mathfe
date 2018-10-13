import { Component, OnInit } from '@angular/core';
import { CourseService} from '../../services/course.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ag-admin-course-create',
  templateUrl: './admin-course-create.component.html',
  styleUrls: ['./admin-course-create.component.css']
})
export class AdminCourseCreateComponent implements OnInit {
  status: string;
  message: string;
  selectedFile: File = null;
  formData: FormData = new FormData();
  imgURL :string = "images/upload.png";

  constructor(private courseService: CourseService, private router:Router, private http:HttpClient) { }

  ngOnInit() {
  }

  createCourse(course) {
   this.formData.append("description", course.description);
   this.formData.append("course", course.course);
   this.formData.append('image', this.selectedFile);
   this.formData.append('start_maxile_score', course.start_maxile_score);
   this.formData.append('end_maxile_score', course.end_maxile_score);
   this.courseService.addCourse(this.formData)
   .subscribe(
     course  => {
       this.courseService.updateStatus = course['message'];
       this.router.navigate(['/admin/courses']);
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
