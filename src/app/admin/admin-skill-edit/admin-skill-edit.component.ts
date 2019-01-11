import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/skill';

@Component({
  selector: 'ag-admin-skill-edit',
  templateUrl: './admin-skill-edit.component.html',
  styleUrls: ['./admin-skill-edit.component.css']
})
export class AdminSkillEditComponent implements OnInit, OnDestroy {
  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  selectedFile: File = null;
  lesson_link: string = "images/upload.png";
  formData: FormData = new FormData();
  statuses: any;

  skill = new Skill('id', 'skill', 'description', 'user_id', 'image', 'lesson_link', 'status_id');

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillService: SkillService,
    private router: Router
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.skillService.getSkill(this.id).subscribe(
      data => {
        this.skill = data;
        this.lesson_link = this.beURL + this.skill.lesson_link;
      },
      error => console.log(<any>error));

    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
      },
      error => console.log(<any>error));

  }



  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateSkill(skill) {
    this.formData.append('_method', 'PATCH');
    if ((skill.video)){
      if (!this.lesson_link.includes(skill.video)) {
        this.formData.append('lesson_link', this.selectedFile);
      }
    }
    this.formData.append('description', skill.description);
    this.formData.append('skill', skill.skill);
    this.formData.append('status_id', skill.status_id);
    this.skillService.updateSkillWithFormData(this.formData, skill.id)
      .subscribe(
        skill => {
          debugger;
          this.status = 'success';
          this.message = skill['message'];
          this.skillService.updateStatus = this.message = skill['message'];
          setTimeout(() => this.skillService.updateStatus = '', 2000);
          this.router.navigate(['/admin/skills']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          console.log(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
  }

  onFileSelected(files: FileList) {
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.lesson_link = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
