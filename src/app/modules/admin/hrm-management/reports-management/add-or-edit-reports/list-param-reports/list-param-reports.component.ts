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

    if (this.readonly == true) {
      this.columns = [
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
        }
      ];
    }
  }

  ngOnInit(): void {}

  changeParamType(index_list_param, index_sheet) {
    if (
      this.data[index_sheet].listParam[index_list_param].paramType == 'NUMBER'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'number';
    } else if (
      this.data[index_sheet].listParam[index_list_param].paramType == 'DATE'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'date';
    } else if (
      this.data[index_sheet].listParam[index_list_param].paramType == 'DATETIME'
    ) {
      this.data[index_sheet].listParam[index_list_param].typeInput = 'date';
    } else if (
      this.data[index_sheet].listParam[index_list_param].paramType == 'STRING'
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

  validate(index_delete?, index_create?) {
    if (index_delete) {
      let arr = [...this.data];
      arr.splice(index_delete, 1);
      this.data = arr;
    }

    let checkValidate = true;

    this.data.map((x) => {
      if (
        !x.name ||
        !x.sql ||
        !x.startRow ||
        !x.startCol ||
        !x.sheetOrder ||
        x.listParam.length == 0
      ) {
        checkValidate = false;
      }

      if (x.listParam.length > 0) {
        x.listParam.map((z) => {
          if (!z.name || !z.type || !z.value) {
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
      name: null,
      type: null,
      value: null,
    };
  }

  isLoading = false;

  addNewParam(index_sheet) {
    this.isLoading = true;
    this.data[index_sheet].listParam.push(this.newItem({}));
    setTimeout(() => {
      this.isLoading = false;
    }, 1);
    this.callbackData();
  }

  deleteRow(index_sheet) {
    this.callback.emit({
      type: 'delete',
      data: index_sheet,
      validate: this.validate(index_sheet),
    });
  }
}
