import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {FormControl, Validators} from "@angular/forms";
import {f} from "@fullcalendar/core/internal-common";
import {BehaviorSubject, finalize, Observable, Subject, takeUntil, takeWhile, tap, timer} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'auth-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthConfirmationRequiredComponent implements OnInit, OnDestroy {
  /**
   * Constructor
   */
  verifyControl: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]);
  checkLength: boolean = true;
  countdown: number = 10;
  countdownMapping: any = {
    '=1': '# second',
    'other': '# seconds'
  };
  enable: boolean = true;
  active: boolean = false;
  active$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if (token) {
      this.activeToken(token, url);
    }
    console.log(token)
    console.log(url);
    this.verifyControl.valueChanges.subscribe(value => {
        if (value.length === 6 && !this.verifyControl.invalid) {
          this.checkLength = false;
        } else {
          this.checkLength = true;
        }
      }
    );
    this.countDown();
  }

  countDown() {
    this.enable = true;
    this.countdown = 10;
    timer(1000, 1000).pipe(
      finalize(() => {
        this.enable = false;
      }),
      takeWhile(() => this.countdown > 0),
      takeUntil(this._unsubscribeAll),
      tap(() => this.countdown--)
    ).subscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.active = false;
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  sendCode(): void {
    console.log('click');

    this.countDown();
  }

  activeToken(token: string, url: URL) {
    this.http.get(`${environment.apiUrl}/confirm?token=${token}`).subscribe((res: ResActiveToken) => {
      if (!res.data?.Result) {
        const direct = url.pathname;
        this.router.navigate([direct]);
        console.log(direct);
        this.active = true;
        console.log(this.active);
      }

        });
  }
}

interface ResActiveToken {
  data: any;
  message: string;
  status: string;
  statusCode: number;
  timeStamp: any;
}
