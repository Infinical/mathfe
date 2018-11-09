import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ag-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartdata: any;
  // Doughnut
  public doughnutChartLabels:string[] = ['UnderPerform','Excel', 'On_target'];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
