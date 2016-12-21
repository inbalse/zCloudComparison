'use strict';

angular.module('zvmApp.core')
    .factory('stopFailoverTestFactory', function ($uibModal, $q, zertoServiceFactory, zertoLoggerServiceFactory,
                                                  zAlertFactory, enums, vos, $translate, guiVisibleException) {
        var stopFailoverTestFactory = {};

        stopFailoverTestFactory.modalInstance = null;
        stopFailoverTestFactory.deferred = null;
        stopFailoverTestFactory.collection = [];

        stopFailoverTestFactory.stopTestByIds = function (col) {
            stopFailoverTestFactory.deferred = $q.defer();

            //check that all of the recieved items can be stoped
            zertoServiceFactory.GetStopTestScreen().then(function (result) {
                // check that each item in col is in results
                var hasNonStopableVpgs = false;
                _.forEach(col, function (item) {
                    var found = _.find(result.ProtectionGroups, function (vpg) {
                        return _.isEqual(item, vpg.Id);
                    });

                    if (!found || !found.IsCurrentlyTesting || !found.ActiveProcesses.RunningFailOverTest.StopEnabled) {
                        if (!found){
                            zertoLoggerServiceFactory.logError('GetStopTestScreen', null, 'Error : vpg with id:' + item + ' to stop test not found in result of GetStopTestScreen');
                        }
                        hasNonStopableVpgs = true;
                    } else {
                        stopFailoverTestFactory.collection.push(found);
                    }
                });

                if (hasNonStopableVpgs) {
                    zAlertFactory.fail($translate.instant('EDIT_STOP_FAILOVER_ITEM.CANT_STOP_ALERT_TITLE'),
                        $translate.instant('EDIT_STOP_FAILOVER_ITEM.CANT_STOP_ALERT_TEXT'));
                } else {
                    stopFailoverTestFactory.modalInstance = $uibModal.open({
                        templateUrl: 'scripts/core/stop_failover_test/stop-failover-test.html',
                        windowClass: 'stop-failover-test',
                        controller: 'stopFailoverTestController',
                        backdrop: 'static',
                        resolve: {
                            item: function () {
                                var neutral = new vos.StopFailoverTestGuiCommand();
                                neutral.Result = new vos.FailoverTestResult();
                                neutral.Result.Status = enums.TestStatus.Success;
                                neutral.Result.Summary = '';
                                return neutral;
                            }
                        }
                    });
                }
            });
            return stopFailoverTestFactory.deferred.promise;
        };

        stopFailoverTestFactory.close = function () {
            stopFailoverTestFactory.collection = [];

            stopFailoverTestFactory.deferred.reject();
            stopFailoverTestFactory.modalInstance.close();
        };

        stopFailoverTestFactory.stop = function (state, notes) {
            var result = [];
            _.forEach(stopFailoverTestFactory.collection, function (item) {
                var stopCommand = new vos.StopFailoverTestGuiCommand();
                stopCommand.Id = item.Id;
                stopCommand.Result = new vos.FailoverTestResult();
                stopCommand.Result.Status = state;
                stopCommand.Result.Summary = notes;

                result.push(stopCommand);
            });

            zertoServiceFactory.StopMultipleFailOverTest(result).then(function () {
                stopFailoverTestFactory.close();
            }, function (result) {
                if(guiVisibleException.PERMISSION_TASK_DENIED !== result.faultString) {
                    zAlertFactory.fail($translate.instant('TASK_SUMMARY.FOT_STOP'), result.faultString);
                }
            });
        };

        return stopFailoverTestFactory;
    });
