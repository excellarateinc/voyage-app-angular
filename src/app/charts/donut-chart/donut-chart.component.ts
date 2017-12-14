import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  @Input() donutData: any;
  @Input() chartTitle: any;

  constructor() {
  }

  ngOnInit() {
  }

  public labelContent(e: any): string {
    return e.category;
  }
}
