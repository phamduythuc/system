/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import {AuthoritiesConstant} from "../../../authorities.constant";
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboards',
        // role: [AuthoritiesConstant.DASHBOARD.DASHBOARD_READ]
    },
    {
        id: 'hrmManagement',
        title: 'Quản lý chung',
        type: 'group',
        role: [],
        children: [
            {
                id: 'position',
                title: 'Chức vụ',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/hrm-management/position-management'
            },
            {
                id: 'level',
                title: 'Cấp bậc',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/hrm-management/staff-level-management'
            },
            {
                id: 'department',
                title: 'Phòng ban',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/hrm-management/department-management'
            }
        ]
    },
    {
        id      : 'datalakeManagement',
        title   : 'Datalake Management',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        // role: [
        //     AuthoritiesConstant.SERVER_INFO.SERVER_INFO_READ,
        //     AuthoritiesConstant.IP_TABLE_RULE.IP_TABLE_RULE_READ,
        //     AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ,
        //     AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ,
        //     AuthoritiesConstant.LB_CONNECTION.LB_CONNECTION_READ,
        //     AuthoritiesConstant.RP_APP.RP_APP_READ,
        //     AuthoritiesConstant.THRIFT_ACCESS_RULE.THRIFT_ACCESS_RULE_READ,
        //     AuthoritiesConstant.THRIFT_INFO.THRIFT_INFO_READ,
        //     AuthoritiesConstant.ALERT_CONFIG.ALERT_CONFIG_READ
        // ],
        children: [
            {
                id   : 'clusterManager',
                title: 'Cluster Manager',
                type : 'collapsable',
                icon : 'heroicons_outline:clipboard-check',
                // role: [
                //     AuthoritiesConstant.SERVER_INFO.SERVER_INFO_READ,
                //     AuthoritiesConstant.IP_TABLE_RULE.IP_TABLE_RULE_READ,
                //     AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ,
                //     AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
                // ],
                children: [
                    {
                        id   : 'serverIpTableManager',
                        title: 'Server Ip Table Manager',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/cluster-manager/server-ip-table-manager',
                        // role: [
                        //     AuthoritiesConstant.SERVER_INFO.SERVER_INFO_READ,
                        // ],
                    },
                    {
                        id   : 'ipTableRule',
                        title: 'Ip Table Rule',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/cluster-manager/ip-table-rule',
                        // role: [
                        //     AuthoritiesConstant.IP_TABLE_RULE.IP_TABLE_RULE_READ,
                        // ],
                    },
                    {
                        id   : 'duFileServerRule',
                        title: 'Du File Server Rule',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/cluster-manager/du-file-server-rule',
                        // role: [
                        //     AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ,
                        // ],
                    },
                    {
                        id   : 'duFileHDFSRule',
                        title: 'Du File HDFS Rule',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/cluster-manager/du-file-hdfs-rule',
                        // role: [
                        //     AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
                        // ],
                    },
                ]
            },
            {
                id   : 'lbManager',
                title: 'LB Manager',
                type : 'collapsable',
                icon : 'heroicons_outline:chart-pie',
                // role: [
                //     AuthoritiesConstant.LB_CONNECTION.LB_CONNECTION_READ,
                //     AuthoritiesConstant.RP_APP.RP_APP_READ
                // ],
                children: [
                    {
                        id   : 'lbConnection',
                        title: 'LB Connection',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/lb-manager/lb-connection',
                        // role: [
                        //     AuthoritiesConstant.LB_CONNECTION.LB_CONNECTION_READ
                        // ],
                    },
                    {
                        id   : 'rpApp',
                        title: 'RP App',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/lb-manager/rp-app',
                        // role: [
                        //     AuthoritiesConstant.RP_APP.RP_APP_READ
                        // ],
                    }
                ]
            },
            {
                id   : 'thriftManager',
                title: 'Thrift Manager',
                type : 'collapsable',
                icon : 'heroicons_outline:cash',
                // role: [
                //     AuthoritiesConstant.THRIFT_ACCESS_RULE.THRIFT_ACCESS_RULE_READ,
                //     AuthoritiesConstant.THRIFT_INFO.THRIFT_INFO_READ,
                // ],
                children: [
                    {
                        id   : 'ThriftAccessRule',
                        title: 'Thrift Access Rule',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/thrift-manager/thrift-access-rule',
                        // role: [
                        //     AuthoritiesConstant.THRIFT_ACCESS_RULE.THRIFT_ACCESS_RULE_READ
                        // ],
                    },
                    {
                        id   : 'thriftRule',
                        title: 'Thrift Rule',
                        type : 'basic',
                        icon : 'heroicons_outline:chart-pie',
                        link : '/thrift-manager/thrift-rule',
                        // role: [
                        //     AuthoritiesConstant.THRIFT_INFO.THRIFT_INFO_READ,
                        // ],
                    }
                ]
            },
            {
                id   : 'alertManager',
                title: 'Alert Manager',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                // link : '/alert-manager',
                // role: [
                //     AuthoritiesConstant.ALERT_CONFIG.ALERT_CONFIG_READ
                // ]
            }
        ]
    },
    {
        id      : 'utility',
        title   : 'Utility',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        // role: [
        //     AuthoritiesConstant.SUPPORT_REQUEST.SUPPORT_REQUEST_READ,
        //     AuthoritiesConstant.PROCESS_MANAGER.PROCESS_MANAGER_READ,
        //     AuthoritiesConstant.INGESTION_MONITOR.INGESTION_MONITOR_READ,
        //     AuthoritiesConstant.INGESTION_FLOW_MANAGER.INGESTION_FLOW_MANAGER_READ,
        //     AuthoritiesConstant.CONNECTION_MANAGER.CONNECTION_MANAGER_READ,
        //     AuthoritiesConstant.FLOW_CUSTOMIZED.FLOW_CUSTOMIZED_READ,
        //     AuthoritiesConstant.HDFS_BROWSER.HDFS_BROWSER_READ,
        //     AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ,
        //     AuthoritiesConstant.TABLE_LOOKUP.TABLE_LOOKUP_READ,
        //     AuthoritiesConstant.ETL_JOB_LIB.ETL_JOB_LIB_READ,
        //     AuthoritiesConstant.ENCRYPT_TOOLS.ENCRYPT_TOOLS_READ,
        //     AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ,
        //     AuthoritiesConstant.DB_MAKE_FILE_CONFIG.DB_MAKE_FILE_CONFIG_READ
        // ],
        children: [
            {
                id   : 'supportRequest',
                title: 'Support Request',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/support-request',
                role: [
                    AuthoritiesConstant.SUPPORT_REQUEST.SUPPORT_REQUEST_READ
                ]
            },
            {
                id   : 'processManager',
                title: 'Process Manager',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/process-manager',
                role: [
                    AuthoritiesConstant.PROCESS_MANAGER.PROCESS_MANAGER_READ
                ]
            },
            {
                id   : 'ingestion&Provisioning',
                title: 'Ingestion & Provisioning',
                type : 'collapsable',
                icon : 'heroicons_outline:clipboard-check',
                // role: [
                //     AuthoritiesConstant.INGESTION_MONITOR.INGESTION_MONITOR_READ,
                //     AuthoritiesConstant.INGESTION_FLOW_MANAGER.INGESTION_FLOW_MANAGER_READ,
                //     AuthoritiesConstant.CONNECTION_MANAGER.CONNECTION_MANAGER_READ,
                //     AuthoritiesConstant.FLOW_CUSTOMIZED.FLOW_CUSTOMIZED_READ,
                // ],
                children: [
                    {
                        id   : 'monitor',
                        title: 'Monitor',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/ingestion-and-provisioning/monitor',
                        // role: [
                        //     AuthoritiesConstant.INGESTION_MONITOR.INGESTION_MONITOR_READ
                        // ]
                    },
                    {
                        id   : 'flowManager',
                        title: 'Flow Manager',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/ingestion-and-provisioning/flow-manager',
                        // role: [
                        //     AuthoritiesConstant.INGESTION_FLOW_MANAGER.INGESTION_FLOW_MANAGER_READ
                        // ]
                    },
                    {
                        id   : 'connectionManager',
                        title: 'Connection Manager',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/ingestion-and-provisioning/connection-manager',
                        // role: [
                        //     AuthoritiesConstant.CONNECTION_MANAGER.CONNECTION_MANAGER_READ
                        // ]
                    },
                    {
                        id   : 'flowCustomized',
                        title: 'Flow Customized',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/ingestion-and-provisioning/flow-customized',
                        // role: [
                        //     AuthoritiesConstant.FLOW_CUSTOMIZED.FLOW_CUSTOMIZED_READ
                        // ]
                    },
                ]
            },
            {
                id   : 'hdfsTool',
                title: 'HDFS Tool',
                type : 'collapsable',
                icon : 'heroicons_outline:clipboard-check',
                role: [
                    AuthoritiesConstant.HDFS_BROWSER.HDFS_BROWSER_READ,
                    AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
                ],
                children: [
                    {
                        id   : 'hdfsBrowser',
                        title: 'HDFS Browser',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/hdfs-tool/hdfs-browser',
                        role: [
                            AuthoritiesConstant.HDFS_BROWSER.HDFS_BROWSER_READ
                        ]
                    },
                    {
                        id   : 'exportfile',
                        title: 'Export File',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/hdfs-tool/export-file',
                        role: [
                            AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
                        ]
                    },
                ]
            },
            {
                id   : 'etlTool',
                title: 'ETL Tool',
                type : 'collapsable',
                icon : 'heroicons_outline:clipboard-check',
                role: [
                    AuthoritiesConstant.TABLE_LOOKUP.TABLE_LOOKUP_READ,
                    AuthoritiesConstant.ETL_JOB_LIB.ETL_JOB_LIB_READ
                ],
                children: [
                    {
                        id   : 'lookupTable',
                        title: 'Tra Cứu Table',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/etl-tool/lookup-table',
                        role: [
                            AuthoritiesConstant.TABLE_LOOKUP.TABLE_LOOKUP_READ
                        ]
                    },
                    {
                        id   : 'job-management',
                        title: 'ETL Job Lib',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check',
                        link : '/etl-tool/job-management',
                        role: [
                            AuthoritiesConstant.ETL_JOB_LIB.ETL_JOB_LIB_READ
                        ]
                    },
                ]
            },
            {
                id   : 'encryptTool',
                title: 'Encrypt Tool',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/encrypt-tool',
                role: [
                    AuthoritiesConstant.ENCRYPT_TOOLS.ENCRYPT_TOOLS_READ
                ]
            },
            {
                id   : 'uploadFile',
                title: 'Download/Upload File',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/upload-file',
                role: [
                    AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ
                ]
            },
            {
                id   : 'dbMakeFileConfig',
                title: 'DB Make File Config',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/config-make-file-db',
                role: [
                    AuthoritiesConstant.DB_MAKE_FILE_CONFIG.DB_MAKE_FILE_CONFIG_READ
                ]
            },

        ]
    },
    {
        id      : 'setting',
        title   : 'Setting',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        role: [
            AuthoritiesConstant.USER_MANAGER.USER_MANAGER_READ,
            AuthoritiesConstant.ROLE_MANAGER.ROLE_MANAGER_READ,
            AuthoritiesConstant.MODULE_MANAGER.MODULE_MANAGER_READ,

        ],
        children: [
            {
                id   : 'user',
                title: 'User',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/setting/user',
                role: [
                    AuthoritiesConstant.USER_MANAGER.USER_MANAGER_READ
                ]
            },
            {
                id   : 'authorization',
                title: 'Authorization',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/setting/authorization',
                role: [
                    AuthoritiesConstant.ROLE_MANAGER.ROLE_MANAGER_READ
                ]
            },
            {
                id   : 'module',
                title: 'Module',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/setting/module',
                role: [
                    AuthoritiesConstant.MODULE_MANAGER.MODULE_MANAGER_READ
                ]
            },
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboards',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'datalakeManagement',
        title   : 'Datalake Management',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
    },
    {
        id      : 'utility',
        title   : 'Utility',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
    },
    {
        id      : 'setting',
        title   : 'Setting',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboards',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'datalakeManagement',
        title   : 'Datalake Management',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

    },
    {
        id      : 'utility',
        title   : 'Utility',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

    },
    {
        id      : 'setting',
        title   : 'Setting',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboards',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'datalakeManagement',
        title   : 'Datalake Management',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

    },
    {
        id      : 'utility',
        title   : 'Utility',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

    },
    {
        id      : 'setting',
        title   : 'Setting',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

    },
];
