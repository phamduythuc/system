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
  @Input() readonly: any;

  @Input() addRow: any;


  @Output() callback = new EventEmitter();

  columns: IColumn[] = [
    {
      columnDef: 'stt',
      header: 'common.stt',
      flex: 0.3,
    },
    {
      columnDef: 'paramKey',
      header: 'hrm-management.reports.form.paramName',
    },
    {
      columnDef: 'typeCode',
      header: 'hrm-management.reports.form.paramType',
    },
    {
      columnDef: 'paramValue',
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

    if (this.readonly == true) {
      this.columns = [
        {
          columnDef: 'stt',
          header: 'common.stt',
          flex: 0.3,
        },
        {
          columnDef: 'paramKey',
          header: 'hrm-management.reports.form.paramName',
        },
        {
          columnDef: 'typeCode',
          header: 'hrm-management.reports.form.paramType',
        },
        {
          columnDef: 'paramValue',
          header: 'hrm-management.reports.form.paramValue',
        }
      ];
    }else{
      this.callbackData()
    }

  }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  changeParamType(index_list_param, index_sheet) {
    if (
      this.data[index_sheet].listParam[index_list_param].typeCode == 'NUMBER'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'number';
    } else if (
      this.data[index_sheet].listParam[index_list_param].typeCode == 'DATE'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'date';
    } else if (
      this.data[index_sheet].listParam[index_list_param].typeCode == 'DATETIME'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'date';
    } else if (
      this.data[index_sheet].listParam[index_list_param].typeCode == 'STRING'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'text';
    } else {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'text';
    }

    this.callbackData();
    
  }

  deleteParam(index_list_param, index_sheet) {
    let arr = [...this.data[index_sheet].listParam];
    arr.splice(index_list_param, 1);
    this.data[index_sheet].listParam = arr;

    this.callbackData();
  }

  callbackData() {
    this.callback.emit({
      type: '',
      data: this.data,
      validate: this.validate(),
    });
  }

  validate(index_delete?) {
    if (index_delete) {
      let arr = [...this.data];
      arr.splice(index_delete, 1);
      this.data = arr;
    }

    let checkValidate = true;
console.log(this.data);

    this.data.map((x) => {
      if (
        !x.name ||
        !x.scriptSql ||
        !x.startRow ||
        !x.startColumn ||
        x.startColumn == 0 || 
        x.startRow == 0 ||
        !x.sheetOrder ||
        x.listParam.length == 0
      ) {
        checkValidate = false;
      }

      if (x.listParam.length > 0) {
        x.listParam.map((z) => {
          if (!z.paramKey || !z.typeCode || !z.paramValue) {
            checkValidate = false;
          }
        });
      }
    });

    return checkValidate;
  }

  newItem(data: any) {
    return {
      id: null,
      paramKey: null,
      typeCode: null,
      paramValue: null,
    };
  }

  isLoading = false;

  addNewParam(index_sheet) {
    this.isLoading = true;
    this.data[index_sheet].listParam.push(this.newItem({}));
    setTimeout(() => {
      this.isLoading = false;
    }, 1);
    
    this.callbackData()

  }

  deleteRow(index_sheet) {
    this.callback.emit({
      type: 'delete',
      data: index_sheet,
      validate: this.validate(index_sheet),
    });
  }
}
