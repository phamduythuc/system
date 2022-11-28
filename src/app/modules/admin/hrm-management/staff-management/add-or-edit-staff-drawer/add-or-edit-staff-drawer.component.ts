import {Component, Injector, Input, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {Validators} from '@angular/forms';
import {StaffService} from '@shared/services/staff.service';
import {AchievementService} from '@shared/services/achievement.service';

@Component({
  selector: 'app-add-or-edit-staff-drawer',
  templateUrl: './add-or-edit-staff-drawer.component.html',
  styleUrls: ['./add-or-edit-staff-drawer.component.scss']
})
export class AddOrEditStaffDrawerComponent extends BaseComponent implements OnInit {
  @Input() staffSelected: any;
  @Input() drawer: any;
  imageUrl: any = '';
  option = {
    page: 0,
    pageSize: 999999,
  };
  genders = [
    {
      name: 'Nam',
      value: '1'
    },
    {
      name: 'Nữ',
      value: '2'
    },
    {
      name: 'Khác',
      value: '3'
    }
  ];
  religion = [
    {
      name: 'Có',
      value: 1
    },
    {
      name: 'Không',
      value: 2
    }
  ];
  status = [
    {
      name: 'Đang làm việc',
      value: 1
    },
    {
      name: 'Hết hạn hợp đông',
      value: 0
    },
    {
      name: 'Nghỉ việc',
      value: 2
    }
  ];
  listRoleStaff: any;
  listPositions: any;
  listStaffLevels: any;
  listDepartment: any;
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
    domicile: [],
    //Cấp bậc giáo dục
    education: [],
    //Email cá nhân
    email: [],
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
    nationalId: [null, [Validators.required, Validators.pattern('[0-9]*')]],
    //Quốc gia
    nationality: [],
    //Số điện thoại
    phone: [null, [Validators.required, Validators.pattern('(\\(\\+84\\)|0)+([0-9]{9})\\b')]],
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
    staffStatus: [null],
    //Trạng thái
    status: [],
    //Mô tả tổng quan
    summary: [],
    //Tên đăng nhập
    username: [null, Validators.required],
    role: [],
    //Kinh nghiệm
    workExperience: [],
    // lương
    salary: [],
    file: [],
  });
  // formGroup = this.fb.group({
  //   fullName: [null, [Validators.required]],
  //   gender: [null, [Validators.required]],
  //   dateOfBirth: [null, [Validators.required]],
  //   nationalId: [null, [Validators.required]],
  //   ethnic: [null],
  //   religion: [null],
  //   educationLevel: [null],
  //   staffStatus: [null, [Validators.required]],
  //   phone: [null, [Validators.pattern('(\\(\\+84\\)|0)+([0-9]{9})\\b')]],
  //   emergencyUser: [null],
  //   email: [null],
  //   companyEmail: [null],
  //   nationality: [null],
  //   address: [null],
  //   domicile: [null],
  //   staffCode: [null],
  //   idNhanVienChamCong: [],
  //   imageUrl: [],
  //   username: [null],
  //   hireDate: [null],
  //   staOfficalDate: [null],
  //   leaveDate: [null],
  //   seniority: [null],
  //   workExperience: [null],
  //   teamId: [null],
  //   summary: [null],
  //   createdDate: [null],
  //   modifiedDate: [null],
  //   file: []
  // });

  constructor(injector: Injector, private staffService: StaffService, private achievementService: AchievementService) {
    super(injector, staffService);
  }

  ngOnInit(): void {
    if (this.staffSelected && this.staffSelected !== -1) {
      this.getDetails(this.staffSelected, ({imageUrl}) => {
        this.convertBase64(imageUrl);
      });
    }
    this.getListRoleStaff();
    this.getListStaffLevel();
    this.getListPosition();
    this.getListDepartment();
  }
  getListRoleStaff(){
    this.staffService.getRoleStaff(this.option).subscribe(res => {
      if (res.code === '00') {
        this.listRoleStaff = res.data;
        this.listRoleStaff.forEach(item => item.roleId = Number(item.roleId));
      }
    });
  }
  getListPosition(): void {
    this.staffService.getListPosition(this.searchModel).subscribe(res => {
      this.listPositions = res.data;
    });
  }

  getListStaffLevel() {
    this.staffService.getListStaffLevel(this.searchModel).subscribe(res => {
      this.listStaffLevels = res.data;
    });
  }

  getListDepartment() {
    this.staffService.getListDepartment(this.searchModel).subscribe(res => {
      this.listDepartment = res.data;
    });
  }

  close() {
    this.drawer?.toggle();
  }
  convertBase64(imageUrl): void {
    if (imageUrl) {
      this.achievementService.downloadFile(imageUrl).subscribe(res1 => {
        this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res1.body));
      });
    }
  }

  save() {
    const formData = new FormData();
    const data = this.formGroup.value;
    this.handleCoverTimeToString(data);
    if(this.staffSelected && this.staffSelected !== -1){
      data.id = this.staffSelected;
      formData.append('file', this.formGroup.get('file').value || null);
      formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
      this.staffService.updateStaff(formData).subscribe(res => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.close();
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }else{
      formData.append('file', this.formGroup.get('file').value || null);
      formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
      this.staffService.createStaff(formData).subscribe(res => {
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
      this.formGroup.patchValue({file});
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

}
