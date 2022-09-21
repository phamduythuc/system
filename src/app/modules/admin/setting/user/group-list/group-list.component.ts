import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
    @Input() groups: any = []
    @Input() group: any;
    @Output() groupChange = new EventEmitter();
    @Output() action = new EventEmitter()
    constructor() {
    }

    ngOnInit(): void {
    }

    groupClick(e: any) {
        this.groupChange.emit(e);
    }

    emitEvent(evName: string, data) {
        this.action.emit({type: evName, data: data})
    }
}
