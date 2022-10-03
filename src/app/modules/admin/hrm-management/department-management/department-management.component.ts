import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {DepartmentManagementService} from './department-management.service';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {AddOrEditDepartmentComponent} from './add-or-edit-department/add-or-edit-department.component';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {TranslocoService} from '@ngneat/transloco';

@Component({
    selector: 'app-department-management',
    templateUrl: './department-management.component.html',
    styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent extends BaseComponent implements OnInit {
    columns: IColumn[] = [
        {
            columnDef: 'name',
            header: 'common.name',
            flex: 0.3,
        },
        {
            columnDef: 'code',
            header: 'common.code',
        },
        {
            columnDef: 'description',
            header: 'common.description',
        },
        {
            columnDef: 'createdDate',
            header: 'common.createdDate',
        },
        {
            columnDef: 'modifiedDate',
            header: 'common.modifiedDate',
        },
        {
            columnDef: 'status',
            header: 'common.status',
        },
        {
            columnDef: 'action',
            header: 'common.action',
            actions: ['edit', 'delete'],
        }
    ];
    departments = [];
    paginate = {
        page: 0,
        size: 10,
        total: 0
    };

    constructor(injector: Injector, private departmentService: DepartmentManagementService,
                public translocoService: TranslocoService) {
        super(injector);

    }

    ngOnInit(): void {
        this.getDepartments();
    }

    getDepartments(): void {
        this.departmentService.getDepartment().subscribe((res) => {
            if (res.status === 200) {
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
        switch (e.type){
            case 'delete':
                this.deleteDepartment(e.data.id);
                break;
            case 'edit':
                this.addOrEditDepartment(e.data);
                break;
        }
    }
    deleteDepartment(id: any): void{
        this.showDialog(ConfirmDialogComponent, {

        }, (value) => {
            if(value){
                this.departmentService.deleteDepartment(id).subscribe((res) => {
                    if(res.status){
                        this.showSnackBar('Xóa thành công', 'success');
                        this.getDepartments();
                    }
                });
            }
        });
    }

    addOrEditDepartment(department: any): void {
        this.showDialog(AddOrEditDepartmentComponent, {
            data: {
                department
            },
            width: '50vw'
        }, (value) => {
            if (value) {
                this.showSnackBar('Thêm mới thành công', 'success');
                this.getDepartments();
            }
        });
    }
}
