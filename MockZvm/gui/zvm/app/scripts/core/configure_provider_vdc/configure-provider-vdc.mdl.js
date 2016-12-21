'use strict';

angular.module('zvmApp.core')
    .factory('configureProviderVdcModel', function () {
        var configureProviderVdcModel = {};

        configureProviderVdcModel._proccesProviderVdcsData = function (data) {
            var processed = data;
            processed = _.forEach(processed, function (item) {
                item.id = item.Id.VCDId;
            });
            return processed;
        };

        configureProviderVdcModel._proccesDatastore = function (provider) {
            var processed;
            if (provider.DatastoreSettings){
                processed = provider.DatastoreSettings;
                processed = _.forEach(processed, function (item) {
                    item.id = JSON.stringify(item.Id) + provider.Id.VCDId;
                    item.providerName = provider.DisplayName;
                });
            }else {
                processed = provider.Datastores;
                processed = _.forEach(processed, function (item) {
                    item.id = JSON.stringify(item.Id) + provider.Id.VCDId;
                    item.providerName = provider.DisplayName;
                    item.Enable = angular.isDefined(item.Enable) ? item.Enable : true;
                    item.Journal = angular.isDefined(item.Journal) ? item.Journal : true;
                    item.Preseed = angular.isDefined(item.Preseed) ? item.Preseed : true;
                    item.PresentedAs = item.PresentedAs ? item.PresentedAs : item.DisplayName;
                });
            }

            return processed;
        };

        configureProviderVdcModel._unionLists = function (datastoreSelectedItems, datastoreGridData){
            _.forEach(datastoreSelectedItems, function (selectedDS){
                 _.find(datastoreGridData , function (datastore) {
                    if (datastore.Id.InternalDatastoreName === selectedDS.Id.InternalDatastoreName)
                    {
                        datastore.Enable = selectedDS.Enable;
                        datastore.Journal = selectedDS.Journal;
                        datastore.Preseed = selectedDS.Preseed;
                        datastore.PresentedAs = selectedDS.PresentedAs;
                    }
                });
            });
            return datastoreGridData;
        };

        configureProviderVdcModel._getPotintialDataStorePerProvider = function (providerVdcsSelectedItems, potential) {
            var result = [];
            _.forEach(providerVdcsSelectedItems, function (provider) {
                result.push(_.find(potential, function (pot) {
                    return provider.Id.VCDId === pot.Id.VCDId;
                }));
            });

            return result;
        };

        configureProviderVdcModel._updateProviderDatastore = function (data) {
            var result = [];
            _.forEach(data, function (selectedProvider) {
                result = result.concat(configureProviderVdcModel._proccesDatastore(selectedProvider));
            });
            return result;
        };

        configureProviderVdcModel._isDatastoredataValid = function (datastoreSelectedItems) {
             var result = true;
            _.forEach(datastoreSelectedItems, function (ds) {
                if (!ds.Preseed && !ds.Enable && !ds.Journal) {
                    result = false;
                }
            });
            return result;
        };

        configureProviderVdcModel._removeUnselectedDataFromCurrent = function (current, datastoreSelectedItems) {
            _.forEach(current, function (provider) {
                _.remove(provider.Datastores, function (ds) {
                    return !(_.find(datastoreSelectedItems, ds));
                });
            });
        };

        configureProviderVdcModel._addSelectedDatastoreToCurrentFromPotential = function (datastoreSelectedItems, providerVdcsSelectedItems) {
            _.forEach(datastoreSelectedItems, function (ds) {
                _.union(providerVdcsSelectedItems, function (provider) {
                    return !(_.find(provider.Datastores, ds));

                });
            });
        };

        configureProviderVdcModel._getAgregateData = function (currentData) {
            _.forEach(currentData, function (ds){
                if (!ds.DatastoreSettings){
                    ds.DatastoreSettings = [];
                    ds.DatastoreSettings = ds.Datastores;
                }
            });
        };

        return configureProviderVdcModel;
    });
