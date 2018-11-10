import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../models/house';

@Component({
  selector: 'ag-teach',
  templateUrl: './teach.component.html',
  styleUrls: ['./teach.component.css']
})
export class TeachComponent implements OnInit {
  @Input() house: House;

  constructor() { }

  ngOnInit() {
  }

}