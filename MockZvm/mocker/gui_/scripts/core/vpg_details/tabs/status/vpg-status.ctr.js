'use strict';

angular.module('zvmApp.core')
    .controller('vpgStatusController', function ($scope, $stateParams, vpgDetailsFactory, convertSecondsToFormatDateFilter,
                                                 $translate, enums, summaryMinimalModel, convertFormatHoursToMinutesFilter, $filter) {
        $scope.stateParams = $stateParams;

        $scope.applyBackupDetails = function () {

            $scope.isBackupEnabled = $scope.vpgData.VpgConfiguration.Configuration.IsBackupEnabled;

            $scope.showFailedImage = false;
            $scope.showSucessImage = false;

            if ($scope.isBackupEnabled && $scope.vpgData.Summary.VpgDetailsScreenBackupInformation) {

                var lastResult = $scope.vpgData.Summary.VpgDetailsScreenBackupInformation.LastRunResult;

                if (lastResult === enums.VpgBackupLastRunResultVisualObject.Failed || lastResult === enums.VpgBackupLastRunResultVisualObject.Aborted) {
                    $scope.showFailedImage = true;
                } else if (lastResult === enums.VpgBackupLastRunResultVisualObject.FullSuccess || lastResult === enums.VpgBackupLastRunResultVisualObject.PartialSuccess) {
                    $scope.showSucessImage = true;
                }
                if (lastResult !== enums.VpgBackupLastRunResultVisualObject.NotAvailable) {
                    $scope.backupLastDate = $filter('date')($scope.vpgData.Summary.VpgDetailsScreenBackupInformation.StartTimeOfLastRun, 'dd/MM/yyyy HH:mm');
                }
            }
        };

        $scope.vpgData = {};
        $scope.journalSLAinMinutes = 0;

        summaryMinimalModel.register($scope).then(null, null, function (result) {
            $scope.currentTime = result.SiteDetails.CurrentLocalTime;
        });

        $scope.applyJournalDetails = function () {
            $scope.journalSLAinMinutes = $scope.vpgData.VpgConfiguration.Configuration.MinimalJournalLenghtInMinutes;
            var historyInSeconds = $scope.vpgData.Summary.HistoryInSeconds;
            var historyInMinutes = Math.round(historyInSeconds / 60);

            $scope.ActualFailSafeHistory = null;

            if (angular.isDefined($scope.vpgData.Summary.JournalHealthStatusVisualObject) && $scope.vpgData.Summary.JournalHealthStatusVisualObject !== null) {
                $scope.ActualFailSafeHistory = $scope.vpgData.Summary.JournalHealthStatusVisualObject.JournalHealthDescription;
            }

            // convert seconds to HH:MM with zero padding
            var clockString = $filter('zTimeSecondsFormatter')(historyInSeconds, 'HH:MM', true);

            if (historyInMinutes > 59) {
                $scope.timeFrame = $translate.instant('VPG_DETAILS.STATUS.HOURS');
            } else {
                $scope.timeFrame = $translate.instant('VPG_DETAILS.STATUS.MINUTES');
            }

            $scope.historyFormatted = historyInSeconds > 0 ? clockString : 'NA';

            if ($scope.vpgData.State.Status === enums.VpgVisualStatus.HistoryNotMeetingSLA) {
                $scope.ringColors = ['#e9bb1b', '#e1e1e5'];
            } else {
                $scope.ringColors = ['#8d9fb8', '#e1e1e5'];
            }

            $scope.recoveryTime = $scope.vpgData.Summary.EarliestCheckpoint ? $filter('date')($scope.vpgData.Summary.EarliestCheckpoint.TimeStamp, 'dd/MM/yyyy HH:mm') : 'NA';

            var sum = $scope.journalSLAinMinutes - historyInMinutes;
            if (sum < 0) {
                $scope.ringData = [$scope.journalSLAinMinutes];
            } else {
                $scope.ringData = [historyInMinutes, sum];
            }
        };

        $scope.setVpgActivity = function (result) {
            $scope.vpgActivity = result;
        };
        $scope.setData = function (result) {
            $scope.vpgData = result;

            $scope.applyBackupDetails();
            $scope.applyJournalDetails();
        };

        vpgDetailsFactory.registerToDetails($scope).then(null, null, $scope.setData);

        vpgDetailsFactory.registerToEvents($scope).then($scope.setVpgActivity);
    });
