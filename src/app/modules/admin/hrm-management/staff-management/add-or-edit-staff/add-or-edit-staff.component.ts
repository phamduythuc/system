import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {Validators} from "@angular/forms";
import {CategoriesService} from "@core/categories.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StaffManagementService} from "../staff-management.service";

@Component({
  selector: 'app-add-or-edit-staff',
  templateUrl: './add-or-edit-staff.component.html',
  styleUrls: ['./add-or-edit-staff.component.scss']
})
export class AddOrEditStaffComponent extends BaseComponent implements OnInit {

  private readonly dialogId: any;
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
    nationalId: [null, Validators.required],
    //Quốc gia
    nationality: [],
    //Số điện thoại
    phone: [],
    //Mã chức vụ
    positionId: [null, Validators.required],
    //Chức vụ hiện tại
    positionJob: [],
    //Tôn giáo
    religion: [],
    //N/A
    seniority: [],
    //Ngày bắt đầu đi làm
    staOfficalDate: [],
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
    //Kinh nghiệm
    workExperience: [],
  });
  projectData
  projectTypes: any = [];
  projects: any = [];
  listPartner: any = [];
  genderCategories = []
  maritalCategories = []
  religionCategories = []
  staffStatusCategories = []
  categoriesList = ['GENDER', 'MARITAL_STAtUS', 'RELIGION', 'STAFF_STATUS']
  private listPositions: any;
  private listStaffLevels: any;
  private listDepartment: any;

  constructor(injector: Injector,
              private categoriesService: CategoriesService,
              public dialogRef: MatDialogRef<AddOrEditStaffComponent>,
              private staffService: StaffManagementService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, staffService, dialogRef);
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    }
    this.getCategories()
  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.getListDepartment()
    this.getListStaffLevel()
    this.getListPosition()
  }

  getCategories() {
    this.categoriesList.forEach(item => {
      this.categoriesService.getCategories(item).subscribe(res => {
        switch (item) {
          case 'GENDER':
            this.genderCategories = res.data;
            break;
          case 'MARITAL_STAtUS':
            this.maritalCategories = res.data;
            break;
          case 'RELIGION':
            this.religionCategories = res.data;
            break;
          case 'STAFF_STATUS':
            this.staffStatusCategories = res.data;
            break;
          default:
            break;
        }
      })
    })
  }

  getListPosition() {
    this.staffService.getListPosition(this.searchModel).subscribe(res => {
      this.listPositions = res.data;
    })
  }

  getListStaffLevel() {
    this.staffService.getListStaffLevel(this.searchModel).subscribe(res => {
      this.listStaffLevels = res.data;
    })
  }

  getListDepartment() {
    this.staffService.getListDepartment(this.searchModel).subscribe(res => {
      this.listDepartment = res.data;
    })
  }

  save(data) {
    this.handleCoverTimeToString(data)
    data.id = this.dialogId || null
    this.addOrEdit(data)
  }

}
