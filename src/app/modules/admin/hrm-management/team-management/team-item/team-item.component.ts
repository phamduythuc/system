import { Component, Injector, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { TeamService } from '@shared/services/team.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ViewType } from '@core/config/app.config';
import { FuseConfigService } from '@fuse/services/config';
import { TeamMemberService } from '@shared/services/team-member.service';
import { AddOrEditTeamComponent } from '../add-or-edit-team/add-or-edit-team.component';
import moment from 'moment';
import { EditLeaderComponent } from '../edit-leader/edit-leader.component';
import { Member } from '../models/Member';


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
  performance: any = '';

  formSearch: FormGroup;
  member :Member;
  listMember: Member[]=[];
  listStaffName:any;
  listStaffId:any;
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
  currentTime = moment(new Date(Date.now())).format("YYYY-MM-DDTHH:MM:SSZ");
  currentTimeFormat = moment(new Date(Date.now())).format("DD/MM/YYYY");
  formGroup = this.fb.group({
    id: '',
    text: '',
    name: [],
    number: 2,
    sprint: [],
    leadName: [],
    target: [],
    cost: [],
    revenue: [],
    staDate: [],
    endDate: [],
    staffName: []
  });

  searchModel: any = {
    page: 0,
    pageSize: 10,
  };
  searchKpi: any = {
    teamId: 5,
    startMonth: this.currentTimeFormat,
    endMonth: this.currentTimeFormat
  };

  searchDetail: any = {
    teamId: null,
    month: '01/01/2023'
  };

  data = {
    teamId: null,
    teamName: "",
    targetMonth: "",
    revenue: 0,
    target: "",
    cost: 0,
    effortExchange: null,
    staffId: "",
    staffName: "",
    leadId: null,
    leadName: ""
  }

  constructor(injector: Injector, public teamService: TeamService, public teamMemberService: TeamMemberService, fb: FormBuilder, private _fuseConfigService: FuseConfigService) {
    super(injector, teamService);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.searchDetail.teamId = this.team.id;
    this.getDetailTeamBySprint(this.searchDetail);
    this.formGroup.patchValue({
      sprint: this.currentTime,
    })
    console.log(this.formGroup.value['sprint'])
  }
  onDateChange(e: any) {
    const x = moment(new Date(e)).format("01/MM/YYYY").toString();
    this.searchDetail = {
      teamId: 5,
      month: x
    }
    this.formGroup = this.fb.group({
      id: '',
      text: '',
      name: [],
      number: 2,
      sprint: e,
      leadName: [],
      target: [],
      cost: [],
      revenue: [],
      staDate: [],
      endDate: [],
      staffName: []
    });
    this.getDetailTeamBySprint(this.searchDetail);

  }

  getDetailTeamBySprint(searchDetail: any) {
    this.teamService.getTeamDetaiBySprint(searchDetail).subscribe(res => {
      if (res.data[0] != null) {
        this.data = res.data[0];
        this.formGroup.patchValue(this.data);
        this.listStaffName = this.data.staffName.split(',');
        this.listStaffId = this.data.staffId.split(',');
        for (let index = 0; index <= this.listStaffId.length; index++) {
          this.member ={
            staffId:this.listStaffId[index],
            staffName:this.listStaffName[index]
          }
          this.listMember.push(this.member);    
        }
        this.totalMember = this.listMember.length;
        this.performance = (this.data.cost / this.data.revenue * 100).toFixed(2);
      }
      else {
        this.totalMember = 0;
      }
    });
  }


  addOrEdit(id: any): void {
    this.showDialog(AddOrEditTeamComponent, {
      data: {
        id,
      },
      width: '30vw',
      disableClose: true
    }, (value) => {
      if (value) {
        // this.doSearch();
      }
    });
  }

  editLeader(id?: any) {
    this.showDialog(EditLeaderComponent, {
      data: this.listMember,
      width: '30vw'
    })
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
    if (e === 'delete') {
      this.deleteConfirmDialog(id);
    }
  }

  deleteConfirmDialog(id?: any): any {
    this.showDialog(ConfirmDialogComponent, {
      data: id
    }, (value) => {
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
