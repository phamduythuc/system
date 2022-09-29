import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../core/base.component";
import {DepartmentManagementService} from "./department-management.service";
import {IColumn} from "../../../../layout/common/data-table/data-table.component";

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent extends BaseComponent implements OnInit {
    columns: IColumn[] = [
        {
            columnDef: 'name',
            header: 'Tên',
            flex: 0.3,
        },
        {
            columnDef: 'description',
            header: 'Mô tả',
        },
        {
            columnDef: 'code',
            header: 'Code',
        },
        {
            columnDef: 'createdDate',
            header: 'Ngày tạo',
        },
        {
            columnDef: 'modifiedDate',
            header: 'Ngày chỉnh sửa',
        },
        {
            columnDef: 'status',
            header: 'Trạng thái',
        },
        {
            columnDef: 'action',
            header: 'Hành động',
            actions: ['edit', 'delete'],
        }
    ];
    departments = [];
    paginate = {
        page: 0,
        size: 10,
        total: 0
    };
  constructor(injector: Injector, private departmentService: DepartmentManagementService) {
      super(injector);
  }

  ngOnInit(): void {
      this.departmentService.getDepartment().subscribe(res => {
          if(res.status === 200){
              this.departments = res.body.data;
              this.paginate.total = this.departments.length;
          }
      });
  }

    changePage(e: any): void {
        this.paginate.size = e.pageSize;
        this.paginate.page = e.pageIndex;
    }

    actionClick(e: any): void {
        console.log(e);
    }
}
