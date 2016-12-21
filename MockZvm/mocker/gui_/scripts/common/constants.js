'use strict';

angular.module('zvmApp.constant')
    .constant('policiesConstants', {
            MAX_STAGED_ACTION_TIMEOUT_SECONDS: 86400,
            MIN_COMMIT_STAGED_ACTION_TIMEOUT: 0,
            MIN_ROLLBACK_STAGED_ACTION_TIMEOUT: 10
        })
    .constant('millisInA', {SECONDS: 1000, MINUTES: 60000, HOURS: 3600000, DAYS: 86400000})
    .constant('megabyteMeasureConstants', {MB_IN_GB: 1024, MB_IN_TB: 1048576})
    .constant('secondsMeasureConstants', {SEC_IN_MIN: 60, SEC_IN_HOUR: 3600})
    .constant('millisInA', {SECONDS: 1000, MINUTES: 60000, HOURS: 3600000, DAYS: 86400000})
    .constant('globalConstants', {
            MAX_INT: 2147483647,
            NONE_REPOSITORY: '00000000-0000-0000-0000-000000000000',
            NONE_NETWORK: 'none',
            UINT: 536870911,
            NOZORG: '00000000-0000-0000-0000-000000000000'
        })
    .constant('failoverShutdownAction', {NO_SHUTDOWN: 'No', SHUTDOWN: 'Yes', FORCE_SHUTDOWN: 'Force Shutdown'})
	.constant('createVpgUserActions', {REMOVE_VM_WARNING_DIALOG_CANCELED: 'REMOVE_VM_WARNING_DIALOG_CANCELED'})
    .constant('guiVisibleException', {
        VPG_ALREADY_REMOVED: 'VpgAlreadyRemoved',
        VPG_CREATION_FAILED: 'VpgCreationFailed',
        VPG_DOESNT_EXIST: 'VpgDoesntExist',
        HOST_DOESNT_EXIST: 'HostDoesntExist',
        VRA_NOT_INSTALLED: 'VraNotInstalled',
        INVALID_USERNAME_OR_PASSWORD_MESSAGE: 'Invalid user name or password',
        INVALID_SESSION_MESSAGE: 'Invalid session',
        INSTALL_VRA_VM_ALREADY_EXISTS: 'Click Continue to replace the existing VM with a new VRA VM, or abort the installation.',
        VPG_UPDATE_WILL_MIGRATE: 'The VPG update you\'re about to perform will migrate',
        VPG_UPDATE_WILL_LOSE_HISTORY: 'There\'s one or more VMs that changed both datastore and recovery host.',
        CANT_RETRIEVE_BACKUP_TARGET_INFO: 'Error retrieving information for backup target.',
        VPG_OUTSIDE_OF_ZORG: 'VPG outside of ZORG',
        FAULT_CODE_NO_ZORG: 'VPG.No.Zorg',
        SESSION_EXPIRED: 'vCenter session is either invalid or expired',
        UNDETERMINED_SESSION: 'could not determine session manager for session',
        VCENTER_SESSION_EXPIRED: 'vCenter credentials are no longer valid',
        ZORG_SESSION_INVALID: 'no session with id=',
        ZORG_SESSION_EXPIRED: 'session expired',
        LICENSE_EXCEPTION: 'LicenseException',
        PERMISSION_DENIED: 'Permission Denied',
        PERMISSION_TASK_DENIED: 'You do not have the correct set of permissions for this task.',
        ZSSP_SESSION_EXPIRED: 'The specified session identifier is not present in the pool'
    })
    .constant('modalActionsConstants', {ESC_KEY_PRESS : 'escape key press', CLOSE: 'close'});
