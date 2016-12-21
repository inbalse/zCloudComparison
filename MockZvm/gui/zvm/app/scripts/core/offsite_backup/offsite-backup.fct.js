'use strict';

angular.module('zvmApp.core')
    .factory('offSiteBackupFactory', function ($translate, zertoServiceFactory, zAlertFactory, analyticsEventsTypes, $rootScope) {
        var offSiteBackupFactory = {};

        offSiteBackupFactory.runBackups = function (selectedItems) {
            $rootScope.$emit(analyticsEventsTypes.OFFSITE_BACKUP.RUN.START);

            offSiteBackupFactory.selectedItems = selectedItems;
            zAlertFactory.warn($translate.instant('OFF_SITE.START_TITLE'), $translate.instant('OFF_SITE.START_WARNING'), offSiteBackupFactory.handleReturnStartBackup);
        };

        offSiteBackupFactory.handleReturnStartBackup = function (event) {
            var gaEventData = {};

            if (event.target.name === zAlertFactory.buttons.OK) {

                //region GA
                try{
                    gaEventData.totalSize= _.sum(offSiteBackupFactory.selectedItems, 'JobSizeInMB');
                }

                catch(e){
                    gaEventData = {};
                }

                $rootScope.$emit(analyticsEventsTypes.OFFSITE_BACKUP.RUN.END, gaEventData);
                //endregion
                var selectedVPGIdentifier = _.pluck(offSiteBackupFactory.selectedItems, 'VpgIdentifier');
                zertoServiceFactory.BackupProtectionGroups(selectedVPGIdentifier);
            }
        };

        offSiteBackupFactory.abortBackups = function (selectedItems) {
            $rootScope.$emit(analyticsEventsTypes.OFFSITE_BACKUP.ABORT.START);
            offSiteBackupFactory.selectedItems = selectedItems;
            zAlertFactory.warn($translate.instant('OFF_SITE.STOP_TITLE'), $translate.instant('OFF_SITE.STOP_WARNING'), offSiteBackupFactory.handleReturnAbortBackup);
        };

        offSiteBackupFactory.handleReturnAbortBackup = function (event) {
            var gaEventData = {};

            if (event.target.name === zAlertFactory.buttons.OK) {
                //region GA
                try{
                    gaEventData.totalSize= _.sum(offSiteBackupFactory.selectedItems, 'JobSizeInMB');
                }

                catch(e){
                    gaEventData = {};
                }

                $rootScope.$emit(analyticsEventsTypes.OFFSITE_BACKUP.ABORT.END, gaEventData);
                //endregion

                var selectedVPGIdentifier = _.pluck(offSiteBackupFactory.selectedItems, 'VpgIdentifier');
                zertoServiceFactory.AbortBackups(selectedVPGIdentifier);
            }
        };

        offSiteBackupFactory.checkRunBackupEnabled = function (selectedItems) {
            var result = _.find(selectedItems, {IsBackupEnabled: false});
            if (result || selectedItems.length === 0) {
                return false;
            }
            return true;
        };

        offSiteBackupFactory.checkAbortBackupEnabled = function (selectedItems) {
            var result = _.find(selectedItems, {IsAbortBackupEnabled: false});
            if (result || selectedItems.length === 0) {
                return false;
            }
            return true;
        };

        offSiteBackupFactory.lastRunResultToText = function (lastRunEnum) {
            return $translate.instant('ENUM.BACKUP_LAST_RUN_RESULT.' + lastRunEnum);
        };

        return offSiteBackupFactory;
    });

