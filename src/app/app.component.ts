import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@core/auth/auth.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    /**
     * Constructor
     */
    breadcrumbs: any[] = [];
    constructor( private activeRoute: ActivatedRoute, private router: Router, private authService: AuthService) {}
    ngOnInit(): void {
        this.checkLoginSSO();
    }

    checkLoginSSO(): void {
        const token = window.location.href.split('access_token=')[1];
        if (token) {
            this.authService.accessToken = token;
            this.router.navigate(['/']);
        }
    }


}
