import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelService } from '../../services/level.service';
import { Level } from 'app/models/level';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'ag-admin-level-create',
  templateUrl: './admin-level-create.component.html',
  styleUrls: ['./admin-level-create.component.css']
})
export class AdminLevelCreateComponent implements OnInit {
  public status: string;
  public message: string;
  end_maxile_level: FormControl;
 
  constructor(
    private levelService: LevelService, private router: Router) {
  }
  ngOnInit() {
    this.end_maxile_level = new FormControl("", [Validators.max(9999), Validators.min(100)])
}
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
//  end_maxile_levelValidator(min: number, max: number): ValidatorFn {
//  return (control: AbstractControl): { [key: string]: boolean } | null => {
//    if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
//      return { 'end_maxile_level': true };
//    }
//    return null;
//  };
//}
}
