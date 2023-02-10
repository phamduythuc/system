
// import { lists } from '../../../../../mock-api/apps/scrumboard/data';
import { Component, Injector, OnInit , Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@core/base.component';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent  extends BaseComponent implements OnInit {
 @Input() formSearch : FormGroup| any;
 @Input() list: any;
 @Input() listFilter: FormControl | any;
 @Input() ctlName: FormControl | any;
 @Input() lableName: any; 
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formSearch.get('positionIdFilter').valueChanges.pipe(
      map((event) => event),
      distinctUntilChanged()
    )
    .subscribe((res) => {
      if(res != null) {
        this.list.filter((x) => {
          if (x.name?.toLowerCase().includes(res.toLowerCase())) {
            x.status = 1;
          } else {
            x.status = 2;
          }
          return x;
        });
      }
     ;
    });
  }

}
