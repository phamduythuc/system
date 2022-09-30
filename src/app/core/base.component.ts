import {Component, Injector, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {ConfirmDialogComponent} from "../shared/components/confirm-dialog/confirm-dialog.component";
import {take} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {FormBuilder} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";

@Component({
    selector: 'app-base',
    template: ``,
    styles: []
})
export class BaseComponent implements OnInit {
    public snackBar: MatSnackBar;
    public translocoService: TranslocoService;
    public dialogService: MatDialog;
    public fb: FormBuilder;
    public service: any;
    public data: any;

    constructor(injector: Injector) {
        this.snackBar = injector.get(MatSnackBar);
        this.translocoService = injector.get(TranslocoService);
        this.dialogService = injector.get(MatDialog);
        this.fb = injector.get(FormBuilder);
    }

    ngOnInit(): void {
    }

    showSnackBar(messages?: string, type?: string): void {
        this.snackBar.open(messages, null, {
            panelClass: type === 'success' ? 'bg-lime-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        });
    }

    showDialog(component?: any, options: MatDialogConfig = {}, callback?: any): any {
        const ref = this.dialogService.open(component, {
            width: '30vw',
            ...options
        });
        ref.afterClosed().pipe(take(1)).subscribe((value) => {
            callback && callback(value);
        });
    }
    // addOrEdit(message?: any, callback?: any): any{
    //     this.showSnackBar(message, 'success');
    //     callback();
    // }
    // delete(callback?: any): any{
    //     this.showDialog(ConfirmDialogComponent, {}, (value) => {
    //         if(value){
    //             callback();
    //         }
    //     });
    // }
}
