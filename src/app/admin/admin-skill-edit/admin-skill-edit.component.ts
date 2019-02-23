import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SkillService } from '../../services/skill.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from '../../services/helper.service';
import { TrackService } from '../../services/track.service';

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
  loading = true;
  formData: FormData = new FormData();
  statuses: any;
  my_tracks = [];
  selected_track_ids = [];
  public_tracks = [];
  skill: any = {}//= new Skill('id', 'skill', 'description', 'user_id', 'image', 'lesson_link', 'status_id');

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillService: SkillService,
    private router: Router,
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
    private trackService: TrackService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.skillService.getSkill(this.id).subscribe(
      data => {
        this.skill = data;
        this.trackService.getTracksBySkillId(data.id).subscribe((result) => {
          this.selected_track_ids = [];
          result.tracks.forEach((t, i) => {
            this.selected_track_ids.push(t.id);
          });
          this.loading = false;
        })
      
        if (this.skill.lesson_link) {
          this.lesson_link = this.beURL + this.skill.lesson_link;
          this.lesson_preview_link = (this.lesson_link);
        }
      },
      error => {
        this.loading = false;
        console.error(<any>error)
      });

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
  updateSkill(skill) {
    this.formData.append('_method', 'PATCH');
    if (this.selectedFile) {
      this.formData.append('lesson_link', this.selectedFile);
    }

    this.formData.append('description', skill.description);
    this.formData.append('skill', skill.skill);
    this.formData.append('status_id', skill.status_id);
    // this.formData.append('track_id', skill.track_id);
    this.formData.append('track_ids', JSON.stringify(this.selected_track_ids));
    this.loading = true;
    this.skillService.updateSkillWithFormData(this.formData, skill.id)
      .subscribe(
        skill => {
          this.loading = false;
          this.status = 'success';
          this.message = skill['message'];
          this.skillService.updateStatus = this.message = skill['message'];
          setTimeout(() => this.skillService.updateStatus = '', 2000);
          this.router.navigate(['/admin/skills']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.loading = false;
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
      this.lesson_preview_link = this.sanitize(URL.createObjectURL(this.selectedFile));
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
