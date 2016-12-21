'use strict';

angular.module('zvmApp.core')
    .factory('configureProviderVdcModel2', function () {
        var configureProviderVdcModel2 = {};

        configureProviderVdcModel2._proccesProviderVdcsData = function (data) {
            var processed = data;
            processed = _.forEach(processed, function (item) {
                item.id = item.Id.VCDId;
            });
            return processed;
        };

        configureProviderVdcModel2._proccesDatastore = function (provider) {
            var processed;
            if (provider.DatastoreSettings){
                processed = provider.DatastoreSettings;
                processed = _.forEach(processed, function (item) {
                    item.id = JSON.stringify(item.Id);
                });
            }else {
                processed = provider.Datastores;
                processed = _.forEach(processed, function (item) {
                    item.id = JSON.stringify(item.Id);
                    configureProviderVdcModel2._createDatastoreSettingsObj(item);
                });
            }

            return processed;
        };

        configureProviderVdcModel2._createDatastoreSettingsObj = function (value) {
            value.Enable = angular.isDefined(value.Enable) ? value.Enable : true;
            value.Journal = angular.isDefined(value.Journal) ? value.Journal : true;
            value.Preseed = angular.isDefined(value.Preseed) ? value.Preseed : true;
            value.PresentedAs = value.PresentedAs ? value.PresentedAs : value.DisplayName;
        };

        configureProviderVdcModel2._updateProviderDatastore = function (data) {
            var result = [];
            _.forEach(data, function (selectedProvider) {
                var datastores = configureProviderVdcModel2._proccesDatastore(selectedProvider);
                //result = result.concat(datastores);
                result = configureProviderVdcModel2._arrayUnique(result.concat(datastores));

            });

            return result;
        };

        configureProviderVdcModel2._arrayUnique = function(array) {
            var a = array.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if (_.isEqual(a[i].Id, a[j].Id)) {
                        a.splice(j--, 1);
                    }
                }
            }

            return a;
        };

        configureProviderVdcModel2._initializePotentialDatastores = function (potentialCollection, currentProviderCollection) {
            var result = [];

            _.forEach(potentialCollection, function (provider) {
                if(configureProviderVdcModel2._isProviderManaged(provider, currentProviderCollection)){
                    if (provider.Datastores && provider.Datastores.length){
                        _.forEach(provider.Datastores, function (datastoreItem) {
                            if (!_.find(result, datastoreItem)) {
                                datastoreItem.id = JSON.stringify(datastoreItem.Id);
                                result.push(datastoreItem);
                            }
                        });
                    }
                }
            });

            return result;
        };

        configureProviderVdcModel2._isProviderManaged = function (value, currentProviderCollection) {
            var found = _.find(currentProviderCollection, function (providerItem) {
                return _.isEqual(providerItem.Id.VCDId, value.Id.VCDId);
            });

            return !!found;
        };

        configureProviderVdcModel2._removeProvidersFromPotentials = function (currentProvidersCollection, potentialProvidersCollection) {
            _.remove(potentialProvidersCollection, function (potentialProviderItem) {
                return _.find(currentProvidersCollection, function (currentProviderItem) {
                    return _.isEqual(potentialProviderItem.Id.VCDId, currentProviderItem.Id.VCDId);
                });
            });

            return potentialProvidersCollection;
        };

        configureProviderVdcModel2._removeDataStoreFromPotentials = function (currentDatastoreCollection, potentialDatastoreCollection) {
            _.remove(potentialDatastoreCollection, function (potentialDatastoreItem) {
                return _.find(currentDatastoreCollection, function (currentDatastoreItem) {
                    return _.isEqual(potentialDatastoreItem.Id, currentDatastoreItem.Id) && _.isEqual(potentialDatastoreItem.DisplayName, currentDatastoreItem.DisplayName);
                });
            });

            return potentialDatastoreCollection;
        };

        configureProviderVdcModel2._removeItemFromDatastoreList = function (removedProvider, currentDatastoreCollection, currentProviderCollection, potentialProviderCollection) {
            if (removedProvider.Datastores || removedProvider.DatastoreSettings){
                var datastoreCollection = angular.isDefined(removedProvider.DatastoreSettings) ?  removedProvider.DatastoreSettings : removedProvider.Datastores;
                _.remove(currentDatastoreCollection, function (datastoreItem) {
                    return _.find(datastoreCollection, function (datastorSettingsItem) {
                        return (_.isEqual(datastorSettingsItem.Id, datastoreItem.Id) && _.isEqual(datastorSettingsItem.DisplayName, datastoreItem.DisplayName)) &&
                              !(configureProviderVdcModel2._isDatastoreExistInManagedProviderMoreThenOnce(datastoreItem, currentProviderCollection, potentialProviderCollection));
                    });
                });
            }
        };

        configureProviderVdcModel2._getProvidersIdFromSelectedDatastore = function(datastore, potential) {
            var result = [];
            _.forEach(potential, function (provider)
            {
                if (provider.Datastores)
                {
                    _.forEach(provider.Datastores, function(datastoreItem){
                        if (datastoreItem.DisplayName === datastore.DisplayName && datastoreItem.Id.ServerIdentifier.ServerGuid === datastore.Id.ServerIdentifier.ServerGuid)
                        {
                            result.push(provider.Id.VCDId);
                        }
                    });
                }
            });
            return result;
        };

        configureProviderVdcModel2._getProviderIndexList = function (vcdIds, currentProviderCollection) {
            var result = [];
            _.forEach(vcdIds, function(i){
                var counter = 0;
                _.forEach(currentProviderCollection, function(provider){
                    if (provider.Id.VCDId === vcdIds[i])
                    {
                        result.push(counter);
                    }
                    counter++;
                });
            });
            return result;
        };

        configureProviderVdcModel2._isDatastoreExistInManagedProviderMoreThenOnce = function (datastoreItem, currentProviderCollection, potentialProviderCollection) {
            // find from current list the item in the potential
            var result = false;

            _.forEach(currentProviderCollection, function (currentProvider) {

                var found = _.find(potentialProviderCollection, function (potItem) {
                    return _.isEqual(potItem.Id.VCDId, currentProvider.Id.VCDId);
                });

                if (found){
                    // if datastoreitem is in found object
                  //  var foundDatastore = _.find(found.Datastores, datastoreItem);

                    var foundDatastore = _.find(found.Datastores, function (datastore) {
                        return _.isEqual(datastore.Id, datastore.Id);
                    });

                    if (foundDatastore){
                        result = true;
                    }
                }
            });

            return result;
        };

        configureProviderVdcModel2._createCurrentDataForSaving = function (data, currentProviderCollection, currentDatastoreCollection) {
            data.Current = [];
            _.forEach(currentProviderCollection, function (currentProvider) {
                var item = {};
                item.Id = currentProvider.Id;
                item.DisplayName = currentProvider.DisplayName;
                item.DatastoreSettings = configureProviderVdcModel2._findDatastoresForProvider(currentDatastoreCollection, currentProvider, data.Potential);

                data.Current.push(item);
            });

        };

        configureProviderVdcModel2._findDatastoresForProvider = function (currentDatastoreCollection, currentProvider, potential) {
          //find current provider in potential list
            var result = [];
            var found = _.find(potential, function (potItem) {
                return _.isEqual(potItem.Id.VCDId, currentProvider.Id.VCDId);
            });

            if (found){
                _.forEach(currentDatastoreCollection, function (currentDatastore) {
                    // if datastoreitem is in found object
                    var foundDatastore = _.find(found.Datastores, function(datastore){
                       return (_.isEqual(currentDatastore.Id, datastore.Id) && _.isEqual(currentDatastore.DisplayName, datastore.DisplayName));
                    });

                    if (foundDatastore){
                        result.push(currentDatastore);
                    }
                });
            }
            return result;
        };

        return configureProviderVdcModel2;
    });
