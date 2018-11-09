import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { House } from '../../models/house';

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
}