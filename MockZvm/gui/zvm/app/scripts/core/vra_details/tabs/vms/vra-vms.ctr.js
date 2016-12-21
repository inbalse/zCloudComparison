'use strict';
angular.module('zvmApp.core')
    .controller('vraVMsController', function ($scope, vraDetailsFactory, $filter, zSlickGridFilterTypes, $translate, vpgsProgressService) {
        var columnDefs = [
            {
                name: ' ',
                hideFromEditColumns: true,
                field: 'AlertStatus',
                maxWidth: 40,
                formatter: $filter('enumToCssClassFormatter')('protection-group-alert-status'),
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                id: 'Direction',
                name: $translate.instant('VPG_VM_LIST_COL.DIRECTION'),
                field: 'Direction',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                maxWidth: 60,
                views: ['General'],
                formatter: $filter('enumToCssClassFormatter')('protection-group-state-visual')
            },
            {
                id: 'SourceSiteName',
                name: $translate.instant('VPG_VM_LIST_COL.PROTECTED_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'SourceSiteName',
                views: ['General']
            },
            {
                id: 'TargetSiteName',
                name: $translate.instant('VPG_VM_LIST_COL.REMOTE_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'TargetSiteName',
                views: ['General'],
                formatter: $filter('textWithEnumToCssClassFormatter')('remote-site-icon', 'propertyDoesNotExists')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.ZORG'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'CustomerName',
                views: ['']
            },
            {
                name: $translate.instant('VM_LIST.NAME'),
                field: 'VirtualMachineName',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                id: 'VPGName',
                name: $translate.instant('VM_LIST.VPG_NAME'),
                field: 'VPGName',
                formatter: $filter('htmlNameRenderer'),
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PROTECTION_STATUS'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'StateLabel',
                views: ['General'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.STATE'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'vpgState',
                views: ['General'],
                formatter: $filter('progressFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PROVISIONED_ON_HOST'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'ProvisionedInMBObj',
                formatter: $filter('objectFormatter'),
                views: ['Performance']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.USED_ON_HOST'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'UsedSInMBObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.IO'),
                filter: zSlickGridFilterTypes.RANGE,
                field: 'IOPSObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.THROUGHPUT'),
                filter: zSlickGridFilterTypes.RANGE,
                field: 'IncomingThroughputInMbObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: false,
            showSearch: true,
            showGroupBy: true
        };

        $scope.viewByValues = [
            {
                id: 'General',
                text: 'General'
            },
            {
                id: 'Performance',
                text: 'Performance'
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'VPGName',
                text: $translate.instant('GROUP_BY_LIST.VPG_NAME')
            },
            {
                id: 'Direction',
                text: $translate.instant('GROUP_BY_LIST.DIRECTION')
            },
            {
                id: 'SourceSiteName',
                text: $translate.instant('GROUP_BY_LIST.PROTECTED_SITE')
            },
            {
                id: 'TargetSiteName',
                text: $translate.instant('GROUP_BY_LIST.REMOTE_SITE')
            }
        ];

        $scope.setData = function (result) {
            $scope.data = $scope._processData(result.Usage.VMs);
        };

        $scope._processData = function (data) {
            var processed = data;

            processed = _.forEach(processed, function (item) {
                vpgsProgressService.convertStateData(item);
                item.id = _.combineVmIdentifier(item.VirtualMachineIdentifier.ServerIdentifier.ServerGuid + item.VirtualMachineIdentifier.InternalVmName, item.VPGIdentifier.GroupGuid);


                if (item.State) {
                    item.StateLabel = {
                        display: $filter('vpgVisualStatusEmun')(item.State.Status),
                        value: item.State.Status
                    };
                }
                else {
                    item.StateLabel = {display: '', value: ''};
                }
                item.AlertStatus = item.State.AlertStatus;
                item.ProvisionedInMBObj = {
                    display: $filter('storageMBToStringfilter')(item.ProvisionedStorageInMB),
                    value: item.ProvisionedStorageInMB
                };
                item.UsedSInMBObj = {
                    display: $filter('storageMBToStringfilter')(item.UsedStorageInMB),
                    value: item.UsedStorageInMB
                };
                item.IOPSObj = {display: item.IOPS + ' / ' + $translate.instant('METRICS.SEC'), value: item.IOPS};
                item.IncomingThroughputInMbObj = {
                    display: $filter('mbToStringConvertor')(item.IncomingThroughputInMb) + ' / ' + $translate.instant('METRICS.SEC'),
                    value: item.IncomingThroughputInMb
                };

            });

            return processed;
        };

        vraDetailsFactory.registerToDetails($scope).then(null, null, $scope.setData);
    });
