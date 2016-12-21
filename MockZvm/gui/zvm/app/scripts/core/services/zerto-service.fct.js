'use strict';

angular.module('zvmApp.services')
    .factory('zertoServiceFactory', function (basil, zertoLoggerServiceFactory, zertoServiceRequestHandler,
                                              tweaksService, busyOverlayService) {
        var zertoServiceFactory = {};
        var logRequests, logIgnoreList, tweaksInitialized = false;

        var initTweaks = function () {
            tweaksInitialized = true;
            logRequests = basil.sessionStorage.get('log-requests') || tweaksService.getTweak('t_logServiceRequests', false);
            logIgnoreList = tweaksService.getTweak('t_logIgnoreList', '').split(',');
        };

        var invoke = function (operation, params) { // jshint ignore:line
            var startOperationTime = new Date();

            if (!tweaksInitialized) {
                initTweaks();
            }
            var logOp = logRequests && logIgnoreList.indexOf(operation) === -1,
                zertoAnalyticsOp = logIgnoreList.indexOf(operation) === -1;

            if (logOp) {
                zertoLoggerServiceFactory.logCall(operation, params);
            }

            busyOverlayService.addOperation(operation);
            return zertoServiceRequestHandler.invoke(operation, params, startOperationTime, logOp, zertoAnalyticsOp);
        };

        zertoServiceFactory.setLogRequests = function setLogRequests(value) {
            basil.sessionStorage.set('log-requests', value);
            logRequests = value;
        };

        zertoServiceFactory.getLogRequests = function getLogRequests() {
            return basil.sessionStorage.get('log-requests');
        };

        /* jshint ignore:start */
        // start of auto generated code. DO NOT MODIFY
        /**
         * @param {vos.ProtectionGroupIdentifier[]} identifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.AbortBackups = function AbortBackups(identifiers) {
            return invoke('AbortBackups', [identifiers]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} identifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.AbortClone = function AbortClone(identifier) {
            return invoke('AbortClone', [identifier]);
        };
        /**
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.AcknowledgeTaskSummary = function AcknowledgeTaskSummary() {
            return invoke('AcknowledgeTaskSummary', []);
        };
        /**
         * @param {function(vos.BackupTargetIdentifier)} callback {@link function(vos.BackupTargetIdentifier)}
         * @name _Deferred_AddBackupTarget.then
         */
        /**
         * @param {vos.BackupTargetDetailsVisualObject} backupDatails {@link vos.BackupTargetDetailsVisualObject}
         * @returns {_Deferred_AddBackupTarget} a promise with a callback with result {@link vos.BackupTargetIdentifier}
         */
        zertoServiceFactory.AddBackupTarget = function AddBackupTarget(backupDatails) {
            return invoke('AddBackupTarget', [backupDatails]);
        };
        /**
         * @param {function(vos.AuthorizedActionsVisualObject)} callback {@link function(vos.AuthorizedActionsVisualObject)}
         * @name _Deferred_AllowCreateProtectionGroup.then
         */
        /**
         * @returns {_Deferred_AllowCreateProtectionGroup} a promise with a callback with result {@link vos.AuthorizedActionsVisualObject}
         */
        zertoServiceFactory.AllowCreateProtectionGroup = function AllowCreateProtectionGroup() {
            return invoke('AllowCreateProtectionGroup', []);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier[]} identifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.BackupProtectionGroups = function BackupProtectionGroups(identifiers) {
            return invoke('BackupProtectionGroups', [identifiers]);
        };
        /**
         * @param {function(vos.PreSeedFolderContentVisualObject)} callback {@link function(vos.PreSeedFolderContentVisualObject)}
         * @name _Deferred_BrowseForVmdkFiles.then
         */
        /**
         * @param {vos.ZertoOrganizationIdentifier} zertoOrganizationIdentifier {@link vos.ZertoOrganizationIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.OwnersIdentifier} currentVpgOwnersId {@link vos.OwnersIdentifier}
         * @param {vos.DatastoreIdentifier} datastoreIdentifier {@link vos.DatastoreIdentifier}
         * @param {string} folderPath {@link string}
         * @param {vos.VMIdentifier} sourceVmId {@link vos.VMIdentifier}
         * @param {vos.DiskLocationParams} sourceDisk {@link vos.DiskLocationParams}
         * @returns {_Deferred_BrowseForVmdkFiles} a promise with a callback with result {@link vos.PreSeedFolderContentVisualObject}
         */
        zertoServiceFactory.BrowseForVmdkFiles = function BrowseForVmdkFiles(zertoOrganizationIdentifier, optionalProtectionGroupIdentifier, currentVpgOwnersId, datastoreIdentifier, folderPath, sourceVmId, sourceDisk) {
            return invoke('BrowseForVmdkFiles', [zertoOrganizationIdentifier, optionalProtectionGroupIdentifier, currentVpgOwnersId, datastoreIdentifier, folderPath, sourceVmId, sourceDisk]);
        };
        /**
         * @param {function(vos.PreSeedFolderContentVisualObject)} callback {@link function(vos.PreSeedFolderContentVisualObject)}
         * @name _Deferred_BrowseForVmdkFilesTargetVcd.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.OwnersIdentifier} currentVpgOwnersId {@link vos.OwnersIdentifier}
         * @param {vos.VCDVirtualDatacenterStorageProfileVisualObject} storageProfile {@link vos.VCDVirtualDatacenterStorageProfileVisualObject}
         * @param {string} folderPath {@link string}
         * @param {vos.VMIdentifier} sourceVmId {@link vos.VMIdentifier}
         * @param {vos.DiskLocationParams} sourceDisk {@link vos.DiskLocationParams}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @returns {_Deferred_BrowseForVmdkFilesTargetVcd} a promise with a callback with result {@link vos.PreSeedFolderContentVisualObject}
         */
        zertoServiceFactory.BrowseForVmdkFilesTargetVcd = function BrowseForVmdkFilesTargetVcd(optionalProtectionGroupIdentifier, currentVpgOwnersId, storageProfile, folderPath, sourceVmId, sourceDisk, targetOrgVdc) {
            return invoke('BrowseForVmdkFilesTargetVcd', [optionalProtectionGroupIdentifier, currentVpgOwnersId, storageProfile, folderPath, sourceVmId, sourceDisk, targetOrgVdc]);
        };
        /**
         * @param {vos.CommandTaskIdentifier} taskId {@link vos.CommandTaskIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.CancelTask = function CancelTask(taskId) {
            return invoke('CancelTask', [taskId]);
        };
        /**
         * @param {vos.HostIdentifier[]} hostIdentifiers {@link vos.HostIdentifier[]}
         * @param {string} hostPassword {@link string}
         * @param {boolean} useRsaKeyInsteadOfPassword {@link boolean}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ChangeHostsPassword = function ChangeHostsPassword(hostIdentifiers, hostPassword, useRsaKeyInsteadOfPassword) {
            return invoke('ChangeHostsPassword', [hostIdentifiers, hostPassword, useRsaKeyInsteadOfPassword]);
        };
        /**
         * @param {vos.HostIdentifier} hostIdentifier {@link vos.HostIdentifier}
         * @param {vos.VraIpConf} vraIpConf {@link vos.VraIpConf}
         * @param {string} hostPassword {@link string}
         * @param {string} bandwidthGroup {@link string}
         * @param {boolean} useRsaKeyInsteadOfPassword {@link boolean}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ChangeVraSettings = function ChangeVraSettings(hostIdentifier, vraIpConf, hostPassword, bandwidthGroup, useRsaKeyInsteadOfPassword) {
            return invoke('ChangeVraSettings', [hostIdentifier, vraIpConf, hostPassword, bandwidthGroup, useRsaKeyInsteadOfPassword]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} identifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.CheckpointIdentifier} checkpointIdentifier {@link vos.CheckpointIdentifier}
         * @param {vos.DatastoreIdentifier} datastoreIdentifier {@link vos.DatastoreIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.Clone = function Clone(identifier, checkpointIdentifier, datastoreIdentifier) {
            return invoke('Clone', [identifier, checkpointIdentifier, datastoreIdentifier]);
        };
        /**
         * @param {function(vos.ProtectionGroupIdentifier)} callback {@link function(vos.ProtectionGroupIdentifier)}
         * @name _Deferred_CloudPortalCreateProtectionGroup.then
         */
        /**
         * @param {string} name {@link string}
         * @param {vos.VCDVAppIdentifier} vcdvAppIdentifier {@link vos.VCDVAppIdentifier}
         * @param {vos.VMIdentifier[]} vcVms {@link vos.VMIdentifier[]}
         * @param {vos.SiteIdentifier} targetSiteId {@link vos.SiteIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetVirtualDatacenter {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.ResourcePoolIdentifier} targetResourcePool {@link vos.ResourcePoolIdentifier}
         * @param {vos.DatastoreIdentifier} targetDs {@link vos.DatastoreIdentifier}
         * @param {vos.ServiceProfileIdentifier} serviceProfileIdentifier {@link vos.ServiceProfileIdentifier}
         * @returns {_Deferred_CloudPortalCreateProtectionGroup} a promise with a callback with result {@link vos.ProtectionGroupIdentifier}
         */
        zertoServiceFactory.CloudPortalCreateProtectionGroup = function CloudPortalCreateProtectionGroup(name, vcdvAppIdentifier, vcVms, targetSiteId, targetVirtualDatacenter, targetResourcePool, targetDs, serviceProfileIdentifier) {
            return invoke('CloudPortalCreateProtectionGroup', [name, vcdvAppIdentifier, vcVms, targetSiteId, targetVirtualDatacenter, targetResourcePool, targetDs, serviceProfileIdentifier]);
        };
        /**
         * @param {function(vos.ManageVPGInfoVisualObject)} callback {@link function(vos.ManageVPGInfoVisualObject)}
         * @name _Deferred_CloudPortalGetAdvancedCreateVpgScreen.then
         */
        /**
         * @param {vos.VCDVAppIdentifier} vcdvAppIdentifier {@link vos.VCDVAppIdentifier}
         * @param {vos.VMIdentifier[]} vcVms {@link vos.VMIdentifier[]}
         * @param {vos.SiteIdentifier} targetSiteId {@link vos.SiteIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetVirtualDatacenter {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.ResourcePoolIdentifier} targetResourcePool {@link vos.ResourcePoolIdentifier}
         * @param {vos.DatastoreIdentifier} targetDs {@link vos.DatastoreIdentifier}
         * @returns {_Deferred_CloudPortalGetAdvancedCreateVpgScreen} a promise with a callback with result {@link vos.ManageVPGInfoVisualObject}
         */
        zertoServiceFactory.CloudPortalGetAdvancedCreateVpgScreen = function CloudPortalGetAdvancedCreateVpgScreen(vcdvAppIdentifier, vcVms, targetSiteId, targetVirtualDatacenter, targetResourcePool, targetDs) {
            return invoke('CloudPortalGetAdvancedCreateVpgScreen', [vcdvAppIdentifier, vcVms, targetSiteId, targetVirtualDatacenter, targetResourcePool, targetDs]);
        };
        /**
         * @param {vos.BackupTargetDetailsVisualObject} backupTargetDetailsVisualObject {@link vos.BackupTargetDetailsVisualObject}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.CreateBackupTargetRootPath = function CreateBackupTargetRootPath(backupTargetDetailsVisualObject) {
            return invoke('CreateBackupTargetRootPath', [backupTargetDetailsVisualObject]);
        };
        /**
         * @param {function(vos.ProtectionGroupIdentifier)} callback {@link function(vos.ProtectionGroupIdentifier)}
         * @name _Deferred_CreateProtectionGroup.then
         */
        /**
         * @param {vos.VpgConfigurationVisualObject} vpgDetailsScreenVisualObject {@link vos.VpgConfigurationVisualObject}
         * @param {vos.VPGConfigurationCreateModifiersVisualObject} vpgConfigurationUpdateModifiersVisualObject {@link vos.VPGConfigurationCreateModifiersVisualObject}
         * @returns {_Deferred_CreateProtectionGroup} a promise with a callback with result {@link vos.ProtectionGroupIdentifier}
         */
        zertoServiceFactory.CreateProtectionGroup = function CreateProtectionGroup(vpgDetailsScreenVisualObject, vpgConfigurationUpdateModifiersVisualObject) {
            return invoke('CreateProtectionGroup', [vpgDetailsScreenVisualObject, vpgConfigurationUpdateModifiersVisualObject]);
        };
        /**
         * @param {vos.BackupTargetIdentifier} identifier {@link vos.BackupTargetIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.DeleteBackupTarget = function DeleteBackupTarget(identifier) {
            return invoke('DeleteBackupTarget', [identifier]);
        };
        /**
         * @param {string[]} alertInstanceUuids {@link string[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.DismissAlerts = function DismissAlerts(alertInstanceUuids) {
            return invoke('DismissAlerts', [alertInstanceUuids]);
        };
        /**
         * @param {vos.BaseComputeResourceIdentifier} originalVraHost {@link vos.BaseComputeResourceIdentifier}
         * @param {vos.ChangeHostScreenVisualObject} currentChangeHostScreenVisualObject {@link vos.ChangeHostScreenVisualObject}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ExecuteChangeHost = function ExecuteChangeHost(originalVraHost, currentChangeHostScreenVisualObject) {
            return invoke('ExecuteChangeHost', [originalVraHost, currentChangeHostScreenVisualObject]);
        };
        /**
         * @param {vos.FailoverBeforeCommitGuiCommand[]} failoverBeforeCommitGuiCommands {@link vos.FailoverBeforeCommitGuiCommand[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.FailoverBeforeCommit = function FailoverBeforeCommit(failoverBeforeCommitGuiCommands) {
            return invoke('FailoverBeforeCommit', [failoverBeforeCommitGuiCommands]);
        };
        /**
         * @param {function(vos.FailoverTestResult)} callback {@link function(vos.FailoverTestResult)}
         * @name _Deferred_FailoverTest.then
         */
        /**
         * @param {vos.FailoverTestGuiCommand[]} failoverTestGuiCommands {@link vos.FailoverTestGuiCommand[]}
         * @returns {_Deferred_FailoverTest} a promise with a callback with result {@link vos.FailoverTestResult}
         */
        zertoServiceFactory.FailoverTest = function FailoverTest(failoverTestGuiCommands) {
            return invoke('FailoverTest', [failoverTestGuiCommands]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} identifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ForceProtectionGroupSync = function ForceProtectionGroupSync(identifier) {
            return invoke('ForceProtectionGroupSync', [identifier]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ForceRemoveProtectionGroup = function ForceRemoveProtectionGroup(protectionGroupIdentifier) {
            return invoke('ForceRemoveProtectionGroup', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.AboutScreenVisualObject)} callback {@link function(vos.AboutScreenVisualObject)}
         * @name _Deferred_GetAboutScreen.then
         */
        /**
         * @returns {_Deferred_GetAboutScreen} a promise with a callback with result {@link vos.AboutScreenVisualObject}
         */
        zertoServiceFactory.GetAboutScreen = function GetAboutScreen() {
            return invoke('GetAboutScreen', []);
        };
        /**
         * @param {function(vos.ActivityScreenVisualObject)} callback {@link function(vos.ActivityScreenVisualObject)}
         * @name _Deferred_GetActivityScreenVisualObject.then
         */
        /**
         * @param {vos.ActivityScreenQueryCriterias} queryCriterias {@link vos.ActivityScreenQueryCriterias}
         * @returns {_Deferred_GetActivityScreenVisualObject} a promise with a callback with result {@link vos.ActivityScreenVisualObject}
         */
        zertoServiceFactory.GetActivityScreenVisualObject = function GetActivityScreenVisualObject(queryCriterias) {
            return invoke('GetActivityScreenVisualObject', [queryCriterias]);
        };
        /**
         * @param {function(vos.AdvancedSiteSettings)} callback {@link function(vos.AdvancedSiteSettings)}
         * @name _Deferred_GetAdvancedSiteSettings.then
         */
        /**
         * @returns {_Deferred_GetAdvancedSiteSettings} a promise with a callback with result {@link vos.AdvancedSiteSettings}
         */
        zertoServiceFactory.GetAdvancedSiteSettings = function GetAdvancedSiteSettings() {
            return invoke('GetAdvancedSiteSettings', []);
        };
        /**
         * @param {function(vos.AlertsScreenVisualObject)} callback {@link function(vos.AlertsScreenVisualObject)}
         * @name _Deferred_GetAlertsScreen.then
         */
        /**
         * @returns {_Deferred_GetAlertsScreen} a promise with a callback with result {@link vos.AlertsScreenVisualObject}
         */
        zertoServiceFactory.GetAlertsScreen = function GetAlertsScreen() {
            return invoke('GetAlertsScreen', []);
        };
        /**
         * @param {function(vos.BackupTargetExtendedDetailsVisualObjectScreen)} callback {@link function(vos.BackupTargetExtendedDetailsVisualObjectScreen)}
         * @name _Deferred_GetAllBackupTargets.then
         */
        /**
         * @returns {_Deferred_GetAllBackupTargets} a promise with a callback with result {@link vos.BackupTargetExtendedDetailsVisualObjectScreen}
         */
        zertoServiceFactory.GetAllBackupTargets = function GetAllBackupTargets() {
            return invoke('GetAllBackupTargets', []);
        };
        /**
         * @param {function(string[])} callback {@link function(string[])}
         * @name _Deferred_GetAllVrasBandwidthGroups.then
         */
        /**
         * @returns {_Deferred_GetAllVrasBandwidthGroups} a promise with a callback with result {@link string[]}
         */
        zertoServiceFactory.GetAllVrasBandwidthGroups = function GetAllVrasBandwidthGroups() {
            return invoke('GetAllVrasBandwidthGroups', []);
        };
        /**
         * @param {function(vos.HostVraInfoVisualObject[])} callback {@link function(vos.HostVraInfoVisualObject[])}
         * @name _Deferred_GetAvailableHostsForInstallation.then
         */
        /**
         * @returns {_Deferred_GetAvailableHostsForInstallation} a promise with a callback with result {@link vos.HostVraInfoVisualObject[]}
         */
        zertoServiceFactory.GetAvailableHostsForInstallation = function GetAvailableHostsForInstallation() {
            return invoke('GetAvailableHostsForInstallation', []);
        };
        /**
         * @param {function(vos.BackupTargetDetailsVisualObject)} callback {@link function(vos.BackupTargetDetailsVisualObject)}
         * @name _Deferred_GetBackupTarget.then
         */
        /**
         * @param {vos.BackupTargetIdentifier} identifier {@link vos.BackupTargetIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupId {@link vos.ProtectionGroupIdentifier}
         * @param {vos.OwnersIdentifier} optionalOwnersIdentifier {@link vos.OwnersIdentifier}
         * @param {boolean} isReverse {@link boolean}
         * @returns {_Deferred_GetBackupTarget} a promise with a callback with result {@link vos.BackupTargetDetailsVisualObject}
         */
        zertoServiceFactory.GetBackupTarget = function GetBackupTarget(identifier, optionalProtectionGroupId, optionalOwnersIdentifier, isReverse) {
            return invoke('GetBackupTarget', [identifier, optionalProtectionGroupId, optionalOwnersIdentifier, isReverse]);
        };
        /**
         * @param {function(vos.BillingItemValueObject[])} callback {@link function(vos.BillingItemValueObject[])}
         * @name _Deferred_GetBillingMonthDeatils.then
         */
        /**
         * @param {number} year {@link number}
         * @param {number} month {@link number}
         * @returns {_Deferred_GetBillingMonthDeatils} a promise with a callback with result {@link vos.BillingItemValueObject[]}
         */
        zertoServiceFactory.GetBillingMonthDeatils = function GetBillingMonthDeatils(year, month) {
            return invoke('GetBillingMonthDeatils', [year, month]);
        };
        /**
         * @param {function(vos.BillingMonthDetailsValueObject[])} callback {@link function(vos.BillingMonthDetailsValueObject[])}
         * @name _Deferred_GetBillingYearDeatils.then
         */
        /**
         * @param {number} year {@link number}
         * @returns {_Deferred_GetBillingYearDeatils} a promise with a callback with result {@link vos.BillingMonthDetailsValueObject[]}
         */
        zertoServiceFactory.GetBillingYearDeatils = function GetBillingYearDeatils(year) {
            return invoke('GetBillingYearDeatils', [year]);
        };
        /**
         * @param {function(vos.ReverseSettingsManageInfoVisualObject[])} callback {@link function(vos.ReverseSettingsManageInfoVisualObject[])}
         * @name _Deferred_GetBulkReverseReplicationSettings.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier[]} protectionGroupIdentifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {_Deferred_GetBulkReverseReplicationSettings} a promise with a callback with result {@link vos.ReverseSettingsManageInfoVisualObject[]}
         */
        zertoServiceFactory.GetBulkReverseReplicationSettings = function GetBulkReverseReplicationSettings(protectionGroupIdentifiers) {
            return invoke('GetBulkReverseReplicationSettings', [protectionGroupIdentifiers]);
        };
        /**
         * @param {function(vos.CheckpointSelectionScreenVisualObject)} callback {@link function(vos.CheckpointSelectionScreenVisualObject)}
         * @name _Deferred_GetCheckpointSelectionScreen.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetCheckpointSelectionScreen} a promise with a callback with result {@link vos.CheckpointSelectionScreenVisualObject}
         */
        zertoServiceFactory.GetCheckpointSelectionScreen = function GetCheckpointSelectionScreen(protectionGroupIdentifier) {
            return invoke('GetCheckpointSelectionScreen', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.VPGDetailsScreenVirtualMachine)} callback {@link function(vos.VPGDetailsScreenVirtualMachine)}
         * @name _Deferred_GetCurrentDetailsForSingleVirtualMachine.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VMIdentifier} vmIdentifier {@link vos.VMIdentifier}
         * @returns {_Deferred_GetCurrentDetailsForSingleVirtualMachine} a promise with a callback with result {@link vos.VPGDetailsScreenVirtualMachine}
         */
        zertoServiceFactory.GetCurrentDetailsForSingleVirtualMachine = function GetCurrentDetailsForSingleVirtualMachine(protectionGroupIdentifier, vmIdentifier) {
            return invoke('GetCurrentDetailsForSingleVirtualMachine', [protectionGroupIdentifier, vmIdentifier]);
        };
        /**
         * @param {function(vos.LicenseScreenValueObject)} callback {@link function(vos.LicenseScreenValueObject)}
         * @name _Deferred_GetCurrentLicenseScreen.then
         */
        /**
         * @returns {_Deferred_GetCurrentLicenseScreen} a promise with a callback with result {@link vos.LicenseScreenValueObject}
         */
        zertoServiceFactory.GetCurrentLicenseScreen = function GetCurrentLicenseScreen() {
            return invoke('GetCurrentLicenseScreen', []);
        };
        /**
         * @param {function(vos.DatastoresScreenVisualObject)} callback {@link function(vos.DatastoresScreenVisualObject)}
         * @name _Deferred_GetDatastoreClustersScreen.then
         */
        /**
         * @returns {_Deferred_GetDatastoreClustersScreen} a promise with a callback with result {@link vos.DatastoresScreenVisualObject}
         */
        zertoServiceFactory.GetDatastoreClustersScreen = function GetDatastoreClustersScreen() {
            return invoke('GetDatastoreClustersScreen', []);
        };
        /**
         * @param {function(vos.ManageVPGInfoVisualObject)} callback {@link function(vos.ManageVPGInfoVisualObject)}
         * @name _Deferred_GetDefaultSettingsForNewProtectionGroup.then
         */
        /**
         * @param {vos.SiteIdentifier} targetSiteId {@link vos.SiteIdentifier}
         * @param {enums.VpgEntityType} target {@link enums.VpgEntityType}
         * @returns {_Deferred_GetDefaultSettingsForNewProtectionGroup} a promise with a callback with result {@link vos.ManageVPGInfoVisualObject}
         */
        zertoServiceFactory.GetDefaultSettingsForNewProtectionGroup = function GetDefaultSettingsForNewProtectionGroup(targetSiteId, target) {
            return invoke('GetDefaultSettingsForNewProtectionGroup', [targetSiteId, target]);
        };
        /**
         * @param {function(vos.ManageVPGInfoVisualObject)} callback {@link function(vos.ManageVPGInfoVisualObject)}
         * @name _Deferred_GetDefaultSettingsForNewProtectionGroupVCDVappContext.then
         */
        /**
         * @param {vos.VCDVAppIdentifier} VCDVAppIdentifier {@link vos.VCDVAppIdentifier}
         * @param {enums.VpgEntityType} target {@link enums.VpgEntityType}
         * @param {vos.SiteIdentifier} targetSiteId {@link vos.SiteIdentifier}
         * @returns {_Deferred_GetDefaultSettingsForNewProtectionGroupVCDVappContext} a promise with a callback with result {@link vos.ManageVPGInfoVisualObject}
         */
        zertoServiceFactory.GetDefaultSettingsForNewProtectionGroupVCDVappContext = function GetDefaultSettingsForNewProtectionGroupVCDVappContext(VCDVAppIdentifier, target, targetSiteId) {
            return invoke('GetDefaultSettingsForNewProtectionGroupVCDVappContext', [VCDVAppIdentifier, target, targetSiteId]);
        };
        /**
         * @param {function(vos.ManageVPGInfoVisualObject)} callback {@link function(vos.ManageVPGInfoVisualObject)}
         * @name _Deferred_GetDefaultSettingsForNewProtectionGroupVMContext.then
         */
        /**
         * @param {vos.VMIdentifier} vmIdentifier {@link vos.VMIdentifier}
         * @param {enums.VpgEntityType} target {@link enums.VpgEntityType}
         * @param {vos.SiteIdentifier} targetSiteId {@link vos.SiteIdentifier}
         * @returns {_Deferred_GetDefaultSettingsForNewProtectionGroupVMContext} a promise with a callback with result {@link vos.ManageVPGInfoVisualObject}
         */
        zertoServiceFactory.GetDefaultSettingsForNewProtectionGroupVMContext = function GetDefaultSettingsForNewProtectionGroupVMContext(vmIdentifier, target, targetSiteId) {
            return invoke('GetDefaultSettingsForNewProtectionGroupVMContext', [vmIdentifier, target, targetSiteId]);
        };
        /**
         * @param {function(vos.CheckPoint[])} callback {@link function(vos.CheckPoint[])}
         * @name _Deferred_GetExtendedCheckpointList.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {date} startDate {@link date}
         * @param {date} endDate {@link date}
         * @returns {_Deferred_GetExtendedCheckpointList} a promise with a callback with result {@link vos.CheckPoint[]}
         */
        zertoServiceFactory.GetExtendedCheckpointList = function GetExtendedCheckpointList(protectionGroupIdentifier, startDate, endDate) {
            return invoke('GetExtendedCheckpointList', [protectionGroupIdentifier, startDate, endDate]);
        };
        /**
         * @param {function(vos.HostEntitiesForVraOrZccInstall)} callback {@link function(vos.HostEntitiesForVraOrZccInstall)}
         * @name _Deferred_GetHostEntitiesForVraInstall.then
         */
        /**
         * @param {vos.HostIdentifier} hostIdentifier {@link vos.HostIdentifier}
         * @returns {_Deferred_GetHostEntitiesForVraInstall} a promise with a callback with result {@link vos.HostEntitiesForVraOrZccInstall}
         */
        zertoServiceFactory.GetHostEntitiesForVraInstall = function GetHostEntitiesForVraInstall(hostIdentifier) {
            return invoke('GetHostEntitiesForVraInstall', [hostIdentifier]);
        };
        /**
         * @param {function(vos.ManageSingleVolumeInfoVisualObject)} callback {@link function(vos.ManageSingleVolumeInfoVisualObject)}
         * @name _Deferred_GetInfoForEditingMultipleVolumesConfigurations.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.ManageSingleVolumeInfoInputParams[]} inputParams {@link vos.ManageSingleVolumeInfoInputParams[]}
         * @param {vos.VpgConfigurationVisualObject} vpgConfiguration {@link vos.VpgConfigurationVisualObject}
         * @returns {_Deferred_GetInfoForEditingMultipleVolumesConfigurations} a promise with a callback with result {@link vos.ManageSingleVolumeInfoVisualObject}
         */
        zertoServiceFactory.GetInfoForEditingMultipleVolumesConfigurations = function GetInfoForEditingMultipleVolumesConfigurations(protectionGroupIdentifier, inputParams, vpgConfiguration) {
            return invoke('GetInfoForEditingMultipleVolumesConfigurations', [protectionGroupIdentifier, inputParams, vpgConfiguration]);
        };
        /**
         * @param {function(vos.ManageSingleVolumeInfoVisualObject)} callback {@link function(vos.ManageSingleVolumeInfoVisualObject)}
         * @name _Deferred_GetInfoForEditingReverseConfigForMultipleVolumes.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.ManageSingleVolumeInfoInputParams[]} inputParams {@link vos.ManageSingleVolumeInfoInputParams[]}
         * @param {vos.VpgConfigurationVisualObject} vpgConfiguration {@link vos.VpgConfigurationVisualObject}
         * @returns {_Deferred_GetInfoForEditingReverseConfigForMultipleVolumes} a promise with a callback with result {@link vos.ManageSingleVolumeInfoVisualObject}
         */
        zertoServiceFactory.GetInfoForEditingReverseConfigForMultipleVolumes = function GetInfoForEditingReverseConfigForMultipleVolumes(protectionGroupIdentifier, inputParams, vpgConfiguration) {
            return invoke('GetInfoForEditingReverseConfigForMultipleVolumes', [protectionGroupIdentifier, inputParams, vpgConfiguration]);
        };
        /**
         * @param {function(vos.ManageSingleVolumeInfoVisualObject)} callback {@link function(vos.ManageSingleVolumeInfoVisualObject)}
         * @name _Deferred_GetInfoForEditingReverseConfigForSingleVolume.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VMIdentifier} vmIdentifier {@link vos.VMIdentifier}
         * @param {vos.DiskLocationParams} diskLocationParams {@link vos.DiskLocationParams}
         * @param {vos.ComputeResourceVisualObject} virtualMachineSelectedTargetComputeResource {@link vos.ComputeResourceVisualObject}
         * @param {vos.DatastoreVisualObject} virtualMachineSelectedDatastore {@link vos.DatastoreVisualObject}
         * @param {vos.VpgConfigurationVisualObject} vpgConfiguration {@link vos.VpgConfigurationVisualObject}
         * @returns {_Deferred_GetInfoForEditingReverseConfigForSingleVolume} a promise with a callback with result {@link vos.ManageSingleVolumeInfoVisualObject}
         */
        zertoServiceFactory.GetInfoForEditingReverseConfigForSingleVolume = function GetInfoForEditingReverseConfigForSingleVolume(protectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration) {
            return invoke('GetInfoForEditingReverseConfigForSingleVolume', [protectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration]);
        };
        /**
         * @param {function(vos.ManageSingleVolumeInfoVisualObject)} callback {@link function(vos.ManageSingleVolumeInfoVisualObject)}
         * @name _Deferred_GetInfoForEditingSingleVolumeConfiguration.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VMIdentifier} vmIdentifier {@link vos.VMIdentifier}
         * @param {vos.DiskLocationParams} diskLocationParams {@link vos.DiskLocationParams}
         * @param {vos.ComputeResourceVisualObject} virtualMachineSelectedTargetComputeResource {@link vos.ComputeResourceVisualObject}
         * @param {vos.DatastoreVisualObject} virtualMachineSelectedDatastore {@link vos.DatastoreVisualObject}
         * @param {vos.VpgConfigurationVisualObject} vpgConfiguration {@link vos.VpgConfigurationVisualObject}
         * @returns {_Deferred_GetInfoForEditingSingleVolumeConfiguration} a promise with a callback with result {@link vos.ManageSingleVolumeInfoVisualObject}
         */
        zertoServiceFactory.GetInfoForEditingSingleVolumeConfiguration = function GetInfoForEditingSingleVolumeConfiguration(optionalProtectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration) {
            return invoke('GetInfoForEditingSingleVolumeConfiguration', [optionalProtectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration]);
        };
        /**
         * @param {function(vos.ManageVPGInfoVisualObject)} callback {@link function(vos.ManageVPGInfoVisualObject)}
         * @name _Deferred_GetInfoForManagingVPG.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetInfoForManagingVPG} a promise with a callback with result {@link vos.ManageVPGInfoVisualObject}
         */
        zertoServiceFactory.GetInfoForManagingVPG = function GetInfoForManagingVPG(protectionGroupIdentifier) {
            return invoke('GetInfoForManagingVPG', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.ChangeHostScreenVisualObject)} callback {@link function(vos.ChangeHostScreenVisualObject)}
         * @name _Deferred_GetInitChangeHostScreen.then
         */
        /**
         * @param {vos.BaseComputeResourceIdentifier} originalVraHost {@link vos.BaseComputeResourceIdentifier}
         * @returns {_Deferred_GetInitChangeHostScreen} a promise with a callback with result {@link vos.ChangeHostScreenVisualObject}
         */
        zertoServiceFactory.GetInitChangeHostScreen = function GetInitChangeHostScreen(originalVraHost) {
            return invoke('GetInitChangeHostScreen', [originalVraHost]);
        };
        /**
         * @param {function(vos.InitialSessionValidation)} callback {@link function(vos.InitialSessionValidation)}
         * @name _Deferred_GetInitialSessionValidation.then
         */
        /**
         * @param {vos.SessionIdentifier} sessionIdentifier {@link vos.SessionIdentifier}
         * @returns {_Deferred_GetInitialSessionValidation} a promise with a callback with result {@link vos.InitialSessionValidation}
         */
        zertoServiceFactory.GetInitialSessionValidation = function GetInitialSessionValidation(sessionIdentifier) {
            return invoke('GetInitialSessionValidation', [sessionIdentifier]);
        };
        /**
         * @param {function(vos.VPGDetailsScreenVirtualMachine)} callback {@link function(vos.VPGDetailsScreenVirtualMachine)}
         * @name _Deferred_GetInitialSettingsForVirtualMachine.then
         */
        /**
         * @param {vos.VMIdentifier} vmIdentifier {@link vos.VMIdentifier}
         * @param {enums.VpgEntityType} target {@link enums.VpgEntityType}
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupId {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetInitialSettingsForVirtualMachine} a promise with a callback with result {@link vos.VPGDetailsScreenVirtualMachine}
         */
        zertoServiceFactory.GetInitialSettingsForVirtualMachine = function GetInitialSettingsForVirtualMachine(vmIdentifier, target, ownersIdentifier, optionalProtectionGroupId) {
            return invoke('GetInitialSettingsForVirtualMachine', [vmIdentifier, target, ownersIdentifier, optionalProtectionGroupId]);
        };
        /**
         * @param {function(vos.InitialVPGManageInfoVisualObject)} callback {@link function(vos.InitialVPGManageInfoVisualObject)}
         * @name _Deferred_GetInitialSitesInfoForVpgCreation.then
         */
        /**
         * @returns {_Deferred_GetInitialSitesInfoForVpgCreation} a promise with a callback with result {@link vos.InitialVPGManageInfoVisualObject}
         */
        zertoServiceFactory.GetInitialSitesInfoForVpgCreation = function GetInitialSitesInfoForVpgCreation() {
            return invoke('GetInitialSitesInfoForVpgCreation', []);
        };
        /**
         * @param {function(vos.VCDInitialStorageProfileForVmVisualObject[])} callback {@link function(vos.VCDInitialStorageProfileForVmVisualObject[])}
         * @name _Deferred_GetInitialStorageProfilesForVms.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.VMIdentifier[]} protectedVmIdentifiers {@link vos.VMIdentifier[]}
         * @returns {_Deferred_GetInitialStorageProfilesForVms} a promise with a callback with result {@link vos.VCDInitialStorageProfileForVmVisualObject[]}
         */
        zertoServiceFactory.GetInitialStorageProfilesForVms = function GetInitialStorageProfilesForVms(ownersIdentifier, optionalProtectionGroupIdentifier, targetOrgVdc, protectedVmIdentifiers) {
            return invoke('GetInitialStorageProfilesForVms', [ownersIdentifier, optionalProtectionGroupIdentifier, targetOrgVdc, protectedVmIdentifiers]);
        };
        /**
         * @param {function(vos.CheckPoint)} callback {@link function(vos.CheckPoint)}
         * @name _Deferred_GetLatestCheckpoint.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetLatestCheckpoint} a promise with a callback with result {@link vos.CheckPoint}
         */
        zertoServiceFactory.GetLatestCheckpoint = function GetLatestCheckpoint(protectionGroupIdentifier) {
            return invoke('GetLatestCheckpoint', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(string[])} callback {@link function(string[])}
         * @name _Deferred_GetListOfStorages.then
         */
        /**
         * @param {vos.BackupTargetDetailsVisualObject} visualObjectDetails {@link vos.BackupTargetDetailsVisualObject}
         * @returns {_Deferred_GetListOfStorages} a promise with a callback with result {@link string[]}
         */
        zertoServiceFactory.GetListOfStorages = function GetListOfStorages(visualObjectDetails) {
            return invoke('GetListOfStorages', [visualObjectDetails]);
        };
        /**
         * @param {function(number)} callback {@link function(number)}
         * @name _Deferred_GetListeningTcpPort.then
         */
        /**
         * @returns {_Deferred_GetListeningTcpPort} a promise with a callback with result {@link number}
         */
        zertoServiceFactory.GetListeningTcpPort = function GetListeningTcpPort() {
            return invoke('GetListeningTcpPort', []);
        };
        /**
         * @param {function(vos.MinimalVPGListVisualObject)} callback {@link function(vos.MinimalVPGListVisualObject)}
         * @name _Deferred_GetMinimalVpgList.then
         */
        /**
         * @returns {_Deferred_GetMinimalVpgList} a promise with a callback with result {@link vos.MinimalVPGListVisualObject}
         */
        zertoServiceFactory.GetMinimalVpgList = function GetMinimalVpgList() {
            return invoke('GetMinimalVpgList', []);
        };
        /**
         * @param {function(vos.VpgConfigurationVisualObject)} callback {@link function(vos.VpgConfigurationVisualObject)}
         * @name _Deferred_GetMoveAutoCommitPostOperationSettings.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetMoveAutoCommitPostOperationSettings} a promise with a callback with result {@link vos.VpgConfigurationVisualObject}
         */
        zertoServiceFactory.GetMoveAutoCommitPostOperationSettings = function GetMoveAutoCommitPostOperationSettings(protectionGroupIdentifier) {
            return invoke('GetMoveAutoCommitPostOperationSettings', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.PairedSiteRouting)} callback {@link function(vos.PairedSiteRouting)}
         * @name _Deferred_GetPairedSiteRouting.then
         */
        /**
         * @returns {_Deferred_GetPairedSiteRouting} a promise with a callback with result {@link vos.PairedSiteRouting}
         */
        zertoServiceFactory.GetPairedSiteRouting = function GetPairedSiteRouting() {
            return invoke('GetPairedSiteRouting', []);
        };
        /**
         * @param {function(vos.PeerListScreenVisualObject)} callback {@link function(vos.PeerListScreenVisualObject)}
         * @name _Deferred_GetPeerListScreen.then
         */
        /**
         * @returns {_Deferred_GetPeerListScreen} a promise with a callback with result {@link vos.PeerListScreenVisualObject}
         */
        zertoServiceFactory.GetPeerListScreen = function GetPeerListScreen() {
            return invoke('GetPeerListScreen', []);
        };
        /**
         * @param {function(vos.PerformanceScreenVisualObject)} callback {@link function(vos.PerformanceScreenVisualObject)}
         * @name _Deferred_GetPerformanceScreen.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier[]} protectionGroupIdentifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {_Deferred_GetPerformanceScreen} a promise with a callback with result {@link vos.PerformanceScreenVisualObject}
         */
        zertoServiceFactory.GetPerformanceScreen = function GetPerformanceScreen(protectionGroupIdentifiers) {
            return invoke('GetPerformanceScreen', [protectionGroupIdentifiers]);
        };
        /**
         * @param {function(vos.SitePortalAdvancedManageInfoVisualObject)} callback {@link function(vos.SitePortalAdvancedManageInfoVisualObject)}
         * @name _Deferred_GetPortalAdvancedRecoverySiteInfoForVpgCreation.then
         */
        /**
         * @param {vos.SiteIdentifier} siteId {@link vos.SiteIdentifier}
         * @returns {_Deferred_GetPortalAdvancedRecoverySiteInfoForVpgCreation} a promise with a callback with result {@link vos.SitePortalAdvancedManageInfoVisualObject}
         */
        zertoServiceFactory.GetPortalAdvancedRecoverySiteInfoForVpgCreation = function GetPortalAdvancedRecoverySiteInfoForVpgCreation(siteId) {
            return invoke('GetPortalAdvancedRecoverySiteInfoForVpgCreation', [siteId]);
        };
        /**
         * @param {function(vos.SitePortalInitialManageInfoVisualObject)} callback {@link function(vos.SitePortalInitialManageInfoVisualObject)}
         * @name _Deferred_GetPortalInitialSitesInfoForVpgCreation.then
         */
        /**
         * @returns {_Deferred_GetPortalInitialSitesInfoForVpgCreation} a promise with a callback with result {@link vos.SitePortalInitialManageInfoVisualObject}
         */
        zertoServiceFactory.GetPortalInitialSitesInfoForVpgCreation = function GetPortalInitialSitesInfoForVpgCreation() {
            return invoke('GetPortalInitialSitesInfoForVpgCreation', []);
        };
        /**
         * @param {function(vos.PotentialDatastoreVisualObject[])} callback {@link function(vos.PotentialDatastoreVisualObject[])}
         * @name _Deferred_GetPotentialDatastoresForClone.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetPotentialDatastoresForClone} a promise with a callback with result {@link vos.PotentialDatastoreVisualObject[]}
         */
        zertoServiceFactory.GetPotentialDatastoresForClone = function GetPotentialDatastoresForClone(protectionGroupIdentifier) {
            return invoke('GetPotentialDatastoresForClone', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.PotentialDatastoreVisualObject[])} callback {@link function(vos.PotentialDatastoreVisualObject[])}
         * @name _Deferred_GetPotentialDatastoresForJournal.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VpgConfigurationVisualObject} vpgConfiguration {@link vos.VpgConfigurationVisualObject}
         * @returns {_Deferred_GetPotentialDatastoresForJournal} a promise with a callback with result {@link vos.PotentialDatastoreVisualObject[]}
         */
        zertoServiceFactory.GetPotentialDatastoresForJournal = function GetPotentialDatastoresForJournal(optionalProtectionGroupIdentifier, vpgConfiguration) {
            return invoke('GetPotentialDatastoresForJournal', [optionalProtectionGroupIdentifier, vpgConfiguration]);
        };
        /**
         * @param {function(vos.PotentialDatastoreVisualObject[])} callback {@link function(vos.PotentialDatastoreVisualObject[])}
         * @name _Deferred_GetPotentialDatastoresForJournalForReverseConfig.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VpgConfigurationVisualObject} vpgConfiguration {@link vos.VpgConfigurationVisualObject}
         * @returns {_Deferred_GetPotentialDatastoresForJournalForReverseConfig} a promise with a callback with result {@link vos.PotentialDatastoreVisualObject[]}
         */
        zertoServiceFactory.GetPotentialDatastoresForJournalForReverseConfig = function GetPotentialDatastoresForJournalForReverseConfig(protectionGroupIdentifier, vpgConfiguration) {
            return invoke('GetPotentialDatastoresForJournalForReverseConfig', [protectionGroupIdentifier, vpgConfiguration]);
        };
        /**
         * @param {function(vos.PotentialRestoreSourcesScreenVisualObject)} callback {@link function(vos.PotentialRestoreSourcesScreenVisualObject)}
         * @name _Deferred_GetPotentialRestoreSources.then
         */
        /**
         * @returns {_Deferred_GetPotentialRestoreSources} a promise with a callback with result {@link vos.PotentialRestoreSourcesScreenVisualObject}
         */
        zertoServiceFactory.GetPotentialRestoreSources = function GetPotentialRestoreSources() {
            return invoke('GetPotentialRestoreSources', []);
        };
        /**
         * @param {function(vos.PotentialVirtualMachineToProtectVisualObject[])} callback {@link function(vos.PotentialVirtualMachineToProtectVisualObject[])}
         * @name _Deferred_GetPotentialVirtualMachinesForAdding.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetPotentialVirtualMachinesForAdding} a promise with a callback with result {@link vos.PotentialVirtualMachineToProtectVisualObject[]}
         */
        zertoServiceFactory.GetPotentialVirtualMachinesForAdding = function GetPotentialVirtualMachinesForAdding(protectionGroupIdentifier) {
            return invoke('GetPotentialVirtualMachinesForAdding', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.VMListScreenVisualObject)} callback {@link function(vos.VMListScreenVisualObject)}
         * @name _Deferred_GetProtectedVirtualMachineListScreen.then
         */
        /**
         * @returns {_Deferred_GetProtectedVirtualMachineListScreen} a promise with a callback with result {@link vos.VMListScreenVisualObject}
         */
        zertoServiceFactory.GetProtectedVirtualMachineListScreen = function GetProtectedVirtualMachineListScreen() {
            return invoke('GetProtectedVirtualMachineListScreen', []);
        };
        /**
         * @param {function(vos.VPGDetailsScreenVisualObject)} callback {@link function(vos.VPGDetailsScreenVisualObject)}
         * @name _Deferred_GetProtectionGroupDetailsScreen.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetProtectionGroupDetailsScreen} a promise with a callback with result {@link vos.VPGDetailsScreenVisualObject}
         */
        zertoServiceFactory.GetProtectionGroupDetailsScreen = function GetProtectionGroupDetailsScreen(protectionGroupIdentifier) {
            return invoke('GetProtectionGroupDetailsScreen', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.VPGListScreenVisualObject)} callback {@link function(vos.VPGListScreenVisualObject)}
         * @name _Deferred_GetProtectionGroupListScreen.then
         */
        /**
         * @returns {_Deferred_GetProtectionGroupListScreen} a promise with a callback with result {@link vos.VPGListScreenVisualObject}
         */
        zertoServiceFactory.GetProtectionGroupListScreen = function GetProtectionGroupListScreen() {
            return invoke('GetProtectionGroupListScreen', []);
        };
        /**
         * @param {function(vos.CloudInstanceTypeVisualObject[])} callback {@link function(vos.CloudInstanceTypeVisualObject[])}
         * @name _Deferred_GetPublicCloudInstanceTypes.then
         */
        /**
         * @returns {_Deferred_GetPublicCloudInstanceTypes} a promise with a callback with result {@link vos.CloudInstanceTypeVisualObject[]}
         */
        zertoServiceFactory.GetPublicCloudInstanceTypes = function GetPublicCloudInstanceTypes() {
            return invoke('GetPublicCloudInstanceTypes', []);
        };
        /**
         * @param {function(vos.RecoveryComputeResourceAssociatedEntities)} callback {@link function(vos.RecoveryComputeResourceAssociatedEntities)}
         * @name _Deferred_GetRecoveryComputeResource.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.BaseComputeResourceIdentifier} baseComputeResourceIdentifier {@link vos.BaseComputeResourceIdentifier}
         * @returns {_Deferred_GetRecoveryComputeResource} a promise with a callback with result {@link vos.RecoveryComputeResourceAssociatedEntities}
         */
        zertoServiceFactory.GetRecoveryComputeResource = function GetRecoveryComputeResource(optionalProtectionGroupIdentifier, ownersIdentifier, baseComputeResourceIdentifier) {
            return invoke('GetRecoveryComputeResource', [optionalProtectionGroupIdentifier, ownersIdentifier, baseComputeResourceIdentifier]);
        };
        /**
         * @param {function(vos.RecoveryComputeResourceAssociatedEntities)} callback {@link function(vos.RecoveryComputeResourceAssociatedEntities)}
         * @name _Deferred_GetRecoveryComputeResourceBulk.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.BaseComputeResourceIdentifier[]} baseComputeResourceIdentifiers {@link vos.BaseComputeResourceIdentifier[]}
         * @returns {_Deferred_GetRecoveryComputeResourceBulk} a promise with a callback with result {@link vos.RecoveryComputeResourceAssociatedEntities}
         */
        zertoServiceFactory.GetRecoveryComputeResourceBulk = function GetRecoveryComputeResourceBulk(optionalProtectionGroupIdentifier, ownersIdentifier, baseComputeResourceIdentifiers) {
            return invoke('GetRecoveryComputeResourceBulk', [optionalProtectionGroupIdentifier, ownersIdentifier, baseComputeResourceIdentifiers]);
        };
        /**
         * @param {function(vos.RecoveryComputeResourceAssociatedEntities)} callback {@link function(vos.RecoveryComputeResourceAssociatedEntities)}
         * @name _Deferred_GetRecoveryComputeResourceForReverseConfig.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.BaseComputeResourceIdentifier} baseComputeResourceIdentifier {@link vos.BaseComputeResourceIdentifier}
         * @returns {_Deferred_GetRecoveryComputeResourceForReverseConfig} a promise with a callback with result {@link vos.RecoveryComputeResourceAssociatedEntities}
         */
        zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig = function GetRecoveryComputeResourceForReverseConfig(protectionGroupIdentifier, baseComputeResourceIdentifier) {
            return invoke('GetRecoveryComputeResourceForReverseConfig', [protectionGroupIdentifier, baseComputeResourceIdentifier]);
        };
        /**
         * @param {function(vos.RecoveryComputeResourceAssociatedEntities)} callback {@link function(vos.RecoveryComputeResourceAssociatedEntities)}
         * @name _Deferred_GetRecoveryComputeResourceForReverseConfigBulk.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.BaseComputeResourceIdentifier[]} baseComputeResourceIdentifiers {@link vos.BaseComputeResourceIdentifier[]}
         * @returns {_Deferred_GetRecoveryComputeResourceForReverseConfigBulk} a promise with a callback with result {@link vos.RecoveryComputeResourceAssociatedEntities}
         */
        zertoServiceFactory.GetRecoveryComputeResourceForReverseConfigBulk = function GetRecoveryComputeResourceForReverseConfigBulk(protectionGroupIdentifier, baseComputeResourceIdentifiers) {
            return invoke('GetRecoveryComputeResourceForReverseConfigBulk', [protectionGroupIdentifier, baseComputeResourceIdentifiers]);
        };
        /**
         * @param {function(vos.ProtectionGroupsSLAVisualObject)} callback {@link function(vos.ProtectionGroupsSLAVisualObject)}
         * @name _Deferred_GetRecoveryProtectionGroupsSLA.then
         */
        /**
         * @param {vos.RecoveryProtectionGroupsSLAQueryCriterias} queryCriterias {@link vos.RecoveryProtectionGroupsSLAQueryCriterias}
         * @returns {_Deferred_GetRecoveryProtectionGroupsSLA} a promise with a callback with result {@link vos.ProtectionGroupsSLAVisualObject}
         */
        zertoServiceFactory.GetRecoveryProtectionGroupsSLA = function GetRecoveryProtectionGroupsSLA(queryCriterias) {
            return invoke('GetRecoveryProtectionGroupsSLA', [queryCriterias]);
        };
        /**
         * @param {function(vos.ProtectionGroupsSLABreachVisualObject)} callback {@link function(vos.ProtectionGroupsSLABreachVisualObject)}
         * @name _Deferred_GetRecoveryProtectionGroupsSLABreachOverTime.then
         */
        /**
         * @param {vos.RecoveryProtectionGroupsSLABreachOverTimeQueryCriterias} queryCriterias {@link vos.RecoveryProtectionGroupsSLABreachOverTimeQueryCriterias}
         * @returns {_Deferred_GetRecoveryProtectionGroupsSLABreachOverTime} a promise with a callback with result {@link vos.ProtectionGroupsSLABreachVisualObject}
         */
        zertoServiceFactory.GetRecoveryProtectionGroupsSLABreachOverTime = function GetRecoveryProtectionGroupsSLABreachOverTime(queryCriterias) {
            return invoke('GetRecoveryProtectionGroupsSLABreachOverTime', [queryCriterias]);
        };
        /**
         * @param {function(vos.RecoveryReportVisualObject)} callback {@link function(vos.RecoveryReportVisualObject)}
         * @name _Deferred_GetRecoveryReportScreen.then
         */
        /**
         * @param {date} fromStart {@link date}
         * @param {date} toStart {@link date}
         * @param {string[]} protectionGroups {@link string[]}
         * @param {string[]} statuses {@link string[]}
         * @param {string[]} types {@link string[]}
         * @returns {_Deferred_GetRecoveryReportScreen} a promise with a callback with result {@link vos.RecoveryReportVisualObject}
         */
        zertoServiceFactory.GetRecoveryReportScreen = function GetRecoveryReportScreen(fromStart, toStart, protectionGroups, statuses, types) {
            return invoke('GetRecoveryReportScreen', [fromStart, toStart, protectionGroups, statuses, types]);
        };
        /**
         * @param {function(vos.RecoveryStatusOverTimeVisualObject)} callback {@link function(vos.RecoveryStatusOverTimeVisualObject)}
         * @name _Deferred_GetRecoveryStatusOverTime.then
         */
        /**
         * @param {vos.RecoveryStatusOverTimeQueryCriterias} queryCriterias {@link vos.RecoveryStatusOverTimeQueryCriterias}
         * @returns {_Deferred_GetRecoveryStatusOverTime} a promise with a callback with result {@link vos.RecoveryStatusOverTimeVisualObject}
         */
        zertoServiceFactory.GetRecoveryStatusOverTime = function GetRecoveryStatusOverTime(queryCriterias) {
            return invoke('GetRecoveryStatusOverTime', [queryCriterias]);
        };
        /**
         * @param {function(vos.RecoveryStatusSpecificDayVisualObject)} callback {@link function(vos.RecoveryStatusSpecificDayVisualObject)}
         * @name _Deferred_GetRecoveryStatusSpecificDay.then
         */
        /**
         * @param {vos.RecoveryStatusSpecificDayQueryCriterias} queryCriterias {@link vos.RecoveryStatusSpecificDayQueryCriterias}
         * @returns {_Deferred_GetRecoveryStatusSpecificDay} a promise with a callback with result {@link vos.RecoveryStatusSpecificDayVisualObject}
         */
        zertoServiceFactory.GetRecoveryStatusSpecificDay = function GetRecoveryStatusSpecificDay(queryCriterias) {
            return invoke('GetRecoveryStatusSpecificDay', [queryCriterias]);
        };
        /**
         * @param {function(vos.ReportPreQueryInfo)} callback {@link function(vos.ReportPreQueryInfo)}
         * @name _Deferred_GetRecoveryVmsResourcesReportReportPreQueryInfo.then
         */
        /**
         * @returns {_Deferred_GetRecoveryVmsResourcesReportReportPreQueryInfo} a promise with a callback with result {@link vos.ReportPreQueryInfo}
         */
        zertoServiceFactory.GetRecoveryVmsResourcesReportReportPreQueryInfo = function GetRecoveryVmsResourcesReportReportPreQueryInfo() {
            return invoke('GetRecoveryVmsResourcesReportReportPreQueryInfo', []);
        };
        /**
         * @param {function(vos.RestoreConfigurationScreenVisualObject)} callback {@link function(vos.RestoreConfigurationScreenVisualObject)}
         * @name _Deferred_GetRestoreConfigurationScreen.then
         */
        /**
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @param {vos.BackupTargetIdentifier} backupTargetIdentifier {@link vos.BackupTargetIdentifier}
         * @param {vos.BackupJobIdentifier} backupJobIdentifier {@link vos.BackupJobIdentifier}
         * @param {enums.RestoreType} type {@link enums.RestoreType}
         * @returns {_Deferred_GetRestoreConfigurationScreen} a promise with a callback with result {@link vos.RestoreConfigurationScreenVisualObject}
         */
        zertoServiceFactory.GetRestoreConfigurationScreen = function GetRestoreConfigurationScreen(siteIdentifier, backupTargetIdentifier, backupJobIdentifier, type) {
            return invoke('GetRestoreConfigurationScreen', [siteIdentifier, backupTargetIdentifier, backupJobIdentifier, type]);
        };
        /**
         * @param {function(vos.RestoreSelectionScreenVisualObject)} callback {@link function(vos.RestoreSelectionScreenVisualObject)}
         * @name _Deferred_GetRestoreSelectionScreenByTarget.then
         */
        /**
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @param {vos.BackupTargetIdentifier} backupTargetIdentifier {@link vos.BackupTargetIdentifier}
         * @returns {_Deferred_GetRestoreSelectionScreenByTarget} a promise with a callback with result {@link vos.RestoreSelectionScreenVisualObject}
         */
        zertoServiceFactory.GetRestoreSelectionScreenByTarget = function GetRestoreSelectionScreenByTarget(siteIdentifier, backupTargetIdentifier) {
            return invoke('GetRestoreSelectionScreenByTarget', [siteIdentifier, backupTargetIdentifier]);
        };
        /**
         * @param {function(vos.RestoreSelectionScreenVisualObject)} callback {@link function(vos.RestoreSelectionScreenVisualObject)}
         * @name _Deferred_GetRestoreSelectionScreenByVpgName.then
         */
        /**
         * @param {string} vpgName {@link string}
         * @returns {_Deferred_GetRestoreSelectionScreenByVpgName} a promise with a callback with result {@link vos.RestoreSelectionScreenVisualObject}
         */
        zertoServiceFactory.GetRestoreSelectionScreenByVpgName = function GetRestoreSelectionScreenByVpgName(vpgName) {
            return invoke('GetRestoreSelectionScreenByVpgName', [vpgName]);
        };
        /**
         * @param {function(vos.VCDInitialStorageProfileForVmVisualObject[])} callback {@link function(vos.VCDInitialStorageProfileForVmVisualObject[])}
         * @name _Deferred_GetReverseInitialStorageProfilesForVms.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.VMIdentifier[]} protectedVmIdentifiers {@link vos.VMIdentifier[]}
         * @returns {_Deferred_GetReverseInitialStorageProfilesForVms} a promise with a callback with result {@link vos.VCDInitialStorageProfileForVmVisualObject[]}
         */
        zertoServiceFactory.GetReverseInitialStorageProfilesForVms = function GetReverseInitialStorageProfilesForVms(ownersIdentifier, protectionGroupIdentifier, targetOrgVdc, protectedVmIdentifiers) {
            return invoke('GetReverseInitialStorageProfilesForVms', [ownersIdentifier, protectionGroupIdentifier, targetOrgVdc, protectedVmIdentifiers]);
        };
        /**
         * @param {function(vos.ReverseSettingsManageInfoVisualObject)} callback {@link function(vos.ReverseSettingsManageInfoVisualObject)}
         * @name _Deferred_GetReverseReplicationSettings.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetReverseReplicationSettings} a promise with a callback with result {@link vos.ReverseSettingsManageInfoVisualObject}
         */
        zertoServiceFactory.GetReverseReplicationSettings = function GetReverseReplicationSettings(protectionGroupIdentifier) {
            return invoke('GetReverseReplicationSettings', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.PotentialOrgVdcNetworksForMappingVisualObject)} callback {@link function(vos.PotentialOrgVdcNetworksForMappingVisualObject)}
         * @name _Deferred_GetReverseVCD2VCDPotentialOrgNetworks.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} protectionGroupId {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetVCDVirtualDatacenterIdentifier {@link vos.VCDVirtualDatacenterIdentifier}
         * @returns {_Deferred_GetReverseVCD2VCDPotentialOrgNetworks} a promise with a callback with result {@link vos.PotentialOrgVdcNetworksForMappingVisualObject}
         */
        zertoServiceFactory.GetReverseVCD2VCDPotentialOrgNetworks = function GetReverseVCD2VCDPotentialOrgNetworks(ownersIdentifier, protectionGroupId, targetVCDVirtualDatacenterIdentifier) {
            return invoke('GetReverseVCD2VCDPotentialOrgNetworks', [ownersIdentifier, protectionGroupId, targetVCDVirtualDatacenterIdentifier]);
        };
        /**
         * @param {function(vos.VCDVirtualDatacenterStorageProfileVisualObject[])} callback {@link function(vos.VCDVirtualDatacenterStorageProfileVisualObject[])}
         * @name _Deferred_GetReverseVCDPotentialVirtualDatacenterStorageProfiles.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @returns {_Deferred_GetReverseVCDPotentialVirtualDatacenterStorageProfiles} a promise with a callback with result {@link vos.VCDVirtualDatacenterStorageProfileVisualObject[]}
         */
        zertoServiceFactory.GetReverseVCDPotentialVirtualDatacenterStorageProfiles = function GetReverseVCDPotentialVirtualDatacenterStorageProfiles(ownersIdentifier, protectionGroupIdentifier, targetOrgVdc) {
            return invoke('GetReverseVCDPotentialVirtualDatacenterStorageProfiles', [ownersIdentifier, protectionGroupIdentifier, targetOrgVdc]);
        };
        /**
         * @param {function(vos.RouteGroupVisualObject[])} callback {@link function(vos.RouteGroupVisualObject[])}
         * @name _Deferred_GetRouteGroups.then
         */
        /**
         * @returns {_Deferred_GetRouteGroups} a promise with a callback with result {@link vos.RouteGroupVisualObject[]}
         */
        zertoServiceFactory.GetRouteGroups = function GetRouteGroups() {
            return invoke('GetRouteGroups', []);
        };
        /**
         * @param {function(vos.PotentialVirtualMachineToProtectVisualObject[])} callback {@link function(vos.PotentialVirtualMachineToProtectVisualObject[])}
         * @name _Deferred_GetSelectedVappVms.then
         */
        /**
         * @param {vos.VAppIdentifier} vAppIdentifier {@link vos.VAppIdentifier}
         * @returns {_Deferred_GetSelectedVappVms} a promise with a callback with result {@link vos.PotentialVirtualMachineToProtectVisualObject[]}
         */
        zertoServiceFactory.GetSelectedVappVms = function GetSelectedVappVms(vAppIdentifier) {
            return invoke('GetSelectedVappVms', [vAppIdentifier]);
        };
        /**
         * @param {function(vos.PotentialVirtualMachineToProtectVisualObject[])} callback {@link function(vos.PotentialVirtualMachineToProtectVisualObject[])}
         * @name _Deferred_GetSelectedVcdVappVms.then
         */
        /**
         * @param {vos.VCDVAppIdentifier} vcdvAppIdentifier {@link vos.VCDVAppIdentifier}
         * @returns {_Deferred_GetSelectedVcdVappVms} a promise with a callback with result {@link vos.PotentialVirtualMachineToProtectVisualObject[]}
         */
        zertoServiceFactory.GetSelectedVcdVappVms = function GetSelectedVcdVappVms(vcdvAppIdentifier) {
            return invoke('GetSelectedVcdVappVms', [vcdvAppIdentifier]);
        };
        /**
         * @param {function(vos.SiteManagementDetailsVisualObject)} callback {@link function(vos.SiteManagementDetailsVisualObject)}
         * @name _Deferred_GetSiteManagementDetails.then
         */
        /**
         * @returns {_Deferred_GetSiteManagementDetails} a promise with a callback with result {@link vos.SiteManagementDetailsVisualObject}
         */
        zertoServiceFactory.GetSiteManagementDetails = function GetSiteManagementDetails() {
            return invoke('GetSiteManagementDetails', []);
        };
        /**
         * @param {function(vos.SitePairingScreenVisualObject)} callback {@link function(vos.SitePairingScreenVisualObject)}
         * @name _Deferred_GetSitePairingScreen.then
         */
        /**
         * @returns {_Deferred_GetSitePairingScreen} a promise with a callback with result {@link vos.SitePairingScreenVisualObject}
         */
        zertoServiceFactory.GetSitePairingScreen = function GetSitePairingScreen() {
            return invoke('GetSitePairingScreen', []);
        };
        /**
         * @param {function(vos.ProtectionStatusVisualObject)} callback {@link function(vos.ProtectionStatusVisualObject)}
         * @name _Deferred_GetSiteProtectionStatusScreenVisualObject.then
         */
        /**
         * @param {vos.ProtectionStatusScreenQueryCriterias} queryCriterias {@link vos.ProtectionStatusScreenQueryCriterias}
         * @returns {_Deferred_GetSiteProtectionStatusScreenVisualObject} a promise with a callback with result {@link vos.ProtectionStatusVisualObject}
         */
        zertoServiceFactory.GetSiteProtectionStatusScreenVisualObject = function GetSiteProtectionStatusScreenVisualObject(queryCriterias) {
            return invoke('GetSiteProtectionStatusScreenVisualObject', [queryCriterias]);
        };
        /**
         * @param {function(enums.SiteLicenseType)} callback {@link function(enums.SiteLicenseType)}
         * @name _Deferred_GetSiteType.then
         */
        /**
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @returns {_Deferred_GetSiteType} a promise with a callback with result {@link enums.SiteLicenseType}
         */
        zertoServiceFactory.GetSiteType = function GetSiteType(siteIdentifier) {
            return invoke('GetSiteType', [siteIdentifier]);
        };
        /**
         * @param {function(vos.StopTestScreenVisualObject)} callback {@link function(vos.StopTestScreenVisualObject)}
         * @name _Deferred_GetStopTestScreen.then
         */
        /**
         * @returns {_Deferred_GetStopTestScreen} a promise with a callback with result {@link vos.StopTestScreenVisualObject}
         */
        zertoServiceFactory.GetStopTestScreen = function GetStopTestScreen() {
            return invoke('GetStopTestScreen', []);
        };
        /**
         * @param {function(vos.SummaryMinimalVisualObject)} callback {@link function(vos.SummaryMinimalVisualObject)}
         * @name _Deferred_GetSummaryMinimal.then
         */
        /**
         * @returns {_Deferred_GetSummaryMinimal} a promise with a callback with result {@link vos.SummaryMinimalVisualObject}
         */
        zertoServiceFactory.GetSummaryMinimal = function GetSummaryMinimal() {
            return invoke('GetSummaryMinimal', []);
        };
        /**
         * @param {function(vos.SummaryScreenVisualObject)} callback {@link function(vos.SummaryScreenVisualObject)}
         * @name _Deferred_GetSummaryScreenInformation.then
         */
        /**
         * @returns {_Deferred_GetSummaryScreenInformation} a promise with a callback with result {@link vos.SummaryScreenVisualObject}
         */
        zertoServiceFactory.GetSummaryScreenInformation = function GetSummaryScreenInformation() {
            return invoke('GetSummaryScreenInformation', []);
        };
        /**
         * @param {function(vos.SupportTicketDisplayDataVisualObject)} callback {@link function(vos.SupportTicketDisplayDataVisualObject)}
         * @name _Deferred_GetSupportTicketDisplayData.then
         */
        /**
         * @returns {_Deferred_GetSupportTicketDisplayData} a promise with a callback with result {@link vos.SupportTicketDisplayDataVisualObject}
         */
        zertoServiceFactory.GetSupportTicketDisplayData = function GetSupportTicketDisplayData() {
            return invoke('GetSupportTicketDisplayData', []);
        };
        /**
         * @param {function(vos.SupportTicketStatusVisualObject)} callback {@link function(vos.SupportTicketStatusVisualObject)}
         * @name _Deferred_GetSupportTicketStatus.then
         */
        /**
         * @param {vos.CommandTaskIdentifier} cmdTaskId {@link vos.CommandTaskIdentifier}
         * @returns {_Deferred_GetSupportTicketStatus} a promise with a callback with result {@link vos.SupportTicketStatusVisualObject}
         */
        zertoServiceFactory.GetSupportTicketStatus = function GetSupportTicketStatus(cmdTaskId) {
            return invoke('GetSupportTicketStatus', [cmdTaskId]);
        };
        /**
         * @param {function(vos.SupportedHostVersionsVisualObject)} callback {@link function(vos.SupportedHostVersionsVisualObject)}
         * @name _Deferred_GetSupportedEsxUpdates.then
         */
        /**
         * @returns {_Deferred_GetSupportedEsxUpdates} a promise with a callback with result {@link vos.SupportedHostVersionsVisualObject}
         */
        zertoServiceFactory.GetSupportedEsxUpdates = function GetSupportedEsxUpdates() {
            return invoke('GetSupportedEsxUpdates', []);
        };
        /**
         * @param {function(vos.TasksPaneVisualObject)} callback {@link function(vos.TasksPaneVisualObject)}
         * @name _Deferred_GetTasksByFilter.then
         */
        /**
         * @param {vos.CommandTaskRelatedEntityVisualObject} taskRelatedEntityFilter {@link vos.CommandTaskRelatedEntityVisualObject}
         * @param {enums.CommandTaskStatusFilterVisualObject[]} taskStateFilter {@link enums.CommandTaskStatusFilterVisualObject[]}
         * @param {number} timePeriodInHours {@link number}
         * @param {enums.CommandTaskRecordSortType} sortType {@link enums.CommandTaskRecordSortType}
         * @param {number} countLimitation {@link number}
         * @returns {_Deferred_GetTasksByFilter} a promise with a callback with result {@link vos.TasksPaneVisualObject}
         */
        zertoServiceFactory.GetTasksByFilter = function GetTasksByFilter(taskRelatedEntityFilter, taskStateFilter, timePeriodInHours, sortType, countLimitation) {
            return invoke('GetTasksByFilter', [taskRelatedEntityFilter, taskStateFilter, timePeriodInHours, sortType, countLimitation]);
        };
        /**
         * @param {function(vos.TreeScreenVisualObject)} callback {@link function(vos.TreeScreenVisualObject)}
         * @name _Deferred_GetTopLevelTree.then
         */
        /**
         * @returns {_Deferred_GetTopLevelTree} a promise with a callback with result {@link vos.TreeScreenVisualObject}
         */
        zertoServiceFactory.GetTopLevelTree = function GetTopLevelTree() {
            return invoke('GetTopLevelTree', []);
        };
        /**
         * @param {function(vos.ToplogyScreenVisualObject)} callback {@link function(vos.ToplogyScreenVisualObject)}
         * @name _Deferred_GetTopologyScreen.then
         */
        /**
         * @returns {_Deferred_GetTopologyScreen} a promise with a callback with result {@link vos.ToplogyScreenVisualObject}
         */
        zertoServiceFactory.GetTopologyScreen = function GetTopologyScreen() {
            return invoke('GetTopologyScreen', []);
        };
        /**
         * @param {function(vos.VCDOrgVdcNetworkMappingVisualObject[])} callback {@link function(vos.VCDOrgVdcNetworkMappingVisualObject[])}
         * @name _Deferred_GetVCD2VCDInitialNetworksMapping.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVAppIdentifier} vcdvAppIdentifier {@link vos.VCDVAppIdentifier}
         * @returns {_Deferred_GetVCD2VCDInitialNetworksMapping} a promise with a callback with result {@link vos.VCDOrgVdcNetworkMappingVisualObject[]}
         */
        zertoServiceFactory.GetVCD2VCDInitialNetworksMapping = function GetVCD2VCDInitialNetworksMapping(ownersIdentifier, optionalProtectionGroupIdentifier, vcdvAppIdentifier) {
            return invoke('GetVCD2VCDInitialNetworksMapping', [ownersIdentifier, optionalProtectionGroupIdentifier, vcdvAppIdentifier]);
        };
        /**
         * @param {function(vos.PotentialOrgVdcNetworksForMappingVisualObject)} callback {@link function(vos.PotentialOrgVdcNetworksForMappingVisualObject)}
         * @name _Deferred_GetVCD2VCDPotentialOrgNetworks.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} sourceVCDVirtualDatacenterIdentifier {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupId {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetVCDVirtualDatacenterIdentifier {@link vos.VCDVirtualDatacenterIdentifier}
         * @returns {_Deferred_GetVCD2VCDPotentialOrgNetworks} a promise with a callback with result {@link vos.PotentialOrgVdcNetworksForMappingVisualObject}
         */
        zertoServiceFactory.GetVCD2VCDPotentialOrgNetworks = function GetVCD2VCDPotentialOrgNetworks(ownersIdentifier, sourceVCDVirtualDatacenterIdentifier, optionalProtectionGroupId, targetVCDVirtualDatacenterIdentifier) {
            return invoke('GetVCD2VCDPotentialOrgNetworks', [ownersIdentifier, sourceVCDVirtualDatacenterIdentifier, optionalProtectionGroupId, targetVCDVirtualDatacenterIdentifier]);
        };
        /**
         * @param {function(vos.VCDVirtualDatacenterStorageProfileVisualObject[])} callback {@link function(vos.VCDVirtualDatacenterStorageProfileVisualObject[])}
         * @name _Deferred_GetVCDPotentialVirtualDatacenterStorageProfiles.then
         */
        /**
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @returns {_Deferred_GetVCDPotentialVirtualDatacenterStorageProfiles} a promise with a callback with result {@link vos.VCDVirtualDatacenterStorageProfileVisualObject[]}
         */
        zertoServiceFactory.GetVCDPotentialVirtualDatacenterStorageProfiles = function GetVCDPotentialVirtualDatacenterStorageProfiles(ownersIdentifier, optionalProtectionGroupIdentifier, targetOrgVdc) {
            return invoke('GetVCDPotentialVirtualDatacenterStorageProfiles', [ownersIdentifier, optionalProtectionGroupIdentifier, targetOrgVdc]);
        };
        /**
         * @param {function(vos.ProviderVirtualDatacenterScreenVisualObject)} callback {@link function(vos.ProviderVirtualDatacenterScreenVisualObject)}
         * @name _Deferred_GetVCDProviderVirtualDatacenters.then
         */
        /**
         * @returns {_Deferred_GetVCDProviderVirtualDatacenters} a promise with a callback with result {@link vos.ProviderVirtualDatacenterScreenVisualObject}
         */
        zertoServiceFactory.GetVCDProviderVirtualDatacenters = function GetVCDProviderVirtualDatacenters() {
            return invoke('GetVCDProviderVirtualDatacenters', []);
        };
        /**
         * @param {function(vos.VappContextInfo)} callback {@link function(vos.VappContextInfo)}
         * @name _Deferred_GetVCDVappContextInfo.then
         */
        /**
         * @param {vos.VCDVAppIdentifier} vcdvAppIdentifier {@link vos.VCDVAppIdentifier}
         * @returns {_Deferred_GetVCDVappContextInfo} a promise with a callback with result {@link vos.VappContextInfo}
         */
        zertoServiceFactory.GetVCDVappContextInfo = function GetVCDVappContextInfo(vcdvAppIdentifier) {
            return invoke('GetVCDVappContextInfo', [vcdvAppIdentifier]);
        };
        /**
         * @param {function(vos.VCenterPotentialRestoreSecondaryEntities)} callback {@link function(vos.VCenterPotentialRestoreSecondaryEntities)}
         * @name _Deferred_GetVCenterPotentialRestoreSecondaryEntities.then
         */
        /**
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @param {vos.BaseComputeResourceIdentifier} baseComputeResourceIdentifier {@link vos.BaseComputeResourceIdentifier}
         * @returns {_Deferred_GetVCenterPotentialRestoreSecondaryEntities} a promise with a callback with result {@link vos.VCenterPotentialRestoreSecondaryEntities}
         */
        zertoServiceFactory.GetVCenterPotentialRestoreSecondaryEntities = function GetVCenterPotentialRestoreSecondaryEntities(siteIdentifier, baseComputeResourceIdentifier) {
            return invoke('GetVCenterPotentialRestoreSecondaryEntities', [siteIdentifier, baseComputeResourceIdentifier]);
        };
        /**
         * @param {function(string)} callback {@link function(string)}
         * @name _Deferred_GetVCenterUserName.then
         */
        /**
         * @returns {_Deferred_GetVCenterUserName} a promise with a callback with result {@link string}
         */
        zertoServiceFactory.GetVCenterUserName = function GetVCenterUserName() {
            return invoke('GetVCenterUserName', []);
        };
        /**
         * @param {function(vos.ProtectionGroupCheckpointsStats)} callback {@link function(vos.ProtectionGroupCheckpointsStats)}
         * @name _Deferred_GetVPGCheckpointsStats.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetVPGCheckpointsStats} a promise with a callback with result {@link vos.ProtectionGroupCheckpointsStats}
         */
        zertoServiceFactory.GetVPGCheckpointsStats = function GetVPGCheckpointsStats(protectionGroupIdentifier) {
            return invoke('GetVPGCheckpointsStats', [protectionGroupIdentifier]);
        };
        /**
         * @param {function(vos.ProtectionGroupCheckpointsSummary)} callback {@link function(vos.ProtectionGroupCheckpointsSummary)}
         * @name _Deferred_GetVPGCheckpointsSummary.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {number} clientGmtOffsetInMinutes {@link number}
         * @returns {_Deferred_GetVPGCheckpointsSummary} a promise with a callback with result {@link vos.ProtectionGroupCheckpointsSummary}
         */
        zertoServiceFactory.GetVPGCheckpointsSummary = function GetVPGCheckpointsSummary(protectionGroupIdentifier, clientGmtOffsetInMinutes) {
            return invoke('GetVPGCheckpointsSummary', [protectionGroupIdentifier, clientGmtOffsetInMinutes]);
        };
        /**
         * @param {function(vos.ProtectionGroupIdentifier[])} callback {@link function(vos.ProtectionGroupIdentifier[])}
         * @name _Deferred_GetValidVpgsForKeepSourceVMs.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier[]} protectionGroupIdentifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {_Deferred_GetValidVpgsForKeepSourceVMs} a promise with a callback with result {@link vos.ProtectionGroupIdentifier[]}
         */
        zertoServiceFactory.GetValidVpgsForKeepSourceVMs = function GetValidVpgsForKeepSourceVMs(protectionGroupIdentifiers) {
            return invoke('GetValidVpgsForKeepSourceVMs', [protectionGroupIdentifiers]);
        };
        /**
         * @param {function(vos.VcdPotentialRestoreSecondaryEntities)} callback {@link function(vos.VcdPotentialRestoreSecondaryEntities)}
         * @name _Deferred_GetVcdPotentialRestoreSecondaryEntities.then
         */
        /**
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} orgVdcIdentifier {@link vos.VCDVirtualDatacenterIdentifier}
         * @returns {_Deferred_GetVcdPotentialRestoreSecondaryEntities} a promise with a callback with result {@link vos.VcdPotentialRestoreSecondaryEntities}
         */
        zertoServiceFactory.GetVcdPotentialRestoreSecondaryEntities = function GetVcdPotentialRestoreSecondaryEntities(siteIdentifier, orgVdcIdentifier) {
            return invoke('GetVcdPotentialRestoreSecondaryEntities', [siteIdentifier, orgVdcIdentifier]);
        };
        /**
         * @param {function(vos.VCDProxyConfiguration)} callback {@link function(vos.VCDProxyConfiguration)}
         * @name _Deferred_GetVcloudDirectorConnectionSettings.then
         */
        /**
         * @returns {_Deferred_GetVcloudDirectorConnectionSettings} a promise with a callback with result {@link vos.VCDProxyConfiguration}
         */
        zertoServiceFactory.GetVcloudDirectorConnectionSettings = function GetVcloudDirectorConnectionSettings() {
            return invoke('GetVcloudDirectorConnectionSettings', []);
        };
        /**
         * @param {function(vos.VirtualMachineContextInfo)} callback {@link function(vos.VirtualMachineContextInfo)}
         * @name _Deferred_GetVirtualMachineContextInfo.then
         */
        /**
         * @param {vos.VMIdentifier} vmIdentifier {@link vos.VMIdentifier}
         * @returns {_Deferred_GetVirtualMachineContextInfo} a promise with a callback with result {@link vos.VirtualMachineContextInfo}
         */
        zertoServiceFactory.GetVirtualMachineContextInfo = function GetVirtualMachineContextInfo(vmIdentifier) {
            return invoke('GetVirtualMachineContextInfo', [vmIdentifier]);
        };
        /**
         * @param {function(vos.VmBackupScreenVisualObject)} callback {@link function(vos.VmBackupScreenVisualObject)}
         * @name _Deferred_GetVmBackupJobsScreen.then
         */
        /**
         * @returns {_Deferred_GetVmBackupJobsScreen} a promise with a callback with result {@link vos.VmBackupScreenVisualObject}
         */
        zertoServiceFactory.GetVmBackupJobsScreen = function GetVmBackupJobsScreen() {
            return invoke('GetVmBackupJobsScreen', []);
        };
        /**
         * @param {function(vos.VpgBackupScreenVisualObject)} callback {@link function(vos.VpgBackupScreenVisualObject)}
         * @name _Deferred_GetVpgBackupJobsScreen.then
         */
        /**
         * @returns {_Deferred_GetVpgBackupJobsScreen} a promise with a callback with result {@link vos.VpgBackupScreenVisualObject}
         */
        zertoServiceFactory.GetVpgBackupJobsScreen = function GetVpgBackupJobsScreen() {
            return invoke('GetVpgBackupJobsScreen', []);
        };
        /**
         * @param {function(vos.VpgActivityScreenVisualObject)} callback {@link function(vos.VpgActivityScreenVisualObject)}
         * @name _Deferred_GetVpgRecentActivity.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} pgId {@link vos.ProtectionGroupIdentifier}
         * @returns {_Deferred_GetVpgRecentActivity} a promise with a callback with result {@link vos.VpgActivityScreenVisualObject}
         */
        zertoServiceFactory.GetVpgRecentActivity = function GetVpgRecentActivity(pgId) {
            return invoke('GetVpgRecentActivity', [pgId]);
        };
        /**
         * @param {function(string)} callback {@link function(string)}
         * @name _Deferred_GetVpgTextSummary.then
         */
        /**
         * @returns {_Deferred_GetVpgTextSummary} a promise with a callback with result {@link string}
         */
        zertoServiceFactory.GetVpgTextSummary = function GetVpgTextSummary() {
            return invoke('GetVpgTextSummary', []);
        };
        /**
         * @param {function(vos.VraDetailsScreenVisualObject)} callback {@link function(vos.VraDetailsScreenVisualObject)}
         * @name _Deferred_GetVraDetailsScreen.then
         */
        /**
         * @param {vos.HostIdentifier} hostIdentifier {@link vos.HostIdentifier}
         * @returns {_Deferred_GetVraDetailsScreen} a promise with a callback with result {@link vos.VraDetailsScreenVisualObject}
         */
        zertoServiceFactory.GetVraDetailsScreen = function GetVraDetailsScreen(hostIdentifier) {
            return invoke('GetVraDetailsScreen', [hostIdentifier]);
        };
        /**
         * @param {function(vos.VraListScreenVisualObject)} callback {@link function(vos.VraListScreenVisualObject)}
         * @name _Deferred_GetVraListScreen.then
         */
        /**
         * @returns {_Deferred_GetVraListScreen} a promise with a callback with result {@link vos.VraListScreenVisualObject}
         */
        zertoServiceFactory.GetVraListScreen = function GetVraListScreen() {
            return invoke('GetVraListScreen', []);
        };
        /**
         * @param {vos.InsertTaggedCheckpointGuiCommand[]} insertTaggedCheckpointGuiCommands {@link vos.InsertTaggedCheckpointGuiCommand[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.InsertTaggedCheckpoint = function InsertTaggedCheckpoint(insertTaggedCheckpointGuiCommands) {
            return invoke('InsertTaggedCheckpoint', [insertTaggedCheckpointGuiCommands]);
        };
        /**
         * @param {vos.HostIdentifier} hostIdentifier {@link vos.HostIdentifier}
         * @param {vos.DatastoreIdentifier} datastoreIdentifier {@link vos.DatastoreIdentifier}
         * @param {vos.NetworkIdentifier} networkIdentifier {@link vos.NetworkIdentifier}
         * @param {vos.VraIpConf} vraIpConf {@link vos.VraIpConf}
         * @param {string} userName {@link string}
         * @param {string} password {@link string}
         * @param {number} memoryInGB {@link number}
         * @param {string} bandwidthGroup {@link string}
         * @param {boolean} removeExistingVmWithSameName {@link boolean}
         * @param {boolean} useSshPrivateKeyVib {@link boolean}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.InstallVraOnHost = function InstallVraOnHost(hostIdentifier, datastoreIdentifier, networkIdentifier, vraIpConf, userName, password, memoryInGB, bandwidthGroup, removeExistingVmWithSameName, useSshPrivateKeyVib) {
            return invoke('InstallVraOnHost', [hostIdentifier, datastoreIdentifier, networkIdentifier, vraIpConf, userName, password, memoryInGB, bandwidthGroup, removeExistingVmWithSameName, useSshPrivateKeyVib]);
        };
        /**
         * @param {function(boolean)} callback {@link function(boolean)}
         * @name _Deferred_IsThinSupprotedForVcd.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} optionalProtectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @returns {_Deferred_IsThinSupprotedForVcd} a promise with a callback with result {@link boolean}
         */
        zertoServiceFactory.IsThinSupprotedForVcd = function IsThinSupprotedForVcd(optionalProtectionGroupIdentifier, targetOrgVdc, ownersIdentifier) {
            return invoke('IsThinSupprotedForVcd', [optionalProtectionGroupIdentifier, targetOrgVdc, ownersIdentifier]);
        };
        /**
         * @param {function(boolean)} callback {@link function(boolean)}
         * @name _Deferred_IsThinSupprotedForVcdForReverseConfig.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VCDVirtualDatacenterIdentifier} targetOrgVdc {@link vos.VCDVirtualDatacenterIdentifier}
         * @param {vos.OwnersIdentifier} ownersIdentifier {@link vos.OwnersIdentifier}
         * @returns {_Deferred_IsThinSupprotedForVcdForReverseConfig} a promise with a callback with result {@link boolean}
         */
        zertoServiceFactory.IsThinSupprotedForVcdForReverseConfig = function IsThinSupprotedForVcdForReverseConfig(protectionGroupIdentifier, targetOrgVdc, ownersIdentifier) {
            return invoke('IsThinSupprotedForVcdForReverseConfig', [protectionGroupIdentifier, targetOrgVdc, ownersIdentifier]);
        };
        /**
         * @param {function(vos.SessionIdentifier)} callback {@link function(vos.SessionIdentifier)}
         * @name _Deferred_LoginToVCenter.then
         */
        /**
         * @param {string} userName {@link string}
         * @param {string} password {@link string}
         * @returns {_Deferred_LoginToVCenter} a promise with a callback with result {@link vos.SessionIdentifier}
         */
        zertoServiceFactory.LoginToVCenter = function LoginToVCenter(userName, password) {
            return invoke('LoginToVCenter', [userName, password]);
        };
        /**
         * @param {function(boolean)} callback {@link function(boolean)}
         * @name _Deferred_LogoutFromVCenter.then
         */
        /**
         * @returns {_Deferred_LogoutFromVCenter} a promise with a callback with result {@link boolean}
         */
        zertoServiceFactory.LogoutFromVCenter = function LogoutFromVCenter() {
            return invoke('LogoutFromVCenter', []);
        };
        /**
         * @param {vos.MoveBeforeCommitGuiCommand[]} moveBeforeCommitGuiCommands {@link vos.MoveBeforeCommitGuiCommand[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.MoveBeforeCommit = function MoveBeforeCommit(moveBeforeCommitGuiCommands) {
            return invoke('MoveBeforeCommit', [moveBeforeCommitGuiCommands]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VpgConfigurationVisualObject} postFailoverSettings {@link vos.VpgConfigurationVisualObject}
         * @param {boolean} keepSourceVMs {@link boolean}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.MoveCommit = function MoveCommit(protectionGroupIdentifier, postFailoverSettings, keepSourceVMs) {
            return invoke('MoveCommit', [protectionGroupIdentifier, postFailoverSettings, keepSourceVMs]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.MoveRollback = function MoveRollback(protectionGroupIdentifier) {
            return invoke('MoveRollback', [protectionGroupIdentifier]);
        };
        /**
         * @param {vos.SiteConnectionParameters} peerConnectionParameters {@link vos.SiteConnectionParameters}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.Pair = function Pair(peerConnectionParameters) {
            return invoke('Pair', [peerConnectionParameters]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier[]} protectionGroupIdentifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.PauseProtectionGroups = function PauseProtectionGroups(protectionGroupIdentifiers) {
            return invoke('PauseProtectionGroups', [protectionGroupIdentifiers]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.RemoveProtectionGroup = function RemoveProtectionGroup(protectionGroupIdentifier) {
            return invoke('RemoveProtectionGroup', [protectionGroupIdentifier]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.RemoveProtectionGroupKeepTargetDisks = function RemoveProtectionGroupKeepTargetDisks(protectionGroupIdentifier) {
            return invoke('RemoveProtectionGroupKeepTargetDisks', [protectionGroupIdentifier]);
        };
        /**
         * @param {vos.RestoreConfigurationVisualObject} configuration {@link vos.RestoreConfigurationVisualObject}
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @param {vos.BackupTargetIdentifier} backupTargetIdentifier {@link vos.BackupTargetIdentifier}
         * @param {vos.BackupJobIdentifier} backupJobIdentifier {@link vos.BackupJobIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.RestoreFromBackup = function RestoreFromBackup(configuration, siteIdentifier, backupTargetIdentifier, backupJobIdentifier) {
            return invoke('RestoreFromBackup', [configuration, siteIdentifier, backupTargetIdentifier, backupJobIdentifier]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier[]} protectionGroupIdentifiers {@link vos.ProtectionGroupIdentifier[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ResumeProtectionGroups = function ResumeProtectionGroups(protectionGroupIdentifiers) {
            return invoke('ResumeProtectionGroups', [protectionGroupIdentifiers]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} identifier {@link vos.ProtectionGroupIdentifier}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ResumeTimer = function ResumeTimer(identifier) {
            return invoke('ResumeTimer', [identifier]);
        };
        /**
         * @param {vos.LicenseKey} licenseKey {@link vos.LicenseKey}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SaveLicense = function SaveLicense(licenseKey) {
            return invoke('SaveLicense', [licenseKey]);
        };
        /**
         * @param {vos.AdvancedSiteSettings} newSettings {@link vos.AdvancedSiteSettings}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetAdvancedSiteSettings = function SetAdvancedSiteSettings(newSettings) {
            return invoke('SetAdvancedSiteSettings', [newSettings]);
        };
        /**
         * @param {number} port {@link number}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetListeningTcpPort = function SetListeningTcpPort(port) {
            return invoke('SetListeningTcpPort', [port]);
        };
        /**
         * @param {vos.PairedSiteRouting} pairedSiteRouting {@link vos.PairedSiteRouting}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetPairedSiteRouting = function SetPairedSiteRouting(pairedSiteRouting) {
            return invoke('SetPairedSiteRouting', [pairedSiteRouting]);
        };
        /**
         * @param {vos.RouteGroupVisualObject[]} routeGroups {@link vos.RouteGroupVisualObject[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetRouteGroups = function SetRouteGroups(routeGroups) {
            return invoke('SetRouteGroups', [routeGroups]);
        };
        /**
         * @param {vos.SiteManagementDetailsVisualObject} details {@link vos.SiteManagementDetailsVisualObject}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetSiteManagementDetails = function SetSiteManagementDetails(details) {
            return invoke('SetSiteManagementDetails', [details]);
        };
        /**
         * @param {vos.ProviderVirtualDatacenterScreenVisualObject} providerVirtualDatacenterScreenVisualObject {@link vos.ProviderVirtualDatacenterScreenVisualObject}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetVCDProviderVirtualDatacenters = function SetVCDProviderVirtualDatacenters(providerVirtualDatacenterScreenVisualObject) {
            return invoke('SetVCDProviderVirtualDatacenters', [providerVirtualDatacenterScreenVisualObject]);
        };
        /**
         * @param {vos.VCDProxyConfiguration} proxyConfiguration {@link vos.VCDProxyConfiguration}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetVCDProxyConfiguration = function SetVCDProxyConfiguration(proxyConfiguration) {
            return invoke('SetVCDProxyConfiguration', [proxyConfiguration]);
        };
        /**
         * @param {string} username {@link string}
         * @param {string} password {@link string}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.SetVCenterCredentials = function SetVCenterCredentials(username, password) {
            return invoke('SetVCenterCredentials', [username, password]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} identifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.FailoverTestResult} testResult {@link vos.FailoverTestResult}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.StopFailOverTest = function StopFailOverTest(identifier, testResult) {
            return invoke('StopFailOverTest', [identifier, testResult]);
        };
        /**
         * @param {vos.StopFailoverTestGuiCommand[]} stopFailoverTestGuiCommands {@link vos.StopFailoverTestGuiCommand[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.StopMultipleFailOverTest = function StopMultipleFailOverTest(stopFailoverTestGuiCommands) {
            return invoke('StopMultipleFailOverTest', [stopFailoverTestGuiCommands]);
        };
        /**
         * @param {function(vos.CommandTaskIdentifier)} callback {@link function(vos.CommandTaskIdentifier)}
         * @name _Deferred_SubmitSupportTicket.then
         */
        /**
         * @param {vos.SubmitSupportTicketVisualObject} submitSupportTicketVisualObject {@link vos.SubmitSupportTicketVisualObject}
         * @returns {_Deferred_SubmitSupportTicket} a promise with a callback with result {@link vos.CommandTaskIdentifier}
         */
        zertoServiceFactory.SubmitSupportTicket = function SubmitSupportTicket(submitSupportTicketVisualObject) {
            return invoke('SubmitSupportTicket', [submitSupportTicketVisualObject]);
        };
        /**
         * @param {vos.EventsEmailConfiguration} emailConfiguration {@link vos.EventsEmailConfiguration}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.TestEmailSettings = function TestEmailSettings(emailConfiguration) {
            return invoke('TestEmailSettings', [emailConfiguration]);
        };
        /**
         * @param {string[]} alertInstanceUuids {@link string[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.UndismissAlerts = function UndismissAlerts(alertInstanceUuids) {
            return invoke('UndismissAlerts', [alertInstanceUuids]);
        };
        /**
         * @param {vos.HostIdentifier[]} hostIdentifiers {@link vos.HostIdentifier[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.UninstallVras = function UninstallVras(hostIdentifiers) {
            return invoke('UninstallVras', [hostIdentifiers]);
        };
        /**
         * @param {vos.SiteIdentifier} siteIdentifier {@link vos.SiteIdentifier}
         * @param {boolean} keepDisks {@link boolean}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.Unpair = function Unpair(siteIdentifier, keepDisks) {
            return invoke('Unpair', [siteIdentifier, keepDisks]);
        };
        /**
         * @param {vos.BackupTargetDetailsVisualObject} backupDatails {@link vos.BackupTargetDetailsVisualObject}
         * @param {boolean} isUpdatePathCausesJobReset {@link boolean}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.UpdateBackupTarget = function UpdateBackupTarget(backupDatails, isUpdatePathCausesJobReset) {
            return invoke('UpdateBackupTarget', [backupDatails, isUpdatePathCausesJobReset]);
        };
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VpgConfigurationVisualObject} vpgConfigurationVisualObject {@link vos.VpgConfigurationVisualObject}
         * @param {vos.VPGConfigurationUpdateModifiersVisualObject} vpgConfigurationUpdateModifiersVisualObject {@link vos.VPGConfigurationUpdateModifiersVisualObject}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.UpdateProtectionGroup = function UpdateProtectionGroup(protectionGroupIdentifier, vpgConfigurationVisualObject, vpgConfigurationUpdateModifiersVisualObject) {
            return invoke('UpdateProtectionGroup', [protectionGroupIdentifier, vpgConfigurationVisualObject, vpgConfigurationUpdateModifiersVisualObject]);
        };
        /**
         * @param {vos.HostIdentifier[]} hostIdentifiers {@link vos.HostIdentifier[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.UpgradeVras = function UpgradeVras(hostIdentifiers) {
            return invoke('UpgradeVras', [hostIdentifiers]);
        };
        /**
         * @param {function(vos.BackupTargetValidationVisualObject)} callback {@link function(vos.BackupTargetValidationVisualObject)}
         * @name _Deferred_ValidateBackupTarget.then
         */
        /**
         * @param {vos.BackupTargetDetailsVisualObject} backupDatails {@link vos.BackupTargetDetailsVisualObject}
         * @returns {_Deferred_ValidateBackupTarget} a promise with a callback with result {@link vos.BackupTargetValidationVisualObject}
         */
        zertoServiceFactory.ValidateBackupTarget = function ValidateBackupTarget(backupDatails) {
            return invoke('ValidateBackupTarget', [backupDatails]);
        };
        /**
         * @param {function(vos.ChangeHostScreenVisualObject)} callback {@link function(vos.ChangeHostScreenVisualObject)}
         * @name _Deferred_ValidateChangeHostScreen.then
         */
        /**
         * @param {vos.BaseComputeResourceIdentifier} originalVraHost {@link vos.BaseComputeResourceIdentifier}
         * @param {vos.ChangeHostScreenVisualObject} currentChangeHostScreenVisualObject {@link vos.ChangeHostScreenVisualObject}
         * @returns {_Deferred_ValidateChangeHostScreen} a promise with a callback with result {@link vos.ChangeHostScreenVisualObject}
         */
        zertoServiceFactory.ValidateChangeHostScreen = function ValidateChangeHostScreen(originalVraHost, currentChangeHostScreenVisualObject) {
            return invoke('ValidateChangeHostScreen', [originalVraHost, currentChangeHostScreenVisualObject]);
        };
        /**
         * @param {vos.HasNoSharedVmsVisualObject[]} hasNoSharedVmsVisualObjects {@link vos.HasNoSharedVmsVisualObject[]}
         * @returns {Promise} a promise with an empty callback (void)
         */
        zertoServiceFactory.ValidateHasNoSharedVms = function ValidateHasNoSharedVms(hasNoSharedVmsVisualObjects) {
            return invoke('ValidateHasNoSharedVms', [hasNoSharedVmsVisualObjects]);
        };
        /**
         * @param {function(vos.ErrorValidationTokenVisualObject[])} callback {@link function(vos.ErrorValidationTokenVisualObject[])}
         * @name _Deferred_ValidateProtectionGroup.then
         */
        /**
         * @param {vos.ProtectionGroupIdentifier} protectionGroupIdentifier {@link vos.ProtectionGroupIdentifier}
         * @param {vos.VpgConfigurationVisualObject} vpgConfigurationVisualObject {@link vos.VpgConfigurationVisualObject}
         * @param {vos.VPGConfigurationCreateModifiersVisualObject} vpgConfigurationCreateModifiersVisualObject {@link vos.VPGConfigurationCreateModifiersVisualObject}
         * @param {vos.InputValidationTokenVisualObject[]} validationTokens {@link vos.InputValidationTokenVisualObject[]}
         * @param {boolean} isReverseSettings {@link boolean}
         * @returns {_Deferred_ValidateProtectionGroup} a promise with a callback with result {@link vos.ErrorValidationTokenVisualObject[]}
         */
        zertoServiceFactory.ValidateProtectionGroup = function ValidateProtectionGroup(protectionGroupIdentifier, vpgConfigurationVisualObject, vpgConfigurationCreateModifiersVisualObject, validationTokens, isReverseSettings) {
            return invoke('ValidateProtectionGroup', [protectionGroupIdentifier, vpgConfigurationVisualObject, vpgConfigurationCreateModifiersVisualObject, validationTokens, isReverseSettings]);
        };

        // end of auto generated code. DO NOT MODIFY
        /* jshint ignore:end */

        return zertoServiceFactory;
    });
