'use strict';

angular.module('zvmApp.core')
    .constant('remoteSupportConstants', {
        DAYS: 30
    })
    .controller('remoteSupportController', function ($scope, remoteSupportFactory, $translate, tweaksService, remoteSupportConstants) {
        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.loading = true;
        $scope.forms = {};
        $scope.remoteSupportInfo = {};
        var daysTweak = tweaksService.getTweak('t_remoteSupportPeriodInDays', remoteSupportConstants.DAYS);

        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.close = function () {
            $scope.cancel();
        };

        $scope.cancel = function () {
            remoteSupportFactory.modalInstance.dismiss('close');
        };

        $scope.save = function () {
            var settings = {};
            switch ($scope.remoteSupportInfo.timeFrame) {
                case 0:
                    settings = {
                        EnabledForPeriod: {
                            PeriodInHours: daysTweak * 24
                        }
                    };
                    break;
                case 1:
                    settings = {
                        EnabledForCase: {
                            CaseNumber: $scope.remoteSupportInfo.caseNumber
                        }
                    };
                    break;
                case 2:
                    settings = {
                        Disabled: true
                    };
                    break;
            }
            remoteSupportFactory.setRemoteSupportSettings(settings);
            $scope.close();
        };
        //==========================================================================
        //  Helpers
        //==========================================================================
        var initButtons = function () {
            $scope.saveButton = {
                label: $translate.instant('REMOTE_SUPPORT.SAVE'),
                handler: $scope.save,
                disabled: true
            };
            $scope.buttons = [
                {
                    label: $translate.instant('REMOTE_SUPPORT.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.cancel,
                    disabled: false
                },
                $scope.saveButton
            ];
        };

        var initTimeFrames = function () {
            var days = daysTweak;
            $scope.timeFrames = [
                {'id': 0, 'name': $translate.instant('REMOTE_SUPPORT.DAYS', {num: days})},
                {'id': 1, 'name': $translate.instant('REMOTE_SUPPORT.SPECIFIC_CASE')},
                {'id': 2, 'name': $translate.instant('REMOTE_SUPPORT.NEVER')}
            ];
        };

        //==========================================================================
        //  Init
        //==========================================================================
        $scope.$watch('forms.remoteSupport.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.saveButton.disabled = !value;
            }
        });

        var calculateEndDate = function (startDate, hours) {
            var date = startDate.add(hours + 1, 'hours');
            return date.format('MM/DD/YYYY') + ' at ' + date.format('hA');
        };

        var getSettingsSuccess = function (result) {
            if (result.EnabledForPeriod) {
                $scope.remoteSupportInfo.timeFrame = $scope.remoteSupportInfo.oldTimeFrame = 0;
                $scope.remoteSupportInfo.endDate =  calculateEndDate(moment(), result.EnabledForPeriod.PeriodInHours);
            }
            else if (result.EnabledForCase) {
                $scope.remoteSupportInfo.timeFrame = $scope.remoteSupportInfo.oldTimeFrame = 1;
                $scope.remoteSupportInfo.oldCaseNumber = result.EnabledForCase.CaseNumber;
            }
        };

        var init = function () {
            $scope.remoteSupportInfo.timeFrame = $scope.remoteSupportInfo.oldTimeFrame = 2;
            remoteSupportFactory.getRemoteSupportSettings().then(getSettingsSuccess);
            initTimeFrames();
            initButtons();
            $scope.loading = false;
        };

        init();

        $scope._private = {
            init: init,
            getSettingsSuccess: getSettingsSuccess,
            calculateEndDate: calculateEndDate
        };

    });
