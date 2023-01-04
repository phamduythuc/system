import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AccountService } from '@core/auth/account.service';
import { CategoriesService } from '@core/categories.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * Constructor
   */
  breadcrumbs: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private CategoriesService: CategoriesService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.checkLoginSSO();
    // this.getList()

    this.getList();

  }

  checkLoginSSO(): void {
    const token =
      window.location.href.split('access_token=')[1] ||
      localStorage.getItem('accessToken');

    let listType = localStorage.getItem('listType');

    if (token) {
      this.authService.accessToken = token;
      this.accountService.identity(true).subscribe(() => {
        if (!listType) {
          this.getList();
        }
        if (window.location.href.split('access_token=')[1]) {
          this.router.navigate(['/']);
        }
      });
    }
  }
list = ['CONTACT_TYPE','CONTRACT_STATUS','GENDER']
value:any
  getList() {
    let data:any = {}
      this.list.map((x:any,i:any,length:any)=>{
          this.getCategories(x,()=>{
            data[x] = this.value
          })
     
      })

      data.genders =[
          {
            name: this.translocoService.translate('gender.female'),
            code: 1,
          },
          {
            name: this.translocoService.translate('gender.male'),
            code: 2,
          },
          {
            name: this.translocoService.translate('gender.other'),
            code: 3,
          }
        ];

      setTimeout(() => {
        localStorage.setItem('listType', JSON.stringify(data));
      }, 500);

    // this.CategoriesService.getCategories('CONTACT_TYPE').subscribe((res) => {
    //   res.data.map(x=>{
    //     x.code = Number(x.code)
    //     return x
    //   })
    //   data.CONTACT_TYPE = res.data;
    //   localStorage.setItem('listType', JSON.stringify(data));
    // });

    // this.CategoriesService.getCategories('CONTRACT_STATUS').subscribe((res) => {
    //   res.data.map(x=>{
    //     x.code = Number(x.code)
    //     return x
    //   })
    //   data.CONTRACT_STATUS = res.data;
    //   localStorage.setItem('listType', JSON.stringify(data));
    // });

  }

  getCategories(data,callback?){
  
    this.CategoriesService.getCategories(data).subscribe((res) => {
      res.data.map(x=>{
        x.code = Number(x.code)
        return x
      })
      this.value = res.data
      if(callback){
        callback(this.value);
      }

      // localStorage.setItem('listType', JSON.stringify(data));
    });
    
  }
}
