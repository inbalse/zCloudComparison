/**
 * Created by nir.moreno on 11/07/2016.
 */
'use strict';
/*jshint bitwise: false*/

angular.module('zvmApp.core')
    .factory('zertoAnalyticsEventsHandlersFactory', function ($analytics, gaEventTypes, zertoEventsCategories, zertoEventsLabels,
                                                              zertoEventsLabelsInfo, zertoEventsCustomDefinitions, zertoServiceUpdaterFactory) {
        var eventsHandler = {};

        //region private
        function eventTrack(eventType, eventData, trackingData) {
            addTimeStamp(trackingData);
            $analytics.eventTrack(eventType, _.extend(eventData, trackingData));
        }

        function pageView(url) {
            $analytics.pageTrack(url);
        }

        function addTimeStamp(trackingData) {
            trackingData[zertoEventsCustomDefinitions.DIMENSIONS.TIME_STAMP] = (new Date()).toJSON();
        }

        //endregion

        //region General
        function onLoginEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.GENERAL,
                label: zertoEventsLabels.LOGIN
            }, trackingData);
        }

        function onLogoutEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.GENERAL,
                label: zertoEventsLabels.LOGOUT
            }, trackingData);
        }

        eventsHandler.general = {
            login: onLoginEvent,
            logout: onLogoutEvent
        };
        //endregion

        //region Sites
        function onPairEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SITES,
                label: zertoEventsLabels.PAIR
            }, trackingData);
        }

        function onUnpairEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SITES,
                label: zertoEventsLabels.UN_PAIR
            }, trackingData);
        }

        eventsHandler.sites = {
            pair: onPairEvent,
            un_pair: onUnpairEvent
        };
        //endregion

        //region Setup
        function onNewVRAEventStart(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.NEW_VRA + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onNewVRAEventEnd(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.NEW_VRA + zertoEventsLabelsInfo.SEND
            }, extendDataForVraEvents(trackingData, additionalEventData));
        }

        function onEditVRAEventStart(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.EDIT_VRA + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onEditVRAEventEnd(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.EDIT_VRA + zertoEventsLabelsInfo.SEND
            }, extendDataForVraEvents(trackingData, additionalEventData));
        }

        function onDeleteVRAEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.DELETE_VRA
            }, trackingData);
        }

        function onNewRepositoryEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.NEW_REPOSITORY
            }, trackingData);
        }

        function onEditRepositoryEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.EDIT_REPOSITORY
            }, trackingData);
        }

        function onDeleteRepositoryEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETUP,
                label: zertoEventsLabels.DELETE_REPOSITORY
            }, trackingData);
        }

        eventsHandler.setup = {
            new_VRA: {
                start: onNewVRAEventStart,
                end: onNewVRAEventEnd
            },
            edit_VRA: {
                start: onEditVRAEventStart,
                end: onEditVRAEventEnd
            },
            delete_VRA: onDeleteVRAEvent,
            new_Repository: onNewRepositoryEvent,
            edit_Repository: onEditRepositoryEvent,
            delete_Repository: onDeleteRepositoryEvent
        };
        //endregion

        //region Offsite-Backup
        function onRunOffsiteBackupEventStart(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.OFFSITE_BACKUP,
                label: zertoEventsLabels.RUN_BACKUP + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onRunOffsiteBackupEventEnd(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.OFFSITE_BACKUP,
                label: zertoEventsLabels.RUN_BACKUP + zertoEventsLabelsInfo.SEND
            }, extendDataForBackupEvents(trackingData, additionalEventData));
        }

        function onAbortOffsiteBackupEventStart(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.OFFSITE_BACKUP,
                label: zertoEventsLabels.ABORT_BACKUP + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onAbortOffsiteBackupEventEnd(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.OFFSITE_BACKUP,
                label: zertoEventsLabels.ABORT_BACKUP + zertoEventsLabelsInfo.SEND
            }, extendDataForBackupEvents(trackingData, additionalEventData));
        }

        eventsHandler.offsite_backup = {
            run: {
                start: onRunOffsiteBackupEventStart,
                end: onRunOffsiteBackupEventEnd
            },
            abort: {
                start: onAbortOffsiteBackupEventStart,
                end: onAbortOffsiteBackupEventEnd
            }
        };
        //endregion

        //region Reports
        function onReportsEvent(trackingData, reportName) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.REPORTS,
                label: reportName
            }, trackingData);
        }

        eventsHandler.reports = {
            report: onReportsEvent
        };
        //endregion

        //region VPGs
        function onNewVPGInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.NEW_VPG + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onNewVPGSendEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.NEW_VPG + zertoEventsLabelsInfo.SEND
            }, extendDataForVpgEvents(trackingData, additionalData));
        }

        function onEditVPGInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.EDIT_VPG + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onEditVPGSendEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.EDIT_VPG + zertoEventsLabelsInfo.SEND
            }, extendDataForVpgEvents(trackingData, additionalData));
        }

        function onDeleteVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.DELETE_VPG
            }, trackingData);
        }

        function onPauseVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.PAUSE_VPG
            }, trackingData);
        }

        function onResumeVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.RESUME_VPG
            }, trackingData);
        }

        function onForceSyncVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.FORCE_SYNC_VPG
            }, trackingData);
        }

        function onRunBackupVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.RUN_BACKUP
            }, trackingData);
        }

        function onAbortBackupVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.ABORT_BACKUP
            }, trackingData);
        }

        function onStopTestVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.STOP_TEST
            }, trackingData);
        }

        function onGridSortByEvent(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.SORT_GRID
            }, extendDataForVpgSortByEvents(trackingData, additionalEventData));
        }

        function onGridFilterByEvent(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.FILTER_GRID
            }, extendDataForVpgFilterByEvents(trackingData, additionalEventData));
        }

        function onGridGroupByEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.GROUP_BY_GRID
            }, trackingData);
        }

        function onGridSearchEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.SEARCH_GRID
            }, trackingData);
        }

        function onSendVmsDetailsEvent(trackingData, additionalEventData) {
            eventTrack(gaEventTypes.INFO, {
                category: zertoEventsCategories.VPGs,
                label: zertoEventsLabels.VM_DETAILS
            }, extendDataForVmDetailsEvents(trackingData, additionalEventData));
        }

        eventsHandler.vpgs = {
            new: {
                initial: onNewVPGInitialEvent,
                send: onNewVPGSendEvent
            },
            edit: {
                initial: onEditVPGInitialEvent,
                send: onEditVPGSendEvent
            },
            delete: onDeleteVPGEvent,
            pause: onPauseVPGEvent,
            resume: onResumeVPGEvent,
            force_sync: onForceSyncVPGEvent,
            run_backup: onRunBackupVPGEvent,
            abort_backup: onAbortBackupVPGEvent,
            stop_test: onStopTestVPGEvent,
            grid_view: {
                sort_by: onGridSortByEvent,
                filter_by: onGridFilterByEvent,
                group_by: onGridGroupByEvent,
                search: onGridSearchEvent
            },
            vm_details: onSendVmsDetailsEvent
        };
        //endregion

        //region Actions
        function onCreateVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.NEW_VPG + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onAddCheckpointVPGEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.ADD_CHECKPOINT
            }, trackingData);
        }

        function onRestoreFileVPGMountInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_FILE_MOUNT + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onRestoreFileVPGMountSendEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_FILE_MOUNT + zertoEventsLabelsInfo.SEND
            }, trackingData);
        }

        function onRestoreFileVPGDownloadInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_FILE_DOWNLOAD + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onRestoreFileVPGDownloadSendEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_FILE_DOWNLOAD + zertoEventsLabelsInfo.SEND
            }, extendDataForFlrDownloadEvent(trackingData, additionalData));
        }

        function onRestoreFileVPGUnmountEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_FILE_UN_MOUNT
            }, trackingData);
        }

        function onRestoreBackupVPGInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_BACKUP + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onRestoreBackupVPGSendEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.RESTORE_BACKUP + zertoEventsLabelsInfo.SEND
            }, trackingData);
        }

        function onMoveVPGInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.MOVE_VPG + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onMoveVPGSendEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ACTIONS,
                label: zertoEventsLabels.MOVE_VPG + zertoEventsLabelsInfo.SEND
            }, extendDataForMoveVpgEvent(trackingData, additionalData));
        }

        eventsHandler.actions = {
            create_vpg: onCreateVPGEvent,
            add_checkpoint: onAddCheckpointVPGEvent,
            restore_file: {
                mount: {
                    initial: onRestoreFileVPGMountInitialEvent,
                    send: onRestoreFileVPGMountSendEvent
                },
                download: {
                    initial: onRestoreFileVPGDownloadInitialEvent,
                    send: onRestoreFileVPGDownloadSendEvent
                },
                unmount: onRestoreFileVPGUnmountEvent
            },
            restore_backup: {
                initial: onRestoreBackupVPGInitialEvent,
                send: onRestoreBackupVPGSendEvent
            },
            move_vpg: {
                initial: onMoveVPGInitialEvent,
                send: onMoveVPGSendEvent
            }
        };
        //endregion

        //region Fail-over
        function onFailoverLiveInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.FAILOVER,
                label: zertoEventsLabels.FAILOVER_LIVE + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onFailoverLiveSendEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.FAILOVER,
                label: zertoEventsLabels.FAILOVER_LIVE + zertoEventsLabelsInfo.SEND
            }, extendDataForFailoverVpgEvent(trackingData, additionalData));
        }

        function onFailoverTestInitialEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.FAILOVER,
                label: zertoEventsLabels.FAILOVER_TEST + zertoEventsLabelsInfo.INITIAL
            }, trackingData);
        }

        function onFailoverTestSendEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.FAILOVER,
                label: zertoEventsLabels.FAILOVER_TEST + zertoEventsLabelsInfo.SEND
            }, extendDataForFailoverVpgEvent(trackingData, additionalData));
        }

        eventsHandler.failover = {
            live: {
                initial: onFailoverLiveInitialEvent,
                send: onFailoverLiveSendEvent
            },
            test: {
                initial: onFailoverTestInitialEvent,
                send: onFailoverTestSendEvent
            }
        };
        //endregion

        //region Settings
        function onHelpEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETTINGS,
                label: zertoEventsLabels.HELP
            }, trackingData);
        }

        function onSiteSettingsEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETTINGS,
                label: zertoEventsLabels.SITE_SETTINGS
            }, trackingData);
        }

        function onLicenseEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETTINGS,
                label: zertoEventsLabels.LICENSE
            }, trackingData);
        }

        function onSubmitSupportTicketEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETTINGS,
                label: zertoEventsLabels.SUBMIT_SUPPORT_TICKER
            }, trackingData);
        }

        function onRemoteSupportEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETTINGS,
                label: zertoEventsLabels.REMOTE_SUPPORT
            }, trackingData);
        }

        function onAboutEvent(trackingData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.SETTINGS,
                label: zertoEventsLabels.ABOUT
            }, trackingData);
        }

        eventsHandler.settings = {
            help: onHelpEvent,
            site_settings: onSiteSettingsEvent,
            license: onLicenseEvent,
            submit_support_ticket: onSubmitSupportTicketEvent,
            remote_support: onRemoteSupportEvent,
            about: onAboutEvent
        };
        //endregion

        //region Wizards
        function onWizardsTimeSpentEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.INFO, {
                category: zertoEventsCategories.WIZARD,
                label: additionalData.wizardName
            }, extendDataForWizardEvent(trackingData, additionalData));
        }

        eventsHandler.wizard = {
            time_spent: onWizardsTimeSpentEvent
        };
        //endregion

        //region Performance
        function onPerformanceVqEvent(trackingData, additionalData) {
            // operations that ***should not be tracked*** - operations which uses the auto-updater.
            var operationInQueue;

            try {
                operationInQueue = _.find(zertoServiceUpdaterFactory._operationsQueue, function (iteratedQueueItem) {
                    return iteratedQueueItem.fname === additionalData.operation;
                });
            }
            catch (error) {
                operationInQueue = undefined;
            }

            //track only operations that not uses the auto-updater.
            if (_.isNullOrUndefined(operationInQueue)) {
                return onPerformanceEvent(trackingData, additionalData, zertoEventsCategories.VQ_CALL);
            }
        }

        function onPerformanceRestEvent(trackingData, additionalData) {
            return onPerformanceEvent(trackingData, additionalData, zertoEventsCategories.REST_CALL);
        }

        function onPerformanceEvent(trackingData, additionalData, eventCategory) {
            eventTrack(gaEventTypes.INFO, {
                category: eventCategory,
                label: additionalData.operation
            }, extendDataForPerformanceEvent(trackingData, additionalData));
        }

        eventsHandler.performance = {
            vq: onPerformanceVqEvent,
            rest: onPerformanceRestEvent
        };
        //endregion

        //region Online-Help
        function onOnlineHelpEvent(trackingData, additionalData) {
            eventTrack(gaEventTypes.CLICK, {
                category: zertoEventsCategories.ONLINE_HELP,
                label: additionalData.link
            }, trackingData);
        }

        eventsHandler.online_help = onOnlineHelpEvent;
        //endregion

        //region EXTEND FUNCTIONS
        function extendDataForVraEvents(trackingData, additionalData) {
            var gaObject = {};

            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.NETWORK_CONFIGURATION_TYPE] = additionalData.configuration;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_USE_CREDENTIALS] = additionalData.useCredentials;
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.VRA_GUID] = additionalData.vraGuid;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForBackupEvents(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.METRICS.TOTAL_SIZE_IN_MB] = additionalData.totalSize;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForVpgSortByEvents(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.SORT_BY_FIELD] = additionalData.sortByField;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForVpgFilterByEvents(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.FILTER_BY_FIELD] = additionalData.filterByField;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForVpgEvents(trackingData, additionalData) {
            var gaObject = {};
            //change booleans to 0 and 1 with '|' operator
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.VPG_GUID] = additionalData.vpgGuid;
                gaObject[zertoEventsCustomDefinitions.METRICS.NUMBERS_OF_VMS_IN_VPG] = additionalData.numberOfVms;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_WAN_TRAFFIC_ENABLED] = additionalData.wanCompressionEnabled | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.STORAGE_PROVISIONED] = additionalData.storageProvision;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_PRE_SCRIPT_CONFIGURED] = additionalData.isPreConfigScript | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_POST_SCRIPT_CONFIGURED] = additionalData.isPostConfigScript | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.JOURNAL_HISTORY_IN_MINUTES] = additionalData.journalHistoryInMinutes;
                gaObject[zertoEventsCustomDefinitions.METRICS.TARGET_RPO_IN_SECONDS] = additionalData.targetRpoInSeconds;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_BACKUP_ENABLED] = additionalData.isBackupEnabled | 0;
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.BACKUP_RETENTIONS_PERIOD] = additionalData.retentionPeriod;
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.RUN_BACKUP_JOB_EVERY] = additionalData.runJobEvery;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_POST_BACKUP_SCRIPT_CONFIGURED] = additionalData.postBackupScript | 0;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForMoveVpgEvent(trackingData, additionalData) {
            var gaObject = {};
            //change booleans to 0 and 1 with '|' operator
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.COMMIT_POLICY] = additionalData.commitPolicy;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_FORCE_SHUTDOWN] = additionalData.forceShutdown | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_REVERSE_PROTECTION] = additionalData.reverseProtection | 0;

                if(!_.isNullOrUndefined(additionalData.isKeepSourceVM)){
                    gaObject[zertoEventsCustomDefinitions.METRICS.IS_KEEP_SOURCE_VM] = additionalData.isKeepSourceVM | 0;
                }
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);

        }

        function extendDataForFailoverVpgEvent(trackingData, additionalData) {
            var gaObject = {};
            //change booleans to 0 and 1 with '|' operator
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.COMMIT_POLICY] = additionalData.commitPolicy;
                gaObject[zertoEventsCustomDefinitions.METRICS.NUMBERS_OF_VMS_IN_VPG] = additionalData.numberOfVms;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_FORCE_SHUTDOWN] = additionalData.forceShutdown | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.IS_REVERSE_PROTECTION] = additionalData.reverseProtection | 0;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForWizardEvent(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.METRICS.OPERATION_STATE_SUCCESS] = additionalData.isSuccess | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.OPERATION_TIME_IN_SECONDS] = additionalData.secondsInWizards;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForPerformanceEvent(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.METRICS.OPERATION_STATE_SUCCESS] = additionalData.isSuccess | 0;
                gaObject[zertoEventsCustomDefinitions.METRICS.OPERATION_TIME_IN_SECONDS] = additionalData.operationInSeconds;

                if(!_.isNullOrUndefined(additionalData.errorString)){
                    gaObject[zertoEventsCustomDefinitions.DIMENSIONS.ERROR_STRING] = additionalData.errorString;
                }
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForFlrDownloadEvent(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.FLR_PATHS_EXTENSIONS] = additionalData.paths;
                gaObject[zertoEventsCustomDefinitions.METRICS.TOTAL_SIZE_IN_MB] = additionalData.totalSize;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }

        function extendDataForVmDetailsEvents(trackingData, additionalData) {
            var gaObject = {};
            try {
                gaObject[zertoEventsCustomDefinitions.DIMENSIONS.NUMBER_OF_VPGS_THAT_PROTECT_THIS_VM] = additionalData.numberOfVpgsThatProtectThisVm;
                gaObject[zertoEventsCustomDefinitions.METRICS.VM_USED_STORAGE] = additionalData.vmUsedStorage;
            }
            catch (e) {
            }
            return _.extend(gaObject, trackingData);
        }
        //endregion

        //region PageViews
        function onPageView(eventData, url) {
            pageView(url);
        }
        eventsHandler.page_view = onPageView;
        //endregion

        return eventsHandler;
    })
    .factory('zertoAnalyticsEventsFactory', function (zertoAnalyticsEventsHandlersFactory, analyticsEventsTypes) {
        var analyticsEventsFactory = {};

        analyticsEventsFactory[analyticsEventsTypes.GENERAL.LOGIN] = zertoAnalyticsEventsHandlersFactory.general.login;
        analyticsEventsFactory[analyticsEventsTypes.GENERAL.LOGOUT] = zertoAnalyticsEventsHandlersFactory.general.logout;
        analyticsEventsFactory[analyticsEventsTypes.SITES.PAIR] = zertoAnalyticsEventsHandlersFactory.sites.pair;
        analyticsEventsFactory[analyticsEventsTypes.SITES.UNPAIR] = zertoAnalyticsEventsHandlersFactory.sites.un_pair;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.NEW_VRA.START] = zertoAnalyticsEventsHandlersFactory.setup.new_VRA.start;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.NEW_VRA.END] = zertoAnalyticsEventsHandlersFactory.setup.new_VRA.end;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.EDIT_VRA.START] = zertoAnalyticsEventsHandlersFactory.setup.edit_VRA.start;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.EDIT_VRA.END] = zertoAnalyticsEventsHandlersFactory.setup.edit_VRA.end;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.DELETE_VRA] = zertoAnalyticsEventsHandlersFactory.setup.delete_VRA;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.NEW_REPOSITORY] = zertoAnalyticsEventsHandlersFactory.setup.new_Repository;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.EDIT_REPOSITORY] = zertoAnalyticsEventsHandlersFactory.setup.edit_Repository;
        analyticsEventsFactory[analyticsEventsTypes.SETUP.DELETE_REPOSITORY] = zertoAnalyticsEventsHandlersFactory.setup.delete_Repository;
        analyticsEventsFactory[analyticsEventsTypes.OFFSITE_BACKUP.RUN.START] = zertoAnalyticsEventsHandlersFactory.offsite_backup.run.start;
        analyticsEventsFactory[analyticsEventsTypes.OFFSITE_BACKUP.RUN.END] = zertoAnalyticsEventsHandlersFactory.offsite_backup.run.end;
        analyticsEventsFactory[analyticsEventsTypes.OFFSITE_BACKUP.ABORT.START] = zertoAnalyticsEventsHandlersFactory.offsite_backup.abort.start;
        analyticsEventsFactory[analyticsEventsTypes.OFFSITE_BACKUP.ABORT.END] = zertoAnalyticsEventsHandlersFactory.offsite_backup.abort.end;
        analyticsEventsFactory[analyticsEventsTypes.REPORTS] = zertoAnalyticsEventsHandlersFactory.reports.report;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.GRID_VIEW.SORT] = zertoAnalyticsEventsHandlersFactory.vpgs.grid_view.sort_by;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.GRID_VIEW.FILTER] = zertoAnalyticsEventsHandlersFactory.vpgs.grid_view.filter_by;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.GRID_VIEW.GROUP] = zertoAnalyticsEventsHandlersFactory.vpgs.grid_view.group_by;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.GRID_VIEW.SEARCH] = zertoAnalyticsEventsHandlersFactory.vpgs.grid_view.search;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.NEW_VPG.INITIAL] = zertoAnalyticsEventsHandlersFactory.vpgs.new.initial;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.NEW_VPG.SEND] = zertoAnalyticsEventsHandlersFactory.vpgs.new.send;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.EDIT_VPG.INITIAL] = zertoAnalyticsEventsHandlersFactory.vpgs.edit.initial;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.EDIT_VPG.SEND] = zertoAnalyticsEventsHandlersFactory.vpgs.edit.send;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.DELETE_VPG] = zertoAnalyticsEventsHandlersFactory.vpgs.delete;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.PAUSE_VPG] = zertoAnalyticsEventsHandlersFactory.vpgs.pause;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.RESUME_VPG] = zertoAnalyticsEventsHandlersFactory.vpgs.resume;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.FORCE_SYNC] = zertoAnalyticsEventsHandlersFactory.vpgs.force_sync;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.RUN_BACKUP] = zertoAnalyticsEventsHandlersFactory.vpgs.run_backup;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.ABORT_BACKUP] = zertoAnalyticsEventsHandlersFactory.vpgs.abort_backup;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.STOP_TEST] = zertoAnalyticsEventsHandlersFactory.vpgs.stop_test;
        analyticsEventsFactory[analyticsEventsTypes.VPGS.VM_DETAILS] = zertoAnalyticsEventsHandlersFactory.vpgs.vm_details;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.CREATE_VPG] = zertoAnalyticsEventsHandlersFactory.actions.create_vpg;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.ADD_CHECKPOINT] = zertoAnalyticsEventsHandlersFactory.actions.add_checkpoint;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_BACKUP.INITIAL] = zertoAnalyticsEventsHandlersFactory.actions.restore_backup.initial;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_BACKUP.SEND] = zertoAnalyticsEventsHandlersFactory.actions.restore_backup.send;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_FILE.MOUNT.INITIAL] = zertoAnalyticsEventsHandlersFactory.actions.restore_file.mount.initial;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_FILE.MOUNT.SEND] = zertoAnalyticsEventsHandlersFactory.actions.restore_file.mount.send;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_FILE.DOWNLOAD.INITIAL] = zertoAnalyticsEventsHandlersFactory.actions.restore_file.download.initial;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_FILE.DOWNLOAD.SEND] = zertoAnalyticsEventsHandlersFactory.actions.restore_file.download.send;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.RESTORE_FILE.UN_MOUNT] = zertoAnalyticsEventsHandlersFactory.actions.restore_file.unmount;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.MOVE_VPG.INITIAL] = zertoAnalyticsEventsHandlersFactory.actions.move_vpg.initial;
        analyticsEventsFactory[analyticsEventsTypes.ACTIONS.MOVE_VPG.SEND] = zertoAnalyticsEventsHandlersFactory.actions.move_vpg.send;
        analyticsEventsFactory[analyticsEventsTypes.FAILOVER.LIVE.INITIAL] = zertoAnalyticsEventsHandlersFactory.failover.live.initial;
        analyticsEventsFactory[analyticsEventsTypes.FAILOVER.LIVE.SEND] = zertoAnalyticsEventsHandlersFactory.failover.live.send;
        analyticsEventsFactory[analyticsEventsTypes.FAILOVER.TEST.INITIAL] = zertoAnalyticsEventsHandlersFactory.failover.test.initial;
        analyticsEventsFactory[analyticsEventsTypes.FAILOVER.TEST.SEND] = zertoAnalyticsEventsHandlersFactory.failover.test.send;
        analyticsEventsFactory[analyticsEventsTypes.SETTINGS.HELP] = zertoAnalyticsEventsHandlersFactory.settings.help;
        analyticsEventsFactory[analyticsEventsTypes.SETTINGS.ABOUT] = zertoAnalyticsEventsHandlersFactory.settings.about;
        analyticsEventsFactory[analyticsEventsTypes.SETTINGS.LICENSE] = zertoAnalyticsEventsHandlersFactory.settings.license;
        analyticsEventsFactory[analyticsEventsTypes.SETTINGS.SITE_SETTINGS] = zertoAnalyticsEventsHandlersFactory.settings.site_settings;
        analyticsEventsFactory[analyticsEventsTypes.SETTINGS.REMOTE_SUPPORT] = zertoAnalyticsEventsHandlersFactory.settings.remote_support;
        analyticsEventsFactory[analyticsEventsTypes.SETTINGS.SUBMIT_SUPPORT_TICKET] = zertoAnalyticsEventsHandlersFactory.settings.submit_support_ticket;
        analyticsEventsFactory[analyticsEventsTypes.ONLINE_HELP] = zertoAnalyticsEventsHandlersFactory.online_help;
        analyticsEventsFactory[analyticsEventsTypes.WIZARD.TIME_SPENT] = zertoAnalyticsEventsHandlersFactory.wizard.time_spent;
        analyticsEventsFactory[analyticsEventsTypes.PERFORMANCE.VQ] = zertoAnalyticsEventsHandlersFactory.performance.vq;
        analyticsEventsFactory[analyticsEventsTypes.PERFORMANCE.REST] = zertoAnalyticsEventsHandlersFactory.performance.rest;
        analyticsEventsFactory[analyticsEventsTypes.PAGE_VIEW] = zertoAnalyticsEventsHandlersFactory.page_view;

        return analyticsEventsFactory;
    });

