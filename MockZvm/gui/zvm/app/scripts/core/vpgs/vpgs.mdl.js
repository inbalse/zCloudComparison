'use strict';

angular.module('zvmApp.models')
    .factory('vpgsModel', function ($translate, $filter, enums, entityCases, vpgsProgressService, zSlickGridFilterTypes,
                                    globalStateModel, zEntitiesService, multiSelectClassConstants, vpgsStatusFilterService) {
        var vpgsModel = {};
        var initialItems = [];

        //region process
        vpgsModel.setItemId = function (item) {
            item.id = item.Identifier.GroupGuid;
        };

        vpgsModel.setStateLabel = function (item) {
            if (item.State) {
                item.StateLabel = {
                    display: item.State.VMsInInitialSync !== 0 && item.State.Status === enums.VpgVisualStatus.MeetingSLA ?
                    $translate.instant('ENUM.VPG_VISUAL_STATUS.MEETING_SLA') + ' ' + (item.NumberOfVms - item.State.VMsInInitialSync) + '/' + item.NumberOfVms + ' VMs' :
                        $filter('vpgVisualStatusEmun')(item.State.Status),
                    value: item.State.Status
                };
            }
            else {
                item.StateLabel = {display: '', value: ''};
            }
        };

        vpgsModel.setSourceTypeObj = function (item) {
            item.SourceTypeObj = {
                display: item.SourceSiteName,
                value: item.Entities.Source,
                filterValue: item.SourceSiteName
            };
        };

        vpgsModel.setTargetTypeObj = function (item) {
            item.TargetTypeObj = {
                display: item.TargetSiteName,
                value: item.Entities.Target,
                filterValue: item.TargetSiteName
            };
        };

        vpgsModel.setPeerSiteTypeObj = function (item) {
            item.PeerSiteTypeObj = item.Direction === enums.ProtectionGroupStateVisual.Protected ? item.TargetTypeObj : item.SourceTypeObj;
        };

        vpgsModel.setPeerSiteGroupBy = function (item) {
            item.PeerSiteGroupBy = item.PeerSiteTypeObj.display;
        };

        vpgsModel.setIOPSObj = function (item) {
            item.IOPSObj = {display: item.IOPS + ' / ' + $translate.instant('METRICS.SEC'), value: item.IOPS};
        };

        vpgsModel.setIncomingThroughputInMbObj = function (item) {
            item.IncomingThroughputInMbObj = {
                display: $filter('mbToStringConvertor')(item.IncomingThroughputInMb) + ' / ' + $translate.instant('METRICS.SEC'),
                value: item.IncomingThroughputInMb
            };
        };

        vpgsModel.setOutgoingBandWidthObj = function (item) {
            item.OutgoingBandWidthObj = {
                display: $filter('mbToStringConvertor')(item.OutgoingBandWidth),
                value: item.OutgoingBandWidth
            };
        };

        vpgsModel.setProvisionedStorageInMBObj = function (item) {
            item.ProvisionedStorageInMBObj = {
                display: $filter('storageMBToStringfilter')(item.ProvisionedStorageInMB),
                value: item.ProvisionedStorageInMB
            };
        };
        vpgsModel.setUsedStorageInMBObj = function (item) {
            item.UsedStorageInMBObj = {
                display: $filter('storageMBToStringfilter')(item.UsedStorageInMB),
                value: item.UsedStorageInMB
            };
        };
        vpgsModel.setLastTestObj = function (item) {
            item.LastTestObj = {
                display: $filter('date')(item.LastTest, 'dd/MM/yyyy HH:mm:ss'),
                value: item.LastTest
            };
        };
        vpgsModel.setRetentionPolicyObj = function (item) {
            item.RetentionPolicyObj = {
                display: $filter('retentionPolicyEnum')(item.RetentionPolicy),
                value: item.RetentionPolicy
            };
        };
        vpgsModel.setLocationExist = function (item) {
            item.locationExist = !_.isNullOrUndefined(item.SampleVM) && item.State.SubStatus !== enums.VpgVisualSubStatus.Deleting &&
                item.State.SubStatus !== enums.VpgVisualSubStatus.EmptyProtectionGroup;
        };

        vpgsModel.setNameObj = function (item) {
            item.NameObj = {
                display: item.Name,
                nameText: {
                    location: item.locationExist ? 'main/vpg_details?id=' + item.Identifier.GroupGuid : '',
                    type: item.locationExist ? entityCases.caseHref : entityCases.caseText
                }
            };
        };

        vpgsModel.setBackupRelatedData = function (item) {
            if (_.isNullOrUndefined(item.BackupRelatedData)) {
                return;
            }

            var statusDisplay = $filter('vpgBackupJobStatusEnum')(item.BackupRelatedData.VpgBackupJobStatus, item.RetentionPolicy),
                rangeDisplay = $filter('restorePointRangeEnum')(item.BackupRelatedData.RestorePointsRange, item.RetentionPolicy),
                dataDisplay = $filter('backupSchedulingFilter')(item.BackupRelatedData, item.RetentionPolicy);

            item.BackupRepository = item.BackupRelatedData.BackupRepository;

            item.VpgBackupJobStatusObj = {
                display: statusDisplay,
                value: item.BackupRelatedData.VpgBackupJobStatus,
                filterValue: statusDisplay
            };
            item.RestorePointsRangeObj = {
                display: rangeDisplay,
                value: item.BackupRelatedData.RestorePointsRange,
                filterValue: rangeDisplay
            };
            item.BackupRelatedDataObj = {
                display: dataDisplay,
                value: item.BackupRelatedData,
                filterValue: dataDisplay
            };
        };

        vpgsModel.setVpgState = function (item) {
            item.vpgState = vpgsProgressService.convertStateData(item);

        };

        vpgsModel.getInitialItems = function () {
            return initialItems;
        };

        vpgsModel.setTcoObject = function (item) {
			
			var actualTco = Math.round(250+0.1*item.UsedStorageInMB);
			var AWSTco = Math.round(100 +  0.0295*item.UsedStorageInMB);
			var azureTco = Math.round(70 + 0.05 *item.UsedStorageInMB);
			var iLandTco = Math.round(150+ 0.7*item.UsedStorageInMB);
			var NavisiteTco = Math.round(155+ 0.8*item.UsedStorageInMB);
			var Peak10Tco = Math.round(160+ 0.9*item.UsedStorageInMB);
			
			var AWSSave = actualTco - AWSTco;
			var azureSave = actualTco - azureTco;
			var iLandSave = actualTco - iLandTco;
			var NavisiteSave = actualTco - NavisiteTco;
			var Peak10Save = actualTco - Peak10Tco;
			
			var bestSave = Math.max(AWSSave, azureSave, iLandSave, NavisiteSave, Peak10Save);
			
            item.tco = {realTco: "$"+actualTco+"k",
                bestSave: "$"+bestSave+"k",
                alternativeTco:[
                    {cloud: 'Azure',tco:'$'+azureTco+'k',save:'$'+azureSave+'k',saveNum:azureSave},
                    {cloud: 'AWS', tco:'$'+AWSTco+'k',save:'$'+AWSSave+'k',saveNum:AWSSave},
                    {cloud: 'iLand', tco:'$'+iLandTco+'k',save:'$'+iLandSave+'k',saveNum:iLandSave},
                    {cloud: 'NaviSite', tco:'$'+NavisiteTco+'k',save:'$'+NavisiteSave+'k',saveNum:NavisiteSave},
                    {cloud: 'Peak10', tco:'$'+Peak10Tco+'k',save:'$'+Peak10Save+'k',saveNum:Peak10Save}
                ]};
        };

        vpgsModel.processData = function (vpgs) {


            initialItems = vpgs;

            vpgs = vpgsStatusFilterService.getVpgsFilteredByStatus(vpgs);

            return _.forEach(vpgs, function (item, i) {

                item.sortIndex = i;

                vpgsModel.setItemId(item);

                vpgsModel.setStateLabel(item);

                vpgsModel.setTcoObject(item);

                vpgsModel.setSourceTypeObj(item);
                vpgsModel.setTargetTypeObj(item);

                vpgsModel.setPeerSiteTypeObj(item);

                vpgsModel.setPeerSiteGroupBy(item);

                vpgsModel.setIOPSObj(item);

                vpgsModel.setIncomingThroughputInMbObj(item);

                vpgsModel.setOutgoingBandWidthObj(item);

                vpgsModel.setProvisionedStorageInMBObj(item);

                vpgsModel.setUsedStorageInMBObj(item);

                vpgsModel.setLastTestObj(item);

                vpgsModel.setRetentionPolicyObj(item);

                vpgsModel.setBackupRelatedData(item);

                vpgsModel.setLocationExist(item);

                vpgsModel.setNameObj(item);

                vpgsModel.setVpgState(item);

            });
        };
        //endregion


        //TODO: maybe move these function to another service
        vpgsModel.getGridColumnsDefs = function () {
            var deleteTitle = $translate.instant('GRID_COLUMNS.DELETE_VPG'),
                editTitle = $translate.instant('GRID_COLUMNS.EDIT_VPG'),
                deleteDisable = $translate.instant('GRID_COLUMNS.DELETE_VPG_DISABLED'),
                editDisable = $translate.instant('GRID_COLUMNS.EDIT_VPG_DISABLED');


            return [
                {
                    name: $translate.instant('VPG_LIST.ALERT_STATUS'),
                    hideFromEditColumns: true,
                    maxWidth: 40,
                    resizable: false,
                    field: 'AlertStatus',
                    views: ['General', 'Performance', 'Backup'],
                    formatter: $filter('enumToCssClassFormatter')('protection-group-alert-status'),
                    headerCssClass: 'protection-group-alert-status-header'
                },
                {
                    name: $translate.instant('VPG_LIST.NAME'),
                    minWidth: 160, //26680
                    views: ['General', 'Performance', 'Backup'],
                    toolTip: $translate.instant('GRID_COLUMNS.VPG_NUMBER_VMS'),
                    field: 'NameObj',
                    filter: zSlickGridFilterTypes.WILDCARD,
                    formatter: $filter('zEntitiesFormatter')(zEntitiesService.createParams('vpg', editTitle, editDisable, deleteTitle, deleteDisable))
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.DIRECTION'),
                    maxWidth: 100,
                    field: 'Direction',
                    filter: zSlickGridFilterTypes.MULTI_SELECT,
                    views: ['General'],
                    formatter_class: 'protection-group-state-visual',
                    formatter: $filter('enumToCssClassGroupFormatter')('protection-group-state-visual'),
                    card_default: true,
                    card_formatter: multiSelectClassConstants.FORMATTER_TYPE.CLASS_GROUP
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.PROTECTED_SITE'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'SourceTypeObj',
                    views: [''],
                    formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.REMOTE_SITE'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'TargetTypeObj',
                    views: [''],
                    formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.PEER_SITE'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'PeerSiteTypeObj',
                    views: ['General'],
                    formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.PRIORITY'),
                    maxWidth: 85,
                    toolTip: $translate.instant('GRID_COLUMNS.PRIORITY'),
                    filter: zSlickGridFilterTypes.MULTI_SELECT,
                    field: 'Priority',
                    views: globalStateModel.data.IsPortal ? [''] : ['General'],
                    formatter_class: 'protection-group-priority',
                    formatter: $filter('enumToCssClassFormatter')('protection-group-priority'),
                    card_formatter: multiSelectClassConstants.FORMATTER_TYPE.CLASS
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.PROTECTION_STATUS'),
                    filter: zSlickGridFilterTypes.MULTI_SELECT,
                    field: 'StateLabel',
                    views: ['General'],
                    formatter: $filter('objectFormatter'),
                    card_default: true,
                    card_formatter: multiSelectClassConstants.FORMATTER_TYPE.DISPLAY
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.ZORG'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'CustomerName',
                    views: ['']
                },
                {
                    name: 'Monthly TCO',
                    field: 'tco',
                    views: ['General'],
                    formatter: $filter('tcoFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.IO'),
                    toolTip: $translate.instant('GRID_COLUMNS.IO'),
                    filter: zSlickGridFilterTypes.RANGE,
                    field: 'IOPSObj',
                    views: ['Performance'],
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.THROUGHPUT'),
                    toolTip: $translate.instant('GRID_COLUMNS.THROUGHPUT'),
                    filter: zSlickGridFilterTypes.RANGE,
                    field: 'IncomingThroughputInMbObj',
                    views: ['Performance'],
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.NETWORK'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'OutgoingBandWidthObj',
                    views: ['Performance'],
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.PROVISIONED_STORAGE'),
                    toolTip: $translate.instant('GRID_COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'ProvisionedStorageInMBObj',
                    formatter: $filter('objectFormatter'),
                    views: ['Performance']
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.USED_STORAGE'),
                    toolTip: $translate.instant('GRID_COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'UsedStorageInMBObj',
                    views: ['Performance'],
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.ACTUAL_RPO'),
                    toolTip: $translate.instant('GRID_COLUMNS.ACTUAL_RPO'),
                    filter: zSlickGridFilterTypes.RANGE,
                    field: 'ActualRPOObj',
                    views: ['General'],
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.LAST_TEST'),
                    toolTip: $translate.instant('GRID_COLUMNS.LAST_TEST'),
                    filter: zSlickGridFilterTypes.DATE,
                    field: 'LastTestObj',
                    views: [''],
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.RETENTION_POLICY'),
                    filter: zSlickGridFilterTypes.MULTI_SELECT,
                    field: 'RetentionPolicyObj',
                    formatter: $filter('objectFormatter'),
                    card_formatter: multiSelectClassConstants.FORMATTER_TYPE.DISPLAY,
                    views: ['Backup']
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.BACKUP_STATUS'),
                    filter: zSlickGridFilterTypes.MULTI_SELECT,
                    field: 'VpgBackupJobStatusObj',
                    formatter: $filter('backupStatusRenderer'),
                    card_formatter: multiSelectClassConstants.FORMATTER_TYPE.BACKUP_STATUS,
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
                    filter: zSlickGridFilterTypes.MULTI_SELECT,
                    field: 'RestorePointsRangeObj',
                    formatter: $filter('objectFormatter'),
                    card_formatter: multiSelectClassConstants.FORMATTER_TYPE.DISPLAY,
                    views: ['Backup']
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.BACKUP_SCHEDULING'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'BackupRelatedDataObj',
                    formatter: $filter('objectFormatter'),
                    views: ['Backup']
                },
                {
                    name: $translate.instant('VPG_VM_LIST_COL.OPERATION'),
                    field: 'stateProcess',
                    views: ['General'],
                    formatter: $filter('vpgOperationFormatter')
                }
            ];


        };
        vpgsModel.getCardsColumnDefs = function () {
            return vpgsModel.getGridColumnsDefs();
        };

        vpgsModel.getGridDefaultViews = function () {
            return [
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
        };

        vpgsModel.getGroupByValues = function () {
            return [
                {
                    id: '',
                    text: $translate.instant('GROUP_BY_LIST.NONE')
                },
                {
                    id: 'Direction',
                    field: 'Direction',
                    text: $translate.instant('GROUP_BY_LIST.DIRECTION')
                },
                {
                    id: 'SourceSiteName',
                    field: 'SourceTypeObj',
                    text: $translate.instant('GROUP_BY_LIST.PROTECTED_SITE')
                },
                {
                    id: 'TargetSiteName',
                    field: 'TargetTypeObj',
                    text: $translate.instant('GROUP_BY_LIST.REMOTE_SITE')
                },
                {
                    id: 'CustomerName',
                    field: 'CustomerName',
                    text: $translate.instant('GROUP_BY_LIST.ZORG_NAME')
                },
                {
                    id: 'PeerSiteGroupBy',
                    field: 'PeerSiteTypeObj',
                    text: $translate.instant('GROUP_BY_LIST.PEER_SITE')
                }
            ];
        };

        return vpgsModel;
    });
