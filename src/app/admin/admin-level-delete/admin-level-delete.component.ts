import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from 'app/services/level.service';

@Component({
  selector: 'ag-admin-level-delete',
  templateUrl: './admin-level-delete.component.html',
  styleUrls: ['./admin-level-delete.component.css']
})
export class AdminLevelDeleteComponent  implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private activatedRoute: ActivatedRoute, private levelService: LevelService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.levelService.deleteLevel(this.id).subscribe(
      data => {
        this.levelService.updateStatus = data['message'];
        setTimeout(() => this.levelService.updateStatus = '', 2000);
        this.router.navigate(['/admin/levels']);
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
