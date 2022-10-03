import {Component, Injector, OnInit} from '@angular/core';
import {IColumn} from "../../../../layout/common/data-table/data-table.component";
import {BaseComponent} from "../../../../core/base.component";
import {StaffLevelService} from "./staff-level.service";
import {AddOrEditStaffLevelComponent} from "./compoment/add-or-edit-staff-level/add-or-edit-staff-level.component";

@Component({
  selector: 'app-staff-level-management',
  templateUrl: './staff-level-management.component.html',
  styleUrls: ['./staff-level-management.component.scss']
})
export class StaffLevelManagementComponent extends BaseComponent implements OnInit {

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
            columnDef: 'createBy',
            header: 'Nguoi chỉnh sửa',
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
    formSearch =this.fb.group({
        name : [null],
        createdDate:[null],
        createBy:[null]
    })

    paginate = {
        page: 0,
        size: 10,
        total: 0
    };
    staffLevels = [];
    panelOpenState: false;
    constructor(injector: Injector,
                staffLevelService: StaffLevelService) {
        super(injector, staffLevelService);
    }

    ngOnInit(): void {
        this.searchModel.status=1
        this.doSeach();
        console.log(this.searchResult.data)
        // this.staffLevels = this.searchResult.data
        this.formSearch.valueChanges.subscribe(res=>{
            console.log(res)
            this.searchModel= {...this.searchModel,...this.formSearch.value}
        })
    }

    doSeach(paramSearch?:any){
        // this.searchModel= {...this.searchModel,...this.formSearch.value}
        console.log(paramSearch)
        this.processSearch()
    }

    changePage(e: any): void {
        this.paginate.size = e.pageSize;
        this.paginate.page = e.pageIndex;
        this.searchModel.page = this.paginate.page
        this.searchModel.pageSize = this.paginate.size
    }

    actionClick(e: any): void {
        console.log(e);
        if(e.type==='edit'){
            this.addOrEditStaffLevel(e.data)
        }
        if(e.type === 'delete'){
            this.deleteStaffLevel( e.data.id)
        }
    }

    deleteStaffLevel(id:any){
        console.log(this.searchModel);

        this.deleteConfirmDialog(id)
    }

    addOrEditStaffLevel(staffLevelData?: any): void {
        const ref = this.showDialog(AddOrEditStaffLevelComponent,{
            data:{
                staffLevelData,
            },
            width:'60vw',
            height:'45vh',
            disableClose:true
        },(value)=>{
            if(value)
                this.addOrEdit(value)
        });
        // ref.onclose()
    }

}
