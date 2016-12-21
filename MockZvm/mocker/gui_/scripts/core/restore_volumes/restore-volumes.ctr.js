'use strict';

angular.module('zvmApp.core')
    .controller('restoreVolumesPopup', function ($scope, $translate, item, potentials, restoreVolumesFactory) {
        $scope.loading = true;
        $scope.item = item;
        $scope.potentials = potentials;
        //===============================================================
        // helpers
        //===============================================================
        $scope.processTranslations = function (translations) {
            $scope.sendButton = {
                label: translations['MODAL.DONE'],
                handler: $scope.handleSaveClicked,
                disabled: false
            };
            $scope.buttons = [
                {
                    label: translations['MODAL.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.handleCancel,
                    disabled: false
                },
                $scope.sendButton
            ];

            $scope.title = $scope.item.Name + translations['RESTORE_VOLUMES.TITLE'];
            $scope.loading = false;
        };

        $scope.handleSaveClicked = function () {
            restoreVolumesFactory.save($scope.item);
        };

        $scope.handleCancel = function () {
            restoreVolumesFactory.cancel();
        };

        $translate(['MODAL.CANCEL', 'MODAL.DONE', 'RESTORE_VOLUMES.TITLE']).then($scope.processTranslations);
    })
    .controller('restoreVolumesController', function ($scope, $filter, $translate, zSlickGridFilterTypes, restoreEditVolumeFactory, restoreWizardModel) {
        //===============================================================
        // user interactions
        //===============================================================

        $scope.handleEditSelectedClick = function () {
            restoreEditVolumeFactory.openEdit($scope.selectedItems, $scope.potentials).then($scope.onEditFactoryResult);
        };

        $scope.onEditFactoryResult = function (result) {
            var selectedVolumesPaths = _.pluck($scope.selectedItems, 'Path');
            _.each($scope.item.Volumes, function (volume) {
                if (_.contains(selectedVolumesPaths, volume.Path)) {
                    if (!restoreWizardModel.isHyperV) {
                        volume.IsThinEnabled = result.IsThinEnabled;
                    }
                    restoreWizardModel.applyDatastoreToVolume(volume, result.Destination.Datastore);
                }
            });

            $scope.updateGrid();
        };
        //===============================================================
        // grid init
        //===============================================================
        $scope.gridObj = {};
        $scope.item = $scope.$parent.item;
        $scope.potentials = $scope.$parent.potentials;

        var uiSelectEventFunction = {
            getUiSelectModel: function (item) {
                return item.Destination.Datastore.Datastore;
            },
            applyValueFunction: function (item, value) {
                item.Destination.Datastore.Datastore = value;
            },
            loadValueFunction: function (item) {
                return item.Destination.Datastore.Datastore;
            },
            serializeValueFunction: function (model) {
                return model;
            }
        };

        var getDatastoreNestedEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'datastore-nested-inline-dropdown',
                optionsCollection: $scope.potentials.Datastores,
                propName: 'DisplayName',
                innerItemAsItem: 'Datastore',
                searchEnabled: false,
                uiSelectModel: uiSelectEventFunction.getUiSelectModel,
                applyValue: uiSelectEventFunction.applyValueFunction,
                loadValue: uiSelectEventFunction.loadValueFunction,
                serializeValue: uiSelectEventFunction.serializeValueFunction
            });
        };

        $scope.restoreVolumesColumnsDefs = [
            {
                name: $translate.instant('RESTORE_EDIT_VOLUME.DATASTORE_RAW_DISK'),
                width: 250,
                field: 'Destination',
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('datastoreNestedFormatter'),
                cssClass: 'editable-cell',
                editor: getDatastoreNestedEditor()
            },
            {
                name: $translate.instant('RESTORE_EDIT_VOLUME.PATH'),
                field: 'Path',
                width: 520,
                filter: zSlickGridFilterTypes.WILDCARD
            }
        ];

        if (!restoreWizardModel.isHyperV) {
            $scope.restoreVolumesColumnsDefs.push({
                name: $translate.instant('RESTORE_EDIT_VOLUME.THIN'),
                field: 'IsThinEnabled',
                width: 100,
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('iconClassFormatter')('checkbox'),
                editor: $filter('checkboxOneClickEditor')('IsThinEnabled')
            });
        }

        $scope.selectedItems = [];
        $scope.restoreVolumesOptions = {
            columns: $scope.restoreVolumesColumnsDefs
        };
        $scope.onSelection = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
        $scope.updateGrid = function () {
            $scope.gridObj.grid.updateData($scope.item.Volumes);
        };

    });
