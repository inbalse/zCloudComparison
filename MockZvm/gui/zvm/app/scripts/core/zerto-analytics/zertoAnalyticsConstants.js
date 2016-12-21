/**
 * Created by nir.moreno on 21/08/2016.
 */
angular.module('zvmApp.core')
    .constant('gaTweaks', {
        siteIdentifier: 't_googleAnalyticsSiteIdentifier',
        isZsspEnabled: 't_googleAnalyticsEnabledInZSSP'
    })
    .constant('gaEventTypes', {
        CLICK: 'Click',
        INFO: 'Info'
    })
    .constant('analyticsEventsTypes', {
        ANALYTICS: {
            SERVICE: {
                START: 'ANALYTICS::SERVICE_START',
                STOP: 'ANALYTICS::SERVICE_STOP'
            }
        },
        SUBSCRIBE: {
            START: 'ANALYTICS::SUBSCRIBE_START',
            STOP: 'ANALYTICS::SUBSCRIBE_STOP'
        },
        GENERAL: {
            LOGIN: 'ANALYTICS::GENERAL_LOGIN',
            LOGOUT: 'ANALYTICS::GENERAL_LOGOUT'
        },
        SITES: {
            PAIR: 'ANALYTICS::SITES_PAIR',
            UNPAIR: 'ANALYTICS::SITES_UNPAIR'
        },
        SETUP: {
            NEW_VRA: {
                START: 'ANALYTICS::SETUP_NEWVRA_START',
                END: 'ANALYTICS::SETUP_NEWVRA_END'
            },
            EDIT_VRA: {
                START: 'ANALYTICS::SETUP_EDITVRA_START',
                END: 'ANALYTICS::SETUP_EDITVRA_END'
            },
            DELETE_VRA: 'ANALYTICS::SETUP_DELETEVRA',
            NEW_REPOSITORY: 'ANALYTICS::SETUP_NEWREPOSITORY',
            EDIT_REPOSITORY: 'ANALYTICS::SETUP_EDITREPOSITORY',
            DELETE_REPOSITORY: 'ANALYTICS::SETUP_DELETEREPOSITORY'
        },
        OFFSITE_BACKUP: {
            RUN: {
                START: 'ANALYTICS::OFFSITE-BACKUP_RUN_START',
                END: 'ANALYTICS::OFFSITE-BACKUP_RUN_END'
            },
            ABORT: {
                START: 'ANALYTICS::OFFSITE-BACKUP_ABORT_START',
                END: 'ANALYTICS::OFFSITE-BACKUP_ABORT_END'
            }
        },
        REPORTS: 'ANALYTICS::REPORTS',
        VPGS: {
            NEW_VPG: {
                INITIAL: 'ANALYTICS::VPGS_NEWVPG_INITIAL',
                SEND: 'ANALYTICS::VPGS_NEWVPG_SEND'
            },
            EDIT_VPG: {
                INITIAL: 'ANALYTICS::VPGS_EDITVPG_INITIAL',
                SEND: 'ANALYTICS::VPGS_EDITVPG_SEND'
            },
            DELETE_VPG: 'ANALYTICS::VPGS_DELETEVPG',
            PAUSE_VPG: 'ANALYTICS::VPGS_PAUSEVPG',
            RESUME_VPG: 'ANALYTICS::VPGS_RESUMEVPG',
            FORCE_SYNC: 'ANALYTICS::VPGS_FORCESYNC',
            RUN_BACKUP: 'ANALYTICS::VPGS_RUNBACKUP',
            ABORT_BACKUP: 'ANALYTICS::VPGS_ABORTBACKUP',
            STOP_TEST: 'ANALYTICS::VPGS_STOPTEST',
            GRID_VIEW: {
                SORT: 'ANALYTICS::VPGS_GRIDVIEW_SORT',
                FILTER: 'ANALYTICS::VPGS_GRIDVIEW_FILTER',
                GROUP: 'ANALYTICS::VPGS_GRIDVIEW_GROUP',
                SEARCH: 'ANALYTICS::VPGS_GRIDVIEW_SEARCH'
            },
            VM_DETAILS: 'ANALYTICS::VPGS_VMDETAILS'
        },
        ACTIONS: {
            CREATE_VPG: 'ANALYTICS::ACTIONS_CREATEVPG',
            ADD_CHECKPOINT: 'ANALYTICS::ACTIONS_ADDCHECKPOINT',
            RESTORE_FILE: {
                MOUNT: {
                    INITIAL: 'ANALYTICS::ACTIONS_RESTOREFILE_MOUNT_INITIAL',
                    SEND: 'ANALYTICS::ACTIONS_RESTOREFILE_MOUNT_SEND'
                },
                DOWNLOAD: {
                    INITIAL: 'ANALYTICS::ACTIONS_RESTOREFILE_DOWNLOAD_INITIAL',
                    SEND: 'ANALYTICS::ACTIONS_RESTOREFILE_DOWNLOAD_SEND'
                },
                UN_MOUNT: 'ANALYTICS::ACTIONS_RESTOREFILE_UNMOUNT'
            },
            RESTORE_BACKUP: {
                INITIAL: 'ANALYTICS::ACTIONS_RESTOREBACKUP_INITIAL',
                SEND: 'ANALYTICS::ACTIONS_RESTOREBACKUP_SEND'
            },
            MOVE_VPG: {
                INITIAL: 'ANALYTICS::ACTIONS_MOVEVPG_INITIAL',
                SEND: 'ANALYTICS::ACTIONS_MOVEVPG_SEND'
            }
        },
        FAILOVER: {
            LIVE: {
                INITIAL: 'ANALYTICS::FAILOVER_LIVE_INITIAL',
                SEND: 'ANALYTICS::FAILOVER_LIVE_SEND'
            },
            TEST: {
                INITIAL: 'ANALYTICS::FAILOVER_TEST_INITIAL',
                SEND: 'ANALYTICS::FAILOVER_TEST_SEND'
            }
        },
        SETTINGS: {
            HELP: 'ANALYTICS::SETTINGS_HELP',
            SITE_SETTINGS: 'ANALYTICS::SETTINGS_SITESETTINGS',
            LICENSE: 'ANALYTICS::SETTINGS_LICENSE',
            SUBMIT_SUPPORT_TICKET: 'ANALYTICS::SETTINGS_SUBMITSUPPORTTICKET',
            REMOTE_SUPPORT: 'ANALYTICS::SETTINGS_REMOTESUPPORT',
            ABOUT: 'ANALYTICS::SETTINGS_ABOUT'
        },
        WIZARD: {
            TIME_SPENT: 'ANALYTICS::WIZARDS_TIME_SPENT'
        },
        PERFORMANCE: {
            VQ: 'ANALYTICS::PERFORMANCE_VQ',
            REST: 'ANALYTICS::PERFORMANCE_REST'
        },
        ONLINE_HELP: 'ANALYTICS::ONLINE_HELP',
        PAGE_VIEW: 'ANALYTICS::PAGE_VIEW'
    })
    .constant('zertoEventsCategories', {
        GENERAL: 'General',
        SITES: 'Sites',
        SETUP: 'Setup',
        OFFSITE_BACKUP: 'Offsite Backup',
        REPORTS: 'Reports',
        VPGs: 'VPGs',
        ACTIONS: 'Actions',
        FAILOVER: 'Failover',
        SETTINGS: 'Settings',
        WIZARD: 'Wizard',
        VQ_CALL: 'VQ Call',
        REST_CALL: 'REST Call',
        ONLINE_HELP: 'Online Help'
    })
    .constant('zertoEventsLabels', {
        LOGIN: 'Login',
        LOGOUT: 'Logout',
        PAIR: 'Pair',
        UN_PAIR: 'Unpair',
        NEW_VRA: 'New VRA',
        EDIT_VRA: 'Edit VRA',
        DELETE_VRA: 'Delete VRA',
        NEW_REPOSITORY: 'New Repository',
        EDIT_REPOSITORY: 'Edit Repository',
        DELETE_REPOSITORY: 'Delete Repository',
        RUN_BACKUP: 'Run Backup',
        ABORT_BACKUP: 'Abort Backup',
        NEW_VPG: 'New VPG',
        EDIT_VPG: 'Edit VPG',
        DELETE_VPG: 'Delete VPG',
        PAUSE_VPG: 'Pause VPG',
        RESUME_VPG: 'Resume VPG',
        FORCE_SYNC_VPG: 'Force Sync VPG',
        STOP_TEST: 'Stop Test',
        SORT_GRID: 'Sort Grid',
        VM_DETAILS: 'VM Details',
        FILTER_GRID: 'Filter Grid',
        GROUP_BY_GRID: 'Group By Grid',
        SEARCH_GRID: 'Search Grid',
        ADD_CHECKPOINT: 'Add Checkpoint',
        RESTORE_FILE_MOUNT: 'Restore File (MOUNT)',
        RESTORE_FILE_UN_MOUNT: 'Restore File (UN-MOUNT)',
        RESTORE_FILE_DOWNLOAD: 'Restore File (Download)',
        RESTORE_BACKUP: 'Restore Backup',
        MOVE_VPG: 'Move VPG',
        FAILOVER_LIVE: 'Live',
        FAILOVER_TEST: 'Test',
        HELP: 'Help',
        SITE_SETTINGS: 'Site Settings',
        LICENSE: 'License',
        SUBMIT_SUPPORT_TICKER: 'Submit Support Ticket',
        REMOTE_SUPPORT: 'Remote Support',
        ABOUT: 'About',
        ONLINE_HELP: 'Online Help'
    })
    .constant('zertoEventsLabelsInfo', {
        SEND: ' - Send',
        INITIAL: ' - Initial'
    })
    .constant('zertoEventsCustomDefinitions', {
        DIMENSIONS: {
            SITE_ID: 'dimension1',
            BACKUP_RETENTIONS_PERIOD: 'dimension2',
            ZERTO_CUSTOMER_ID: 'dimension3',
            SITE_NAME: 'dimension4',
            LICENSE_TYPE: 'dimension5',
            NETWORK_CONFIGURATION_TYPE: 'dimension6',
            ERROR_STRING: 'dimension7',
            RUN_BACKUP_JOB_EVERY: 'dimension8',
            FILTER_BY_FIELD: 'dimension9',
            SORT_BY_FIELD: 'dimension10',
            EMPTY_DIMENSION_11: 'dimension11',
            CLIENT_TYPE: 'dimension12',
            SOURCE_PLATFORM: 'dimension13',
            VPG_GUID: 'dimension14',
            COMMIT_POLICY: 'dimension15',
            TIME_STAMP: 'dimension16',
            VRA_GUID: 'dimension17',
            EMPTY_DIMENSION_18: 'dimension18',
            NUMBER_OF_VPGS_THAT_PROTECT_THIS_VM: 'dimension19',
            FLR_PATHS_EXTENSIONS: 'dimension20'
        },
        METRICS: {
            NUMBER_OF_ACTIVE_ALERTS: 'metric1',
            OPERATION_STATE_SUCCESS: 'metric2',
            NUMBER_OF_PAIRED_SITES: 'metric3',
            IS_KEEP_SOURCE_VM: 'metric4',
            VM_USED_STORAGE: 'metric5',
            NUMBER_OF_VPGS: 'metric6',
            TOTAL_SIZE_IN_MB: 'metric7',
            NUMBERS_OF_VMS_IN_VPG: 'metric8',
            IS_WAN_TRAFFIC_ENABLED: 'metric9',
            STORAGE_PROVISIONED: 'metric10',
            IS_PRE_SCRIPT_CONFIGURED: 'metric11',
            IS_POST_SCRIPT_CONFIGURED: 'metric12',
            IS_USE_CREDENTIALS: 'metric13',
            IS_BACKUP_ENABLED: 'metric14',
            IS_POST_BACKUP_SCRIPT_CONFIGURED: 'metric15',
            JOURNAL_HISTORY_IN_MINUTES: 'metric16',
            TARGET_RPO_IN_SECONDS: 'metric17',
            IS_FORCE_SHUTDOWN: 'metric18',
            IS_REVERSE_PROTECTION: 'metric19',
            OPERATION_TIME_IN_SECONDS: 'metric20'
        }
    });
