import {
  Component,
  Injector,
  Inject,
  OnInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { BaseComponent } from '@core/base.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { DashboardsProfileService } from '@shared/services/dashboards-profile.service';
import { EffortService } from '@shared/services/effort.service';
import { StaffService } from '@shared/services/staff.service';
import {AccountService} from "@core/auth/account.service";
import {AuthoritiesConstant} from "../../../../../authorities.constant";

@Component({
  selector: 'app-detail-profile-dashboards',
  templateUrl: './detail-profile-dashboards.component.html',
  styleUrls: ['./detail-profile-dashboards.component.scss'],
})
export class DetailProfileDashboardsComponent
  extends BaseComponent
  implements OnInit
{
  @Input() data: any;

  genders:any = []

  staffStatus = [
    {
      name: this.translocoService.translate('staff_status.official'),
      value: 1,
    },
    {
      name: this.translocoService.translate('staff_status.unofficial'),
      value: 2,
    },
    {
      name: this.translocoService.translate('staff_status.quit'),
      value: 3,
    },
  ];

  religions = [
    {
      name: this.translocoService.translate('religion.yes'),
      value: '1',
    },
    {
      name: this.translocoService.translate('religion.no'),
      value: '2',
    },
  ];

  formGroup = this.fb.group({
    address: [],
    name: [],
    code: [],
    projectTypeName: [],
    partnerId: [],
    budget: [],
    startTime: [],
    expectEndTime: [],
    description: [],
    actualEndTime: [],
    companyEmail: [],
    country: [],
    createdBy: [],
    createdDate: [],
    cvUrl: [],
    dateOfBirth: [null],
    departmentId: [null],
    domicile: [null],
    education: [],
    email: [],
    emergencyUser: [],
    ethnic: [],
    fullName: [null],
    gender: [null],
    hireDate: [],
    idNhanVienChamCong: [],
    imageUrl: [],
    leaveDate: [],
    levelName: [null],
    maritalStatus: [],
    modifiedBy: [],
    modifiedDate: [],
    nationalId: [null],
    nationality: [],
    phone: [null],
    positionId: [null],
    positionNames: [],
    religion: [],
    seniority: [],
    staOfficalDate: [null],
    staffCode: [null],
    staffStatus: [null],
    status: [],
    roleName: '',
    summary: [],
    username: [null],
    role: [],
    workExperience: [],
    salary: [''],
    file: [],
    teamNames: [],
    permanentResidence: [],
    genderName: [],
    religionName: [],
    staffStatusName: [],
  });

  option = {
    page: 0,
    pageSize: 999999,
  };

  listRoleStaff: any;
  listPositions: any;
  listStaffLevels: any;
  listDepartment: any;

  imageUrl: any = '';

  constructor(
    injector: Injector,
    private effortService: EffortService,
    private staffService: StaffService,
    private achievementService: AchievementService,
    private accountService: AccountService
  ) {
    super(injector, staffService);
    this.genders = this.getListCategories().genders;
  }


  ngOnChanges(changes: SimpleChanges) {
    // this.getListRoleStaff();
    this.mapData();
    this.convertBase64(this.data.imageUrl);
    this.formGroup.patchValue(this.data);
    this.formGroup.patchValue({
      departmentId: this.data.departmentNames,
      positionId: this.data.positionNames,
      positionJob: this.data.positionNames,
      religion: this.data.religionName,
      staffStatus: this.data.staffStatusName,
      gender: this.data.genderName
    });
  }

  ngOnInit(): void {
    if (this.accountService.hasAnyAuthority(AuthoritiesConstant.DSNV_READ)) {
      this.getListRoleStaff();
    }
  }

  getListRoleStaff(): void {
    this.staffService.getRoleStaff(this.option).subscribe((res) => {
      if (res.code === '00') {
        this.listRoleStaff = res.data;
        res.data.map((x: any) => {
          if (Number(x.roleId) === this.data.role) {
            this.data.role = x.name;
          }
          return x;
        });
      }
      this.formGroup.patchValue(this.data);
    });

    this.staffService.getListPosition(this.option).subscribe((res) => {
      res.data.map((x: any) => {
        if (x.id === this.data.positionId) {
          this.data.positionId = x.name;
          this.data.positionJob = x.name
        }
        return x;
      });
    });

    this.staffService.getListStaffLevel(this.option).subscribe((res) => {
      this.listStaffLevels = res.data;
      res.data.map((x: any) => {
        if (x.id === this.data.levelId) {
          this.data.levelId = x.name;
          this.data.levelName = x.name
        }
        return x;
      });
    });

    this.staffService.getListDepartment(this.option).subscribe((res) => {
      res.data.map((x: any) => {
        if (x.id === this.data.departmentId) {
          this.data.departmentId = x.name;
        }
        return x;
      });
    });

    // this.staffService.getListTeam(this.option).subscribe((res) => {
    //   res.data.map((x: any) => {
    //     if (x.id === this.data.teamId) {
    //       this.data.teamId = x.name;
    //     }
    //     return x;
    //   });
    // });
  }

  mapData() :void {
    // this.genders.map((x: any) => {
    //   if (x.code === Number(this.data.gender)) {
    //     this.data.gender = x.name;
    //     return x;
    //   }
    // });
    // this.religions.map((x: any) => {
    //   if (x.value === this.data.religion) {
    //     this.data.religion = x.name;
    //     return x;
    //   }
    // });
    // this.staffStatus.map((x: any) => {
    //   if (x.value === this.data.staffStatus) {
    //     this.data.staffStatus = x.name;
    //     return x;
    //   }
    // });
    this.data.dateOfBirth = CommonUtilsService.dateToString(
      this.data.dateOfBirth,
      false
    );
    this.data.staOfficalDate = CommonUtilsService.dateToString(
      this.data.staOfficalDate,
      false
    );
    this.data.leaveDate = CommonUtilsService.dateToString(
      this.data.leaveDate,
      false
    );
    this.data.hireDate = CommonUtilsService.dateToString(
      this.data.hireDate,
      false
    );

    // const VND = new Intl.NumberFormat('vi-VN', {
    //   style: 'currency',
    //   currency: 'VND',
    // });
    if (this.data.salary != null) {
      this.data.salary = CommonUtilsService.formatVND(parseInt(this.data.salary)),
      this.formGroup.patchValue(this.data);
    }
  }

  convertBase64(imageUrl): void {
    if (imageUrl) {
      this.achievementService.downloadFile(imageUrl).subscribe((res1) => {
        this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(res1.body)
        );
      });
    }
  }
}
