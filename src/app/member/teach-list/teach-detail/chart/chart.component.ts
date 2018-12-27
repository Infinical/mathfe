import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ag-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartdata: any;
  // Doughnut
  public doughnutChartLabels: string[] = ['Underperform', 'Overperform', 'On Target'];
  public doughnutChartType: string = 'doughnut';

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgb(151, 37, 23)',// Underperform - Red
        'rgb(117, 197, 47)',// Overperform - Green
        'rgb(249, 221, 150)'// On Target - Yellow
      ]
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
