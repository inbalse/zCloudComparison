'use strict';


angular.module('zvmApp.core')
    .controller('emailSettingsController', function ($scope, $translate, siteSettingsFactory, siteSettingsModel, enums, dataCollectionFactory) {

        var lastSavedBackupNotificationScheduleTimeOfDay;

        $scope.forms = {};
        $scope.settings = siteSettingsModel.settings.EmailConfiguration;//settings data shortcut
        $scope.daysOfWeek = dataCollectionFactory.DAYS_OF_WEEK;//populate dropdowns
        $scope.SchedulePeriodType = enums.SchedulePeriodType;//enum data
        $scope.disableSend = true;//variables

        lastSavedBackupNotificationScheduleTimeOfDay = $scope.settings.BackupNotificationScheduleTimeOfDay;

        $scope.sendEmail = sendEmail;

        /*
        * Functions
        * */
        function sendEmail() {
            siteSettingsModel.testEmail();
        }


        /*
        * Watchers
        * */
        $scope.$watch('settings', function (newValue) {
            $scope.disableSend = true;
            if (newValue.SmtpServerAddress && newValue.SmtpServerPort && newValue.From && newValue.ToAddresses) {
                if (newValue.SmtpServerAddress !== '' && newValue.SmtpServerPort !== '' && newValue.From !== '' && newValue.ToAddresses.length > 0) {
                    $scope.disableSend = false;
                }
            }
        }, true);

        $scope.$watch('forms.emailSettings.$valid', function (newValue) {
            siteSettingsModel.isValid = newValue;
            $scope.$emit(siteSettingsFactory.events.VALIDITY);
            siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.EMAILS].valid = newValue;
        });

        $scope.$watch('settings.BackupNotificationEnabled', function (newValue) {
            if(newValue === false){
                $scope.settings.BackupNotificationScheduleTimeOfDay = lastSavedBackupNotificationScheduleTimeOfDay;
            }
        });
        $scope.$watch('forms.emailSettings.$dirty', function (newValue) {
            if(!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        $scope.$on('siteSettings:clearDirtyFlag', function(){
            $scope.forms.emailSettings.$setPristine();
        });
    });
