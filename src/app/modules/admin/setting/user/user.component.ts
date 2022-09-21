import {Component, Injector, OnInit} from '@angular/core';
import {SettingService} from "../setting.service";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddGroupDialogComponent} from "./components/add-group-dialog/add-group-dialog.component";
import {take} from "rxjs/operators";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseComponent} from "../../../../core/base.component";
import {AddOrEditUserComponent} from "./components/add-or-edit-user/add-or-edit-user.component";
import {IColumn} from "../../../../layout/common/data-table/data-table.component";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {
    columns: IColumn[] = [
        {
            columnDef: 'stt',
            header: 'STT',
            flex: 0.3,
        },
        {
            columnDef: 'login',
            header: 'Tên đăng nhập',
        },
        {
            columnDef: 'ip',
            header: 'IP',
            cellRenderer: (element: any) => `${element.userIpList.map(ip => ip.ipAddress).join(', ')}`,
            flex: 1.5
        },
        {
            columnDef: 'team',
            header: 'Nhóm',
            cellRenderer: (element: any) => `${element.team?.name}`,
        },
        {
            columnDef: 'typeUser',
            header: 'Loại',
            cellRenderer: (element: any) => `${element.typeUser === 1 ? 'SSO' : 'Thường'}`,
        },
        {
            columnDef: 'authority',
            header: 'Nhóm quyền',
            cellRenderer: (element: any) => `${element.authorities.map(auth => auth.name).join(', ')}`,
        },
        {
            columnDef: 'action',
            header: 'Actions',
            flex: 1.5
        }
    ];
    groups = []
    users = []
    authorities = []

    paginate: any = {
        keyword: '',
        authority: '',
        groupId: '',
        size: 10,
        page: 0,
        total: 0
    }

    constructor(injector: Injector, private settingService: SettingService) {
        super(injector);
    }

    ngOnInit(): void {
        this.initData();
    }

    initData() {
        forkJoin([this.settingService.getListWpGroup(), this.settingService.query(this.paginate), this.settingService.getAuthority()]).subscribe(([groups, users, authorities]) => {
            this.handleGroupResponse(groups);
            this.handleUserResponse(users);
            this.handleAuthoritiesResponse(authorities);
        });
    }

    getListGroup() {
        this.settingService.getListWpGroup().subscribe(res => {
            this.handleGroupResponse(res);
        })
    }

    handleGroupResponse(res): void {
        if (res?.status === 200) {
            this.groups = res.body.results;
        }
    }

    getListUser() {
        this.settingService.query(this.paginate).subscribe(res => {
            this.handleUserResponse(res);
        })
    }

    handleUserResponse(res): void {
        if (res?.status === 200) {
            this.users = res.body;
            this.paginate.total = Number(res.headers.get('X-Total-Count'));
        }
    }

    handleAuthoritiesResponse(res): void {
        this.authorities = res.results;
        console.log(this.authorities)
    }

    changePage(e: any) {
        this.paginate.size = e.pageSize;
        this.paginate.page = e.pageIndex;
        this.getListUser();
    }


    groupAction(e: any) {
        switch (e.type) {
            case 'edit':
                this.openAddOrEditGroupDialog(e.data);
                break;
            case 'delete':
                this.showDialog(ConfirmDialogComponent, {width: '30vw'}, (value) => {
                    if (value) {
                        this.deleteGroup(e.data)
                    }
                });
                break;
            default:
                break;
        }
    }

    openAddOrEditGroupDialog(data?: any) {
        this.showDialog(AddGroupDialogComponent, {
            data: data,
            width: '40vw',
            disableClose: true
        }, (value) => value && this.getListGroup())
    }

    deleteGroup(data: any) {
        this.settingService.deleteGroup(data.id).subscribe(res => {
            this.showSnackBar('Xóa bản ghi thành công!', 'success');
        })
    }

    addOrEditUser(userData?: any) {
        this.showDialog(AddOrEditUserComponent, {
            data: {
                userData,
                groups: this.groups,
                authorities: this.authorities,
            },
            width: '60vw',
            height: '90vh',
            disableClose: true
        })
    }
}
