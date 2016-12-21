'use strict';

angular.module('zvmApp.core')
    .controller('configureCheckpointController', function ($scope, checkpoints, checkpointId, vpgName, openPlace, $translate,
                                                           configureCheckpointFactory, $filter, zSlickGridFilterTypes, configureCheckpointCons) {
        $scope.loading = true;
        $scope.data = {};
        $scope.gridObj = {};
        $scope.selectedItems = [];
        $scope.preSelect = [];

        var typeHash = {};
        var afterRefreshObj = {type: 4, isAfterRefresh: false};

        $scope.currentTitleInfo = openPlace;
        $scope.checkpoints = checkpoints;

        $scope.dateOptions = {
            range: configureCheckpointFactory.getLatestCheckpointDateSpan(),
            oneDateOnly: configureCheckpointFactory.isOneDate(),
            minDate: configureCheckpointFactory.getEarliestCheckpointDate().toISOString(),
            maxDate: configureCheckpointFactory.getLatestCheckpointDate().toISOString()
            // disabledDates: configureCheckpointFactory.getDisabledDates()
        };

        //===========================================================================
        // Grid stuff
        //===========================================================================
        var columnDefs = [
            {
                id: configureCheckpointCons.PROP_TIMESTAMP,
                name: 'Time',
                field: 'timeObj',
                formatter: $filter('textWithEnumToCssClassFormatter')('cp-list', 'timeObj'),
                filter: zSlickGridFilterTypes.DATE
            },
            {
                id: configureCheckpointCons.PROP_TAG,
                name: 'Name',
                field: configureCheckpointCons.PROP_TAG,
                filter: zSlickGridFilterTypes.WILDCARD,
                width: 90
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            multiSelect: false,
            defaultSortField: configureCheckpointCons.PROP_TIMESTAMP,
            defaultSortAsc: false
        };

        //===========================================================================
        // helper functions
        //===========================================================================
        function getCpTypeByProp(coll, prop) {
            return _.filter(coll, function (cp) {
                return angular.isDefined(cp[prop]) && cp[prop] !== null && cp[prop] !== false;
            });
        }

        $scope._isItemTypeVisible = function (item) {
            if (item.Vss) {
                return $scope.filter.showVSS;
            } else if (item.Tag) {
                return $scope.filter.showManual;
            }

            return $scope.filter.showRegular;
        };

        $scope._getLatest = function (coll) {
            return _.max(coll, configureCheckpointCons.PROP_TIMESTAMP);
        };

        $scope._getLatestManual = function (coll) {
            var manualCp = getCpTypeByProp(coll, configureCheckpointCons.PROP_TAG);
            _.remove(manualCp, function (cp) {
                return cp.Vss;
            });
            if (manualCp.length !== 0) {
                return _.max(manualCp, configureCheckpointCons.PROP_TIMESTAMP);
            }
        };

        $scope._getLatestVSS = function (coll) {
            var VssCp = getCpTypeByProp(coll, configureCheckpointCons.PROP_VSS);
            if (VssCp.length !== 0) {
                return _.max(VssCp, configureCheckpointCons.PROP_TIMESTAMP);
            }
        };

        function _getSelectedCheckpoint() {
            typeHash = {
                1: $scope.latest,
                2: $scope.latestManual,
                3: $scope.latestVSS,
                4: $scope.selectedItems[0]
            };
            return typeHash[$scope.data.type];
        }

        function preSelected(item, onGridPressSelect) {
            if (!onGridPressSelect) {
                if ($scope.gridObj.grid && $scope.filteredCheckpoints.length) {
                    var index = _.findIndex($scope.filteredCheckpoints, {Identifier: item.Identifier});
                    $scope.gridObj.grid.setSelectedRows([index]);
                }
            } else if ($scope.selectedItems.length === 0) {
                $scope.selectedItems.push(item);
            }
        }

        //return available checkpoints filteredCheckpoints can be empty after user filter
        function getAvailableCheckpoints() {
            return $scope.filteredCheckpoints.length !== 0 ? $scope.filteredCheckpoints : $scope.checkpoints;
        }

        function buttonState() {
            $scope.buttons[1].disabled = $scope.data.type === 4 && ($scope.filteredCheckpoints.length === 0 || $scope.selectedItems.length === 0);
        }

        //===========================================================================
        // User interaction
        //===========================================================================

        $scope.handleCancel = function () {
            configureCheckpointFactory.close();
        };

        $scope.handleSave = function () {
            configureCheckpointFactory.save(_getSelectedCheckpoint());
        };

        $scope.handleRefreshButtonClicked = function () {
            $scope.refresh();
        };

        $scope.onDateChange = function () {
            $scope.refresh();
        };

        $scope.refresh = function () {
            configureCheckpointFactory.refresh($scope.dateOptions.range).then(function (result) {
                $scope.checkpoints = configureCheckpointFactory._changeData(result);
                $scope.filteredCheckpoints = _.filter($scope.checkpoints, $scope._isItemTypeVisible);
                afterRefreshObj.isAfterRefresh = true;
                afterRefreshObj.type = $scope.data.type;
            });
        };

        $scope.gridRenderCompleted = function () {
            if (afterRefreshObj.isAfterRefresh) {
                $scope.typeClick(afterRefreshObj.type);
                afterRefreshObj.isAfterRefresh = false;
            }
        };

        $scope.typeClick = function (type) {
            if (angular.isDefined(type)) {
                if (type !== 4) {
                    $scope.resetFilter();
                }
                var checkpoints = getAvailableCheckpoints();
                if (_.isEmpty(checkpoints)) {
                    return;
                }
                switch (type) {
                    case 1:
                        $scope.latest = $scope._getLatest(checkpoints);
                        $scope._applyCurrentConfiguration(checkpoints, $scope.latest.Identifier);
                        break;
                    case 2:
                        $scope.latestManual = $scope._getLatestManual(checkpoints);
                        $scope._applyCurrentConfiguration(checkpoints, $scope.latestManual.Identifier);
                        break;
                    case 3:
                        $scope.latestVSS = $scope._getLatestVSS(checkpoints);
                        $scope._applyCurrentConfiguration(checkpoints, $scope.latestVSS.Identifier);
                        break;
                }

                $scope.filteredCheckpoints = _.filter($scope.checkpoints, $scope._isItemTypeVisible);
                buttonState();
            }
        };

        $scope.manualFilterClick = function () {
            if ($scope.data.type === 1) {
                $scope._applyCurrentConfiguration($scope.filteredCheckpoints, $scope._getLatest(getAvailableCheckpoints()).Identifier);
            }
            buttonState();
        };

        $scope.userFilterClick = function () {
            $scope.filteredCheckpoints = _.filter($scope.checkpoints, $scope._isItemTypeVisible);
            if (_.isEmpty($scope.filteredCheckpoints)) {
                $scope.selectedItems.length = 0;
                $scope.gridObj.grid.updateSelectedItems();
            }
            buttonState();
        };

        //===========================================================================
        // init
        //===========================================================================

        $scope.filter = {
            showRegular: true,
            showManual: true,
            showVSS: true
        };

        $scope.init = function () {
            $scope.latest = $scope._getLatest($scope.checkpoints);
            $scope.latestManual = $scope._getLatestManual($scope.checkpoints);
            $scope.latestVSS = $scope._getLatestVSS($scope.checkpoints);

            $scope.buttons = [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.handleCancel,
                    disabled: false
                },
                {label: $translate.instant('MODAL.OK'), handler: $scope.handleSave, disabled: false}
            ];

            $scope.title = vpgName + $translate.instant('CONFIGURE_CHECKPOINT.TITLE');
            $scope.filteredCheckpoints = _.filter($scope.checkpoints, $scope._isItemTypeVisible);
            $scope._applyCurrentConfiguration($scope.filteredCheckpoints, checkpointId, true);
            $scope.loading = false;
        };

        $scope._applyCurrentConfiguration = function (checkpoints, checkpointId, onGridPressSelect) {
            var foundCp = _.find(checkpoints, {Identifier: checkpointId});
            if (foundCp) {

                $scope.latest = $scope._getLatest(getAvailableCheckpoints());

                if ($scope.latest && foundCp.Identifier === $scope.latest.Identifier) {
                    $scope.data.type = 1;
                } else if ($scope.latestManual && foundCp.Identifier === $scope.latestManual.Identifier) {
                    $scope.data.type = 2;
                } else if ($scope.latestVSS && foundCp.Identifier === $scope.latestVSS.Identifier) {
                    $scope.data.type = 3;
                } else {
                    $scope.data.type = 4;
                }

                preSelected(foundCp, onGridPressSelect);

            } else {
                $scope.data.type = 1;
            }
        };

        $scope.selectedItemsChange = function () {
            if (angular.isDefined($scope.selectedItems[0])) {
                $scope._applyCurrentConfiguration($scope.selectedItems, $scope.selectedItems[0].Identifier, true);
            }

            buttonState();

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.resetFilter = function() {
            $scope.filter = {
                showRegular: true,
                showManual: true,
                showVSS: true
            };
        };

        $scope.init();
    });
