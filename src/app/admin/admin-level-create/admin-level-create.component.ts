import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelService } from '../../services/level.service';
import { Level } from 'app/models/level';

@Component({
  selector: 'ag-admin-level-create',
  templateUrl: './admin-level-create.component.html',
  styleUrls: ['./admin-level-create.component.css']
})
export class AdminLevelCreateComponent implements OnInit {
  public status: string;
  public message: string;

  constructor(
    private levelService: LevelService,
    private router: Router) {

  }

  ngOnInit() { }

  public createLevel(level: Level): void {

    this.levelService.addLevel(level)
      .subscribe(
        level => {
          this.levelService.updateStatus = level['message'];
          setTimeout(() => this.levelService.updateStatus = '', 2000);
          this.router.navigate(['/admin/levels']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          console.error(<any>error);
          let msg = error['message'];
          if (error.error) {
            if (error.error.message) {
              msg = error.error.message;
            }
          }
          this.status = 'success';
          this.message = msg;
        }
      );
  }
}
