import {Component, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, Options} from "highcharts";
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit, OnChanges {
  @Input() series :any

  @ViewChild('charts') public chartEl: ElementRef;
  myOptions: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Stacked bar chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
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
    series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  };
  private chartRef: HTMLElement;
  private ref: Chart;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'series': {
            this.ref.destroy()
            this.myOptions.series=this.series
            this.drawChart()
          }
        }
      }
    }
    }

  ngOnInit() {
    this.chartRef = document.getElementById('charts')
    this.drawChart()
  }

  drawChart(){
    this.ref = Highcharts.chart(this.chartRef, this.myOptions);
  }



}
