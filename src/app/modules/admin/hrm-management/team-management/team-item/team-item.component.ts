import { Component, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
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
import { TeamMemberService } from '@shared/services/team-member.service';
import { AddOrEditTeamComponent } from '../add-or-edit-team/add-or-edit-team.component';
import moment from 'moment';


@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})

export class TeamItemComponent extends BaseComponent implements OnInit {
  @Input() team: any;
  @Input() random: any;

  _permissionCodeName = 'DSD';
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedTeamId: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  formSearch: FormGroup;
  listMember: any;
  totalMember: number;

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
  formGroup = this.fb.group({
    id: '',
    text: '',
    name: [],
    number: 2,
    sprint: ['2022-12-14T17:00:00.000Z'],
    leader: [],
    target: [],
    cost: [],
    revenue: [],
    staDate: [],
    endDate: []
  });



  searchModel: any = {
    page: 0,
    pageSize: 10,
  };
  searchKpi: any = {
    teamId: 5,
    startMonth: '01/01/2021',
    endMonth: '01/01/2021'
  }

  constructor(injector: Injector, public teamService: TeamService, public teamMemberService: TeamMemberService, fb: FormBuilder, private _fuseConfigService: FuseConfigService) {
    super(injector, teamService);
    this.formSearch = this.fb.group({
      id: '',
      text: '',
      name: [],
      number: 2,
      sprint: [],
      leader: [],
      target: [],
      cost: [],
      revenue: ['1'],
      staDate: [],
      endDate: []
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.random = (Math.random() + 1).toString(36).substring(7);
  }

  ngOnInit(): void {
    var currentMonth = new Date(Date.now()).toLocaleDateString()
    // console.log(currentMonth)
    this.handleCoverStringToDate(this.team);
    this.formGroup.patchValue(this.team);
    this.searchModel.teamId = this.team.id;
    this.teamMemberService.getListMember(this.searchModel).subscribe(res => {
      this.listMember = res.data;
      this.totalMember = this.listMember.length;
    });
    this.searchKpi.teamId = this.team.id;
    this.getTeamKpiSprint(this.searchKpi);
  }
  onDateChange(e: any){
   const x= moment(new Date(e)).format("DD/MM/YYYY").toString();
   this.searchKpi = {
    teamId: 5,
    startMonth: x,
    endMonth: x
  }
  this.getTeamKpiSprint(this.searchKpi);
  }

  getTeamKpiSprint(searchKpi: any) {
    this.teamService.getTeamKpi(searchKpi).subscribe(res => {
      console.log(res.data[0]);
    debugger
      this.formGroup.setValue({
        id: '',
        text: '',
        name: [],
        number: 2,
        sprint: [],
        leader: [],
        target: [res.data[0].target],
        cost: [res.data[0].cost],
        revenue: [res.data[0].revenue],
        staDate: [],
        endDate: []
      })
    });
  }

  addOrEdit(id: any): void {
    this.showDialog(AddOrEditTeamComponent, {
      data: {
        id,
      },
      width: '70vw',
      // maxHeight: '90vh',
      disableClose: true
    }, (value) => {
      if (value) {
        // this.doSearch();
      }
    });
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

  actionClick(e: any, id: any): void {
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
        // this.processSearch(this.searchModel, () => this.callback());
        this.processSearch(this.searchModel);
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  // callback(): void {
  //   this.listTeam = this.searchResult.data;
  //   if (this.listTeam.length > 0) {
  //     this.goToTeam(this.listTeam[0].id);
  //   }
  // }

  /**
 * Set the theme on the config
 *
 * @param viewType
 */
  setView(viewType: ViewType): void {
    this._fuseConfigService.config = { viewType };
  }
}
