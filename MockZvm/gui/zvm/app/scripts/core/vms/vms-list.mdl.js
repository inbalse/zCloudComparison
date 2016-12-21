'use strict';

angular.module('zvmApp.models')
    .factory('vmsListModel', function (zertoServiceUpdaterFactory, entityCases, $filter, vpgsProgressService, $translate, enums) {
        var vmsListModel = {};
        vmsListModel.selectedVmsIdentity = [];

        vmsListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetProtectedVirtualMachineListScreen', [], false, vmsListModel._processData);
        };

        vmsListModel._processData = function (data) {
            var processed = data.VirtualMachines;
            processed = _.forEach(processed, function (item) {

                var taskData = vpgsProgressService.convertTaskData(item);
                item.stateProcess = taskData.process;
                item.vpgState = vpgsProgressService.convertStateData(item);
                item.operation = taskData.operation;

                item.id = _.combineVmIdentifier(item.VirtualMachineIdentifier.ServerIdentifier.ServerGuid + item.VirtualMachineIdentifier.InternalVmName, item.VPGIdentifier.GroupGuid);

                if (item.State) {

                    var numberOfVmsPerVpg = _.filter(processed, function (vm) {
                        return vm.VPGIdentifier.GroupGuid === item.VPGIdentifier.GroupGuid;
                    });

                    item.StateLabel = {
                        display: item.State.VMsInInitialSync !== 0 && item.State.Status === enums.VpgVisualStatus.MeetingSLA ?
                        $translate.instant('ENUM.VPG_VISUAL_STATUS.MEETING_SLA') + ' ' + (numberOfVmsPerVpg.length - item.State.VMsInInitialSync) + '/' + numberOfVmsPerVpg.length + ' VMs' :
                            $filter('vpgVisualStatusEmun')(item.State.Status),
                        value: item.State.Status
                    };
                }
                else {
                    item.StateLabel = {display: '', value: ''};
                }

                var title = '';
                switch (item.AlertStatus) {
                    case enums.ProtectionGroupAlertStatus.Warning:
                    {
                        title = item.AlertTips.Alerts.length ? _.getAlertsTip(item.AlertTips) : $translate.instant('GRID_COLUMNS.STATUS_WARNING');
                        break;
                    }
                    case enums.ProtectionGroupAlertStatus.Error:
                    {
                        title = item.AlertTips.Alerts.length ? _.getAlertsTip(item.AlertTips) : $translate.instant('GRID_COLUMNS.STATUS_ERROR');
                        break;
                    }
                    default :
                    {
                        title = item.AlertTips.Alerts.length ? _.getAlertsTip(item.AlertTips) : $translate.instant('GRID_COLUMNS.STATUS_NORMAL');
                        break;
                    }
                }

                item.AlertStatusAndTip = {display: item.AlertStatus, title: title};

                item.TargetTypeObj = {display: item.TargetSiteName, value: item.Entities.Target};
                item.SourceTypeObj = {display: item.SourceSiteName, value: item.Entities.Source};
                item.PeerSiteTypeObj = item.Direction === enums.ProtectionGroupStateVisual.Protected ?
                {display: item.TargetSiteName, value: item.Entities.Target} :
                {display: item.SourceSiteName, value: item.Entities.Source};

                item.PeerSiteGroupBy = item.Direction === enums.ProtectionGroupStateVisual.Protected ? item.TargetSiteName : item.SourceSiteName;

                //Do not change item.IOPs to item.IOPS(wrong property)
                item.IOPSObj = {display: item.IOPs + ' / ' + $translate.instant('METRICS.SEC'), value: item.IOPs};
                item.IncomingThroughputInMbObj = {
                    display: $filter('mbToStringConvertor')(item.IncomingThroughputInMb) + ' / ' + $translate.instant('METRICS.SEC'),
                    value: item.IncomingThroughputInMb
                };
                item.OutgoingBandWidthObj = {
                    display: $filter('mbToStringConvertor')(item.OutgoingBandWidth),
                    value: item.OutgoingBandWidth
                };
                item.ProvisionedStorageInMBObj = {
                    display: $filter('storageMBToStringfilter')(item.ProvisionedStorageInMB),
                    value: item.ProvisionedStorageInMB
                };
                item.UsedStorageInMBObj = {
                    display: $filter('storageMBToStringfilter')(item.UsedStorageInMB),
                    value: item.UsedStorageInMB
                };
                item.ActualRPOObj = {
                    display: $filter('displayRPO')(item.ActualRPO),
                    value: item.ActualRPO
                };
                item.LastTestObj = {
                    display: $filter('date')(item.LastTest, 'dd/MM/yyyy HH:mm:ss'),
                    value: item.LastTest
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

                var locationExist = item.State.SubStatus !== enums.VpgVisualSubStatus.Deleting && item.State.SubStatus !== enums.VpgVisualSubStatus.EmptyProtectionGroup;

                item.iconsPropertyOptions = {
                    display: item.VPGName,
                    nameText: {
                        label: item.VPGName,
                        location: locationExist ? 'main/vpg_details?id=' + item.VPGIdentifier.GroupGuid : '',
                        type: locationExist ? entityCases.caseHref : entityCases.caseText
                    },
                    deleteIcon: {
                        type: entityCases.caseDelete,
                        event: 'funcDeleteClicked',
                        enabled: item.State.ButtonsState.IsDeleteEnabled
                    },
                    editIcon: {
                        type: entityCases.caseEdit,
                        event: 'funcEditClicked',
                        enabled: item.State.ButtonsState.IsUpdateEnabled
                    }
                };

                item.DirectionObj = {
                    direction: item.Direction,
                    protectedVmVpgsInfoVisualObject: item.ProtectedVmVpgsInfoVisualObject
                };
            });

            return processed;
        };

        return vmsListModel;
    });
