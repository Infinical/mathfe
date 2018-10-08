import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { House } from '../../models/house';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'ag-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: any;
  selectedHouse: House;
  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.houses = this.dashboardService.getHouses();
  }

  onSelect(house: House) {
  	this.selectedEvent.emit(house);
  }

}