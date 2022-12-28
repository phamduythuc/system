import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { MatDrawer } from '@angular/material/sidenav';
import { debounceTime, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TeamService } from '@shared/services/team.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ViewType } from '@core/config/app.config';
import { FuseConfigService } from '@fuse/services/config';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})

export class TeamItemComponent extends BaseComponent implements OnInit {

  @Input() team:any;

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Monthly Average Temperature"
    },
    subtitle: {
      text: "Source: WorldClimate.com"
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Temperature °C"
      }
    },
    tooltip: {
      valueSuffix: " °C"
    },
    series: [
      {
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      },
      {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      },
      {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
    ]
  };
  _permissionCodeName = 'DSD';
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedTeamId: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  formSearch: FormGroup;


  list_type_view: any = [
    {
      type: 'list',
      name: 'setting.typeView.list',
    },
    {
      type: 'grid',
      name: 'setting.typeView.grid',
    },
  ];

  listTeam: any[] = [];



  constructor(injector: Injector, public teamService: TeamService, fb: FormBuilder, private _fuseConfigService: FuseConfigService) {
    super(injector, teamService);
    this.formSearch = this.fb.group({
      id:'',
      text: '',
      name: [],
      number: 2,
      sprint: [],
      leader: [],
      expected: [],
      cost: [],
      revenue: [],
      staDate:[],
      endDate:[]
    });
  }

  ngOnInit(): void {
    this.searchModel.pageSize = 9999999;
    this.formSearch.get('text').valueChanges.pipe(
      map(event => event),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      res => {
        this.listTeam = this.searchResult.data.filter(item => {
          if (item.name.includes(res)) {
            return item;
          }
        });
      }
    );
    this.searchModel.status = 1;
    this.processSearch(this.searchModel, () => this.callback());
    this.handleCoverStringToDate(this.team);
    this.formSearch.patchValue(this.team);
  }

  doSearch(): void {
    this.processSearch(this.searchModel, () => this.callback());
  }

  goToTeam(id: any): void {
    this.selectedTeamId = id;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }


  getPanelInfo(id: string): any {
    return this.searchResult.data.find(panel => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  emitEvent(type: string, gr: any): void {
    if (type === 'edit') {
      this.addOrEdit(gr.id);
    }
    else if (type === 'view') {
   
    }
    else {
      this.deleteConfirmDialog(gr.id);
    }
  }

  actionClick(e: any, id:any): void {
    debugger
    if (e === 'delete') {
      this.deleteConfirmDialog(id);
    }
  }
  deleteConfirmDialog(id?: any): any {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.delete(id);
      }
    });
  }

  delete(id: any): void {
    this.teamService.delete(id).subscribe((res) => {
      if (res.code === '00') {
        this.showSnackBar('Xóa thành công', 'success');
        this.searchModel.page = 0;
        this.processSearch(this.searchModel, () => this.callback());
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  callback(): void {
    this.listTeam = this.searchResult.data;
    if (this.listTeam.length > 0) {
      this.goToTeam(this.listTeam[0].id);
    }
  }

  /**
 * Set the theme on the config
 *
 * @param viewType
 */
  setView(viewType: ViewType): void {
    this._fuseConfigService.config = { viewType };
  }
}
