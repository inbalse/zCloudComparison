'use strict';

describe("Card list service", function () {

    var cardListComponentService, cardGroupByConstants, cardListConstants;

    beforeEach(module('zvmTest'));


    beforeEach(inject(function (_cardListComponentService_, _cardListConstants_, _cardGroupByConstants_) {
        cardListComponentService = _cardListComponentService_;
        cardListConstants = _cardListConstants_;
        cardGroupByConstants = _cardGroupByConstants_;
    }));

    it('should reset selected items', function () {
        cardListComponentService.addSelectedItems(1);
        cardListComponentService.reset();
        var exist = cardListComponentService.isItemSelected(1);
        expect(exist).toBeFalsy();
    });


    it('should add selected id to the list', function () {
        var itemId = 'some_id';
        cardListComponentService.addSelectedItem(itemId);

        expect(cardListComponentService.isItemSelected(itemId)).toBeTruthy();
    });

    it('should add multiple selected ids to the list', function () {
        var ids = ['some_id1', 'some_id2', 'some_id3'];
        cardListComponentService.addSelectedItems(ids);

        expect(cardListComponentService.isItemSelected('some_id1')).toBeTruthy();
        expect(cardListComponentService.isItemSelected('some_id2')).toBeTruthy();
        expect(cardListComponentService.isItemSelected('some_id3')).toBeTruthy();
    });

    it('should remove selected id from the list', function () {
        var itemId = 'some_id';
        cardListComponentService.addSelectedItem(itemId);
        cardListComponentService.removeSelectedItem(itemId);

        expect(cardListComponentService.isItemSelected(itemId)).toBeFalsy();
    });

    it('should calculate the number of rows', function () {
        var itemsLength, cardsPerRow;
        itemsLength = 0;
        cardsPerRow = 6;
        expect(cardListComponentService.calculateRowsCount(itemsLength, cardsPerRow)).toBe(0);

        itemsLength = 13;
        cardsPerRow = 6;
        expect(cardListComponentService.calculateRowsCount(itemsLength, cardsPerRow)).toBe(3);

        itemsLength = 13;
        cardsPerRow = 4;
        expect(cardListComponentService.calculateRowsCount(itemsLength, cardsPerRow)).toBe(4);
    });


    it('should check if group by is selected', function () {
        //Default group id (empty string) means no
        var groupBy = {
            id: ''
        };
        expect(cardListComponentService.isGroupSelected(groupBy)).toBeFalsy();

        groupBy.id = 'someGroup';
        expect(cardListComponentService.isGroupSelected(groupBy)).toBeTruthy();
    });

    it('should calculate cards per row given width', function () {
        var width = 1000;
        expect(cardListComponentService.getCardsPerRow(width)).toBe(3);
        width = 1024;
        expect(cardListComponentService.getCardsPerRow(width)).toBe(3);
        width = 1600;
        expect(cardListComponentService.getCardsPerRow(width)).toBe(4);
        width = 1920;
        expect(cardListComponentService.getCardsPerRow(width)).toBe(5);
    });

    it('should calcualte inner arrays length', function () {
        var dummy = [[1, 1, 1, 1, 2], [1, 1, 1], [1, 1, 1, 1], [2, 2, 2, 2, 2, 2]];

        expect(cardListComponentService.getItemsCount(dummy)).toBe(18);
    });

    it('should return header height for group header', function () {
        var index = 0, items = [{some: 'item'}],
            result = cardListComponentService.getRowHeight(items, index, []);
        expect(result).toBe(cardGroupByConstants.HEADER_HEIGHT);
    });

    it('should return header height for group header', function () {
        var index = 0, items = [{some: 'item'}],
            result = cardListComponentService.getRowHeight(items, index, []);

        expect(result).toBe(cardGroupByConstants.HEADER_HEIGHT);
    });

    it('should return zero for hidden rows', function () {
        var collapsedGroups = [{
            collapseRange: {
                from: 2,
                to: 5
            }
        }];

        var index = 3, items = [[], [], [], []],
            result = cardListComponentService.getRowHeight(items, index, collapsedGroups);

        expect(result).toBe(0);
    });

    it('should return the height of rows', function () {
        var index = 0, view = [[], [], [], [], [], [], []];

        var result = cardListComponentService.getRowHeight(view, index, []);

        expect(result).toBe(cardListConstants.ROW_HEIGHT);
    });

    it('should chunkify the data for normal view', function () {
        var data = [{a: 'a'}, {b: 'b'}, {c: 'c'}, {d: 'd'}, {e: 'e'}],
            cardsPerRow = 2,
            groupBy = {id: cardListConstants.DEFAULT_GROUP_BY_ID};

        var chunks = cardListComponentService.getChunks(data, cardsPerRow, groupBy);
        expect(chunks[0].length).toEqual(2);
        expect(chunks[1].length).toEqual(2);
        expect(chunks[2].length).toEqual(1);
    });

    it('should chunkify the data for group view', function () {
        var data = [
                {
                    "name": "Direction",
                    "count": 13
                },
                [
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-1878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-1878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-1878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79e"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-4878-8c99-ea553181f79e",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "display": 0,
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79e",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "1b89e9dc-7899-4878-8c99-ea553181f79a"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "1b89e9dc-7899-4878-8c99-ea553181f79a",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=1b89e9dc-7899-4878-8c99-ea553181f79a",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7699-4878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7699-4878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7699-4878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79d"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-4878-8c99-ea553181f79d",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79d",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-4878-8c99-ba553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-4878-8c99-ba553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ba553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-c87a-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-c87a-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-c87a-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89f9dc-7899-4878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89f9dc-7899-4878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89f9dc-7899-4878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-3878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-3878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-3878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f78c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 102124,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-4878-8c99-ea553181f78c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f78c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "1d 4h",
                            "value": 102124
                        },
                        "gauge": {
                            "degrees": 689337,
                            "color": "vpgs-cards-component__card-gauge--not-meeting",
                            "part": "vpgs-cards-component__card-gauge--past-225",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--bold",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "c12559a1-7f01-45f0-84a6-3733ccce74b3"
                        },
                        "AlertStatus": 0,
                        "Name": "dasdsad",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 226,
                        "UsedStorageInMB": 0,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-672",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto5",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6583,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "c12559a1-7f01-45f0-84a6-3733ccce74b3",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto5",
                            "value": 0,
                            "filterValue": "gui_localat Zerto5"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "226 MB",
                            "value": 226
                        },
                        "UsedStorageInMBObj": {
                            "display": "0",
                            "value": 0
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "dasdsad",
                            "nameText": {
                                "label": "dasdsad (1)",
                                "location": "main/vpg_details?id=c12559a1-7f01-45f0-84a6-3733ccce74b3",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38be"
                        },
                        "AlertStatus": 0,
                        "Name": "VCDvApp",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": {
                                    "StopEnabled": true,
                                    "ProgressValue": 50
                                },
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": true,
                                "IsAbortBackupEnabled": true
                            },
                            "ProgressObject": null
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 130,
                        "UsedStorageInMB": 118,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 1333,
                        "ConfiguredRPO": 300,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-348",
                            "ServerIdentifier": {
                                "ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "f92f46dd-f39e-46ec-a3fa-33a6a86084e7"
                        },
                        "SourceSiteName": "gui_local_vcd3",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                        },
                        "TargetSiteName": "gui_local_vcd",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 2
                        },
                        "ZorgId": null,
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 30,
                        "ServiceProfileName": "System Service Profile",
                        "ServiceProfileId": {
                            "InternalId": "42da6ae7-1acf-4d96-9b82-82c2bf42a098"
                        },
                        "id": "5d554e3a-285a-46e7-97d1-ad79c52e38be",
                        "StateLabel": {
                            "display": "Meeting SLA NaN/1 VMs",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_local_vcd3",
                            "value": 0,
                            "filterValue": "gui_local_vcd3"
                        },
                        "TargetTypeObj": {
                            "display": "gui_local_vcd",
                            "value": 2,
                            "filterValue": "gui_local_vcd",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vcd"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_local_vcd",
                            "value": 2,
                            "filterValue": "gui_local_vcd",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vcd"
                        },
                        "PeerSiteGroupBy": "gui_local_vcd",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "130 MB",
                            "value": 130
                        },
                        "UsedStorageInMBObj": {
                            "display": "118 MB",
                            "value": 118
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "VCDvApp",
                            "nameText": {
                                "label": "VCDvApp (1)",
                                "location": "main/vpg_details?id=5d554e3a-285a-46e7-97d1-ad79c52e38be",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "22m 13s",
                            "value": 1333
                        },
                        "gauge": {
                            "degrees": 599.85,
                            "color": "vpgs-cards-component__card-gauge--not-meeting",
                            "part": "vpgs-cards-component__card-gauge--past-225",
                            "rpo": "vpgs-cards-component__card-rpo",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "stateProcess": {
                            "display": "Backing up",
                            "value": 50
                        },
                        "progress": {
                            "label": {
                                "css": "progress-span",
                                "display": "Backing up (50%)"
                            },
                            "value": {
                                "css": "progress-bar progress-bar-danger",
                                "role": "progressBar",
                                "min": 0,
                                "max": 100,
                                "now": 50,
                                "width": "50%"
                            },
                            "buttons": [
                                {
                                    "action": "Vpg::StopBackup",
                                    "css": "stop-vpg-btn",
                                    "title": "Stop Backup"
                                }
                            ]
                        }
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79a"
                        },
                        "AlertStatus": 0,
                        "Name": "yoni",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 499,
                        "ConfiguredRPO": 300,
                        "LastTest": null,
                        "Direction": 0,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto3",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto4",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-4878-8c99-ea553181f79a",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto3",
                            "value": 0,
                            "filterValue": "gui_localat Zerto3"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto4",
                            "value": 0,
                            "filterValue": "gui_localat Zerto4",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto4",
                            "value": 0,
                            "filterValue": "gui_localat Zerto4",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto4",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "yoni",
                            "nameText": {
                                "label": "yoni (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79a",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "8m 19s",
                            "value": 499
                        },
                        "gauge": {
                            "degrees": 224.55,
                            "color": "vpgs-cards-component__card-gauge--warning",
                            "part": "vpgs-cards-component__card-gauge--past-135",
                            "rpo": "vpgs-cards-component__card-rpo",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(225deg)"
                                },
                                {
                                    "transform": "rotate(225deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                        "progress": null
                    }
                ],
                {
                    "name": "Direction",
                    "count": 6
                },
                [
                    {
                        "Identifier": {
                            "GroupGuid": "9b79e9dc-7899-4878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 1,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b79e9dc-7899-4878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b79e9dc-7899-4878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79b"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 1,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9dc-7899-4878-8c99-ea553181f79b",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79b",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "d563aabb-6762-405c-91e2-1881941606df"
                        },
                        "AlertStatus": 0,
                        "Name": "czxczxc",
                        "State": {
                            "State": 0,
                            "Status": 0,
                            "SubStatus": 4,
                            "IsProgressActive": true,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": false,
                            "IsMoveEnabled": false,
                            "IsFailoverTestEnabled": false,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": false,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": false,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": false,
                                "IsMoveEnabled": false,
                                "IsFailoverTestEnabled": false,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": false,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": false,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": false
                            },
                            "ProgressObject": {
                                "ProgressPercentage": 0,
                                "ProgressDetails": null
                            },
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 236,
                        "UsedStorageInMB": 4,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 0,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 1,
                        "SampleVM": {
                            "InternalVmName": "vm-674",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto1",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 0,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": null,
                        "id": "d563aabb-6762-405c-91e2-1881941606df",
                        "StateLabel": {
                            "display": "Initializing",
                            "value": 0
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto1",
                            "value": 0,
                            "filterValue": "gui_localat Zerto1"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto1",
                            "value": 0,
                            "filterValue": "gui_localat Zerto1"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto1",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "236 MB",
                            "value": 236
                        },
                        "UsedStorageInMBObj": {
                            "display": "4 MB",
                            "value": 4
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "czxczxc",
                            "nameText": {
                                "label": "czxczxc (1)",
                                "location": "main/vpg_details?id=d563aabb-6762-405c-91e2-1881941606df",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "Syncing",
                            "value": 0,
                            "showProgress": true,
                            "filterValue": "Syncing"
                        },
                        "ActualRPOObj": {
                            "value": 0,
                            "display": "NA"
                        },
                        "gauge": {
                            "degrees": 0,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": [],
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": "rotate(0deg)"
                                },
                                {
                                    "transform": "rotate(0deg)"
                                },
                                {
                                    "transform": "rotate(0deg)"
                                },
                                {
                                    "transform": "rotate(0deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                        "progress": {
                            "label": {
                                "css": "progress-span",
                                "display": "Syncing (0%)"
                            },
                            "value": {
                                "css": "progress-bar progress-bar-danger",
                                "role": "progressBar",
                                "min": 0,
                                "max": 100,
                                "now": 0,
                                "width": "0%"
                            }
                        }
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "7503a74d-48b9-4d36-ae01-ed460dfcb5b9"
                        },
                        "AlertStatus": 0,
                        "Name": "fdsfds",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 226,
                        "UsedStorageInMB": 0,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 1,
                        "SampleVM": {
                            "InternalVmName": "vm-663",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto1",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 10679,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 180,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "7503a74d-48b9-4d36-ae01-ed460dfcb5b9",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto1",
                            "value": 0,
                            "filterValue": "gui_localat Zerto1"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto1",
                            "value": 0,
                            "filterValue": "gui_localat Zerto1"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto1",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "226 MB",
                            "value": 226
                        },
                        "UsedStorageInMBObj": {
                            "display": "0",
                            "value": 0
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "fdsfds",
                            "nameText": {
                                "label": "fdsfds (1)",
                                "location": "main/vpg_details?id=7503a74d-48b9-4d36-ae01-ed460dfcb5b9",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "a58719b9-d5c3-4213-a012-aa5e090b7b83"
                        },
                        "AlertStatus": 0,
                        "Name": "rrsfsdfsd",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 226,
                        "UsedStorageInMB": 0,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 1,
                        "SampleVM": {
                            "InternalVmName": "vm-664",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto4",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 5909,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "a58719b9-d5c3-4213-a012-aa5e090b7b83",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto4",
                            "value": 0,
                            "filterValue": "gui_localat Zerto4"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto4",
                            "value": 0,
                            "filterValue": "gui_localat Zerto4"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto4",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "226 MB",
                            "value": 226
                        },
                        "UsedStorageInMBObj": {
                            "display": "0",
                            "value": 0
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "rrsfsdfsd",
                            "nameText": {
                                "label": "rrsfsdfsd (1)",
                                "location": "main/vpg_details?id=a58719b9-d5c3-4213-a012-aa5e090b7b83",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38b1"
                        },
                        "AlertStatus": 0,
                        "Name": "VCDvApp",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": {
                                    "StopEnabled": true
                                },
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": true,
                                "IsAbortBackupEnabled": true
                            },
                            "ProgressObject": null
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 130,
                        "UsedStorageInMB": 118,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 4894,
                        "ConfiguredRPO": 300,
                        "LastTest": null,
                        "Direction": 1,
                        "SampleVM": {
                            "InternalVmName": "vm-348",
                            "ServerIdentifier": {
                                "ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "f92f46dd-f39e-46ec-a3fa-33a6a86084e7"
                        },
                        "SourceSiteName": "gui_local_vcd3",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                        },
                        "TargetSiteName": "gui_local_vcd",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 2
                        },
                        "ZorgId": null,
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 30,
                        "ServiceProfileName": "System Service Profile",
                        "ServiceProfileId": {
                            "InternalId": "42da6ae7-1acf-4d96-9b82-82c2bf42a098"
                        },
                        "id": "5d554e3a-285a-46e7-97d1-ad79c52e38b1",
                        "StateLabel": {
                            "display": "Meeting SLA NaN/1 VMs",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_local_vcd3",
                            "value": 0,
                            "filterValue": "gui_local_vcd3"
                        },
                        "TargetTypeObj": {
                            "display": "gui_local_vcd",
                            "value": 2,
                            "filterValue": "gui_local_vcd",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vcd"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_local_vcd3",
                            "value": 0,
                            "filterValue": "gui_local_vcd3"
                        },
                        "PeerSiteGroupBy": "gui_local_vcd3",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "130 MB",
                            "value": 130
                        },
                        "UsedStorageInMBObj": {
                            "display": "118 MB",
                            "value": 118
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "VCDvApp",
                            "nameText": {
                                "label": "VCDvApp (1)",
                                "location": "main/vpg_details?id=5d554e3a-285a-46e7-97d1-ad79c52e38b1",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "1h 21m",
                            "value": 4894
                        },
                        "gauge": {
                            "degrees": 2202.2999999999997,
                            "color": "vpgs-cards-component__card-gauge--not-meeting",
                            "part": "vpgs-cards-component__card-gauge--past-225",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--bold",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                },
                                {
                                    "transform": null
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                        "stateProcess": {
                            "display": "Testing Failover"
                        },
                        "progress": {
                            "label": {
                                "css": "progress-span",
                                "display": "Testing Failover",
                                "title": "Protection status, such as Protecting, Synchronizing, Error, etc."
                            },
                            "buttons": [
                                {
                                    "action": "Vpg::StopFot",
                                    "css": "stop-vpg-btn",
                                    "title": "Stop Failover Test"
                                }
                            ]
                        }
                    }
                ],
                {
                    "name": "Direction",
                    "count": 6
                },
                [
                    {
                        "Identifier": {
                            "GroupGuid": "bcfaa8ce-93b5-4f74-8a2b-9742e29486f9"
                        },
                        "AlertStatus": 0,
                        "Name": "asdas",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": true,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 227,
                        "UsedStorageInMB": 4,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 2,
                        "SampleVM": {
                            "InternalVmName": "vm-673",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto1",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 1,
                            "BackupRepository": "test",
                            "RestorePointsRange": 1,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 1,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 1,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6900,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "bcfaa8ce-93b5-4f74-8a2b-9742e29486f9",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto1",
                            "value": 0,
                            "filterValue": "gui_localat Zerto1"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto1",
                            "value": 0,
                            "filterValue": "gui_localat Zerto1"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto1",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "227 MB",
                            "value": 227
                        },
                        "UsedStorageInMBObj": {
                            "display": "4 MB",
                            "value": 4
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Extended Recovery",
                            "value": 1
                        },
                        "BackupRepository": "test",
                        "VpgBackupJobStatusObj": {
                            "display": "Scheduled",
                            "value": 1,
                            "filterValue": "Scheduled"
                        },
                        "RestorePointsRangeObj": {
                            "display": "1 Month",
                            "value": 1,
                            "filterValue": "1 Month"
                        },
                        "BackupRelatedDataObj": {
                            "display": "00:00, Saturday",
                            "value": {
                                "VpgBackupJobStatus": 1,
                                "BackupRepository": "test",
                                "RestorePointsRange": 1,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 1,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": "00:00, Saturday"
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdas",
                            "nameText": {
                                "label": "asdas (1)",
                                "location": "main/vpg_details?id=bcfaa8ce-93b5-4f74-8a2b-9742e29486f9",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "4b89e9dc-7899-4878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 2,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "4b89e9dc-7899-4878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=4b89e9dc-7899-4878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "9b89e9da-7899-4878-8c99-ea553181f79c"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 2,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "9b89e9da-7899-4878-8c99-ea553181f79c",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=9b89e9da-7899-4878-8c99-ea553181f79c",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "ab89e9dc-7899-4878-8c99-ea553181f79a"
                        },
                        "AlertStatus": 0,
                        "Name": "asdasdsa",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 2,
                        "SampleVM": {
                            "InternalVmName": "vm-677",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 6704,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 120,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "ab89e9dc-7899-4878-8c99-ea553181f79a",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "asdasdsa",
                            "nameText": {
                                "label": "asdasdsa (1)",
                                "location": "main/vpg_details?id=ab89e9dc-7899-4878-8c99-ea553181f79a",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "ef69981d-3731-41e7-9d84-5ee1003cbc43"
                        },
                        "AlertStatus": 0,
                        "Name": "bfdbfdb",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": false,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 1,
                        "ProvisionedStorageInMB": 272,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 2,
                        "SampleVM": {
                            "InternalVmName": "vm-680",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto5",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 0,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 827,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 0,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "ef69981d-3731-41e7-9d84-5ee1003cbc43",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto5",
                            "value": 0,
                            "filterValue": "gui_localat Zerto5"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto5",
                            "value": 0,
                            "filterValue": "gui_localat Zerto5"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto5",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "272 MB",
                            "value": 272
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Disaster Recovery",
                            "value": 0
                        },
                        "BackupRepository": "",
                        "VpgBackupJobStatusObj": {
                            "display": "",
                            "value": 2,
                            "filterValue": ""
                        },
                        "RestorePointsRangeObj": {
                            "display": "",
                            "value": 5,
                            "filterValue": ""
                        },
                        "BackupRelatedDataObj": {
                            "display": "",
                            "value": {
                                "VpgBackupJobStatus": 2,
                                "BackupRepository": "",
                                "RestorePointsRange": 5,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 0,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": ""
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "bfdbfdb",
                            "nameText": {
                                "label": "bfdbfdb (1)",
                                "location": "main/vpg_details?id=ef69981d-3731-41e7-9d84-5ee1003cbc43",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                        "progress": null
                    },
                    {
                        "Identifier": {
                            "GroupGuid": "eb30aeec-7b79-48f2-b088-e16d08b642f7"
                        },
                        "AlertStatus": 0,
                        "Name": "sdfsdfsd",
                        "State": {
                            "State": 0,
                            "Status": 1,
                            "SubStatus": 0,
                            "IsProgressActive": false,
                            "ProgressPercentage": 0,
                            "ProgressDetails": null,
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "RelevantCheckpoint": null,
                            "IsProtectedSiteConnected": true,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "VPGTimebombInfo": null,
                            "CloneStatusVisualObject": null,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "MoveAutoContinueState": {
                                "AutoContinueActivated": false,
                                "Action": 1,
                                "TimeLeftInSec": 0
                            },
                            "RequiresForceToDelete": false,
                            "PauseResumeVisualObject": {
                                "IsVpgNowPaused": false,
                                "IsPauseEnabled": true,
                                "IsResumeEnabled": false
                            },
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": true,
                            "ActiveProcesses": {
                                "RunningFailOverTest": null,
                                "RunningClone": null,
                                "Paused": null,
                                "IsVpgNowPaused": false,
                                "IsResumeEnabled": false,
                                "RunningBackup": null,
                                "IsStopFOTEnabled": false,
                                "VpgUpdate": null,
                                "TimebombInfo": null
                            },
                            "ButtonsState": {
                                "IsFailoverEnabled": true,
                                "IsMoveEnabled": true,
                                "IsFailoverTestEnabled": true,
                                "IsUpdateEnabled": true,
                                "IsPauseEnabled": true,
                                "IsInsertCheckpointEnabled": true,
                                "IsProtectedSiteConnected": true,
                                "IsDeleteEnabled": true,
                                "IsForceSyncEnabled": true,
                                "IsCloneEnabled": true,
                                "IsMoveInStagesSupported": true,
                                "IsFailoverInStagesSupported": true,
                                "IsRecoverCommitEnabled": false,
                                "IsRecoverRollbackEnabled": false,
                                "RequiresForceToDelete": false,
                                "IsBackupEnabled": true,
                                "IsAbortBackupEnabled": false,
                                "IsFlrEnabled": true
                            },
                            "ProgressObject": null,
                            "VMsInInitialSync": 0
                        },
                        "Priority": 1,
                        "NumberOfVms": 4,
                        "ProvisionedStorageInMB": 950,
                        "UsedStorageInMB": 50,
                        "IOPS": 0,
                        "IncomingThroughputInMb": 0,
                        "OutgoingBandWidth": 0,
                        "ActualRPO": 9,
                        "ConfiguredRPO": 20,
                        "LastTest": null,
                        "Direction": 2,
                        "SampleVM": {
                            "InternalVmName": "vm-669",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "OwnersId": {
                            "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                        },
                        "SourceSiteName": "gui_localat Zerto",
                        "SourceSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "TargetSiteName": "gui_localat Zerto",
                        "TargetSiteIdentifier": {
                            "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                        },
                        "CustomerName": "",
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "Entities": {
                            "Source": 0,
                            "Target": 0
                        },
                        "ZorgId": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "BackupRelatedData": {
                            "VpgBackupJobStatus": 1,
                            "BackupRepository": "test",
                            "RestorePointsRange": 1,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 1,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "RetentionPolicy": 1,
                        "BootOrder": false,
                        "AreScriptsDefined": false,
                        "HistoryInSeconds": 11152,
                        "ServiceProfileName": "",
                        "ServiceProfileId": null,
                        "JournalHealthStatus": {
                            "ActualJournalHealthInMinutes": 180,
                            "RequiredJournalHealthInMinutes": 240,
                            "JournalHealthDescription": ""
                        },
                        "id": "eb30aeec-7b79-48f2-b088-e16d08b642f7",
                        "StateLabel": {
                            "display": "Meeting SLA",
                            "value": 1
                        },
                        "AlertStatusObj": {
                            "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                        },
                        "SourceTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "TargetTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto",
                            "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                        },
                        "PeerSiteTypeObj": {
                            "display": "gui_localat Zerto",
                            "value": 0,
                            "filterValue": "gui_localat Zerto"
                        },
                        "PeerSiteGroupBy": "gui_localat Zerto",
                        "IOPSObj": {
                            "display": "0 / sec",
                            "value": 0
                        },
                        "IncomingThroughputInMbObj": {
                            "display": "0.0 MB / sec",
                            "value": 0
                        },
                        "OutgoingBandWidthObj": {
                            "display": "0.0 MB",
                            "value": 0
                        },
                        "ProvisionedStorageInMBObj": {
                            "display": "950 MB",
                            "value": 950
                        },
                        "UsedStorageInMBObj": {
                            "display": "50 MB",
                            "value": 50
                        },
                        "LastTestObj": {
                            "display": null,
                            "value": null
                        },
                        "RetentionPolicyObj": {
                            "display": "Extended Recovery",
                            "value": 1
                        },
                        "BackupRepository": "test",
                        "VpgBackupJobStatusObj": {
                            "display": "Scheduled",
                            "value": 1,
                            "filterValue": "Scheduled"
                        },
                        "RestorePointsRangeObj": {
                            "display": "1 Month",
                            "value": 1,
                            "filterValue": "1 Month"
                        },
                        "BackupRelatedDataObj": {
                            "display": "00:00, Saturday",
                            "value": {
                                "VpgBackupJobStatus": 1,
                                "BackupRepository": "test",
                                "RestorePointsRange": 1,
                                "BackupSchedulingTime": {
                                    "SchedulePeriodType": 1,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                }
                            },
                            "filterValue": "00:00, Saturday"
                        },
                        "locationExist": true,
                        "NameObj": {
                            "display": "sdfsdfsd",
                            "nameText": {
                                "label": "sdfsdfsd (4)",
                                "location": "main/vpg_details?id=eb30aeec-7b79-48f2-b088-e16d08b642f7",
                                "type": "href"
                            }
                        },
                        "vpgState": {
                            "display": "",
                            "value": 0,
                            "showProgress": false,
                            "filterValue": ""
                        },
                        "ActualRPOObj": {
                            "display": "9s",
                            "value": 9
                        },
                        "gauge": {
                            "degrees": 60.75,
                            "color": "vpgs-cards-component__card-gauge--meeting",
                            "part": "vpgs-cards-component__card-gauge--past-45",
                            "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                            "rotation": [
                                {
                                    "transform": null
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                },
                                {
                                    "transform": "rotate(61deg)"
                                }
                            ]
                        },
                        "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                        "stateProcess": {
                            "display": "Failover over",
                            "value": 0
                        },
                        "progress": {
                            "label": {
                                "css": "progress-span",
                                "display": "Failover over",
                                "title": "Protection status, such as Protecting, Synchronizing, Error, etc."
                            },
                            "buttons": [
                                {
                                    "action": "Vpg::Commit",
                                    "css": "commit-btn",
                                    "title": "Commit"
                                },
                                {
                                    "action": "Vpg::Rollback",
                                    "css": "rollback-btn",
                                    "title": "Rollback"
                                }
                            ]
                        }
                    }
                ]
            ],
            cardsPerRow = 5,
            groupBy = {id: 'Direction', text: 'Direction'};

        var result = cardListComponentService.getChunks(data, cardsPerRow, groupBy);

        expect(result).toEqual([
            {
                "name": "Direction",
                "count": 13,
                "index": 0,
                "collapseRange": {
                    "from": 0,
                    "to": 4
                }
            },
            [
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-1878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-1878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-1878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79e"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-4878-8c99-ea553181f79e",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "display": 0,
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79e",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "1b89e9dc-7899-4878-8c99-ea553181f79a"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "1b89e9dc-7899-4878-8c99-ea553181f79a",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=1b89e9dc-7899-4878-8c99-ea553181f79a",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7699-4878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7699-4878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7699-4878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79d"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-4878-8c99-ea553181f79d",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79d",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                }
            ],
            [
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-4878-8c99-ba553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-4878-8c99-ba553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ba553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-c87a-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-c87a-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-c87a-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89f9dc-7899-4878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89f9dc-7899-4878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89f9dc-7899-4878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-3878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-3878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-3878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f78c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 102124,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-4878-8c99-ea553181f78c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f78c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "1d 4h",
                        "value": 102124
                    },
                    "gauge": {
                        "degrees": 689337,
                        "color": "vpgs-cards-component__card-gauge--not-meeting",
                        "part": "vpgs-cards-component__card-gauge--past-225",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--bold",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                }
            ],
            [
                {
                    "Identifier": {
                        "GroupGuid": "c12559a1-7f01-45f0-84a6-3733ccce74b3"
                    },
                    "AlertStatus": 0,
                    "Name": "dasdsad",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 226,
                    "UsedStorageInMB": 0,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-672",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto5",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6583,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "c12559a1-7f01-45f0-84a6-3733ccce74b3",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto5",
                        "value": 0,
                        "filterValue": "gui_localat Zerto5"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "226 MB",
                        "value": 226
                    },
                    "UsedStorageInMBObj": {
                        "display": "0",
                        "value": 0
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "dasdsad",
                        "nameText": {
                            "label": "dasdsad (1)",
                            "location": "main/vpg_details?id=c12559a1-7f01-45f0-84a6-3733ccce74b3",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38be"
                    },
                    "AlertStatus": 0,
                    "Name": "VCDvApp",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": {
                                "StopEnabled": true,
                                "ProgressValue": 50
                            },
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": true
                        },
                        "ProgressObject": null
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 130,
                    "UsedStorageInMB": 118,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 1333,
                    "ConfiguredRPO": 300,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-348",
                        "ServerIdentifier": {
                            "ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "f92f46dd-f39e-46ec-a3fa-33a6a86084e7"
                    },
                    "SourceSiteName": "gui_local_vcd3",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                    },
                    "TargetSiteName": "gui_local_vcd",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 2
                    },
                    "ZorgId": null,
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 30,
                    "ServiceProfileName": "System Service Profile",
                    "ServiceProfileId": {
                        "InternalId": "42da6ae7-1acf-4d96-9b82-82c2bf42a098"
                    },
                    "id": "5d554e3a-285a-46e7-97d1-ad79c52e38be",
                    "StateLabel": {
                        "display": "Meeting SLA NaN/1 VMs",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_local_vcd3",
                        "value": 0,
                        "filterValue": "gui_local_vcd3"
                    },
                    "TargetTypeObj": {
                        "display": "gui_local_vcd",
                        "value": 2,
                        "filterValue": "gui_local_vcd",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vcd"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_local_vcd",
                        "value": 2,
                        "filterValue": "gui_local_vcd",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vcd"
                    },
                    "PeerSiteGroupBy": "gui_local_vcd",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "130 MB",
                        "value": 130
                    },
                    "UsedStorageInMBObj": {
                        "display": "118 MB",
                        "value": 118
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "VCDvApp",
                        "nameText": {
                            "label": "VCDvApp (1)",
                            "location": "main/vpg_details?id=5d554e3a-285a-46e7-97d1-ad79c52e38be",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "22m 13s",
                        "value": 1333
                    },
                    "gauge": {
                        "degrees": 599.85,
                        "color": "vpgs-cards-component__card-gauge--not-meeting",
                        "part": "vpgs-cards-component__card-gauge--past-225",
                        "rpo": "vpgs-cards-component__card-rpo",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "stateProcess": {
                        "display": "Backing up",
                        "value": 50
                    },
                    "progress": {
                        "label": {
                            "css": "progress-span",
                            "display": "Backing up (50%)"
                        },
                        "value": {
                            "css": "progress-bar progress-bar-danger",
                            "role": "progressBar",
                            "min": 0,
                            "max": 100,
                            "now": 50,
                            "width": "50%"
                        },
                        "buttons": [
                            {
                                "action": "Vpg::StopBackup",
                                "css": "stop-vpg-btn",
                                "title": "Stop Backup"
                            }
                        ]
                    }
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79a"
                    },
                    "AlertStatus": 0,
                    "Name": "yoni",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 499,
                    "ConfiguredRPO": 300,
                    "LastTest": null,
                    "Direction": 0,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto3",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto4",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-4878-8c99-ea553181f79a",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto3",
                        "value": 0,
                        "filterValue": "gui_localat Zerto3"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto4",
                        "value": 0,
                        "filterValue": "gui_localat Zerto4",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto4",
                        "value": 0,
                        "filterValue": "gui_localat Zerto4",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto4",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "yoni",
                        "nameText": {
                            "label": "yoni (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79a",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "8m 19s",
                        "value": 499
                    },
                    "gauge": {
                        "degrees": 224.55,
                        "color": "vpgs-cards-component__card-gauge--warning",
                        "part": "vpgs-cards-component__card-gauge--past-135",
                        "rpo": "vpgs-cards-component__card-rpo",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(225deg)"
                            },
                            {
                                "transform": "rotate(225deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--protected",
                    "progress": null
                }
            ],
            {
                "name": "Direction",
                "count": 6,
                "index": 2,
                "collapseRange": {
                    "from": 4,
                    "to": 7
                }
            },
            [
                {
                    "Identifier": {
                        "GroupGuid": "9b79e9dc-7899-4878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 1,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b79e9dc-7899-4878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b79e9dc-7899-4878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79b"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 1,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9dc-7899-4878-8c99-ea553181f79b",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9dc-7899-4878-8c99-ea553181f79b",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "d563aabb-6762-405c-91e2-1881941606df"
                    },
                    "AlertStatus": 0,
                    "Name": "czxczxc",
                    "State": {
                        "State": 0,
                        "Status": 0,
                        "SubStatus": 4,
                        "IsProgressActive": true,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": false,
                        "IsMoveEnabled": false,
                        "IsFailoverTestEnabled": false,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": false,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": false,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": false,
                            "IsMoveEnabled": false,
                            "IsFailoverTestEnabled": false,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": false,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": false,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": false
                        },
                        "ProgressObject": {
                            "ProgressPercentage": 0,
                            "ProgressDetails": null
                        },
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 236,
                    "UsedStorageInMB": 4,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 0,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 1,
                    "SampleVM": {
                        "InternalVmName": "vm-674",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto1",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 0,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": null,
                    "id": "d563aabb-6762-405c-91e2-1881941606df",
                    "StateLabel": {
                        "display": "Initializing",
                        "value": 0
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto1",
                        "value": 0,
                        "filterValue": "gui_localat Zerto1"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto1",
                        "value": 0,
                        "filterValue": "gui_localat Zerto1"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto1",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "236 MB",
                        "value": 236
                    },
                    "UsedStorageInMBObj": {
                        "display": "4 MB",
                        "value": 4
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "czxczxc",
                        "nameText": {
                            "label": "czxczxc (1)",
                            "location": "main/vpg_details?id=d563aabb-6762-405c-91e2-1881941606df",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "Syncing",
                        "value": 0,
                        "showProgress": true,
                        "filterValue": "Syncing"
                    },
                    "ActualRPOObj": {
                        "value": 0,
                        "display": "NA"
                    },
                    "gauge": {
                        "degrees": 0,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": [],
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": "rotate(0deg)"
                            },
                            {
                                "transform": "rotate(0deg)"
                            },
                            {
                                "transform": "rotate(0deg)"
                            },
                            {
                                "transform": "rotate(0deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                    "progress": {
                        "label": {
                            "css": "progress-span",
                            "display": "Syncing (0%)"
                        },
                        "value": {
                            "css": "progress-bar progress-bar-danger",
                            "role": "progressBar",
                            "min": 0,
                            "max": 100,
                            "now": 0,
                            "width": "0%"
                        }
                    }
                },
                {
                    "Identifier": {
                        "GroupGuid": "7503a74d-48b9-4d36-ae01-ed460dfcb5b9"
                    },
                    "AlertStatus": 0,
                    "Name": "fdsfds",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 226,
                    "UsedStorageInMB": 0,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 1,
                    "SampleVM": {
                        "InternalVmName": "vm-663",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto1",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 10679,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 180,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "7503a74d-48b9-4d36-ae01-ed460dfcb5b9",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto1",
                        "value": 0,
                        "filterValue": "gui_localat Zerto1"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto1",
                        "value": 0,
                        "filterValue": "gui_localat Zerto1"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto1",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "226 MB",
                        "value": 226
                    },
                    "UsedStorageInMBObj": {
                        "display": "0",
                        "value": 0
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "fdsfds",
                        "nameText": {
                            "label": "fdsfds (1)",
                            "location": "main/vpg_details?id=7503a74d-48b9-4d36-ae01-ed460dfcb5b9",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "a58719b9-d5c3-4213-a012-aa5e090b7b83"
                    },
                    "AlertStatus": 0,
                    "Name": "rrsfsdfsd",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 226,
                    "UsedStorageInMB": 0,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 1,
                    "SampleVM": {
                        "InternalVmName": "vm-664",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto4",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 5909,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "a58719b9-d5c3-4213-a012-aa5e090b7b83",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto4",
                        "value": 0,
                        "filterValue": "gui_localat Zerto4"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto4",
                        "value": 0,
                        "filterValue": "gui_localat Zerto4"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto4",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "226 MB",
                        "value": 226
                    },
                    "UsedStorageInMBObj": {
                        "display": "0",
                        "value": 0
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "rrsfsdfsd",
                        "nameText": {
                            "label": "rrsfsdfsd (1)",
                            "location": "main/vpg_details?id=a58719b9-d5c3-4213-a012-aa5e090b7b83",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                    "progress": null
                }
            ],
            [
                {
                    "Identifier": {
                        "GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38b1"
                    },
                    "AlertStatus": 0,
                    "Name": "VCDvApp",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": {
                                "StopEnabled": true
                            },
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": true
                        },
                        "ProgressObject": null
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 130,
                    "UsedStorageInMB": 118,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 4894,
                    "ConfiguredRPO": 300,
                    "LastTest": null,
                    "Direction": 1,
                    "SampleVM": {
                        "InternalVmName": "vm-348",
                        "ServerIdentifier": {
                            "ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "f92f46dd-f39e-46ec-a3fa-33a6a86084e7"
                    },
                    "SourceSiteName": "gui_local_vcd3",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                    },
                    "TargetSiteName": "gui_local_vcd",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 2
                    },
                    "ZorgId": null,
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 30,
                    "ServiceProfileName": "System Service Profile",
                    "ServiceProfileId": {
                        "InternalId": "42da6ae7-1acf-4d96-9b82-82c2bf42a098"
                    },
                    "id": "5d554e3a-285a-46e7-97d1-ad79c52e38b1",
                    "StateLabel": {
                        "display": "Meeting SLA NaN/1 VMs",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_local_vcd3",
                        "value": 0,
                        "filterValue": "gui_local_vcd3"
                    },
                    "TargetTypeObj": {
                        "display": "gui_local_vcd",
                        "value": 2,
                        "filterValue": "gui_local_vcd",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vcd"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_local_vcd3",
                        "value": 0,
                        "filterValue": "gui_local_vcd3"
                    },
                    "PeerSiteGroupBy": "gui_local_vcd3",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "130 MB",
                        "value": 130
                    },
                    "UsedStorageInMBObj": {
                        "display": "118 MB",
                        "value": 118
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "VCDvApp",
                        "nameText": {
                            "label": "VCDvApp (1)",
                            "location": "main/vpg_details?id=5d554e3a-285a-46e7-97d1-ad79c52e38b1",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "1h 21m",
                        "value": 4894
                    },
                    "gauge": {
                        "degrees": 2202.2999999999997,
                        "color": "vpgs-cards-component__card-gauge--not-meeting",
                        "part": "vpgs-cards-component__card-gauge--past-225",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--bold",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            },
                            {
                                "transform": null
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--recovery",
                    "stateProcess": {
                        "display": "Testing Failover"
                    },
                    "progress": {
                        "label": {
                            "css": "progress-span",
                            "display": "Testing Failover",
                            "title": "Protection status, such as Protecting, Synchronizing, Error, etc."
                        },
                        "buttons": [
                            {
                                "action": "Vpg::StopFot",
                                "css": "stop-vpg-btn",
                                "title": "Stop Failover Test"
                            }
                        ]
                    }
                }
            ],
            {
                "name": "Direction",
                "count": 6,
                "index": 4,
                "collapseRange": {
                    "from": 7,
                    "to": 10
                }
            },
            [
                {
                    "Identifier": {
                        "GroupGuid": "bcfaa8ce-93b5-4f74-8a2b-9742e29486f9"
                    },
                    "AlertStatus": 0,
                    "Name": "asdas",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 227,
                    "UsedStorageInMB": 4,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 2,
                    "SampleVM": {
                        "InternalVmName": "vm-673",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto1",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 1,
                        "BackupRepository": "test",
                        "RestorePointsRange": 1,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 1,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 1,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6900,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "bcfaa8ce-93b5-4f74-8a2b-9742e29486f9",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto1",
                        "value": 0,
                        "filterValue": "gui_localat Zerto1"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto1",
                        "value": 0,
                        "filterValue": "gui_localat Zerto1"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto1",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "227 MB",
                        "value": 227
                    },
                    "UsedStorageInMBObj": {
                        "display": "4 MB",
                        "value": 4
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Extended Recovery",
                        "value": 1
                    },
                    "BackupRepository": "test",
                    "VpgBackupJobStatusObj": {
                        "display": "Scheduled",
                        "value": 1,
                        "filterValue": "Scheduled"
                    },
                    "RestorePointsRangeObj": {
                        "display": "1 Month",
                        "value": 1,
                        "filterValue": "1 Month"
                    },
                    "BackupRelatedDataObj": {
                        "display": "00:00, Saturday",
                        "value": {
                            "VpgBackupJobStatus": 1,
                            "BackupRepository": "test",
                            "RestorePointsRange": 1,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 1,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": "00:00, Saturday"
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdas",
                        "nameText": {
                            "label": "asdas (1)",
                            "location": "main/vpg_details?id=bcfaa8ce-93b5-4f74-8a2b-9742e29486f9",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "4b89e9dc-7899-4878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 2,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "4b89e9dc-7899-4878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=4b89e9dc-7899-4878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "9b89e9da-7899-4878-8c99-ea553181f79c"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 2,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "9b89e9da-7899-4878-8c99-ea553181f79c",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=9b89e9da-7899-4878-8c99-ea553181f79c",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "ab89e9dc-7899-4878-8c99-ea553181f79a"
                    },
                    "AlertStatus": 0,
                    "Name": "asdasdsa",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 2,
                    "SampleVM": {
                        "InternalVmName": "vm-677",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 6704,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 120,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "ab89e9dc-7899-4878-8c99-ea553181f79a",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "asdasdsa",
                        "nameText": {
                            "label": "asdasdsa (1)",
                            "location": "main/vpg_details?id=ab89e9dc-7899-4878-8c99-ea553181f79a",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                    "progress": null
                },
                {
                    "Identifier": {
                        "GroupGuid": "ef69981d-3731-41e7-9d84-5ee1003cbc43"
                    },
                    "AlertStatus": 0,
                    "Name": "bfdbfdb",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": false,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 1,
                    "ProvisionedStorageInMB": 272,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 2,
                    "SampleVM": {
                        "InternalVmName": "vm-680",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto5",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 2,
                        "BackupRepository": "",
                        "RestorePointsRange": 5,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 0,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 0,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 827,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 0,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "ef69981d-3731-41e7-9d84-5ee1003cbc43",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto5",
                        "value": 0,
                        "filterValue": "gui_localat Zerto5"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto5",
                        "value": 0,
                        "filterValue": "gui_localat Zerto5"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto5",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "272 MB",
                        "value": 272
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Disaster Recovery",
                        "value": 0
                    },
                    "BackupRepository": "",
                    "VpgBackupJobStatusObj": {
                        "display": "",
                        "value": 2,
                        "filterValue": ""
                    },
                    "RestorePointsRangeObj": {
                        "display": "",
                        "value": 5,
                        "filterValue": ""
                    },
                    "BackupRelatedDataObj": {
                        "display": "",
                        "value": {
                            "VpgBackupJobStatus": 2,
                            "BackupRepository": "",
                            "RestorePointsRange": 5,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 0,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": ""
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "bfdbfdb",
                        "nameText": {
                            "label": "bfdbfdb (1)",
                            "location": "main/vpg_details?id=ef69981d-3731-41e7-9d84-5ee1003cbc43",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                    "progress": null
                }
            ],
            [
                {
                    "Identifier": {
                        "GroupGuid": "eb30aeec-7b79-48f2-b088-e16d08b642f7"
                    },
                    "AlertStatus": 0,
                    "Name": "sdfsdfsd",
                    "State": {
                        "State": 0,
                        "Status": 1,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": true,
                        "IsFailoverTestEnabled": true,
                        "IsUpdateEnabled": true,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 0,
                        "AlertTips": {
                            "Alerts": [],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 0,
                            "TotalNumberOfWarnings": 0,
                            "TotalNumberOfErrors": 0
                        },
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {
                            "AutoContinueActivated": false,
                            "Action": 1,
                            "TimeLeftInSec": 0
                        },
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": true,
                        "ActiveProcesses": {
                            "RunningFailOverTest": null,
                            "RunningClone": null,
                            "Paused": null,
                            "IsVpgNowPaused": false,
                            "IsResumeEnabled": false,
                            "RunningBackup": null,
                            "IsStopFOTEnabled": false,
                            "VpgUpdate": null,
                            "TimebombInfo": null
                        },
                        "ButtonsState": {
                            "IsFailoverEnabled": true,
                            "IsMoveEnabled": true,
                            "IsFailoverTestEnabled": true,
                            "IsUpdateEnabled": true,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": true,
                            "IsForceSyncEnabled": true,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": false,
                            "IsFlrEnabled": true
                        },
                        "ProgressObject": null,
                        "VMsInInitialSync": 0
                    },
                    "Priority": 1,
                    "NumberOfVms": 4,
                    "ProvisionedStorageInMB": 950,
                    "UsedStorageInMB": 50,
                    "IOPS": 0,
                    "IncomingThroughputInMb": 0,
                    "OutgoingBandWidth": 0,
                    "ActualRPO": 9,
                    "ConfiguredRPO": 20,
                    "LastTest": null,
                    "Direction": 2,
                    "SampleVM": {
                        "InternalVmName": "vm-669",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "OwnersId": {
                        "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                    },
                    "SourceSiteName": "gui_localat Zerto",
                    "SourceSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "TargetSiteName": "gui_localat Zerto",
                    "TargetSiteIdentifier": {
                        "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                    },
                    "CustomerName": "",
                    "AlertTips": {
                        "Alerts": [],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 0,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 0
                    },
                    "Entities": {
                        "Source": 0,
                        "Target": 0
                    },
                    "ZorgId": {
                        "Guid": "00000000-0000-0000-0000-000000000000"
                    },
                    "BackupRelatedData": {
                        "VpgBackupJobStatus": 1,
                        "BackupRepository": "test",
                        "RestorePointsRange": 1,
                        "BackupSchedulingTime": {
                            "SchedulePeriodType": 1,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        }
                    },
                    "RetentionPolicy": 1,
                    "BootOrder": false,
                    "AreScriptsDefined": false,
                    "HistoryInSeconds": 11152,
                    "ServiceProfileName": "",
                    "ServiceProfileId": null,
                    "JournalHealthStatus": {
                        "ActualJournalHealthInMinutes": 180,
                        "RequiredJournalHealthInMinutes": 240,
                        "JournalHealthDescription": ""
                    },
                    "id": "eb30aeec-7b79-48f2-b088-e16d08b642f7",
                    "StateLabel": {
                        "display": "Meeting SLA",
                        "value": 1
                    },
                    "AlertStatusObj": {
                        "classNames": "vpgs-cards-component__card-title-status vpgs-cards-component__card-title-status--ok"
                    },
                    "SourceTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "TargetTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto",
                        "classNames": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type vpgs-cards-component__card-info-type--vc"
                    },
                    "PeerSiteTypeObj": {
                        "display": "gui_localat Zerto",
                        "value": 0,
                        "filterValue": "gui_localat Zerto"
                    },
                    "PeerSiteGroupBy": "gui_localat Zerto",
                    "IOPSObj": {
                        "display": "0 / sec",
                        "value": 0
                    },
                    "IncomingThroughputInMbObj": {
                        "display": "0.0 MB / sec",
                        "value": 0
                    },
                    "OutgoingBandWidthObj": {
                        "display": "0.0 MB",
                        "value": 0
                    },
                    "ProvisionedStorageInMBObj": {
                        "display": "950 MB",
                        "value": 950
                    },
                    "UsedStorageInMBObj": {
                        "display": "50 MB",
                        "value": 50
                    },
                    "LastTestObj": {
                        "display": null,
                        "value": null
                    },
                    "RetentionPolicyObj": {
                        "display": "Extended Recovery",
                        "value": 1
                    },
                    "BackupRepository": "test",
                    "VpgBackupJobStatusObj": {
                        "display": "Scheduled",
                        "value": 1,
                        "filterValue": "Scheduled"
                    },
                    "RestorePointsRangeObj": {
                        "display": "1 Month",
                        "value": 1,
                        "filterValue": "1 Month"
                    },
                    "BackupRelatedDataObj": {
                        "display": "00:00, Saturday",
                        "value": {
                            "VpgBackupJobStatus": 1,
                            "BackupRepository": "test",
                            "RestorePointsRange": 1,
                            "BackupSchedulingTime": {
                                "SchedulePeriodType": 1,
                                "RunningTimeOfDayInMinutes": 0,
                                "DayOfWeek": 6
                            }
                        },
                        "filterValue": "00:00, Saturday"
                    },
                    "locationExist": true,
                    "NameObj": {
                        "display": "sdfsdfsd",
                        "nameText": {
                            "label": "sdfsdfsd (4)",
                            "location": "main/vpg_details?id=eb30aeec-7b79-48f2-b088-e16d08b642f7",
                            "type": "href"
                        }
                    },
                    "vpgState": {
                        "display": "",
                        "value": 0,
                        "showProgress": false,
                        "filterValue": ""
                    },
                    "ActualRPOObj": {
                        "display": "9s",
                        "value": 9
                    },
                    "gauge": {
                        "degrees": 60.75,
                        "color": "vpgs-cards-component__card-gauge--meeting",
                        "part": "vpgs-cards-component__card-gauge--past-45",
                        "rpo": "vpgs-cards-component__card-rpo vpgs-cards-component__card-rpo--big",
                        "rotation": [
                            {
                                "transform": null
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            },
                            {
                                "transform": "rotate(61deg)"
                            }
                        ]
                    },
                    "directionIcon": "vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction vpgs-cards-component__card-info-direction--self",
                    "stateProcess": {
                        "display": "Failover over",
                        "value": 0
                    },
                    "progress": {
                        "label": {
                            "css": "progress-span",
                            "display": "Failover over",
                            "title": "Protection status, such as Protecting, Synchronizing, Error, etc."
                        },
                        "buttons": [
                            {
                                "action": "Vpg::Commit",
                                "css": "commit-btn",
                                "title": "Commit"
                            },
                            {
                                "action": "Vpg::Rollback",
                                "css": "rollback-btn",
                                "title": "Rollback"
                            }
                        ]
                    }
                }
            ]
        ]);
    });
});
