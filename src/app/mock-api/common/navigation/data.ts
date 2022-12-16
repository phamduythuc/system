/* eslint-disable */
import {FuseNavigationItem} from '@fuse/components/navigation';
import {AuthoritiesConstant} from '../../../authorities.constant';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/dashboards',
    role: [AuthoritiesConstant.DASHBOARD]
  },
  {
    id: 'hrmManagement',
    title: 'hrm-management.label',
    type: 'group',
    role: [AuthoritiesConstant.DSPB_READ,],
    children: [
      {
        id: 'position',
        title: 'hrm-management.position.title',
        type: 'basic',
        icon: 'heroicons_outline:briefcase',
        link: '/hrm-management/position-management',
        role: [
          AuthoritiesConstant.DSTV,
        ]
      },
      {
        id: 'role',
        title: 'hrm-management.role.title',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/hrm-management/role-management',
        role: [
          AuthoritiesConstant.DSTV_READ,
          AuthoritiesConstant.DSTV_UPDATE,
          AuthoritiesConstant.DSTV_DELETE,
          AuthoritiesConstant.DSTV_READ,
        ]
      },
      {
        id: 'level',
        title: 'hrm-management.staffLevel.title',
        type: 'basic',
        icon: 'heroicons_outline:adjustments',
        link: '/hrm-management/staff-level-management',
        role: [
          AuthoritiesConstant.DSCD_READ,
          AuthoritiesConstant.DSCD_UPDATE,
          AuthoritiesConstant.DSCD_DELETE,
          AuthoritiesConstant.DSCD_READ,
        ]
      },
      {
        id: 'department',
        title: 'hrm-management.department.title',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/hrm-management/department-management',
        role: [
          AuthoritiesConstant.DSPB_READ,
          AuthoritiesConstant.DSPB_UPDATE,
          AuthoritiesConstant.DSPB_DELETE,
          AuthoritiesConstant.DSPB_READ,
        ]
      },
      {
        id: 'partner',
        title: 'hrm-management.partner.title',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/hrm-management/partner-management',
        role: [
          AuthoritiesConstant.DSDT_READ,
          AuthoritiesConstant.DSDT_UPDATE,
          AuthoritiesConstant.DSDT_READ,
        ]
      },
      {
        id: 'project',
        title: 'hrm-management.project.title',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-list',
        link: '/hrm-management/project-management',
        role: [
          AuthoritiesConstant.DSDA_READ,
          AuthoritiesConstant.DSDA_UPDATE,
          AuthoritiesConstant.DSDA_READ,
        ]
      }, {
        id: 'staff',
        title: 'hrm-management.staff.title',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: '/hrm-management/staff-management',
        role: [
          AuthoritiesConstant.DSNV_READ,
          AuthoritiesConstant.DSNV_UPDATE,
          AuthoritiesConstant.DSNV_READ,
        ]
      }, 
      {
        id: 'team',
        title: 'hrm-management.team.title',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/hrm-management/team-management',
        role: [
          AuthoritiesConstant.DSTV_READ,
          AuthoritiesConstant.DSTV_UPDATE,
          AuthoritiesConstant.DSTV_DELETE,
          AuthoritiesConstant.DSTV_READ,
        ]
      },
    ]
  },
  {
    id: 'datalakeManagement',
    title: 'Datalake Management',
    type: 'group',
    icon: 'heroicons_outline:home',
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
        id: 'clusterManager',
        title: 'Cluster Manager',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-check',
        // role: [
        //     AuthoritiesConstant.SERVER_INFO.SERVER_INFO_READ,
        //     AuthoritiesConstant.IP_TABLE_RULE.IP_TABLE_RULE_READ,
        //     AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ,
        //     AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
        // ],
        children: [
          {
            id: 'serverIpTableManager',
            title: 'Server Ip Table Manager',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/cluster-manager/server-ip-table-manager',
            // role: [
            //     AuthoritiesConstant.SERVER_INFO.SERVER_INFO_READ,
            // ],
          },
          {
            id: 'ipTableRule',
            title: 'Ip Table Rule',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/cluster-manager/ip-table-rule',
            // role: [
            //     AuthoritiesConstant.IP_TABLE_RULE.IP_TABLE_RULE_READ,
            // ],
          },
          {
            id: 'duFileServerRule',
            title: 'Du File Server Rule',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/cluster-manager/du-file-server-rule',
            // role: [
            //     AuthoritiesConstant.DU_FILE_SERVER.DU_FILE_SERVER_READ,
            // ],
          },
          {
            id: 'duFileHDFSRule',
            title: 'Du File HDFS Rule',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/cluster-manager/du-file-hdfs-rule',
            role: [
              // AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
            ],
          },
        ]
      },
      {
        id: 'lbManager',
        title: 'LB Manager',
        type: 'collapsable',
        icon: 'heroicons_outline:chart-pie',
        // role: [
        //     AuthoritiesConstant.LB_CONNECTION.LB_CONNECTION_READ,
        //     AuthoritiesConstant.RP_APP.RP_APP_READ
        // ],
        children: [
          {
            id: 'lbConnection',
            title: 'LB Connection',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/lb-manager/lb-connection',
            // role: [
            //     AuthoritiesConstant.LB_CONNECTION.LB_CONNECTION_READ
            // ],
          },
          {
            id: 'rpApp',
            title: 'RP App',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/lb-manager/rp-app',
            // role: [
            //     AuthoritiesConstant.RP_APP.RP_APP_READ
            // ],
          }
        ]
      },
      {
        id: 'thriftManager',
        title: 'Thrift Manager',
        type: 'collapsable',
        icon: 'heroicons_outline:cash',
        // role: [
        //     AuthoritiesConstant.THRIFT_ACCESS_RULE.THRIFT_ACCESS_RULE_READ,
        //     AuthoritiesConstant.THRIFT_INFO.THRIFT_INFO_READ,
        // ],
        children: [
          {
            id: 'ThriftAccessRule',
            title: 'Thrift Access Rule',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/thrift-manager/thrift-access-rule',
            // role: [
            //     AuthoritiesConstant.THRIFT_ACCESS_RULE.THRIFT_ACCESS_RULE_READ
            // ],
          },
          {
            id: 'thriftRule',
            title: 'Thrift Rule',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/thrift-manager/thrift-rule',
            // role: [
            //     AuthoritiesConstant.THRIFT_INFO.THRIFT_INFO_READ,
            // ],
          }
        ]
      },
      {
        id: 'alertManager',
        title: 'Alert Manager',
        type: 'basic',
        icon: 'heroicons_outline:currency-dollar',
        // link : '/alert-manager',
        // role: [
        //     AuthoritiesConstant.ALERT_CONFIG.ALERT_CONFIG_READ
        // ]
      }
    ]
  },
  {
    id: 'utility',
    title: 'Utility',
    type: 'group',
    icon: 'heroicons_outline:home',
    // role: [
    // ],
    children: [
      {
        id: 'supportRequest',
        title: 'Support Request',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/support-request',
        role: []
      },
      {
        id: 'processManager',
        title: 'Process Manager',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/process-manager',
        role: []
      },
      {
        id: 'ingestion&Provisioning',
        title: 'Ingestion & Provisioning',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-check',
        // role: [
        // ],
        children: [
          {
            id: 'monitor',
            title: 'Monitor',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/ingestion-and-provisioning/monitor',
            // role: [
            //     AuthoritiesConstant.INGESTION_MONITOR.INGESTION_MONITOR_READ
            // ]
          },
          {
            id: 'flowManager',
            title: 'Flow Manager',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/ingestion-and-provisioning/flow-manager',
            // role: [
            //     AuthoritiesConstant.INGESTION_FLOW_MANAGER.INGESTION_FLOW_MANAGER_READ
            // ]
          },
          {
            id: 'connectionManager',
            title: 'Connection Manager',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/ingestion-and-provisioning/connection-manager',
            // role: [
            //     AuthoritiesConstant.CONNECTION_MANAGER.CONNECTION_MANAGER_READ
            // ]
          },
          {
            id: 'flowCustomized',
            title: 'Flow Customized',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/ingestion-and-provisioning/flow-customized',
            // role: [
            //     AuthoritiesConstant.FLOW_CUSTOMIZED.FLOW_CUSTOMIZED_READ
            // ]
          },
        ]
      },
      {
        id: 'hdfsTool',
        title: 'HDFS Tool',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-check',
        role: [
          // AuthoritiesConstant.HDFS_BROWSER.HDFS_BROWSER_READ,
          // AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
        ],
        children: [
          {
            id: 'hdfsBrowser',
            title: 'HDFS Browser',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/hdfs-tool/hdfs-browser',
            role: [
              // AuthoritiesConstant.HDFS_BROWSER.HDFS_BROWSER_READ
            ]
          },
          {
            id: 'exportfile',
            title: 'Export File',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/hdfs-tool/export-file',
            role: [
              // AuthoritiesConstant.DU_FILE_HDFS.DU_FILE_HDFS_READ
            ]
          },
        ]
      },
      {
        id: 'etlTool',
        title: 'ETL Tool',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-check',
        role: [
          // AuthoritiesConstant.TABLE_LOOKUP.TABLE_LOOKUP_READ,
          // AuthoritiesConstant.ETL_JOB_LIB.ETL_JOB_LIB_READ
        ],
        children: [
          {
            id: 'lookupTable',
            title: 'Tra Cứu Table',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/etl-tool/lookup-table',
            role: [
              // AuthoritiesConstant.TABLE_LOOKUP.TABLE_LOOKUP_READ
            ]
          },
          {
            id: 'job-management',
            title: 'ETL Job Lib',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/etl-tool/job-management',
            role: [
              // AuthoritiesConstant.ETL_JOB_LIB.ETL_JOB_LIB_READ
            ]
          },
        ]
      },
      {
        id: 'encryptTool',
        title: 'Encrypt Tool',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/encrypt-tool',
        role: []
      },
      {
        id: 'uploadFile',
        title: 'Download/Upload File',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/upload-file',
        role: []
      },
      {
        id: 'dbMakeFileConfig',
        title: 'DB Make File Config',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/config-make-file-db',
        role: []
      },

    ]
  },
  {
    id: 'setting',
    title: 'Setting',
    type: 'group',
    icon: 'heroicons_outline:home',
    role: [AuthoritiesConstant.DSTV_READ,
      AuthoritiesConstant.DSTV_UPDATE,
      AuthoritiesConstant.DSTV_DELETE,
      AuthoritiesConstant.DSTV_READ,],
    children: [
      {
        id: 'user',
        title: 'User',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/setting/user',
        role: []
      },
      {
        id: 'authorization',
        title: 'Authorization',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/setting/authorization',
        role: [AuthoritiesConstant.DSTV_READ,
          AuthoritiesConstant.DSTV_UPDATE,
          AuthoritiesConstant.DSTV_DELETE,
          AuthoritiesConstant.DSTV_READ,]
      },
      {
        id: 'module',
        title: 'Module',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/setting/module',
        role: []
      },
    ]
  },
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    tooltip: 'Dashboards',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/dashboards',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'datalakeManagement',
    title: 'Datalake Management',
    type: 'aside',
    icon: 'heroicons_outline:home',
  },
  {
    id: 'utility',
    title: 'Utility',
    type: 'aside',
    icon: 'heroicons_outline:home',
  },
  {
    id: 'setting',
    title: 'Setting',
    type: 'aside',
    icon: 'heroicons_outline:home',
  },
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    tooltip: 'Dashboards',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/dashboards',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'datalakeManagement',
    title: 'Datalake Management',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id: 'utility',
    title: 'Utility',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id: 'setting',
    title: 'Setting',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    tooltip: 'Dashboards',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/dashboards',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'datalakeManagement',
    title: 'Datalake Management',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id: 'utility',
    title: 'Utility',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id: 'setting',
    title: 'Setting',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
];
