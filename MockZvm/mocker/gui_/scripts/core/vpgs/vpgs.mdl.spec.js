'use strict';

describe('VPGS model controller', function () {
    var vpgsModel, zTabsStateService, enums, filter, entityCases,
        defaultGridFields = ['AlertStatus', 'NameObj', 'Direction', 'SourceTypeObj', 'TargetTypeObj', 'PeerSiteTypeObj', 'Priority', 'StateLabel', 'CustomerName', 'vpgState', 'IOPSObj', 'IncomingThroughputInMbObj', 'OutgoingBandWidthObj', 'ProvisionedStorageInMBObj', 'UsedStorageInMBObj', 'ActualRPOObj', 'LastTestObj', 'RetentionPolicyObj', 'VpgBackupJobStatusObj', 'BackupRepository', 'RestorePointsRangeObj', 'BackupRelatedDataObj', 'stateProcess'],
        groupByValues = [
            {
                "id": "",
                "text": "GROUP_BY_LIST.NONE"
            },
            {
                "id": "Direction",
                "field": "Direction",
                "text": "GROUP_BY_LIST.DIRECTION"
            },
            {
                "id": "SourceSiteName",
                "field": "SourceTypeObj",
                "text": "GROUP_BY_LIST.PROTECTED_SITE"
            },
            {
                "id": "TargetSiteName",
                "field": "TargetTypeObj",
                "text": "GROUP_BY_LIST.REMOTE_SITE"
            },
            {
                "id": "CustomerName",
                "field": "CustomerName",
                "text": "GROUP_BY_LIST.ZORG_NAME"
            },
            {
                "id": "PeerSiteGroupBy",
                "field": "PeerSiteTypeObj",
                "text": "GROUP_BY_LIST.PEER_SITE"
            }
        ];
    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data: {IsPortal: false}});
    }));

    beforeEach(inject(function ($filter, _vpgsModel_, _zTabsStateService_, _enums_, _entityCases_) {
        vpgsModel = _vpgsModel_;
        zTabsStateService = _zTabsStateService_;
        filter = $filter;
        enums = _enums_;
        entityCases = _entityCases_;
    }));

    it('should return the default grid columns', function () {
        var columnFields = _.pluck(vpgsModel.getGridColumnsDefs(), 'field');
        expect(columnFields).toEqual(defaultGridFields);
    });

    it('should return the default cards columns', function () {
        var columnFields = _.pluck(vpgsModel.getCardsColumnDefs(), 'field');
        expect(columnFields).toEqual(defaultGridFields);
    });

    it('should return the default group by', function () {
        var groupBy = vpgsModel.getGroupByValues();
        expect(groupBy).toEqual(groupByValues);
    });



    it('should return the default grid views', function () {
        expect(vpgsModel.getGridDefaultViews()).toEqual([
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
        ]);
    });

    it('should define item id from vpgid', function () {
        var item = {
            Identifier: {
                GroupGuid: '1'
            }
        };

        vpgsModel.setItemId(item);


        expect(item.id).toEqual('1');

    });

    it('should process the state label', function () {
        var item = {
            State: {
                VMsInInitialSync: 1,
                Status: enums.VpgVisualStatus.MeetingSLA
            },
            NumberOfVms: 5
        };

        vpgsModel.setStateLabel(item);
        expect(item.StateLabel.display).toEqual('ENUM.VPG_VISUAL_STATUS.MEETING_SLA 4/5 VMs');
        expect(item.StateLabel.value).toEqual(enums.VpgVisualStatus.MeetingSLA);

        item.State.Status = enums.VpgVisualStatus.Initializing;
        vpgsModel.setStateLabel(item);
        expect(item.StateLabel.display).toEqual('ENUM.VPG_VISUAL_STATUS.INITIALIZING');
        expect(item.StateLabel.value).toEqual(enums.VpgVisualStatus.Initializing);

        item.State = null;
        vpgsModel.setStateLabel(item);
        expect(item.StateLabel.display).toEqual('');
        expect(item.StateLabel.value).toEqual('');

    });

    it('should process the source type', function () {
        var item = {
            SourceSiteName: 'New York',
            Entities: {
                Source: 1
            }
        };

        vpgsModel.setSourceTypeObj(item);

        expect(item.SourceTypeObj).toEqual({
            display: item.SourceSiteName,
            value: item.Entities.Source,
            filterValue: item.SourceSiteName
        });
    });

    it('should process the target type', function () {
        var item = {
            TargetSiteName: 'Israel',
            Entities: {
                Target: 2
            }
        };

        vpgsModel.setTargetTypeObj(item);

        expect(item.TargetTypeObj).toEqual({
            display: item.TargetSiteName,
            value: item.Entities.Target,
            filterValue: item.TargetSiteName
        });
    });

    it('should process the peer site obj and group by', function () {
        var item = {
            SourceSiteName: 'New York',
            TargetSiteName: 'Israel',
            Entities: {
                Source: 1,
                Target: 2
            }
        };

        vpgsModel.setSourceTypeObj(item);
        vpgsModel.setTargetTypeObj(item);
        item.Direction = enums.ProtectionGroupStateVisual.Protected;
        vpgsModel.setPeerSiteTypeObj(item);
        expect(item.PeerSiteTypeObj).toEqual(item.TargetTypeObj);
        vpgsModel.setPeerSiteGroupBy(item);
        expect(item.PeerSiteGroupBy).toEqual(item.PeerSiteTypeObj.display);
        item.Direction = enums.ProtectionGroupStateVisual.Recovery;
        vpgsModel.setPeerSiteTypeObj(item);
        expect(item.PeerSiteTypeObj).toEqual(item.SourceTypeObj);
        vpgsModel.setPeerSiteGroupBy(item);
        expect(item.PeerSiteGroupBy).toEqual(item.PeerSiteTypeObj.display);

        item.Direction = enums.ProtectionGroupStateVisual.SelfProtected;
        vpgsModel.setPeerSiteTypeObj(item);
        expect(item.PeerSiteTypeObj).toEqual(item.SourceTypeObj);
        vpgsModel.setPeerSiteGroupBy(item);
        expect(item.PeerSiteGroupBy).toEqual(item.PeerSiteTypeObj.display);


    });

    it('should process the peer site group by', function () {
        var item = {
            SourceSiteName: 'New York',
            TargetSiteName: 'Israel',
            Entities: {
                Source: 1,
                Target: 2
            }
        };

        vpgsModel.setSourceTypeObj(item);
        vpgsModel.setTargetTypeObj(item);
        item.Direction = enums.ProtectionGroupStateVisual.Protected;
        vpgsModel.setPeerSiteTypeObj(item);
        expect(item.PeerSiteTypeObj).toEqual(item.TargetTypeObj);
        item.Direction = enums.ProtectionGroupStateVisual.Recovery;
        vpgsModel.setPeerSiteTypeObj(item);
        expect(item.PeerSiteTypeObj).toEqual(item.SourceTypeObj);
        item.Direction = enums.ProtectionGroupStateVisual.SelfProtected;
        vpgsModel.setPeerSiteTypeObj(item);
        expect(item.PeerSiteTypeObj).toEqual(item.SourceTypeObj);
    });

    it('should process iops', function () {
        var item = {
            IOPS: 10
        };
        vpgsModel.setIOPSObj(item);
        expect(item.IOPSObj).toEqual({
            display: item.IOPS + ' / METRICS.SEC',
            value: item.IOPS
        });
    });

    it('should process incoming throughput', function () {
        var item = {
            IncomingThroughputInMb: 100
        };

        vpgsModel.setIncomingThroughputInMbObj(item);
        expect(item.IncomingThroughputInMbObj).toEqual({
            display: filter('mbToStringConvertor')(item.IncomingThroughputInMb) + ' / METRICS.SEC',
            value: item.IncomingThroughputInMb
        });
    });

    it('should process outgoing bandwidth', function () {
        var item = {
            OutgoingBandWidth: 100
        };

        vpgsModel.setOutgoingBandWidthObj(item);
        expect(item.OutgoingBandWidthObj).toEqual({
            display: filter('mbToStringConvertor')(item.OutgoingBandWidth),
            value: item.OutgoingBandWidth
        });
    });

    it('should process provision storage', function () {
        var item = {
            ProvisionedStorageInMB: 100
        };

        vpgsModel.setProvisionedStorageInMBObj(item);
        expect(item.ProvisionedStorageInMBObj).toEqual({
            display: filter('storageMBToStringfilter')(item.ProvisionedStorageInMB),
            value: item.ProvisionedStorageInMB
        });
    });

    it('should process used storage', function () {
        var item = {
            UsedStorageInMB: 100
        };

        vpgsModel.setUsedStorageInMBObj(item);
        expect(item.UsedStorageInMBObj).toEqual({
            display: filter('storageMBToStringfilter')(item.UsedStorageInMB),
            value: item.UsedStorageInMB
        });
    });

    it('should process last test', function () {
        var item = {
            LastTest: '2015-08-09T06:40:03.265Z'
        };

        vpgsModel.setLastTestObj(item);

        expect(item.LastTestObj).toEqual({
            display: filter('date')(item.LastTest, 'dd/MM/yyyy HH:mm:ss'),
            value: item.LastTest
        });
    });

    it('should process retention policy', function () {
        var item = {
            RetentionPolicy: 0
        };
        vpgsModel.setRetentionPolicyObj(item);
        expect(item.RetentionPolicyObj).toEqual({
            display: filter('retentionPolicyEnum')(item.RetentionPolicy),
            value: item.RetentionPolicy
        });
    });

    it('should check if location exist', function () {
        var item = {
            SampleVM: null
        };

        vpgsModel.setLocationExist(item);
        expect(item.locationExist).toBeFalsy();

        item.SampleVM = {};
        item.State = {
            SubStatus: enums.VpgVisualSubStatus.Deleting
        };
        vpgsModel.setLocationExist(item);
        expect(item.locationExist).toBeFalsy();

        item.State.SubStatus = enums.VpgVisualSubStatus.EmptyProtectionGroup;
        vpgsModel.setLocationExist(item);
        expect(item.locationExist).toBeFalsy();


        item.State.SubStatus = enums.VpgVisualSubStatus.VolumeInitialSync;
        vpgsModel.setLocationExist(item);
        expect(item.locationExist).toBeTruthy();

    });

    it('should process the name object', function () {
        var item = {
            Name: 'vpg',
            NumberOfVms: 5,
            Identifier: {
                GroupGuid: '00000000-0000-0000-0000-000000000000'
            }
        };

        item.locationExist = true;
        vpgsModel.setNameObj(item);

        expect(item.NameObj).toEqual({
            display: 'vpg',
            nameText: {
                location: 'main/vpg_details?id=00000000-0000-0000-0000-000000000000',
                type: entityCases.caseHref
            }
        });

        item.locationExist = false;
        vpgsModel.setNameObj(item);

        expect(item.NameObj).toEqual({
            display: 'vpg',
            nameText: {
                location: '',
                type: entityCases.caseText
            }
        });


    });

    it('should process backup related data', function () {
        var item = {
            BackupRelatedData: null
        };
        vpgsModel.setBackupRelatedData(item);


        expect(item.BackupRepository).not.toBeDefined();
        expect(item.VpgBackupJobStatusObj).not.toBeDefined();
        expect(item.RestorePointsRangeObj).not.toBeDefined();
        expect(item.BackupRelatedDataObj).not.toBeDefined();

        item = {
            BackupRelatedData: {
                BackupRepository: 'guy',
                VpgBackupJobStatus: 1,
                RestorePointsRange: 2,
                BackupSchedulingTime: {SchedulePeriodType: 0, RunningTimeOfDayInMinutes: 0, DayOfWeek: 6}
            },
            RetentionPolicy: 0
        };

        vpgsModel.setBackupRelatedData(item);

        expect(item.BackupRepository).toEqual('guy');

        var statusDisplay = filter('vpgBackupJobStatusEnum')(item.BackupRelatedData.VpgBackupJobStatus, item.RetentionPolicy);
        expect(item.VpgBackupJobStatusObj).toEqual({
            display: statusDisplay,
            value: item.BackupRelatedData.VpgBackupJobStatus,
            filterValue: statusDisplay
        });

        var rangeDisplay = filter('restorePointRangeEnum')(item.BackupRelatedData.RestorePointsRange, item.RetentionPolicy);
        expect(item.RestorePointsRangeObj).toEqual({
            display: rangeDisplay,
            value: item.BackupRelatedData.RestorePointsRange,
            filterValue: rangeDisplay
        });

        var dataDisplay = filter('backupSchedulingFilter')(item.BackupRelatedData, item.RetentionPolicy);
        expect(item.BackupRelatedDataObj).toEqual({
            display: dataDisplay,
            value: item.BackupRelatedData,
            filterValue: dataDisplay
        });
    });

    it('should set the vpg state', function () {
        var item = {State: {}};
        vpgsModel.setVpgState(item);
        expect(item.vpgState).toBeDefined();
    });
});
