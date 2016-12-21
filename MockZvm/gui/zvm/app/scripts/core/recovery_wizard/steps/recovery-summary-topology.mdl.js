'use strict';

angular.module('zvmApp.core')
    .factory('recoverySummaryTopologyModel', function (enums, recoveryWizardModel, mbToStringConvertorFilter) {

        var recoverySummaryTopologyModel = {};

        //==============================================================================================================
        //CONS
        //==============================================================================================================

        recoverySummaryTopologyModel.topologyCons = {
            FOURTH: 'fourth',
            THIRD: 'third',
            SECOND: 'second',
            FIRST: 'first',
            DIRECTION_OUTGOING: enums.ProtectionGroupStateVisual.Protected,
            DIRECTION_INCOMING: enums.ProtectionGroupStateVisual.Recovery,
            DIRECTION_TO_SELF: enums.ProtectionGroupStateVisual.SelfProtected,
            DIRECTION_TWO_WAY: 3,
            MULTIPLE_SITES: 'Multiple Sites',
            MULTIPLE_SITES_TYPE: 6
        };

        //==============================================================================================================
        //MOCK DATA
        //==============================================================================================================

        // function createMockData() {
        //     var template = {
        //         'Site|2-25': [{
        //             'TargetSiteName': '@domain',
        //             'PeerSiteTypeObj': {
        //                 'display': '@domain',
        //                 'value|0-4': 0
        //             },
        //             'NumberOfVms|1-5': 2,
        //             'Direction|0-1': 0,
        //             'ProvisionedStorageInMB|128-1024': 1024
        //         }]
        //     };
        //
        //     var data = Mock.mock(template);
        //
        //     var min = 0;
        //     var max = 4;
        //     var random1 = Math.floor(Math.random() * (max - min + 1)) + min;
        //
        //     var max1 = 6;
        //     var min1 = random1 + 1;
        //     var random2 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
        //
        //     var max2 = 10;
        //     var min2 = random2 + 1;
        //     var random3 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        //
        //     var cityArray = ['London', 'Moscow', 'Paris', 'New-York', 'Tel-Aviv', 'Tokyo', 'Boston'];
        //
        //     _.each(data.Site, function (mock, index) {
        //         var city = cityArray[Math.floor(Math.random() * cityArray.length)];
        //         var city1 = cityArray[Math.floor(Math.random() * cityArray.length)];
        //
        //         var randomSite = cityArray[Math.floor(Math.random() * cityArray.length)];
        //
        //         if (index < random1) {
        //             mock.TargetSiteName = city;
        //             mock.PeerSiteTypeObj.display = city;
        //         } else if (index < random2) {
        //             //incoming vpg
        //             mock.TargetSiteName = randomSite;
        //             mock.PeerSiteTypeObj.display = randomSite;
        //             mock.Direction = 1;
        //             mock.SourceSiteName = recoveryWizardModel.data.selectedVpgs[0].PeerSiteTypeObj.display
        //         } else if (index < random3) {
        //             //self direction vpg
        //             mock.TargetSiteName = recoveryWizardModel.data.selectedVpgs[0].PeerSiteTypeObj.display;
        //             mock.PeerSiteTypeObj.display = recoveryWizardModel.data.selectedVpgs[0].PeerSiteTypeObj.display;
        //             mock.Direction = 2;
        //             mock.SourceSiteName = recoveryWizardModel.data.selectedVpgs[0].PeerSiteTypeObj.display;
        //         } else {
        //             mock.TargetSiteName = city1;
        //             mock.PeerSiteTypeObj.display = city1;
        //         }
        //
        //         mock.State = {
        //             VMsInInitialSync: false
        //         };
        //     });
        //
        //     var mockData = recoveryWizardModel.data.selectedVpgs.concat(data.Site);
        //     return mockData;
        // }

        //=============================================================================================================
        //                                                    TOPOLOGY
        //==============================================================================================================

        recoverySummaryTopologyModel.getTopologyData = function () {
            if (recoveryWizardModel.data && recoveryWizardModel.data.selectedVpgs) {
                return recoverySummaryTopologyModel.mapDataToTopology(angular.copy(recoveryWizardModel.data.selectedVpgs));
            }
        };

        //check direction of vpgs per site
        function isAllVpgSameDirection(vpgCollection) {
            return _.every(vpgCollection, {Direction: vpgCollection[0].Direction});
        }

        function getSiteDataByArrowType(vpgCollection, arrowType) {
            var storage = 0;

            if (arrowType === 3) {
                var vmIncomingCount = 0;
                var vpgIncomingCount = 0;
                var vmOutgoingCount = 0;
                var vpgOutgoingCount = 0;

                _.each(vpgCollection, function (vpg) {
                    if (vpg.Direction === recoverySummaryTopologyModel.topologyCons.DIRECTION_OUTGOING) {
                        vmOutgoingCount = vmOutgoingCount + (vpg.NumberOfVms - vpg.State.VMsInInitialSync);
                        vpgOutgoingCount++;
                    } else {
                        vmIncomingCount = vmIncomingCount + (vpg.NumberOfVms - vpg.State.VMsInInitialSync);
                        vpgIncomingCount++;
                    }

                    storage = storage + vpg.ProvisionedStorageInMB;
                });

                return {
                    text: vpgOutgoingCount + ' (' + vmOutgoingCount + ')',
                    text1: vpgIncomingCount + ' (' + vmIncomingCount + ')',
                    vpgCount: vpgOutgoingCount + vpgIncomingCount,
                    vmCount: vmOutgoingCount + vmIncomingCount,
                    storage: mbToStringConvertorFilter(storage)
                };

            } else {
                var vpgCount = vpgCollection.length;
                var vmCount = 0;

                _.each(vpgCollection, function (vpg) {
                    vmCount = vmCount + (vpg.NumberOfVms - vpg.State.VMsInInitialSync);
                    storage = storage + vpg.ProvisionedStorageInMB;
                });

                return {
                    text: vpgCount + ' (' + vmCount + ')',
                    vpgCount: vpgCount,
                    vmCount: vmCount,
                    storage: mbToStringConvertorFilter(storage)
                };
            }
        }

        function createSite(vpgCollection) {
            if (angular.isDefined(vpgCollection) && angular.isArray(vpgCollection) && vpgCollection.length) {

                //check arrow direction
                var arrowType = isAllVpgSameDirection(vpgCollection) ? vpgCollection[0].Direction : recoverySummaryTopologyModel.topologyCons.DIRECTION_TWO_WAY;

                return {
                    name: vpgCollection[0].PeerSiteTypeObj.display,
                    type: vpgCollection[0].PeerSiteTypeObj.value,
                    arrowType: arrowType,
                    data: getSiteDataByArrowType(vpgCollection, arrowType)
                };
            }
        }

        function createLocalSite(site) {
            return {
                name: site.LocalSiteTypeObj.display,
                type: site.LocalSiteTypeObj.value
            };
        }

        function checkLocalSiteDirection(localSitePeers, localSite) {
            if (localSitePeers.hasOwnProperty(localSite.name)) {

                var incomingVpgs = _.remove(localSitePeers[localSite.name], function (vpg) {
                    return vpg.Direction === recoverySummaryTopologyModel.topologyCons.DIRECTION_INCOMING;
                });

                _.forEach(incomingVpgs, function (vpg) {
                    if (angular.isDefined(localSitePeers[vpg.SourceSiteName])) {
                        localSitePeers[vpg.SourceSiteName].push(vpg);
                    } else {
                        localSitePeers[vpg.SourceSiteName] = [vpg];
                    }
                });

                //remove empty local site
                delete localSitePeers[localSite.name];
            }
        }

        //function that return collection by specific type
        function getSiteCollectionByType(collection, type) {
            return _.filter(collection, function (site) {
                return site[0].PeerSiteTypeObj.value === type;
            });
        }

        //function that get and delete first site item from collection
        function getFirstSiteFromCollection(collection) {
            return collection.splice(0, 1)[0];
        }

        //check if collection not empty and add the first site item to new collection to first position
        function addSitesItems(typeCollection, newCollection) {
            if (typeCollection.length) {
                newCollection.unshift(getFirstSiteFromCollection(typeCollection));
            }

            return newCollection;
        }

        function mapAndOrderPeerSitesByType(peerSitesCollection) {
            var peerSiteCollectionAfterDifferentTypeReorder = [];

            //divided all site to different collection by type
            var vcType = getSiteCollectionByType(peerSitesCollection, enums.VpgEntityType.VCVpg);
            var vcdType = getSiteCollectionByType(peerSitesCollection, enums.VpgEntityType.VCDvApp);
            var awsType = getSiteCollectionByType(peerSitesCollection, enums.VpgEntityType.Aws);
            var hyperVType = getSiteCollectionByType(peerSitesCollection, enums.VpgEntityType.HyperV);

            //new collection that has sites with different types in first position
            peerSiteCollectionAfterDifferentTypeReorder = addSitesItems(hyperVType, peerSiteCollectionAfterDifferentTypeReorder);
            peerSiteCollectionAfterDifferentTypeReorder = addSitesItems(awsType, peerSiteCollectionAfterDifferentTypeReorder);
            peerSiteCollectionAfterDifferentTypeReorder = addSitesItems(vcdType, peerSiteCollectionAfterDifferentTypeReorder);
            peerSiteCollectionAfterDifferentTypeReorder = addSitesItems(vcType, peerSiteCollectionAfterDifferentTypeReorder);

            //collect all remaining sites collections to new collection
            peerSiteCollectionAfterDifferentTypeReorder = peerSiteCollectionAfterDifferentTypeReorder.concat(vcType, vcdType, awsType, hyperVType);

            return peerSiteCollectionAfterDifferentTypeReorder;
        }

        recoverySummaryTopologyModel.mapDataToTopology = function (data) {
            //mock data
            // data = createMockData();

            //static mock 1 incoming 1 outgoing
            //data = [{"Identifier":{"GroupGuid":"9d629f97-b1d7-40b1-95eb-ac1f29af1bc8"},"AlertStatus":0,"Name":"C1","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":2,"ProvisionedStorageInMB":3923,"UsedStorageInMB":2899,"IOPS":0,"IncomingThroughputInMb":0.00341796875,"OutgoingBandWidth":0.00048828125,"ActualRPO":13,"ConfiguredRPO":300,"LastTest":null,"Direction":0,"SampleVM":{"InternalVmName":"vm-352","ServerIdentifier":{"ServerGuid":"4d762c8e-c4bf-4efb-828c-4a0f603c3811"}},"OwnersId":{"OwnersGuid":"33c096bf-2e55-48ee-9e90-01a732e6e969"},"SourceSiteName":"C","SourceSiteIdentifier":{"SiteGuid":"1d5ac612-ba89-4569-9b7f-ed984863b309"},"TargetSiteName":"A","TargetSiteIdentifier":{"SiteGuid":"c922bf92-cbea-4c1b-8acb-c0f0374dfac0"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":435,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":0,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":0,"vpgName":"C1 (2)","PeerSiteTypeObj":{"display":"A","filterValue":"A","value":0},"LocalSiteTypeObj":{"display":"C","filterValue":"C","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"cc010280-fe84-4869-badf-66c7ef554140"},"AlertStatus":0,"Name":"A1","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":1904,"UsedStorageInMB":1373,"IOPS":2,"IncomingThroughputInMb":0.0087890625,"OutgoingBandWidth":0.00146484375,"ActualRPO":9,"ConfiguredRPO":300,"LastTest":null,"Direction":1,"SampleVM":{"InternalVmName":"vm-222","ServerIdentifier":{"ServerGuid":"e88cea88-c03c-4190-b01f-40d8511fe7b6"}},"OwnersId":{"OwnersGuid":"33c096bf-2e55-48ee-9e90-01a732e6e969"},"SourceSiteName":"A","SourceSiteIdentifier":{"SiteGuid":"1d5ac612-ba89-4569-9b7f-ed984863b309"},"TargetSiteName":"C","TargetSiteIdentifier":{"SiteGuid":"c922bf92-cbea-4c1b-8acb-c0f0374dfac0"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":461,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":0,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":1,"vpgName":"A1 (1)","PeerSiteTypeObj":{"display":"A","filterValue":"A","value":0},"LocalSiteTypeObj":{"display":"C","filterValue":"C","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}}];

            //static mock whit 10 vpgs and 5 sites
            //data = [{"Identifier":{"GroupGuid":"3974fe01-48be-49b7-a76f-dc98429130da"},"AlertStatus":0,"Name":"3","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":1699,"UsedStorageInMB":1699,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":12,"ConfiguredRPO":300,"LastTest":null,"Direction":0,"SampleVM":{"InternalVmName":"vm-1748","ServerIdentifier":{"ServerGuid":"4e2ade09-6b88-4d0e-947c-a468d5d91c43"}},"OwnersId":{"OwnersGuid":"20940810-72f2-4dac-96d1-b94dd526b230"},"SourceSiteName":"1","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"3","TargetSiteIdentifier":{"SiteGuid":"f83277fa-68b0-4112-a5ad-f655a07d084a"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":56271,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":0,"vpgName":"3 (1)","PeerSiteTypeObj":{"display":"3","filterValue":"3","value":0},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"757dc7d1-90ec-42cc-8366-8e0c225fb763"},"AlertStatus":0,"Name":"2","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":1443,"UsedStorageInMB":1443,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":12,"ConfiguredRPO":300,"LastTest":null,"Direction":0,"SampleVM":{"InternalVmName":"vm-1747","ServerIdentifier":{"ServerGuid":"4e2ade09-6b88-4d0e-947c-a468d5d91c43"}},"OwnersId":{"OwnersGuid":"412e87c0-ad31-4485-84a9-031a553af321"},"SourceSiteName":"1","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"2","TargetSiteIdentifier":{"SiteGuid":"964b64ea-98d5-45d2-b5f1-6f552b70c444"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":56331,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":1,"vpgName":"2 (1)","PeerSiteTypeObj":{"display":"2","filterValue":"2","value":0},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"a20e4c91-8fed-4611-89c2-eed327c23e25"},"AlertStatus":0,"Name":"5","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":1699,"UsedStorageInMB":1699,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":7,"ConfiguredRPO":300,"LastTest":null,"Direction":0,"SampleVM":{"InternalVmName":"vm-1765","ServerIdentifier":{"ServerGuid":"4e2ade09-6b88-4d0e-947c-a468d5d91c43"}},"OwnersId":{"OwnersGuid":"546fd9fd-f388-4380-815b-4c704c837bde"},"SourceSiteName":"1","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"5","TargetSiteIdentifier":{"SiteGuid":"665239b3-6750-4bf4-ba33-72f9399b1a3e"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":4},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":56286,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":2,"vpgName":"5 (1)","PeerSiteTypeObj":{"display":"5","filterValue":"5","value":4},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"86d682f4-7610-4212-b8e1-7dff3205bf28"},"AlertStatus":0,"Name":"4","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":880,"UsedStorageInMB":880,"IOPS":0,"IncomingThroughputInMb":0.00341796875,"OutgoingBandWidth":0.00048828125,"ActualRPO":7,"ConfiguredRPO":300,"LastTest":null,"Direction":0,"SampleVM":{"InternalVmName":"vm-1349","ServerIdentifier":{"ServerGuid":"4e2ade09-6b88-4d0e-947c-a468d5d91c43"}},"OwnersId":{"OwnersGuid":"ea7269fe-1aa7-4359-9c52-edac5f9bd444"},"SourceSiteName":"1","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"4","TargetSiteIdentifier":{"SiteGuid":"b52cd17f-2fb5-4686-9270-cb08864fe1b1"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":56080,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":3,"vpgName":"4 (1)","PeerSiteTypeObj":{"display":"4","filterValue":"4","value":0},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"ae870a3e-325c-425a-80e8-5baf78df95fb"},"AlertStatus":0,"Name":"6","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":880,"UsedStorageInMB":878,"IOPS":0,"IncomingThroughputInMb":0.00341796875,"OutgoingBandWidth":0.00048828125,"ActualRPO":7,"ConfiguredRPO":300,"LastTest":null,"Direction":0,"SampleVM":{"InternalVmName":"vm-1647","ServerIdentifier":{"ServerGuid":"4e2ade09-6b88-4d0e-947c-a468d5d91c43"}},"OwnersId":{"OwnersGuid":"4a4a940f-adad-4143-be3c-3cb4855fd878"},"SourceSiteName":"1","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"6","TargetSiteIdentifier":{"SiteGuid":"5f9c0dff-3b0f-424d-8f7c-85ca98b39f09"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":4},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":56306,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":4,"vpgName":"6 (1)","PeerSiteTypeObj":{"display":"6","filterValue":"6","value":4},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"6c9bc56d-e436-4b28-a71b-fa7e2a23e7b1"},"AlertStatus":0,"Name":"VPG3","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":931,"UsedStorageInMB":917,"IOPS":0,"IncomingThroughputInMb":0.00341796875,"OutgoingBandWidth":0.00048828125,"ActualRPO":9,"ConfiguredRPO":300,"LastTest":null,"Direction":1,"SampleVM":{"InternalVmName":"vm-190","ServerIdentifier":{"ServerGuid":"4f23bac5-1deb-457d-b22a-cc76ce8f1e7b"}},"OwnersId":{"OwnersGuid":"20940810-72f2-4dac-96d1-b94dd526b230"},"SourceSiteName":"3","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"1","TargetSiteIdentifier":{"SiteGuid":"f83277fa-68b0-4112-a5ad-f655a07d084a"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":55774,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":5,"vpgName":"VPG3 (1)","PeerSiteTypeObj":{"display":"3","filterValue":"3","value":0},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"ccfe7dd4-3889-44a5-b631-a4f0fd6ff018"},"AlertStatus":0,"Name":"VPG2","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":931,"UsedStorageInMB":928,"IOPS":0,"IncomingThroughputInMb":0.00341796875,"OutgoingBandWidth":0.00048828125,"ActualRPO":9,"ConfiguredRPO":300,"LastTest":null,"Direction":1,"SampleVM":{"InternalVmName":"vm-159","ServerIdentifier":{"ServerGuid":"11c6b005-5f2f-44bb-89cf-ff3dad595c1e"}},"OwnersId":{"OwnersGuid":"412e87c0-ad31-4485-84a9-031a553af321"},"SourceSiteName":"2","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"1","TargetSiteIdentifier":{"SiteGuid":"964b64ea-98d5-45d2-b5f1-6f552b70c444"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":55941,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":6,"vpgName":"VPG2 (1)","PeerSiteTypeObj":{"display":"2","filterValue":"2","value":0},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"acfc38ac-7139-4d9b-bb25-c1aff3396d20"},"AlertStatus":0,"Name":"VPG5","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":1024,"UsedStorageInMB":904,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":9,"ConfiguredRPO":300,"LastTest":null,"Direction":1,"SampleVM":{"InternalVmName":"49f9c149-3b22-4e4f-a8b7-b433bad70304","ServerIdentifier":{"ServerGuid":"766ec4b9-96cd-46d9-7365-955c46d6383d"}},"OwnersId":{"OwnersGuid":"546fd9fd-f388-4380-815b-4c704c837bde"},"SourceSiteName":"5","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"1","TargetSiteIdentifier":{"SiteGuid":"665239b3-6750-4bf4-ba33-72f9399b1a3e"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":4,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":55733,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":7,"vpgName":"VPG5 (1)","PeerSiteTypeObj":{"display":"5","filterValue":"5","value":4},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"5dab8f9f-b0a0-465f-b2b1-50b9d498d3b7"},"AlertStatus":0,"Name":"VPG4","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":931,"UsedStorageInMB":917,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":8,"ConfiguredRPO":300,"LastTest":null,"Direction":1,"SampleVM":{"InternalVmName":"vm-128","ServerIdentifier":{"ServerGuid":"e2340fef-c14c-492a-8ff9-62aaa4a9ba1c"}},"OwnersId":{"OwnersGuid":"ea7269fe-1aa7-4359-9c52-edac5f9bd444"},"SourceSiteName":"4","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"1","TargetSiteIdentifier":{"SiteGuid":"b52cd17f-2fb5-4686-9270-cb08864fe1b1"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":55759,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":8,"vpgName":"VPG4 (1)","PeerSiteTypeObj":{"display":"4","filterValue":"4","value":0},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}},{"Identifier":{"GroupGuid":"72a9a5c5-dec3-436b-9e35-460c9ca226e8"},"AlertStatus":0,"Name":"VPG6","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":2048,"UsedStorageInMB":908,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":14,"ConfiguredRPO":300,"LastTest":null,"Direction":1,"SampleVM":{"InternalVmName":"22b1825c-8fca-4fce-b5e4-364dfb38bd18","ServerIdentifier":{"ServerGuid":"0f163f6b-19c1-f34e-841c-9943bfb81958"}},"OwnersId":{"OwnersGuid":"4a4a940f-adad-4143-be3c-3cb4855fd878"},"SourceSiteName":"6","SourceSiteIdentifier":{"SiteGuid":"50ed52ee-d532-4d71-9b3d-cca3b8adbe2d"},"TargetSiteName":"1","TargetSiteIdentifier":{"SiteGuid":"5f9c0dff-3b0f-424d-8f7c-85ca98b39f09"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":4,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":55705,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":9,"vpgName":"VPG6 (1)","PeerSiteTypeObj":{"display":"6","filterValue":"6","value":4},"LocalSiteTypeObj":{"display":"1","filterValue":"1","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":false,"vpgInfo":null,"reverseLabel":""},"checkpointObj":{"checkpoint":"","lastCheckpoint":null,"filterValue":""},"commitPolicyObj":{"commitPolicy":"","filterValue":"","defaultAction":2,"defaultTimeout":0}}];


            //get all self direction vpgs
            var selfDirectionVpgs = _.filter(data, function (vpg) {
                return vpg.Direction === recoverySummaryTopologyModel.topologyCons.DIRECTION_TO_SELF;
            });

            //get all others vpgs (not self direction)
            var peersDirectionVpgs = _.filter(data, function (vpg) {
                return vpg.Direction !== recoverySummaryTopologyModel.topologyCons.DIRECTION_TO_SELF;
            });

            //create source site
            var localSite = selfDirectionVpgs.length !== 0 ? createSite(selfDirectionVpgs) : createLocalSite(peersDirectionVpgs[0]);

            //davide by peer site name and sort by bigger vpgs count per site
            var peerSitesCollection = _.groupBy(peersDirectionVpgs, 'TargetSiteName');

            checkLocalSiteDirection(peerSitesCollection, localSite);

            var targetSites = [];
            var multipleData = [];
            //get count peer sites without self direction
            var peerSiteCount = peerSitesCollection.hasOwnProperty(localSite.name) ? Object.keys(peerSitesCollection).length - 1 : Object.keys(peerSitesCollection).length;
            var index = peerSiteCount > 3 ? 2 : 3;

            //check if need to reorder sites by type
            if (peerSiteCount > 3) {
                peerSitesCollection = mapAndOrderPeerSitesByType(peerSitesCollection);
            }

            _.each(peerSitesCollection, function (peerSite) {
                if (angular.isDefined(peerSite[0])) {
                    if (targetSites.length < index) {
                        targetSites.push(createSite(peerSite));
                    } else {
                        multipleData = multipleData.concat(peerSite);
                    }
                }
            });

            //check is has multiple sites
            if (multipleData.length) {
                multipleData[0].PeerSiteTypeObj.display = recoverySummaryTopologyModel.topologyCons.MULTIPLE_SITES;
                multipleData[0].PeerSiteTypeObj.value = recoverySummaryTopologyModel.topologyCons.MULTIPLE_SITES_TYPE;
                targetSites.push(createSite(multipleData));
                //add to multiple site count of total sites
                targetSites[2].sitesCount =
                    _.uniq(
                        _.remove(
                            _.pluck(multipleData, 'SourceSiteName'),
                            function (siteName) {
                                //remove local site from sites list
                                return siteName !== localSite.name;
                            })).length;
            }

            targetSites.unshift(localSite);
            return targetSites;
        };

        return recoverySummaryTopologyModel;
    });

