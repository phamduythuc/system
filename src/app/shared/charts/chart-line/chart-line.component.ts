import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Chart, Options} from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit, OnChanges {
  @Input() options: any;
  @Input() random:any;
  
  @ViewChild('charts') public chartEl: ElementRef;

  myOptions: Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: 'KPI'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [],
    credits: {
      enabled: false
    },
  };
  private chartRef: HTMLElement;
  private ref: Chart;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
            if (this.ref) {
              this.ref.destroy();
            }
            this.myOptions = {...this.myOptions, ...this.options};
            this.drawChart();
  }

  ngOnInit(): void {
    this.chartRef = document.getElementById('charts');
    this.drawChart();
  }

  drawChart(): void {
    this.ref = Highcharts.chart(this.chartRef, this.myOptions);
  }


}
