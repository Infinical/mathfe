import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SkillService } from '../../services/skill.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from '../../services/helper.service';

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
  lesson_link: string = "";
  lesson_preview_link: any;
  vimeoVideoUrl: any;
  public use_file_uplaod = true;
  formData: FormData = new FormData();
  statuses: any;
  my_tracks = [];
  public_tracks = [];
  skill: any = {}//= new Skill('id', 'skill', 'description', 'user_id', 'image', 'lesson_link', 'status_id');

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillService: SkillService,
    private router: Router,
    private helperService: HelperService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.skillService.getSkill(this.id).subscribe(
      data => { 
        this.skill = data;

        if (this.skill.lesson_link) {
          this.lesson_link = this.beURL + this.skill.lesson_link;
          this.use_file_uplaod = true;
          if (this.skill.lesson_link.indexOf('vimeo') != -1) {
            this.use_file_uplaod = false;
            this.vimeoVideoUrl = (this.skill.lesson_link);
          } else {
            this.lesson_preview_link = this.sanitizeURL(this.lesson_link);
          }
        }
      },
      error => console.error(<any>error));

    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
        this.my_tracks = data['my_tracks'] || [];
        this.public_tracks = data['public_tracks'] || [];
      },
      error => console.error(<any>error));

  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }
  public useFIleUplaod() {
    this.lesson_link = "";
    this.lesson_preview_link = "";
    this.use_file_uplaod = true;
    this.vimeoVideoUrl = "";
  }
  public useUrlUpload() {
    this.lesson_link = "";
    this.lesson_preview_link = "";
    this.use_file_uplaod = false;
    this.vimeoVideoUrl = "";
  }
  updateSkill(skill) {
    this.formData.append('_method', 'PATCH');
    if (this.use_file_uplaod) {
      if (this.selectedFile) {
        this.formData.append('lesson_link', this.selectedFile);
      }
    } else {
      if (this.vimeoVideoUrl) {
        this.formData.append('lesson_link', this.vimeoVideoUrl);
      }
    }
    this.formData.append('description', skill.description);
    this.formData.append('skill', skill.skill);
    this.formData.append('status_id', skill.status_id);
    // this.formData.append('track_id', skill.track_id);
    this.formData.append('track_ids', JSON.stringify(skill.track_id));
    this.skillService.updateSkillWithFormData(this.formData, skill.id)
      .subscribe(
        skill => {
          this.status = 'success';
          this.message = skill['message'];
          this.skillService.updateStatus = this.message = skill['message'];
          setTimeout(() => this.skillService.updateStatus = '', 2000);
          this.router.navigate(['/admin/skills']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
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
