import {Component, Injector, OnInit} from '@angular/core';
import {IColumn} from "../../../../layout/common/data-table/data-table.component";
import {BaseComponent} from "../../../../core/base.component";
import {PositionManagementService} from "./position-management.service";
import {AddOrEditPositionComponent} from "./compoment/add-or-edit-position/add-or-edit-position.component";
import {CommonUtilsService} from "@shared/common-utils.service";

@Component({
  selector: 'app-position-management',
  templateUrl: './position-management.component.html',
  styleUrls: ['./position-management.component.scss']
})
export class PositionManagementComponent extends BaseComponent implements OnInit {
  columns: IColumn[] = [
    {
      columnDef: 'name',
      header: 'common.name',
      flex: 0.3,
    },
    {
      columnDef: 'description',
      header: 'common.description',
    },
    {
      columnDef: 'code',
      header: 'common.code',
    },
    {
      columnDef: 'createdDate',
      header: 'common.createdDate',
      cellRenderer: (element: any) => (CommonUtilsService.dateToString(element.createdDate))
    },
    {
      columnDef: 'createBy',
      header: 'common.createBy',
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
    positions = [];
    panelOpenState: false;
    constructor(injector: Injector,
                positionService: PositionManagementService) {
        super(injector, positionService);
    }

    ngOnInit(): void {
        this.searchModel.status=1
        this.doSeach();
        console.log(this.searchResult.data)
        // this.positions = this.searchResult.data
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
            this.addOrEditPosition(e.data)
        }
        if(e.type === 'delete'){
            this.deletePosition( e.data.id)
        }
    }

    deletePosition(id:any){
        console.log(this.searchModel);

        this.deleteConfirmDialog(id)
    }

  addOrEditPosition(positionData?: any): void {
    const ref = this.showDialog(AddOrEditPositionComponent, {
      data: {
        positionData,
      },
      width: '60vw',
      height: '45vh',
      disableClose: true
    }, (value) => {
      if (value)
        this.addOrEdit(value)
    });
    // ref.onclose()
  }
}
