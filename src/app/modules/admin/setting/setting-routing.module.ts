import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('app/modules/admin/setting/user/user.module').then(m => m.UserModule),
        data: {breadcrumb: {label: 'User', url: 'setting/user'}}
    },
    {
        path: 'authorization',
        loadChildren: () => import('app/modules/admin/setting/authorization/authorization.module').then(m => m.AuthorizationModule),
        data: {breadcrumb: {label: 'Authorization', url: 'setting/authorization'}}
    },
    {
        path: 'module',
        loadChildren: () => import('app/modules/admin/setting/module/module.module').then(m => m.ModuleModule),
        data: {breadcrumb: {label: 'Module', url: 'setting/module'}}
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule {
}
