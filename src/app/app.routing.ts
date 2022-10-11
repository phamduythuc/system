import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            breadcrumb: {
                label: 'HRM',
                url: '/'
            }
        },
        children: [
            {
                path: 'hrm-management',
              // canActivate: [AuthGuard],
              canActivateChild: [AuthGuard],
                loadChildren: () => import('app/modules/admin/hrm-management/hrm-management.module').then(m => m.HrmManagementModule),
                data: {breadcrumb: {label: 'hrm-management.label', url: ''},
                  // authorities: ['DSNV_CREATE']
                }
            },
            {
                path: 'example',
                loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule),
                data: {breadcrumb: {label: 'example', url: '/'}}
            },
            {
                path: 'dashboards',
                loadChildren: () => import('app/modules/admin/dashboards/dashboards.module').then(m => m.DashboardsModule),
                data: {breadcrumb: {label: 'Dashboards', url: ''}}
            },
            // datalake-management
            {
                path: 'cluster-manager',
                loadChildren: () => import('app/modules/admin/datalake-management/cluster-manager/cluster-manager.module').then(m => m.ClusterManagerModule),
                data: {breadcrumb: {label: 'Cluster Manager', url: ''}}
            },
            {
                path: 'lb-manager',
                loadChildren: () => import('app/modules/admin/datalake-management/lb-manager/lb-manager.module').then(m => m.LbManagerModule),
                data: {breadcrumb: {label: 'LB Manager', url: ''}}
            },
            {
                path: 'thrift-manager',
                loadChildren: () => import('app/modules/admin/datalake-management/thrift-manager/thrift-manager.module').then(m => m.ThriftManagerModule),
                data: {breadcrumb: {label: 'Thrift Manager', url: ''}}
            },
            // utility
            {
                path: 'support-request',
                loadChildren: () => import('app/modules/admin/utility/support-request/support-request.module').then(m => m.SupportRequestModule),
                data: {breadcrumb: {label: 'Support Request', url: ''}}
            },
            {
                path: 'process-manager',
                loadChildren: () => import('app/modules/admin/utility/process-manager/process-manager.module').then(m => m.ProcessManagerModule),
                data: {breadcrumb: {label: 'Process Manager', url: ''}}
            },
            {
                path: 'ingestion-and-provisioning',
                loadChildren: () => import('app/modules/admin/utility/ingestion-and-provisioning/ingestion-and-provisioning.module').then(m => m.IngestionAndProvisioningModule),
                data: {breadcrumb: {label: 'Ingestion And Provisioning', url: ''}}
            },
            {
                path: 'hdfs-tool',
                loadChildren: () => import('app/modules/admin/utility/hdfs-tool/hdfs-tool.module').then(m => m.HdfsToolModule),
                data: {breadcrumb: {label: 'Hdfs Tools', url: ''}}
            },
            {
                path: 'etl-tool',
                loadChildren: () => import('app/modules/admin/utility/etl-tool/etl-tool.module').then(m => m.EtlToolModule),
                data: {breadcrumb: {label: 'ETL Tools', url: ''}}
            },
            {
                path: 'encrypt-tool',
                loadChildren: () => import('app/modules/admin/utility/encrypt-tool/encrypt-tool.module').then(m => m.EncryptToolModule),
                data: {breadcrumb:{label: 'encrypt-tool', url: 'encrypt-tool'}}
            },
            {
                path: 'upload-file',
                loadChildren: () => import('app/modules/admin/utility/upload-file/upload-file.module').then(m => m.UploadFileModule),
                data: {breadcrumb: {label: 'Upload File', url: 'upload-file'}}
            },
            {
                path: 'config-make-file-db',
                loadChildren: () => import('app/modules/admin/utility/config-make-file-db/config-make-file-db.module').then(m => m.ConfigMakeFileDbModule),
                data: {breadcrumb: {label: 'Config Make File DB', url: 'config-make-file-db'}}
            },
            // setting
            {
                path: 'setting',
                loadChildren: () => import('app/modules/admin/setting/setting.module').then(m => m.SettingModule),
                data: {breadcrumb: {label: 'Setting', url: ''}}
            },
        ]
    }
];
