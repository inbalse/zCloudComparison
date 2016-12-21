'use strict';

angular.module('zvmApp.core')
    .constant('configureCheckpointCons', {
        VSS: 'vss',
        USER: 'user',
        AUTO: 'auto',
        PROP_TIMESTAMP: 'TimeStamp',
        PROP_VSS: 'Vss',
        PROP_TAG: 'Tag'
    })
    .factory('configureCheckpointFactory', function ($uibModal, zertoServiceFactory, zAlertFactory, $q, $filter, configureCheckpointCons) {
        var configureCheckpointFactory = {},
            edgeCheckpoints;
        configureCheckpointFactory.open = function (vpgId, vpgName, checkpointId, openPlace) {

            configureCheckpointFactory.deferred = $q.defer();
            configureCheckpointFactory.vpgId = vpgId;
            zertoServiceFactory.GetVPGCheckpointsStats(vpgId).then(function (result) {
                    edgeCheckpoints = result;
                    var dateSpan = configureCheckpointFactory.getLatestCheckpointDateSpan();
                    zertoServiceFactory.GetExtendedCheckpointList(vpgId, dateSpan.startDate, dateSpan.endDate).then(function (checkpoints) {

                        configureCheckpointFactory.modalInstance = $uibModal.open({
                            templateUrl: 'scripts/core/configure_checkpoint/configure-checkpoint.html',
                            windowClass: 'configure-checkpoint',
                            controller: 'configureCheckpointController',
                            backdrop: 'static',
                            resolve: {
                                checkpoints: function () {
                                    return configureCheckpointFactory._changeData(checkpoints);
                                },
                                checkpointId: function () {
                                    return checkpointId;
                                },
                                vpgName: function () {
                                    return vpgName;
                                },
                                openPlace: function () {
                                    return openPlace;
                                }
                            }
                        });
                    }, function (error) {
                        zAlertFactory.fail(error.faultCode, error.faultString);
                    });

                }, function (error) {
                    zAlertFactory.fail(error.faultCode, error.faultString);
                }
            );


            return configureCheckpointFactory.deferred.promise;
        };

        configureCheckpointFactory.refresh = function (range) {
            var dateSpan = configureCheckpointFactory._getStartEndDate(range.startDate, range.endDate);

            return zertoServiceFactory.GetExtendedCheckpointList(configureCheckpointFactory.vpgId,
                dateSpan.startDate, dateSpan.endDate);
        };

        // configureCheckpointFactory.getDisabledDates = function () {
        //     return [];
        //     // return [
        //     //     new Date(2016, 10, 23),
        //     //     new Date(2016, 10, 20),
        //     //     new Date(2016, 10, 15)
        //     // ];
        // };

        configureCheckpointFactory._changeData = function (value) {
            _.forEach(value, function (item) {
                if (item.Vss) {
                    item.type = configureCheckpointCons.VSS;
                } else if (item.Tag) {
                    item.type = configureCheckpointCons.USER;
                } else {
                    item.type = configureCheckpointCons.AUTO;
                }
                item.timeObj = {};
                item.timeObj.display = $filter('zDateFilter')(item.TimeStamp);
                item.timeObj.value = item.type;
                item.timeObj.filterValue = item.TimeStamp;
                item.id = item.Identifier.Identifier;
            });

            return _.sortBy(value, configureCheckpointCons.PROP_TIMESTAMP).reverse();
        };

        configureCheckpointFactory.close = function () {
            configureCheckpointFactory.deferred.reject(null);
            configureCheckpointFactory._clear();
        };

        configureCheckpointFactory.save = function (checkpoint) {
            configureCheckpointFactory.deferred.resolve(checkpoint);
            configureCheckpointFactory._clear();
        };

        configureCheckpointFactory._clear = function () {
            configureCheckpointFactory.modalInstance.dismiss('close');
            configureCheckpointFactory.vpgId = null;
        };

        configureCheckpointFactory.isOneDate = function () {
            var earliestDate = moment(configureCheckpointFactory.getEarliestCheckpointDate()),
                latestDate = moment(configureCheckpointFactory.getLatestCheckpointDate());

            return earliestDate.isSame(latestDate, 'day');
        };

        configureCheckpointFactory._getStartEndDate = function (startDate, endDate) {
            return {
                startDate: moment(startDate).startOf('day').toDate(),
                endDate: moment(endDate).endOf('day').toDate()
            };
        };

        configureCheckpointFactory.getEarliestCheckpointDate = function () {
            return _.get(edgeCheckpoints, 'EarliestCheckpoint.TimeStamp');
        };

        configureCheckpointFactory.getLatestCheckpointDate = function () {
            return _.get(edgeCheckpoints, 'LatestCheckpoint.TimeStamp');
        };

        configureCheckpointFactory.getLatestCheckpointDateSpan = function () {
            var latestCheckpoint = configureCheckpointFactory.getLatestCheckpointDate();
            return configureCheckpointFactory._getStartEndDate(latestCheckpoint, latestCheckpoint);
        };


        return configureCheckpointFactory;
    });
