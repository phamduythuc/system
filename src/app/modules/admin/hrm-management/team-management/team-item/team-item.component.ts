import { Component, Injector, Input, OnInit, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { TeamService } from '@shared/services/team.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ViewType } from '@core/config/app.config';
import { FuseConfigService } from '@fuse/services/config';
import { TeamMemberService } from '@shared/services/team-member.service';
import { AddOrEditTeamComponent } from '../add-or-edit-team/add-or-edit-team.component';
import moment, { Moment } from 'moment';
import { EditLeaderComponent } from '../edit-leader/edit-leader.component';
import { Member } from '../models/Member';
import { MatDatepicker } from '@angular/material/datepicker';



@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})

export class TeamItemComponent extends BaseComponent implements OnInit {
  @Input() team: any;
  @Input() random: any;
  @Output() reSearch = new EventEmitter<any>();

  _permissionCodeName = 'DSD';
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedTeamId: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  performance: any = '';

  formSearch: FormGroup;
  member: Member;
  listMember: Member[] = [];
  listStaffName: any;
  listStaffId: any;
  totalMember: number;
  leadId: any;
  foodCtrl: FormControl;

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
  date = new FormControl(moment());
  listTeam: any[] = [];
  currentTime = moment(new Date(Date.now())).format("YYYY-MM-DDT00:00:00Z");
  currentTimeFormat = moment(new Date(Date.now())).format("DD/MM/YYYY");
  formGroup = this.fb.group({
    id: '',
    text: '',
    name: [],
    number: 2,
    sprint: [this.date],
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
    });
    this.foodCtrl = new FormControl({ value: '', disabled: true })

  }
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.onDateChange(ctrlValue);
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
          this.member = {
            staffId: this.listStaffId[index],
            staffName: this.listStaffName[index]
          }
          this.listMember.push(this.member);
        }
        this.totalMember = this.listMember.length;
        this.leadId = res.data[0].leadId;
        this.performance = (this.data.cost / this.data.revenue * 100).toFixed(2);
      }
      else {
        this.totalMember = 0;
      }
    });
  }

  change(e: any) {
    // console.log(e);
  }


  addOrEdit(id: any): void {
    this.showDialog(AddOrEditTeamComponent, {
      data: {
        id: id,
        status: this.team.status
      },
      width: '30vw',
      disableClose: true
    }, (value) => {
      if (value) {
        this.team.name = value.name
      }
    });
  }

  // getTeamById(id:any){
  //   this.teamService.getTeamById(id).subscribe((res)=>{
  //     console.log(res);
  //   });
  // }

  editLeader(id?: any) {
    this.showDialog(EditLeaderComponent, {
      data: {
        id: this.team.id,
        listMember: this.listMember,
        leadId: this.leadId,
        sprint: this.formGroup.value['sprint']
      },
      width: '30vw'
    }, (value) => {
      const leaderName= this.listMember.find(x=>x.staffId==value).staffName;
      this.formGroup.patchValue({
        leadName: leaderName
      })
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
        // this.searchModel.page = 0;
        // this.processSearch(this.searchModel);
        this.reSearch.emit('1');
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
