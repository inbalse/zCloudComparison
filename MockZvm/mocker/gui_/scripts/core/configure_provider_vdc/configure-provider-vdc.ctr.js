'use strict';

angular.module('zvmApp.core')
    .controller('configureProviderVdcController', function ($scope, $translate, configureProviderVdcFactory, $filter, configureProviderVdcModel, result) {

        $scope.data = result;
        $scope.loading = false;

        var providerVdcColumnDefs = [
            {name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.PROVIDER_VDC_TITLE'),
                field: 'DisplayName', hideFromEditColumns: true}
        ];

        var datastoreColumnDefs = [
            {name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.PROVIDER_NAME'),
                field: 'providerName', hideFromEditColumns: true},
            {name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.DATASTORE'),
                field: 'DisplayName', hideFromEditColumns: true},
            {name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.RECOVERY_VOLUME'),
                field: 'Enable', hideFromEditColumns: true, cssClass: 'editable-cell', editor: $filter('checkboxEditor'),
                formatter: $filter('enumToCssClassFormatter')('use-icon')},
            {name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.JOURNAL'),
                field: 'Journal', hideFromEditColumns: true, cssClass: 'editable-cell', editor: $filter('checkboxEditor'),
                formatter: $filter('enumToCssClassFormatter')('use-icon')},
            {name: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.PRESEED'),
                field: 'Preseed', hideFromEditColumns: true, cssClass: 'editable-cell', editor: $filter('checkboxEditor'),
                formatter: $filter('enumToCssClassFormatter')('use-icon')}
        ];

        $scope.providerVdcsCustomOptions = {
            columns: providerVdcColumnDefs
        };

        $scope.datastoreCustomOptions = {
            columns: datastoreColumnDefs
        };

        $scope.init = function () {
            $scope.sendButton = {label: $translate.instant('MODAL.SAVE'), handler: $scope.handleSave, disabled: true };
            $scope.buttons = [
                {label: $translate.instant('MODAL.CANCEL'), class: 'btn btn-link', handler: $scope.handleCancel, disabled: false},
                $scope.sendButton
            ];

            $scope.data.Potential = configureProviderVdcModel._proccesProviderVdcsData($scope.data.Potential);
            $scope.providerVdcsSelectedItems = configureProviderVdcModel._proccesProviderVdcsData($scope.data.Current);

            var providerCollection = configureProviderVdcModel._getPotintialDataStorePerProvider($scope.providerVdcsSelectedItems,$scope.data.Potential);

            $scope.datastoreGridData = configureProviderVdcModel._updateProviderDatastore(providerCollection);
            $scope.datastoreSelectedItems = configureProviderVdcModel._updateProviderDatastore($scope.providerVdcsSelectedItems);

            if ($scope.datastoreSelectedItems.length){
                //should update potential list from the current list (if there is edit data store)
                $scope.datastoreGridData = configureProviderVdcModel._unionLists($scope.datastoreSelectedItems,$scope.datastoreGridData);

                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }

            $scope.sendButton.disabled = !$scope.IsSaveEnable();
        };

        $scope.IsSaveEnable = function () {
            var result = true;

            if ($scope.providerVdcsSelectedItems && $scope.providerVdcsSelectedItems.length) {

                if ((!$scope.datastoreSelectedItems || !$scope.datastoreSelectedItems.length) && $scope.data.UseOnly) {
                    result = false;
                }

                if (!configureProviderVdcModel._isDatastoredataValid($scope.datastoreSelectedItems)){
                    result = false;
                }

            }

            return result;
        };

        $scope.providerVdcsSelectionChange = function () {

            //find from selected provider the original
            var providerCollection = configureProviderVdcModel._getPotintialDataStorePerProvider($scope.providerVdcsSelectedItems,$scope.data.Potential);
            $scope.datastoreGridData =  configureProviderVdcModel._updateProviderDatastore(providerCollection);
            $scope.datastoreSelectedItems = configureProviderVdcModel._updateProviderDatastore($scope.providerVdcsSelectedItems);

            if (!$scope.$$phase) {
                $scope.$digest();
            }

            $scope.sendButton.disabled = !$scope.IsSaveEnable();
        };

        $scope.providerDatastoreSelectionChange = function () {
            $scope.sendButton.disabled = !$scope.IsSaveEnable();
        };

        $scope.handleCancel = function () {
            configureProviderVdcFactory.close();
        };

        $scope.handleSave = function () {
            //update current data

            //remove datastote that was exist and now the user delete him
            configureProviderVdcModel._removeUnselectedDataFromCurrent($scope.data.Current, $scope.datastoreSelectedItems);

            //add datastore the was not exist in current but the user add it from th ponential
            configureProviderVdcModel._addSelectedDatastoreToCurrentFromPotential($scope.datastoreSelectedItems, $scope.providerVdcsSelectedItems);

            configureProviderVdcModel._getAgregateData($scope.data.Current);

            configureProviderVdcFactory.save($scope.data);
        };

        $scope.init();

        $scope.$watch('data.UseOnly', function () {
            $scope.sendButton.disabled = !$scope.IsSaveEnable();

        });

        $scope.$watch('datastoreGridData', function () {
            $scope.sendButton.disabled = !$scope.IsSaveEnable();
        }, true);
    });
