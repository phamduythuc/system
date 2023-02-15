import { Component, OnInit, Inject,Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { BaseComponent } from '@core/base.component';
import { TranslocoService } from '@ngneat/transloco';
import { DashboardsProfileService } from '@shared/services/dashboards-profile.service';
import { StaffService } from '@shared/services/staff.service';

@Component({
  selector: 'app-profile-dashboards',
  templateUrl: './profile-dashboards.component.html',
  styleUrls: ['./profile-dashboards.component.scss'],
})
export class ProfileDashboardsComponent extends BaseComponent implements OnInit {
  data: any

  listTab: any = [
    {
      id: 1,
      name: 'dashboard.profile.tab.detail.title'
    },
    {
      id: 2,
      name: 'dashboard.profile.tab.contract.title'
    },
    {
      id: 3,
      name:'dashboard.profile.tab.sprint.title'
    },
    {
      id: 4,
      name: 'dashboard.profile.tab.chart.title'
    },
  ];

  dialogId: any;

  panelOpenState = false;
  constructor(
    injector: Injector,
    private authService: AuthService,
    public translocoService: TranslocoService,
    private DashboardsProfileService: DashboardsProfileService,
    private staffService:StaffService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ProfileDashboardsComponent>
  ) {
    super(injector, staffService);

    if(dialogData?.id){
      this.dialogId = dialogData?.id
      this.getDetails(dialogData?.id,()=>{
        this.data = this.detailsData
      });
    }else{
      this.dialogId = ''
      this.getProfile()
    }
  }

  ngOnInit(): void {
  }

  getProfile() {
    this.DashboardsProfileService.getProfile().subscribe((res) => {
      this.data = res.data.staffInfo;
    });
  }

  handleData(data, type) {
  //   if (type == 3) {
  //     this.data.sprint = {
  //       data: [
  //         {
  //           id: 12,
  //           project_code: 'vSDS',
  //           project_name: 'Dự án vSDS',
  //           recognize: 1,
  //           recognize_exchange: 1.5,
  //           time_percent: 30,
  //         },
  //       ],
  //       totalRecords: 1,
  //     };

  //     this.data.sprint.salary = {
  //       salary: 500020,
  //       target_kpi: 3,
  //       salary_received: 500000,
  //       guaranteed_kpi: 2.7,
  //     };
  //   }

  //   if (type == 4) {
  //   }
  }
}
