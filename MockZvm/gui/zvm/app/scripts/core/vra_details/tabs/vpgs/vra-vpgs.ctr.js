'use strict';

angular.module('zvmApp.core')
    .controller('vraVPGsController', function ($scope, vraDetailsFactory, $filter, zSlickGridFilterTypes, $translate, vpgsProgressService) {

        var columnDefs = [
            {
                id: '',
                name: ' ',
                hideFromEditColumns: true,
                field: 'AlertStatus',
                maxWidth: 40,
                formatter: $filter('enumToCssClassFormatter')('protection-group-alert-status'),
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.DIRECTION'),
                id: 'Direction',
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
                name: $translate.instant('VPG_LIST.VPG_NAME'),
                field: 'Name',
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
                name: $translate.instant('VPG_VM_LIST_COL.VMS_ON_VPG_AND_VRA'),
                field: 'NumberOfVmsObj',
                views: ['Performance'],
                filter: zSlickGridFilterTypes.RANGE,
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PROVISIONED'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'ProvisionedInMBObj',
                formatter: $filter('objectFormatter'),
                views: ['Performance']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.USED'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'UsedSInMBObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.IOPS'),
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
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.RETENTION_POLICY'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'RetentionPolicyObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.BACKUP_STATUS'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'VpgBackupJobStatusObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.BACKUP_REPOSITORY'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'BackupRepository',
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.RESTORE_POINT_RANGE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'RestorePointsRangeObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.BACKUP_SCHEDULING'),
                filter: zSlickGridFilterTypes.DATE,
                field: 'BackupRelatedDataObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
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
            },
            {
                id: 'Backup',
                text: 'Backup'
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
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
            $scope.data = $scope._processData(result.Usage.VPGs);
        };

        $scope._processData = function (data) {
            var processed = data;

            processed = _.forEach(processed, function (item) {
                vpgsProgressService.convertStateData(item);
                item.id = item.Identifier.GroupGuid;
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
                item.NumberOfVmsObj = {
                    display: item.NumberOfVms + ' / ' + item.TotalNumberOfVms,
                    value: item.NumberOfVms
                };
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
                item.RetentionPolicyObj = {
                    display: $filter('retentionPolicyEnum')(item.RetentionPolicy),
                    value: item.RetentionPolicy
                };

                if (item.BackupRelatedData) {
                    item.BackupRepository = item.BackupRelatedData.BackupRepository;
                    item.VpgBackupJobStatusObj = {
                        display: $filter('vpgBackupJobStatusEnum')(item.BackupRelatedData.VpgBackupJobStatus, item.RetentionPolicy),
                        value: item.BackupRelatedData.VpgBackupJobStatus
                    };
                    item.RestorePointsRangeObj = {
                        display: $filter('restorePointRangeEnum')(item.BackupRelatedData.RestorePointsRange, item.RetentionPolicy),
                        value: item.BackupRelatedData.RestorePointsRange
                    };
                    item.BackupRelatedDataObj = {
                        display: $filter('backupSchedulingFilter')(item.BackupRelatedData, item.RetentionPolicy),
                        value: item.BackupRelatedData
                    };
                }
            });

            return processed;
        };

        vraDetailsFactory.registerToDetails($scope).then(null, null, $scope.setData);
    });
