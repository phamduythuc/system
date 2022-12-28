import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { TranslocoService } from '@ngneat/transloco';
import { DashboardsProfileService } from '@shared/services/dashboards-profile.service';

@Component({
  selector: 'app-profile-dashboards',
  templateUrl: './profile-dashboards.component.html',
  styleUrls: ['./profile-dashboards.component.scss'],
})
export class ProfileDashboardsComponent implements OnInit {
  data: any = {
    profile: {},
  };

  listTab: any = [
    {
      id: 1,
      name: this.translocoService.translate(
        'dashboard.profile.tab.detail.title'
      ),
    },
    {
      id: 2,
      name: this.translocoService.translate(
        'dashboard.profile.tab.contract.title'
      ),
    },
    {
      id: 3,
      name: this.translocoService.translate(
        'dashboard.profile.tab.sprint.title'
      ),
    },
    {
      id: 4,
      name: this.translocoService.translate(
        'dashboard.profile.tab.chart.title'
      ),
    },
  ];

  dialogId:any

  panelOpenState = false;
  constructor(
    private authService: AuthService,
    public translocoService: TranslocoService,
    private DashboardsProfileService:DashboardsProfileService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ProfileDashboardsComponent>

  ) {
    this.dialogId = dialogData?.id
  }


  // constructor(
  //   injector: Injector,
  //   public dialogRef: MatDialogRef<DetailsContractComponent>,
  //   private achievementService: AchievementService,
  //   private ContractService:ContractService,
  //   @Inject(MAT_DIALOG_DATA) public dialogData: any
  // ) {
  //   super(injector, ContractService, dialogRef);
  //   this.dialogId = dialogData?.id;
  //   this.listUser = dialogData.listUser;
  //   this.listCaregories = dialogData.listCaregories;
  // }

  ngOnInit(): void {
    this.getProfile();
  }


  getProfile() {
this.DashboardsProfileService.getProfile().subscribe(res=>{
  this.data.profile = res.data.staffInfo
})
    // this.data.profile = {
    //   id: 504,
    //   address: 'Hà Nội',
    //   nationalId: '000313112331',
    //   companyEmail: 'emailcty@lifesup.com',
    //   dateOfBirth: '1670000400000',
    //   domicile: 'Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    //   education: 'Đại học',
    //   email: 'emailcanhan@gmail.com',
    //   emergencyUser: '0123456789',
    //   ethnic: 'Kinh',
    //   fullName: 'Nguyễn Văn A',
    //   gender: '2',
    //   hireDate: '1668445200000',
    //   imageUrl: 'file-upload/avatar/7b5a82c2-2769-4398-bcb2-71799777820d.png',
    //   leaveDate: '1672333200000',
    //   nationality: 'Việt Nam',
    //   phone: '0987654321',
    //   religion: '2',
    //   seniority: '2 năm',
    //   staOfficalDate: '1669741200000',
    //   staffCode: 'MNV1231',
    //   status: 1,
    //   summary: 'mô tả cá nhân',
    //   username: 'username123',
    //   workExperience: '3 năm',
    //   idNhanVienChamCong: 'mcc00111',
    //   departmentId: 37,
    //   positionId: 131,
    //   levelId: 47,
    //   teamId: 47,
    //   staffStatus: 1,
    //   role: 15,
    //   salary: 5000000,
    // };

    this.data.contract = {
      data: [
        {
          id: 12,
          contract_code: 'LU1',
          contract: 'Hợp đồng chính thức',
          duration: '1 năm',
          startTime: '1670484167000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 142,
          contract_code: 'LU2',
          contract: 'Hợp đồng chính thức',
          duration: '2 năm',
          startTime: '1670424667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 172,
          contract_code: 'LU3',
          contract: 'Hợp đồng chính thức',
          duration: '3 năm',
          startTime: '1670481667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 17,
          contract_code: 'LU4',
          contract: 'Hợp đồng chính thức',
          duration: '6 năm',
          startTime: '1670484267000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 12,
          contract_code: 'LU1',
          contract: 'Hợp đồng chính thức',
          duration: '1 năm',
          startTime: '1670484167000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 142,
          contract_code: 'LU2',
          contract: 'Hợp đồng chính thức',
          duration: '2 năm',
          startTime: '1670424667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 172,
          contract_code: 'LU3',
          contract: 'Hợp đồng chính thức',
          duration: '3 năm',
          startTime: '1670481667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 17,
          contract_code: 'LU4',
          contract: 'Hợp đồng chính thức',
          duration: '6 năm',
          startTime: '1670484267000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 12,
          contract_code: 'LU1',
          contract: 'Hợp đồng chính thức',
          duration: '1 năm',
          startTime: '1670484167000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 142,
          contract_code: 'LU2',
          contract: 'Hợp đồng chính thức',
          duration: '2 năm',
          startTime: '1670424667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 172,
          contract_code: 'LU3',
          contract: 'Hợp đồng chính thức',
          duration: '3 năm',
          startTime: '1670481667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 17,
          contract_code: 'LU4',
          contract: 'Hợp đồng chính thức',
          duration: '6 năm',
          startTime: '1670484267000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 12,
          contract_code: 'LU1',
          contract: 'Hợp đồng chính thức',
          duration: '1 năm',
          startTime: '1670484167000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 142,
          contract_code: 'LU2',
          contract: 'Hợp đồng chính thức',
          duration: '2 năm',
          startTime: '1670424667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 172,
          contract_code: 'LU3',
          contract: 'Hợp đồng chính thức',
          duration: '3 năm',
          startTime: '1670481667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 17,
          contract_code: 'LU4',
          contract: 'Hợp đồng chính thức',
          duration: '6 năm',
          startTime: '1670484267000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 12,
          contract_code: 'LU1',
          contract: 'Hợp đồng chính thức',
          duration: '1 năm',
          startTime: '1670484167000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 142,
          contract_code: 'LU2',
          contract: 'Hợp đồng chính thức',
          duration: '2 năm',
          startTime: '1670424667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 172,
          contract_code: 'LU3',
          contract: 'Hợp đồng chính thức',
          duration: '3 năm',
          startTime: '1670481667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 17,
          contract_code: 'LU4',
          contract: 'Hợp đồng chính thức',
          duration: '6 năm',
          startTime: '1670484267000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 12,
          contract_code: 'LU1',
          contract: 'Hợp đồng chính thức',
          duration: '1 năm',
          startTime: '1670484167000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 142,
          contract_code: 'LU2',
          contract: 'Hợp đồng chính thức',
          duration: '2 năm',
          startTime: '1670424667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 172,
          contract_code: 'LU3',
          contract: 'Hợp đồng chính thức',
          duration: '3 năm',
          startTime: '1670481667000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
        {
          id: 17,
          contract_code: 'LU4',
          contract: 'Hợp đồng chính thức',
          duration: '6 năm',
          startTime: '1670484267000',
          salary: 50000000,
          link: 'https://file-examples.com/storage/fee589dbcc6394c129ba7e9/2017/10/file-sample_150kB.pdf',
        },
      ],
      totalRecords: 24,
    };

    this.data.sprint = {
      data: [
        {
          id: 12,
          project_code: 'vSDS',
          project_name: 'Dự án vSDS',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 10,
        },
        {
          id: 122,
          project_code: 'vSDS 2',
          project_name: 'Dự án vSDS 2',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 20,
        },
        {
          id: 124,
          project_code: 'vSDS 3',
          project_name: 'Dự án vSDS 3',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 30,
        },
        {
          id: 12,
          project_code: 'vSDS',
          project_name: 'Dự án vSDS',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 10,
        },
        {
          id: 122,
          project_code: 'vSDS 2',
          project_name: 'Dự án vSDS 2',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 20,
        },
        {
          id: 124,
          project_code: 'vSDS 3',
          project_name: 'Dự án vSDS 3',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 30,
        },
        {
          id: 12,
          project_code: 'vSDS',
          project_name: 'Dự án vSDS',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 10,
        },
        {
          id: 122,
          project_code: 'vSDS 2',
          project_name: 'Dự án vSDS 2',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 20,
        },
        {
          id: 124,
          project_code: 'vSDS 3',
          project_name: 'Dự án vSDS 3',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 30,
        },
        {
          id: 12,
          project_code: 'vSDS',
          project_name: 'Dự án vSDS',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 10,
        },
        {
          id: 122,
          project_code: 'vSDS 2',
          project_name: 'Dự án vSDS 2',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 20,
        },
        {
          id: 124,
          project_code: 'vSDS 3',
          project_name: 'Dự án vSDS 3',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 30,
        },
        {
          id: 12,
          project_code: 'vSDS',
          project_name: 'Dự án vSDS',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 10,
        },
        {
          id: 122,
          project_code: 'vSDS 2',
          project_name: 'Dự án vSDS 2',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 20,
        },
        {
          id: 124,
          project_code: 'vSDS 3',
          project_name: 'Dự án vSDS 3',
          recognize: 1,
          recognize_exchange: 1.5,
          time_percent: 30,
        },
      ],
      totalRecords: 15,
    };

    this.data.sprint.salary = {
      salary: 11000000,
      target_kpi: 2,
      salary_received: 10000000,
      guaranteed_kpi: 1.7,
    };

    this.data.chart = [
      {
        name: 'KPI mục tiêu',
        data: [],
        type: 'effortExchange'
      },
      {
        name: 'KPI đảm bảo',
        data: [],
        type: 'kpiTarget'
      },
      {
        name: 'KPI thực tế',
        data: [],
        type: 'kpiInsure'
      }
    ];
    // this.authService.getUserInfoSSO().subscribe((res: any) => {
      

      // this.renderKPI()
    // });
  }

  handleData(data, type) {
    if (type == 3) {
      this.data.sprint = {
        data: [
          {
            id: 12,
            project_code: 'vSDS',
            project_name: 'Dự án vSDS',
            recognize: 1,
            recognize_exchange: 1.5,
            time_percent: 30,
          },
        ],
        totalRecords: 1,
      };

      this.data.sprint.salary = {
        salary: 500020,
        target_kpi: 3,
        salary_received: 500000,
        guaranteed_kpi: 2.7,
      };
    }

    if (type == 4) {
    }
  }


}
