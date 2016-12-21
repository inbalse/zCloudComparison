'use strict';

angular.module('zvmApp.models')
    .factory('datastoreModel', function ($filter, $translate, zertoServiceUpdaterFactory, enums) {

        var datastoreModel = {};
        datastoreModel.isShowByZerto = false;
        var operation = 'GetDatastoreClustersScreen';

        datastoreModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, operation, [], false, datastoreModel._processData);
        };

        datastoreModel._addClusterField = function (data) {
            _.forEach(data.StorageResourceNodes, function (item) {
                item.Cluster = '';
                _.forEach(item.children, function (ds) {
                    ds.Cluster = item.DisplayName;
                });
            });
        };

        datastoreModel._processData = function (data) {
            datastoreModel._addClusterField(data);
            var processed;
            var counter = 0;
            var children = _.compact(_.flatten(_.pluck(data.StorageResourceNodes, 'children')));
            processed = _.remove(data.StorageResourceNodes.concat(children), function (item) {
                return item.NodeType !== 1;
            });
            if (datastoreModel.isShowByZerto) {
                processed = _.filter(processed, function (item) {
                    return item.UsedByZerto;
                });
            }

            var strGB = $translate.instant('METRICS.GB');
            var gbToMbConverter = 1024;
            var percentConverter = 100;
            processed = _.forEach(processed, function (item) {
                item.id = counter;
                counter++;

                item.TotalUsage = {
                    value: item.DatastoreConsumptionInGB.toFixed(2),
                    capacity: item.DatastoreTotalCapacityInGb.toFixed(2),
                    percent: math.divide(item.DatastoreConsumptionInGB, item.DatastoreTotalCapacityInGb) * percentConverter,
                    sortValue: math.divide(item.DatastoreConsumptionInGB, item.DatastoreTotalCapacityInGb) * percentConverter
                };

                item.DRUsage = {
                    value: item.ZertoConsumptionInGB.toFixed(2),
                    capacity: item.DatastoreTotalCapacityInGb.toFixed(2),
                    percent: math.divide(item.ZertoConsumptionInGB, item.DatastoreTotalCapacityInGb) * percentConverter,
                    sortValue: math.divide(item.ZertoConsumptionInGB, item.DatastoreTotalCapacityInGb) * percentConverter
                };

                item.RecoveryVolsSize = {
                    display: item.RecoveryVolsSizeInGB + ' ' + strGB,
                    value: item.RecoveryVolsSizeInGB * gbToMbConverter
                };
                item.JournalVolsSize = {
                    display: item.JournalVolsSizeInGB + ' ' + strGB,
                    value: item.JournalVolsSizeInGB * gbToMbConverter
                };
                var title = '';
                switch (item.AlertStatusVisualObject) {
                    case enums.DatastoreAlertStatusVisualObject.Error :
                    {
                        item.Status = title = $translate.instant('GRID_COLUMNS.STATUS_ERROR');
                        break;
                    }
                    case enums.DatastoreAlertStatusVisualObject.Normal:
                    {
                        item.Status = title = $translate.instant('GRID_COLUMNS.STATUS_NORMAL');
                        break;

                    }
                    case enums.DatastoreAlertStatusVisualObject.Warning:
                    {
                        item.Status = title = $translate.instant('GRID_COLUMNS.STATUS_WARNING');
                        break;
                    }
                    case enums.DatastoreAlertStatusVisualObject.NotAvailable:
                    {
                        item.Status = title = $translate.instant('GRID_COLUMNS.STATUS_NOTAVAILABLE');
                        break;
                    }
                }

                item.AlertStatus = {display: item.AlertStatusVisualObject, title: title};

            });

            return processed;
        };

        datastoreModel.showByZerto = function (checked) {
            datastoreModel.isShowByZerto = checked;
            zertoServiceUpdaterFactory.update();
        };

        return datastoreModel;
    });
