import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IColumn } from '@layout/common/data-table/data-table.component';

@Component({
  selector: 'app-list-param-reports',
  templateUrl: './list-param-reports.component.html',
  styleUrls: ['./list-param-reports.component.scss'],
})
export class ListParamReportsComponent implements OnInit {
  @Input() data: any;

  @Output() callback = new EventEmitter();

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'hrm-management.reports.form.paramName',
    },
    {
      columnDef: 'paramType',
      header: 'hrm-management.reports.form.paramType',
    },
    {
      columnDef: 'value',
      header: 'hrm-management.reports.form.paramValue',
    },
    {
      columnDef: 'actionCustom',
      header: 'common.actions',
      actions: ['delete'],
    },
  ];

  list_param: any;

  constructor() {
    this.list_param = JSON.parse(
      localStorage.getItem('listType')
    ).PARAMETER_TYPE;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data);
  }

  ngOnInit(): void {}

  changeParamType(index_list_param, index_sheet) {
    console.log();
    if(this.data[index_sheet].listParam[index_list_param].paramType == 'NUMBER'){
      this.data[index_sheet].listParam[index_list_param].typeInput = "number"
    }else if(this.data[index_sheet].listParam[index_list_param].paramType == 'DATE'){
      this.data[index_sheet].listParam[index_list_param].typeInput = "date"
    }else if(this.data[index_sheet].listParam[index_list_param].paramType == 'DATETIME'){
      this.data[index_sheet].listParam[index_list_param].typeInput = "date"
    }else if(this.data[index_sheet].listParam[index_list_param].paramType == 'STRING'){
      this.data[index_sheet].listParam[index_list_param].typeInput = "text"
    }else{
      this.data[index_sheet].listParam[index_list_param].typeInput = "text"
    }
    
  }
}
