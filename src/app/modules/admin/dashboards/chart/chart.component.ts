import {Component, Injector, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {BaseComponent} from "@core/base.component";

export interface dataUser {
  id: string,
  name: string,
  target: [],
  effort: [],
  range:string[]
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent extends BaseComponent implements OnInit {
  dataDraft= {
    id: '',
    name: '',
    target: [],
    effort: [],
    range:[]
  }
  chartOptions:any;
  user:any
  test:any
  data = [
    {
      'uid': '1',
      'name': 'van A',
      'target': [
        12215,25200,23587,56894,258741,325687,232325,585679,253596,598667,325679,369963
      ],
      'effort': [147852, 258963, 369852, 258741, 258789, 584625, 564564, 333222, 443322, 325874, 123456, 369874]
    },
    {
      'uid':'2',
      'name': 'van B',
      'target': [222336,333257,22215,23267,23587,326987,789654,987651,874512,654321,541203,412378],
      'effort': [111111, 222222, 333333, 444444, 555555, 456123, 654321, 362514, 365214, 471258, 489321, 123475]
    },
  ];
  rangeSelected:string[] = [];
  startMonth = '';
  endMonth='';
  id:string;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {

  }

  Highcharts: typeof Highcharts = Highcharts;




  getChart() {

    console.log(this.months.indexOf(this.startMonth));
    console.log(this.months.indexOf(this.endMonth));
    this.rangeSelected = this.months.slice(this.months.indexOf(this.startMonth), this.months.indexOf(this.endMonth)+1)

    console.log(this.rangeSelected);

    this.user = this.data[this.data.findIndex((val)=> {
      return val.uid === this.id
    })]
    console.log(this.user)

    this.dataDraft.id = this.user.uid;
    this.dataDraft.name = this.user.name;
    this.dataDraft.target = this.user.target.slice(this.months.indexOf(this.startMonth), this.months.indexOf(this.endMonth)+1);
    this.dataDraft.effort = this.user.effort.slice(this.months.indexOf(this.startMonth), this.months.indexOf(this.endMonth)+1);
    this.dataDraft.range = this.rangeSelected;



    console.log('dataDraft: ',this.dataDraft)

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'HRM'
      },

      yAxis: {
        title: {
          text: this.translocoService.translate('chart.yAxis')
        },

      },

      xAxis: {

        categories: this.dataDraft.range,
        title: {
          text: this.translocoService.translate('chart.xAxis')
        },
      },

      credits: {
        enabled:false
      },


      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false
      },

      series: [
        {
          name: 'Target',
          data: this.dataDraft.target
        },
        {
          name: 'Effort',
          data: this.dataDraft.effort,
          color: 'red'
        }
      ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',

            }
          }
        }]
      }
    };

  }
}
