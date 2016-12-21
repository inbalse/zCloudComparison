'use strict';

/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('taskTypeEnum', function (enums) {
    return function (enumValue) {

        switch (enumValue) {
            case enums.ExtensionTask_ZCommand.FirstUnusedValue:
                return '';
            case enums.ExtensionTask_ZCommand.CreateProtectionGroup:
                return 'Creating VPG';
            case enums.ExtensionTask_ZCommand.RemoveProtectionGroup:
                return 'Deleting VPG';
            case enums.ExtensionTask_ZCommand.UpdateProtectionGroup:
                return 'Updating VPG';
            case enums.ExtensionTask_ZCommand.ForceRemoveProtectionGroup:
                return 'Forcibly deleting VPG';
            case enums.ExtensionTask_ZCommand.ForceUpdateProtectionGroup:
                return 'Forcibly updating VPG';
            case enums.ExtensionTask_ZCommand.ForceKillProtectionGroup:
                return 'Forcibly killing VPG';
            case enums.ExtensionTask_ZCommand.InitFullSync:
                return 'Initial sync';
            case enums.ExtensionTask_ZCommand.PauseProtectionGroup:
                return 'Pausing protection';
            case enums.ExtensionTask_ZCommand.ResumeProtectionGroup:
                return 'Resuming protection';

            case enums.ExtensionTask_ZCommand.FailOver:
                return 'Failing over';
            case enums.ExtensionTask_ZCommand.FailOverTest:
                return 'Failover test';
            case enums.ExtensionTask_ZCommand.StopFailOverTest:
                return 'Stopping Failover test';
            case enums.ExtensionTask_ZCommand.Move:
                return 'Moving';
            case enums.ExtensionTask_ZCommand.InsertTaggedCP:
                return 'Inserting user defined checkpoint';
            case enums.ExtensionTask_ZCommand.Clone:
                return 'Cloning the VPG';
            case enums.ExtensionTask_ZCommand.MoveBeforeCommit:
                return 'Moving - before commit';
            case enums.ExtensionTask_ZCommand.MoveRollback:
                return 'Rolling back Move';
            case enums.ExtensionTask_ZCommand.MoveCommit:
                return 'Committing Move';
            case enums.ExtensionTask_ZCommand.FailoverBeforeCommit:
                return 'Failing over - before commit';
            case enums.ExtensionTask_ZCommand.FailoverCommit:
                return 'Committing Failover';
            case enums.ExtensionTask_ZCommand.FailoverRollback:
                return 'Rolling back Failover';

            case enums.ExtensionTask_ZCommand.InstallVra:
                return 'Installing VRA';
            case enums.ExtensionTask_ZCommand.UninstallVra:
                return 'Uninstalling VRA';
            case enums.ExtensionTask_ZCommand.UpgradeVra:
                return 'Upgrading VRA';
            case enums.ExtensionTask_ZCommand.MaintainHost:
                return 'Maintain host';
            case enums.ExtensionTask_ZCommand.MoveProtectionGroupToManualOperationNeeded:
                return 'Move VPG to manual operation';
            case enums.ExtensionTask_ZCommand.ChangeVraIpSetting:
                return 'Changing VRA IP setting';
            case enums.ExtensionTask_ZCommand.BulkUpgradeVras:
                return 'Upgrading VRAs in bulk';
            case enums.ExtensionTask_ZCommand.BulkUninstallVras:
                return 'Uninstalling VRAs in bulk';
            case enums.ExtensionTask_ZCommand.ChangeRecoveryHost:
                return 'Changing recovery host';
            case enums.ExtensionTask_ZCommand.ChangeRecoveryHostForProtectionGroup:
                return 'Changing recovery host for VPG';

            case enums.ExtensionTask_ZCommand.Pair:
                return 'Pairing';
            case enums.ExtensionTask_ZCommand.Unpair:
                return 'Unpairing';
            case enums.ExtensionTask_ZCommand.VpgBackup:
                return 'Backing up VPG';
            case enums.ExtensionTask_ZCommand.RestoreVpg:
                return 'Restoring VPG';
            case enums.ExtensionTask_ZCommand.GetCheckpointList:
                return 'Get checkpoint list';
            case enums.ExtensionTask_ZCommand.ProtectVM:
                return 'Protect VM';

            case enums.ExtensionTask_ZCommand.UnprotectVM:
                return 'Unprotect VM';
            case enums.ExtensionTask_ZCommand.AddVMToProtectionGroup:
                return 'AddVMToProtectionGroup';
            case enums.ExtensionTask_ZCommand.RemoveVMFromProtectionGroup:
                return 'Remove VM From ProtectionGroup';
            case enums.ExtensionTask_ZCommand.GetVMSettings:
                return 'Get VM Settings';
            case enums.ExtensionTask_ZCommand.WaitForCP:
                return 'Wait for CP';
            case enums.ExtensionTask_ZCommand.HandleMirrorPromotion:
                return 'HandleMirrorPromotion';
            case enums.ExtensionTask_ZCommand.ActivateAllMirrors:
                return 'Activate All Mirrors';
            case enums.ExtensionTask_ZCommand.LogCollection:
                return 'Log Collection,';
            case enums.ExtensionTask_ZCommand.ClearCheckpoints:
                return 'Clear Checkpoints';
            case enums.ExtensionTask_ZCommand.ForceReconfigurationOfNewVM:
                return 'Force Reconfiguration Of New VM';
            case enums.ExtensionTask_ZCommand.ClearSite:
                return 'Clear Site';
            case enums.ExtensionTask_ZCommand.PrePostScript:
                return 'PrePostScript';
            case enums.ExtensionTask_ZCommand.AddPeerVraInfo:
                return 'AddPeerVraInfo';
            case enums.ExtensionTask_ZCommand.RemovePeerVraInfo:
                return 'Remove Peer Vra Info';
            case enums.ExtensionTask_ZCommand.InstallCloudConnector:
                return 'Install Cloud Connector';
            case enums.ExtensionTask_ZCommand.UninstallCloudConnector:
                return 'Uninstall Cloud Connector';
            case enums.ExtensionTask_ZCommand.HandleFirstSyncDone:
                return 'Handle First Sync Done';
            case enums.ExtensionTask_ZCommand.NotSupportedInThisVersion:
                return 'NotSupportedInThisVersion';
            case enums.ExtensionTask_ZCommand.ChangeVraPassword:
                return 'Change VRA Password';
            case enums.ExtensionTask_ZCommand.RedeployCloudConnector:
                return 'Redeploy Cloud Connector';
            case enums.ExtensionTask_ZCommand.VpgDeleteBackup:
                return 'VPG delete backup';
            case enums.ExtensionTask_ZCommand.SubmitSupportTicket:
                return 'Submit support ticket';
            case enums.ExtensionTask_ZCommand.ChangeVraPasswordIpSettings:
                return 'Change VRA Setting(IP and/or Password)';
            case enums.ExtensionTask_ZCommand.PreScript:
                return 'Pre Script';
            case enums.ExtensionTask_ZCommand.PostScript:
                return 'Post Script';
            case enums.ExtensionTask_ZCommand.FlrJournalMount:
                return 'File Restore - Mount';
            case enums.ExtensionTask_ZCommand.FlrJournalUnmount:
                return 'File Restore - Unmount';
            default:
                return getEnumNameByValue(enumValue);
        }
    };
    function getEnumNameByValue(enumValue){
        return _.findKey(enums.ExtensionTask_ZCommand,function(property){return property === enumValue});
    }
});
/* jshint ignore:end */
