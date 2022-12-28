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
import { EffortService } from '@shared/services/effort.service';
import { StaffService } from '@shared/services/staff.service';

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

  genders = [
    {
      name: this.translocoService.translate('gender.female'),
      value: '1',
    },
    {
      name: this.translocoService.translate('gender.male'),
      value: '2',
    },
    {
      name: this.translocoService.translate('gender.other'),
      value: '3',
    },
  ];

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
    levelId: [null],
    maritalStatus: [],
    modifiedBy: [],
    modifiedDate: [],
    nationalId: [null],
    nationality: [],
    phone: [null],
    positionId: [null],
    positionJob: [],
    religion: [],
    seniority: [],
    staOfficalDate: [null],
    staffCode: [null],
    staffStatus: [null],
    status: [],
    roleName: [],
    summary: [],
    username: [null],
    role: [],
    workExperience: [],
    salary: [],
    file: [],
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
    private achievementService: AchievementService
  ) {
    super(injector, effortService);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getListRoleStaff();

    this.mapData();
    this.convertBase64(this.data.imageUrl);
    this.formGroup.patchValue(this.data);
  }

  ngOnInit(): void {
    this.getListRoleStaff();
  }

  getListRoleStaff() {
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

    this.staffService.getListPosition(this.searchModel).subscribe((res) => {
      res.data.map((x: any) => {
        if (x.id === this.data.positionId) {
          this.data.positionId = x.name;
        }
        return x;
      });
    });

    this.staffService.getListStaffLevel(this.searchModel).subscribe((res) => {
      this.listStaffLevels = res.data;
      res.data.map((x: any) => {
        if (x.id === this.data.levelId) {
          this.data.levelId = x.name;
        }
        return x;
      });
    });

    this.staffService.getListDepartment(this.searchModel).subscribe((res) => {
      res.data.map((x: any) => {
        if (x.id === this.data.departmentId) {
          this.data.departmentId = x.name;
        }
        return x;
      });
    });

    this.staffService.getListTeam(this.searchModel).subscribe((res) => {
      res.data.map((x: any) => {
        if (x.id === this.data.teamId) {
          this.data.teamId = x.name;
        }
        return x;
      });
    });
  }

  mapData() {
    this.genders.map((x: any) => {
      if (x.value === this.data.gender) {
        this.data.gender = x.name;
        return x;
      }
    });
    this.religions.map((x: any) => {
      if (x.value === this.data.religion) {
        this.data.religion = x.name;
        return x;
      }
    });
    this.staffStatus.map((x: any) => {
      if (x.value === this.data.staffStatus) {
        this.data.staffStatus = x.name;
        return x;
      }
    });
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

    this.formGroup.patchValue(this.data);
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
