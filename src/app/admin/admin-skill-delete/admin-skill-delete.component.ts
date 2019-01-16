import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'app/services/skill.service';

@Component({
  selector: 'ag-admin-skill-delete',
  templateUrl: './admin-skill-delete.component.html',
  styleUrls: ['./admin-skill-delete.component.css']
})
export class AdminSkillDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.skillService.deleteSkill(this.id).subscribe(
      data => {
        this.skillService.updateStatus = data['message'];
        setTimeout(() => this.skillService.updateStatus = '', 2000);
        this.router.navigate(['/admin/skills']);
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
