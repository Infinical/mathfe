import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillService } from '../../services/skill.service'; 
@Component({
  selector: 'ag-admin-skill-create',
  templateUrl: './admin-skill-create.component.html',
  styleUrls: ['./admin-skill-create.component.css']
})
export class AdminSkillCreateComponent implements OnInit {
  public status: string;
  public message: string;
  public selectedFile: File = null;
  public lesson_link: string = 'images/upload.png';
  statuses: any;
  my_tracks = [];
  public_tracks = [];
  loading: boolean = false;

  constructor(
    private skillService: SkillService,
    private router: Router) { }

  ngOnInit() {
    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
        this.my_tracks = data['my_tracks'] || [];
        this.public_tracks = data['public_tracks'] || [];
      },
      error => console.error(<any>error));
  }

  public createSkill(skill): void {
    this.loading = true;
    const formData: FormData = new FormData();
    if (skill.video) {
      if (!this.lesson_link.includes(skill.video)) {
        formData.append('lesson_link', this.selectedFile);
      }
    }
    formData.append('skill', skill.skill);
    formData.append('description', skill.description);
    formData.append('track_ids', JSON.stringify(skill.track_id));
    //formData.append('track_ids', (skill.track_id));
    formData.append('status_id', skill.status_id);
    this.skillService.addSkill(formData)
      .subscribe(
        skill => {
          this.loading = true;
          this.skillService.updateStatus = skill['message'];
          setTimeout(() => this.skillService.updateStatus = '', 2000);
          this.router.navigate(['/admin/skills']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.loading = false;
          console.error(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
  }

  public onFileSelected(files: FileList): void {
    this.selectedFile = files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.lesson_link = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
