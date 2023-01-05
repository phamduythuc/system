import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { Validators } from '@angular/forms';
import { StaffService } from '@shared/services/staff.service';
import { AchievementService } from '@shared/services/achievement.service';

@Component({
  selector: 'app-add-or-edit-staff-drawer',
  templateUrl: './add-or-edit-staff-drawer.component.html',
  styleUrls: ['./add-or-edit-staff-drawer.component.scss'],
})
export class AddOrEditStaffDrawerComponent
  extends BaseComponent
  implements OnInit
{
  @Input() staffSelected: any;
  @Input() drawer: any;
  imageUrl: any = '';
  option = {
    page: 0,
    pageSize: 999999,
  };
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

  listRoleStaff: any;
  listPositions: any;
  listStaffLevels: any;
  listDepartment: any;
  listTeam:any

  formGroup = this.fb.group({
    //Địa chỉ đầy đủ
    address: [],
    //Email của công ty
    companyEmail: [],
    //Tên quốc gia
    country: [],
    //Người tạo
    createdBy: [],
    //Ngày giờ tạo
    createdDate: [],
    //Đường dẫn file CV
    cvUrl: [],
    //Ngày sinh
    dateOfBirth: [null, Validators.required],
    //Mã phòng ban
    departmentId: [null, Validators.required],
    //Chỗ ở hiện tại
    domicile: [null, Validators.required],
    //Hộ khẩu thường trú
    permanentResidence: [null, Validators.required],
    //Hộ khẩu thường trú
    //Cấp bậc giáo dục
    education: [],
    //Email cá nhân
    email: [null, Validators.pattern('^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$')],
    //Thông tin liên lạc khẩn cấp
    emergencyUser: [],
    //Dân tộc
    ethnic: [],
    //Họ và tên
    fullName: [null, Validators.required],
    //Giời tính
    gender: [null, Validators.required],
    //Ngày tuyển dụng
    hireDate: [],
    //Mã chấm công của công ty
    idNhanVienChamCong: [],
    //Đường dẫn ảnh của nhân viên
    imageUrl: [],
    //Ngày nghỉ
    leaveDate: [],
    //Mã cấp bậc
    levelId: [null, Validators.required],
    //Tình trạng hôn nhân
    maritalStatus: [],
    //Người cập nhâật
    modifiedBy: [],
    //Ngày giờ cập nhật
    modifiedDate: [],
    //Mã căn cước công dân/Chứng minh nhân dân
    nationalId: [null, [Validators.required,Validators.maxLength(12), Validators.pattern('[0-9]*')]],
    //Quốc gia
    nationality: [],
    //Số điện thoại
    phone: [
      null,
      [
        Validators.required,
        Validators.pattern('(\\(\\+84\\)|0)+([0-9]{9})\\b'),
      ],
    ],
    //Mã chức vụ
    positionId: [null, Validators.required],
    //Chức vụ hiện tại
    positionJob: [],
    //Tôn giáo
    religion: [],
    //N/A
    seniority: [],
    //Ngày bắt đầu đi làm
    staOfficalDate: [null, Validators.required],
    //Mã nhân viên
    staffCode: [null, Validators.required],
    //Trạng thái của nhân viên
    staffStatus: [null, Validators.required],
    //Trạng thái
    status: [],
    //Mô tả tổng quan
    summary: [],
    //Tên đăng nhập
    username: [null, Validators.required],
    role: [null, Validators.required],
    //Kinh nghiệm
    workExperience: [],
    // lương
    salary: [],
    file: [],
    teamId: [],
    isWorker: [false]
  });
  
  constructor(
    injector: Injector,
    private staffService: StaffService,
    private achievementService: AchievementService
  ) {
    super(injector, staffService);
    this.getListRoleStaff();
  }

  ngOnInit(): void {

    if (this.staffSelected && this.staffSelected !== -1) {
      this.getDetails(this.staffSelected, ({ imageUrl }) => {
        this.convertBase64(imageUrl);
        // alert("aaa")
        console.log(this.detailsData);
        this.formGroup.patchValue(this.detailsData);
      });
    }
    this.getListTeam()
  }

  getListRoleStaff() {
    this.staffService.getRoleStaff(this.option).subscribe((res) => {
      if (res.code === '00') {
        this.listRoleStaff = res.data;
        this.listRoleStaff.forEach(
          (item) => (item.roleId = Number(item.roleId))
        );
      }
    });
    this.staffService.getListPosition(this.option).subscribe((res) => {
      this.listPositions = res.data;
    });
    this.staffService.getListStaffLevel(this.option).subscribe((res) => {
      this.listStaffLevels = res.data;
      console.log(this.listStaffLevels);
      
      
    });
    this.staffService.getListDepartment(this.option).subscribe((res) => {
      this.listDepartment = res.data;
    });
  }

  close() {
    this.drawer?.toggle();
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

  save() {
    if (!this.formGroup.value.isWorker) {
      this.formGroup.value.teamId = null;
    }
    const formData = new FormData();
    const data = this.formGroup.value;
    this.handleCoverTimeToString(data);

    if (this.staffSelected && this.staffSelected !== -1) {
      data.id = this.staffSelected;
      formData.append('file', this.formGroup.get('file').value || null);
      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      this.staffService.updateStaff(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      formData.append('file', this.formGroup.get('file').value || null);
      formData.append(
        'data',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      this.staffService.createStaff(formData).subscribe((res) => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }
  }

  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.patchValue({ file });
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  getListTeam() {
    this.staffService.getListTeam({
      page: 0,
      pageSize: 9999999,
    }).subscribe(res=>{
      this.listTeam = res.data
      this.formGroup.value.teamId = this.listTeam[0].id
      this.formGroup.patchValue(this.formGroup.value);
    });

  }
}
