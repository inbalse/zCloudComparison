'use strict';

angular.module('zvmApp.core')
    .controller('configureProviderVdcControllerPopup', function ($scope, $translate, configureProviderVdcModel2, configureProviderVdcFactory, result, $uibModal, zSlickGridFilterTypes, $filter) {
        $scope.data = result;
        $scope.loading = false;

        $scope.handleCancel = function () {
            configureProviderVdcFactory.close();
        };
        $scope.handleSave = function () {
            configureProviderVdcModel2._createCurrentDataForSaving($scope.data, configureProviderVdcFactory.currentProviders, configureProviderVdcFactory.currentDatastores);
            configureProviderVdcFactory.save($scope.data);
        };

        $scope.sendButton = {
            label: $translate.instant('MODAL.SAVE'),
            handler: $scope.handleSave,
            disabled: true
        };
        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancel,
                disabled: false
            },
            $scope.sendButton
        ];
        $scope.potentialProviders = [];
        $scope.potentialDatastores = [];
        $scope.configureProviderVdcFactory = configureProviderVdcFactory;
        $scope.gridObj = {};

        $scope.isRemoveProviderEnable = false;
        $scope.isRemoveDatastoreEnable = false;

        var providerVdcColumnDefs = [
            {
                id: 'DisplayName',
                name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.PROVIDER_VDC_TITLE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'DisplayName'
            }
        ];

        var datastoreColumnDefs = [
            {
                id: 'DisplayName',
                name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.DATASTORE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'DisplayName'
            },
            {
                id: 'Enable',
                name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.RECOVERY_VOLUME'),
                field: 'Enable',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                editor: $filter('checkboxOneClickEditor')('Enable'),
                formatter: $filter('iconClassFormatter')('checkbox')
            },
            {
                id: 'Journal',
                name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.JOURNAL'),
                field: 'Journal',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                editor: $filter('checkboxOneClickEditor')('Journal'),
                formatter: $filter('iconClassFormatter')('checkbox')
            },
            {
                id: 'Preseed',
                name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.PRESEED'),
                field: 'Preseed',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                editor: $filter('checkboxOneClickEditor')('Preseed'),
                formatter: $filter('iconClassFormatter')('checkbox')
            }
        ];

        $scope.providerVdcsCustomOptions = {
            columns: providerVdcColumnDefs
        };

        $scope.datastoreCustomOptions = {
            columns: datastoreColumnDefs
        };

        $scope.providerVdcsSelectedItems = [];

        $scope.datastoreSelectedItems = [];

        $scope.init = function () {
            $scope.configureProviderVdcFactory.currentProviders = configureProviderVdcModel2._proccesProviderVdcsData($scope.data.Current);
            if ($scope.configureProviderVdcFactory.currentProviders && $scope.configureProviderVdcFactory.currentProviders.length) {
                $scope.configureProviderVdcFactory.currentDatastores = configureProviderVdcModel2._updateProviderDatastore($scope.configureProviderVdcFactory.currentProviders);
            }

            if ($scope.data.Potential) {
                $scope.potentialProviders = configureProviderVdcModel2._proccesProviderVdcsData(angular.copy($scope.data.Potential));
                $scope.potentialProviders = configureProviderVdcModel2._removeProvidersFromPotentials($scope.configureProviderVdcFactory.currentProviders, $scope.potentialProviders);
                var PotentialDatastoresCollection = configureProviderVdcModel2._initializePotentialDatastores($scope.data.Potential, $scope.configureProviderVdcFactory.currentProviders);
                $scope.potentialDatastores = configureProviderVdcModel2._removeDataStoreFromPotentials($scope.configureProviderVdcFactory.currentDatastores, PotentialDatastoresCollection);
            }

            $scope.sendButton.disabled = !$scope.IsSaveEnable();
        };

        /**
         * @return {boolean}
         */
        //TODO: check why it thinks IsSaveEnable is called with new
        $scope.IsSaveEnable = function () {
            if (_.isEmpty($scope.configureProviderVdcFactory.currentProviders)) {
                return false;
            }
            if (_.isEmpty($scope.configureProviderVdcFactory.currentDatastores) && $scope.data.UseOnly) {
                return false;
            }
            var validDataStores = [];
            _.forEach($scope.configureProviderVdcFactory.currentDatastores, function (datastore) {
                if (datastore.Enable || datastore.Preseed || datastore.Journal) {
                    validDataStores.push(datastore);
                }
            });
            return !_.isEmpty(validDataStores);
        };

        $scope.providerVdcsSelectionChange = function () {
            $scope.isRemoveProviderEnable = $scope.providerVdcsSelectedItems.length > 0;

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.providerDatastoreSelectionChange = function () {
            $scope.isRemoveDatastoreEnable = $scope.datastoreSelectedItems.length > 0;

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        //============================================= HANDLE FUNC ======================================

        $scope.handleAddProvider = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'select.html',
                windowClass: 'configure-provider-vdc',
                controller: 'configureProviderVdcSelectController',
                resolve: {
                    result: function () {
                        return $scope.potentialProviders;
                    }
                }
            });

            modalInstance.result.then(function (selectedValues) {
                $scope.configureProviderVdcFactory.currentProviders = _.union($scope.configureProviderVdcFactory.currentProviders, selectedValues);

                //clean potentials
                $scope.potentialProviders = configureProviderVdcModel2._removeProvidersFromPotentials($scope.configureProviderVdcFactory.currentProviders, $scope.potentialProviders);
                $scope.potentialDatastores = configureProviderVdcModel2._removeDataStoreFromPotentials($scope.configureProviderVdcFactory.currentDatastores, configureProviderVdcModel2._initializePotentialDatastores($scope.data.Potential, $scope.configureProviderVdcFactory.currentProviders));

                if (!$scope.$$phase) {
                    $scope.$digest();
                }
                $scope.sendButton.disabled = !$scope.IsSaveEnable();
            });
        };

        $scope.handleAddDatastore = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'select.html',
                windowClass: 'configure-provider-vdc',
                controller: 'configureProviderVdcSelectController',
                resolve: {
                    result: function () {
                        return $scope.potentialDatastores;
                    }
                }
            });

            modalInstance.result.then(function (selectedValues) {
                _.forEach(selectedValues, function (item) {
                    var vcdIds = configureProviderVdcModel2._getProvidersIdFromSelectedDatastore(item, $scope.data.Potential);
                    configureProviderVdcModel2._createDatastoreSettingsObj(item);
                    var indexList = configureProviderVdcModel2._getProviderIndexList(vcdIds, $scope.configureProviderVdcFactory.currentProviders);

                    _.forEach(indexList, function (i) {
                        if (!$scope.configureProviderVdcFactory.currentProviders[i].DatastoreSettings) {
                            $scope.configureProviderVdcFactory.currentProviders[i].DatastoreSettings = [];
                        }
                        $scope.configureProviderVdcFactory.currentProviders[i].DatastoreSettings.push(item);
                    });

                });
                $scope.configureProviderVdcFactory.currentDatastores = _.union($scope.configureProviderVdcFactory.currentDatastores, selectedValues);

                //clean potentials
                $scope.potentialProviders = configureProviderVdcModel2._removeProvidersFromPotentials($scope.configureProviderVdcFactory.currentProviders, $scope.potentialProviders);
                $scope.potentialDatastores = configureProviderVdcModel2._removeDataStoreFromPotentials($scope.configureProviderVdcFactory.currentDatastores, configureProviderVdcModel2._initializePotentialDatastores($scope.data.Potential, $scope.configureProviderVdcFactory.currentProviders));

                if (!$scope.$$phase) {
                    $scope.$digest();
                }
                $scope.sendButton.disabled = !$scope.IsSaveEnable();
            });
        };

        $scope.handleRemoveProvider = function () {

            //remove from current provider
            _.remove($scope.configureProviderVdcFactory.currentProviders, function (provider) {
                return _.contains($scope.providerVdcsSelectedItems, provider);
            });

            var toDelete = [];
            _.forEach($scope.providerVdcsSelectedItems, function (removedProvider) {
                //remove from datastore table if there is data store thant belong to this removing provider
                configureProviderVdcModel2._removeItemFromDatastoreList(removedProvider, $scope.configureProviderVdcFactory.currentDatastores, $scope.configureProviderVdcFactory.currentProviders, $scope.data.Potential);
                //add to potential provide
                $scope.potentialProviders.push(removedProvider);
                toDelete.push(removedProvider);
            });

            //update providerVdcsSelectedItems
            _.forEach(toDelete, function (provider) {
                _.remove($scope.providerVdcsSelectedItems, provider);
            });

            $scope.gridObj.providerVdcsGrid.updateData($scope.configureProviderVdcFactory.currentProviders);
            $scope.gridObj.providerDatastoreGrid.updateData($scope.configureProviderVdcFactory.currentDatastores);

            $scope.gridObj.providerVdcsGrid.updateSelectedItems();
            $scope.gridObj.providerDatastoreGrid.updateSelectedItems();
            //clean potentials
            $scope.potentialProviders = configureProviderVdcModel2._removeProvidersFromPotentials($scope.configureProviderVdcFactory.currentProviders, $scope.potentialProviders);
            $scope.potentialDatastores = configureProviderVdcModel2._removeDataStoreFromPotentials($scope.configureProviderVdcFactory.currentDatastores, configureProviderVdcModel2._initializePotentialDatastores($scope.data.Potential, $scope.configureProviderVdcFactory.currentProviders));

            if (!$scope.$$phase) {
                $scope.$digest();
            }

            $scope.sendButton.disabled = !$scope.IsSaveEnable();

        };

        $scope.handleRemoveDatastore = function () {
            //remove from current datastore
            _.remove($scope.configureProviderVdcFactory.currentDatastores, function (datastore) {
                return _.contains($scope.datastoreSelectedItems, datastore);
            });

            var toDelete = [];
            _.forEach($scope.datastoreSelectedItems, function (removedDatastore) {
                $scope.potentialDatastores.push(removedDatastore);

                toDelete.push(removedDatastore);
            });

            //update datastoreSelectedItems
            _.forEach(toDelete, function (datastore) {
                _.remove($scope.datastoreSelectedItems, datastore);
            });

            $scope.gridObj.providerDatastoreGrid.updateData($scope.configureProviderVdcFactory.currentDatastores);
            $scope.gridObj.providerDatastoreGrid.updateSelectedItems();


            if (!$scope.$$phase) {
                $scope.$digest();
            }

            $scope.sendButton.disabled = !$scope.IsSaveEnable();

        };

        $scope.init();

        $scope.$watch('data.UseOnly', function () {
            $scope.sendButton.disabled = !$scope.IsSaveEnable();

        });

        $scope.$watch('configureProviderVdcFactory.currentDatastores', function () {
            $scope.sendButton.disabled = !$scope.IsSaveEnable();
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }, true);
    });
