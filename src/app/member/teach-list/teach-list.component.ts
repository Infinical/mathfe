import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { House } from '../../models/house';
declare var $: any;
@Component({
  selector: 'ag-teach-list',
  templateUrl: './teach-list.component.html',
  styleUrls: ['./teach-list.component.css']
})
export class TeachListComponent implements OnInit {
  houses: any;
  selectedTeach: House;

  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.houses = this.dashboardService.getTeach();
  }

  onSelect(house: House) {
    this.selectedEvent.emit(house);
  }
  isDataLoaded(d) {
    if (!d) {
      $(".spinner-footer-envelope").show();
      return false;
    } else {
      $(".spinner-footer-envelope").hide();
      return d.length > 0;
    }
  }
  isNoDataExists(d) {
    if (!d) {
      return false;
    } else {
      return d.length < 1;
    }
  }
}