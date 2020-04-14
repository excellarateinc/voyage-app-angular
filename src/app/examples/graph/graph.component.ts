import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  chart = null;
  chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  @Input() chartType: string;
  @ViewChild('myCanvas', {static: true}) canvasRef: ElementRef;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    Chart.defaults.global.defaultFontColor = this.themeService.darkTheme ? '#FFF' : '#000';
    this.themeService.themeChanged$.subscribe(isDarkTheme => {
      Chart.defaults.global.defaultFontColor = isDarkTheme ? '#FFF' : '#000';
      this.chart.update();
    });
  }

  ngAfterViewInit() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Unfilled',
            fill: false,
            backgroundColor: this.chartColors.grey,
            borderColor: this.chartColors.grey,
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ]
          },
          {
            label: 'Dashed',
            fill: false,
            backgroundColor: this.chartColors.green,
            borderColor: this.chartColors.green,
            borderDash: [5, 5],
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ]
          },
          {
            label: 'Filled',
            backgroundColor: this.chartColors.purple,
            borderColor: this.chartColors.purple,
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ],
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Example Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }
          ]
        }
      }
    });
  }

  randomScalingFactor() {
    return Math.floor(Math.random() * 201) - 100;
  }
}
