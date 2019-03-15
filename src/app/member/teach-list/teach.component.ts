import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../models/house';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ag-teach',
  templateUrl: './teach.component.html',
  styleUrls: ['./teach.component.css']
})
export class TeachComponent implements OnInit {
  @Input() house: House;
  beURL = environment.apiURL + '/';

  constructor() { }

  ngOnInit() {
  }
  handleImageLoadError = (event) => {
    event.target.src = "/assets/images/noImage.png";
  }

}
