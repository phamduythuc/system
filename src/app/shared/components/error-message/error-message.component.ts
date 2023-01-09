import { Component, Input } from '@angular/core';
import {AbstractControl, AbstractControlDirective, Validators} from '@angular/forms';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControlDirective | AbstractControl | any;
  @Input() name = 'Trường này';
  @Input() textPattern = 'Trường này này';

  constructor(private tran: TranslocoService) {
  }
  private errorMessages: { [key: string]: any } = {
    required: (params: any, name: any) => `${name} ${this.tran.translate('specialText.error_1')}`,
    datePickerFormat: (params: any, name: any) => `${name}`,
    pattern: (params: any, name: any) => `${this.textPattern}`,
    onlyNumber: (params: any, name: any) => `${name} ${this.tran.translate('specialText.error_7')}`,
    minlength: (params: any, name: any) => `${this.tran.translate('specialText.error_2')} ${name} ${this.tran.translate('specialText.error_3')} ${params.requiredLength} ${this.tran.translate('specialText.error_8')}`,
    maxlength: (params: any, name: any) => `${this.tran.translate('specialText.error_2')} ${name} ${this.tran.translate('specialText.error_6')} ${params.requiredLength} ${this.tran.translate('specialText.error_8')}`,
    minNumber: (params: any, name: any) => `${this.tran.translate('specialText.error_5')} ${name} ${this.tran.translate('specialText.error_4')} ${params.message}`,
    maxNumber: (params: any, name: any) => `${this.tran.translate('specialText.error_5')} ${name} ${this.tran.translate('specialText.error_6')} ${params.message}`,
    uniqueName: (params: any, name: any) => params.message,
    mustMatch: () => `${this.tran.translate('specialText.error_9')}`,
    dateRange:(params: any, name: any) => `${this.tran.translate('specialText.error_10')}`,
  };

  shouldShowErrors(): boolean { 
    return this.control?.errors && (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    console.log(this.control.errors)
    return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any): any {
    if(this.errorMessages[type]){
      return this.errorMessages[type](params, this.name);
    }
  }
}
