import moment from 'moment';
import {DATE_FORMAT, DATE_TIME_FORMAT} from '@shared/app.constant';

export class CommonUtilsService {
  public static formatCurrency(value: any): any {
    if (value == null || value.toString().trim() === ''
      || isNaN(value = value.toString().replace(/,/g, ''))) {
      return null;
    }
    // value = value.toString().replace(/,/g, '');
    if (parseFloat(value).toString().indexOf('.') > -1) {
      const values = parseFloat(value).toString().split('.');
      // eslint-disable-next-line radix
      return [String(parseInt(values[0], 0)).replace(/(.)(?=(\d{3})+$)/g, '$1,'), values[1]].join('.');
    } else {
      if (value.startsWith('-')) {
        // eslint-disable-next-line radix
        return `-${String(Math.abs(parseInt(value, 0))).replace(/(.)(?=(\d{3})+$)/g, '$1,')}`;
      } else {
        // eslint-disable-next-line radix
        return String(parseInt(value, 0)).replace(/(.)(?=(\d{3})+$)/g, '$1,');
      }

    }
  }

  public static dateToString(value: any, isFullDate?: boolean, utc?: boolean): any {
    if (value == null || value.toString().trim() === '') {
      return null;
    }
    let a;
    if (isNaN(value)) {
      if (value.length === DATE_FORMAT.length || value.length === DATE_TIME_FORMAT.length) {
        return value;
      }
      a = moment(value);
    } else {
      a = moment(Number(value));
    }

    if (!a.isValid()) {
      return value;
    }
    if (isFullDate) {
      if (utc) {
        return moment(a).utc().format(DATE_TIME_FORMAT);
      }
      return a.format(DATE_TIME_FORMAT);
    }
    return a.format(DATE_FORMAT);
  }

  public static stringToDate(value: any, isFullDate?: boolean) {
    if (value == null || value.toString().trim() === '') {
      return null;
    }
    if (isFullDate) {
      return moment(value, DATE_TIME_FORMAT).toDate();
    }
    return moment(value, DATE_FORMAT).toDate();
  }

  public static formatVND(value: any, isFullDate?: boolean) {
    const VND = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    if(value){
      value = VND.format(parseInt(value));
    }
    return value
  }  
}
