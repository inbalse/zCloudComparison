'use strict';
angular.module('zvmApp.core')
    .constant('vraListEvents', {
        vraEdit: 'Entity::Edit',
        vraDelete: 'Entity::Delete',
        vraRetry: 'VraListEvent::RetryInstall'
    })
    .controller('vraListController', function ($scope, $filter, $stateParams, vraInstallFactory, vos, vraListEvents, vraListModel, zAlertFactory,
                                               $translate, zertoServiceFactory, vraEditFactory, enums, zSlickGridFilterTypes, changeVmRecoveryVraFactory,
                                               vraChangePasswordFactory, vraUpgradeFactory, configurePairedSiteRoutingFactory, $state, globalStateModel,
                                               $window, siteSettingsFactory, zEntitiesService, analyticsEventsTypes) {



        //==========================================================================
        //  Properties
        //==========================================================================

        var deleteTitle = $translate.instant('GRID_COLUMNS.DELETE_VRA');
        var deleteDisable = $translate.instant('GRID_COLUMNS.DELETE_VRA_DISABLED');
        var editTitle = $translate.instant('GRID_COLUMNS.EDIT_VRA');
        var editDisable = $translate.instant('GRID_COLUMNS.EDIT_VRA_DISABLED');

        var columnDefs = [
            {
                name: 'Host Address',
                field: 'HostAddress',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'Host Version',
                views: ['General'],
                field: 'HostVersion',
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {name: 'Cluster', filter: zSlickGridFilterTypes.WILDCARD, field: 'ClusterName', views: ['']},
            {
                name: ' ',
                hideFromEditColumns: true,
                maxWidth: 40,
                resizable: false,
                field: 'AlertStatus',
                views: ['General', 'Settings', 'Workload Protection'],
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('enumToCssClassFormatter')('protection-group-alert-status'),
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                name: 'VRA Name',
                field: 'vraIconsPropertyOptions',
                views: ['General', 'Settings', 'Workload Protection'],
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('zEntitiesFormatter')(zEntitiesService.createParams('vra', editTitle, editDisable, deleteTitle, deleteDisable))
            },
            {
                name: 'VRA Status',
                views: ['General'],
                field: 'VRAStatus',
                formatter: $filter('vraStatusFormatter'),
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                name: 'VRA Version',
                views: ['General'],
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'VRAVersion',
                formatter: $filter('vraVersionFormatter')
            },
            {
                name: 'VRA Address',
                views: ['General'],
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'VRAAddress'
            },
            {
                name: 'VRA Group',
                views: ['Settings'],
                field: 'VRAGroup',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'VRA RAM',
                views: ['Settings'],
                field: 'VRARAM',
                filter: zSlickGridFilterTypes.RANGE
            },
            {name: 'Datastore', filter: zSlickGridFilterTypes.WILDCARD, views: ['Settings'], field: 'DS'},
            {
                name: 'Datastore Cluster',
                views: ['Settings'],
                field: 'DSCluster',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {name: 'VC Network', filter: zSlickGridFilterTypes.WILDCARD, views: [], field: 'VCNetwork'},
            {
                name: '# VPGs',
                filter: zSlickGridFilterTypes.RANGE,
                views: ['General', 'Workload Protection'],
                field: 'NumVPGs'
            },
            {
                name: '# VMs',
                views: ['General', 'Workload Protection'],
                field: 'NumVMs',
                filter: zSlickGridFilterTypes.RANGE
            },
            {name: '# Volumes', views: [], filter: zSlickGridFilterTypes.RANGE, field: 'NumVolumes'},
            {
                name: '# of Protected VPGs',
                views: ['Workload Protection'],
                field: 'NumProtectedVPGs',
                filter: zSlickGridFilterTypes.RANGE
            },
            {
                name: '# of Protected VMs',
                views: ['Workload Protection'],
                field: 'NumProtectedVMs',
                filter: zSlickGridFilterTypes.RANGE
            },
            {
                name: '# of Protected Volumes',
                views: ['Workload Protection'],
                field: 'NumProtectedVolumes',
                filter: zSlickGridFilterTypes.RANGE
            },
            {
                name: '# of Recovery VPGs',
                views: ['Workload Protection'],
                field: 'NumRecoveryVPGs',
                filter: zSlickGridFilterTypes.RANGE
            },
            {
                name: '# of Recovery VMs',
                views: ['Workload Protection'],
                field: 'NumRecoveryVMs',
                filter: zSlickGridFilterTypes.RANGE
            },
            {
                name: '# of Recovery Volumes',
                views: ['Workload Protection'],
                field: 'NumRecoveryVolumes',
                filter: zSlickGridFilterTypes.RANGE
            }
        ];

        $scope.selectedItems = [];
        $scope.isUninstallDisabled = true;
        $scope.installEnabled = false;
        $scope.isPairedSiteRounigEnabled = false;
        $scope.editEnabled = false;
        $scope.selectedGroup = 'ClusterName';
        $scope.isEditEnabled = true;
        $scope.isUpgradeEnabled = false;
        $scope.IsChangeHostEnabled = false;
        $scope.gridObj = {};

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true
        };

        $scope.viewByValues = [
            {
                id: 'General',
                text: 'General'
            },
            {
                id: 'Settings',
                text: 'Settings'
            },
            {
                id: 'Workload Protection',
                text: 'Workload Protection'
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'ClusterName',
                text: $translate.instant('GROUP_BY_LIST.CLUSTER')
            },
            {
                id: 'VRAGroup',
                text: $translate.instant('GROUP_BY_LIST.VRA_GROUP')
            }
        ];

        //==========================================================================
        // Click Edit/Install VRA events
        $scope.rowClick = function (e, row) {
            var vra;
            if (e.target.value === vraListEvents.vraEdit) {
                e.preventDefault();

                $scope.$emit(analyticsEventsTypes.SETUP.EDIT_VRA.START);

                vra = $scope.gridObj.grid.getDataItem(row);
                vraEditFactory.showVraEdit(vra);
            }

            if (e.target.value === vraListEvents.vraDelete) {
                e.preventDefault();

                $scope.$emit(analyticsEventsTypes.SETUP.DELETE_VRA);

                vra = $scope.gridObj.grid.getDataItem(row);
                $scope.uninstallVra(vra);
            }

            if (e.target.rel === vraListEvents.vraRetry) {
                e.preventDefault();

                vra = $scope.gridObj.grid.getDataItem(row);
                vraInstallFactory.showInstallVra(vra.VraInfo);
            }
        };

        //==========================================================================

        //todo in 5.0 ATHENA create common service fom manage state go location
        //check if quick start needed
        if($stateParams.quickInstall=== 'true'){
            vraInstallFactory.showInstallVra();
            $state.go('.', {quickInstall: undefined});
        }

        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.export = function () {
            $window.open('/ZvmService/VraExcelReport/getVraList');
        };

        $scope.openInstallVra = function () {
            $scope.$emit(analyticsEventsTypes.SETUP.NEW_VRA.START);
            vraInstallFactory.showInstallVra();
        };

        $scope.openEditVra = function () {
            $scope.$emit(analyticsEventsTypes.SETUP.EDIT_VRA.START);
            vraEditFactory.showVraEdit($scope.selectedItems[0]);
        };

        $scope.openUpgradeVra = function () {
            if ($scope.selectedItems.length !== 0) {
                var toUpgradeVras = [];
                _.each($scope.selectedItems, function (item) {
                    toUpgradeVras.push(item);
                });

                vraUpgradeFactory.showVraUpgrade(toUpgradeVras, $scope.LatestVraVersion);
            }
        };

        $scope.uninstallVra = function (vra) {
            $scope.$emit(analyticsEventsTypes.SETUP.DELETE_VRA);
            if ($scope.isUninstallContainRecoveryVps(vra)) {
                zAlertFactory.fail($translate.instant('VRA_LIST.UNINSTALL_HEADLINE'), $translate.instant('VRA_LIST.UNINSTALL_RECOVERY'));
            } else {
                zAlertFactory.warn($translate.instant('VRA_LIST.UNINSTALL_HEADLINE'), $scope.getUninstallAlertText(), function (event) {
                    $scope._handleUninstallClick(event, vra);
                });
            }
        };

        $scope.changeHostPassword = function () {
            var temp = [];
            _.forEach($scope.selectedItems, function (vraItem) {
                var hostIdent = new vos.HostIdentifier();
                hostIdent.ServerIdentifier = vraItem.VraInfo.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier;
                hostIdent.InternalHostName = vraItem.VraInfo.HostInfo.BaseComputeResourceIdentifier.InternalName;
                temp.push(hostIdent);
            });

            var isVibUsed = _.contains(_.pluck($scope.selectedItems, 'installedUsingSshKey'), false);
            var atLeastOneVraIsAbove51 = false;
            var atLeastOneVraIsBelow51 = false;

            _.forEach($scope.selectedItems, function (vraItem) {
                if (parseFloat(vraItem.HostVersion) > 5.1) {
                    atLeastOneVraIsAbove51 = true;
                }
                if (parseFloat(vraItem.HostVersion) <= 5.1) {
                    atLeastOneVraIsBelow51 = true;
                }
            });


            if (atLeastOneVraIsAbove51 && atLeastOneVraIsBelow51) {
                zAlertFactory.fail('Mixed Host Versions Selected', 'Cannot change password on mixed versions hosts');
            } else {
                vraChangePasswordFactory.showVraChangePasswordWindow(temp, isVibUsed, (atLeastOneVraIsBelow51 && !atLeastOneVraIsAbove51));
            }
        };

        $scope.handleChangeVmRecoveryVra = function () {
            changeVmRecoveryVraFactory.open($scope.selectedItems[0].VraInfo.HostInfo.BaseComputeResourceIdentifier);
        };

        //==========================================================================
        //  Helpers
        //==========================================================================

        $scope._handleUninstallClick = function (event, vra) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                var sendVRAs = [];

                if (angular.isDefined(vra)) {
                    sendVRAs.push($scope._getVRAHostIdentifier(vra));
                } else {
                    $scope.selectedItems.forEach(function (item) {
                        sendVRAs.push($scope._getVRAHostIdentifier(item));
                    });
                }

                zertoServiceFactory.UninstallVras(sendVRAs).then(function () {
                }, function (result) {
                    zAlertFactory.fail($translate.instant('VRA_LIST.UNINSTALL_HEADLINE'), result.faultString);
                });
            }
        };

        $scope.handlePairSiteRouting = function () {
            //open configure paired site routing
            configurePairedSiteRoutingFactory.openWindow();
        };

        $scope._getVRAHostIdentifier = function (item) {
            var result = new vos.HostIdentifier();

            result.ServerIdentifier = item.ServerIdentifier;
            result.InternalHostName = item.InternalName;

            return result;
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        $scope.getUninstallAlertText = function () {
            var result = $translate.instant('VRA_LIST.UNINSTALL_NORMALLY');
            var containGhost = false;
            var containCluster = false;

            $scope.selectedItems.forEach(function (item) {
                if (item.IsGhost && !containGhost) {
                    containGhost = true;
                }
                if (item.IsPartOfCluster && !containCluster) {
                    containCluster = true;
                }
            });
            var points = '';
            var sign = containGhost && containCluster ? '- ' : '';
            if (containGhost) {
                points = sign + $translate.instant('VRA_LIST.UNINSTALL_GHOSTS');
            }
            if (containCluster) {
                if (points) {
                    points = points + '<br/>';
                }

                if (globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV) {
                    points = points + sign + $translate.instant('VRA_LIST.UNINSTALL_CLUSTER_HYPERV');
                } else {
                    points = points + sign + $translate.instant('VRA_LIST.UNINSTALL_CLUSTER');
                }
            }

            if (points) {
                if (containGhost && containCluster) {
                    result = result + '<br/>' + $translate.instant('VRA_LIST.NOTE') + points;
                } else {
                    result = result + '<br/><br/>' + points;
                }
            }

            result = result + '<br/><br/>' + $translate.instant('VRA_LIST.UNINSTALL_QUESTION');
            return result;
        };


        $scope.isUninstallContainRecoveryVps = function (vra) {
            if (angular.isDefined(vra)) {
                return vra.NumRecoveryVPGs > 0;
            } else {
                var result = _.find($scope.selectedItems, function (item) {
                    return item.NumRecoveryVPGs > 0;
                });

                if (angular.isDefined(result)) {
                    return result.length > 0;
                } else {
                    return false;
                }
            }
        };

        $scope.checkIfIsUninstallVRAEnabled = function () {
            return _.contains(_.pluck($scope.selectedItems, 'IsUninstallEnabled'), true);
        };

        $scope.isEditVRAEnabled = function () {
            if (!$scope.editEnabled) {
                return false;
            }

            if ($scope.selectedItems.length === 1) {
                var item = $scope.selectedItems[0];
                if (item.IsEditEnabled) {
                    return true;
                }
            }
            return false;
        };

        $scope.updateIsHostPasswordEnabled = function () {
            return ($scope.selectedItems.length > 0 && !_.some($scope.selectedItems, function (item) {
                return !item.VraInfo || !item.VraInfo.State || !item.VraInfo.State.IsChangePasswordEnabled;
            }));
        };

        $scope._isUpgradeVraEnabled = function () {
            var pluck = _.pluck($scope.selectedItems, 'IsUpgradeEnabled');
            return $scope.selectedItems.length > 0 && !_.contains(pluck, false) && !_.contains(pluck, undefined);
        };

        $scope.selectedItemsChange = function () {
            $scope.isUninstallDisabled = !$scope.checkIfIsUninstallVRAEnabled();
            $scope.isEditEnabled = !$scope.isEditVRAEnabled();
            $scope.isUpgradeEnabled = $scope._isUpgradeVraEnabled();
            $scope.isChangeHostPasswordEnabled = $scope.updateIsHostPasswordEnabled();
            //check if selected one vra and add selected vra for install vra window
            vraInstallFactory.preSelectedVraHostsAdress = $scope.selectedItems.length === 1 ? $scope.selectedItems[0].HostAddress : '';

            $scope.IsChangeHostEnabled = $scope.selectedItems && $scope.selectedItems.length === 1 && $scope.selectedItems[0].VraInfo && $scope.selectedItems[0].VraInfo.State.IsChangeHostEnabled;

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.showOnlyHostWithVraInstallChecked = vraListModel.isShowOnlyHostWithVraInstall;
        $scope.showOnlyHostWithVraInstallChange = function () {
            vraListModel.showOnlyHostWithVraInstall($scope.showOnlyHostWithVraInstallChecked);
        };

        //request the site list data from server
        vraListModel.register($scope).then(null, null, function (result) {
            $scope.data = result.VraListTree;

            $scope.editEnabled = vraListModel.isEnableManageVrasEnabled = result.EnableManageVras;
            $scope.installEnabled = result.CanInstallAdditionalVras;
            $scope.LatestVraVersion = result.LatestVraVersion;
            $scope.isPairedSiteRounigEnabled = result.EnablePairedSiteRouting;
        });
    });
