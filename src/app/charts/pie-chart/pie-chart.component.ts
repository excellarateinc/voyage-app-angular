import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() pieData: any;
  @Input() chartTitle: any;

  constructor() {
  }

  ngOnInit() {
  }

  public labelContent(e: any): string {
    return e.category;
  }
}
