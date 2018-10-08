import { Component, OnInit, Input} from '@angular/core';
import { House } from '../../models/house';

@Component({
  selector: 'ag-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  beURL = "http://localhost:8000/";
  
  @Input() house: House;
  constructor() { }

  ngOnInit() {
  }

}
