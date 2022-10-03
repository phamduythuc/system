import moment from 'moment';
import {DATE_FORMAT, DATE_TIME_FORMAT} from '@shared/app.constant';

export class CommonUtilsService {
  public static formatCurrency(value: any): string {
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

  public static dateToString(value: any, isFullDate?: boolean): any {
    if (value == null || value.toString().trim() === '') {
      return null;
    }
    const a = moment(value);
    if (!a.isValid()) {
      return value;
    }
    if (isFullDate) {
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
}
