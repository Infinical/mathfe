import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable} from 'rxjs/Observable';

@Component({
  selector: 'ag-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  
  @Input() user: any;

  editing:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  userprof(){
    this.editing = this.editing ? false:true;
  }

}
