'use strict';

angular.module('zvmApp.core')
    .constant('VPGWizardStepStates', {
        INITIAL: 'z-wizard-state-initial',
        VALID: 'z-wizard-state-valid',
        INVALID: 'z-wizard-state-invalid',
        MIXED: 'z-wizard-state-mixed' //can be used to identify step that valid partially but still can proceed
    })
    .constant('validationElements', {
        VPGNAME: 'vpgName',
        ZORG: 'zorg',
        HOST: 'targetHost',
        DATASTORE: 'dataStore',
        SITETYPE: 'siteType',
        RECOVERYSITE: 'recoverySite',
        ORGVDC: 'orgVdc',
        DEFAULT_FAILOVER_NETWORK: 'defaultFailoverNetwork',
        DEFAULT_TEST_NETWORK: 'defaultTestNetwork',
        RECOVERY_FOLDER: 'recoveryFolder',
        POST_SCRIPT_TIMEOUT: 'postScriptTimeOut',
        PRE_SCRIPT_TIMEOUT: 'preScriptTimeOut',
        PCN_FAILOVER: 'pcnFailover',
        PCN_TEST: 'pcnTest',
        SUBNET_FAILOVER: 'subnetFailover',
        SUBNET_TEST: 'subnetTest',
        SECURITY_FAILOVER: 'securityFailoverGroup',
        SECURITY_TEST: 'securityTestGroup',
        VAPP_NETWORK_MAPING: 'vappNetworkMaping',
        REPOSITORY: 'repository',
        RETRY_TIMES: 'retryTimes',
        RETRY_MINUTES: 'retryMinutes',
        BACKUP_SCRIPT_TIMEOUT: 'backupScriptTimeout',
        INSTANCE_FAILOVER: 'instanceFailover',
        INSTANCE_TEST: 'instanceTest',
        JOURNAL_HISTORY_TIME: 'journalHistoryTime',
        JOURNAL_DATASTORE: 'journalDatastore'
    })
    .constant('stepId', {
        INIT: 'INIT',
        VMS: 'VMS',
        REPLICATION: 'REPLICATION',
        STORAGE: 'STORAGE',
        RECOVERY: 'RECOVERY',
        NICS: 'NICS',
        BACKUP: 'BACKUP',
        SUMMARY: 'SUMMARY'
    })
    .factory('createVPGWizardModel', function (enums, createVPGModel, VPGWizardStepStates, $translate, failHelperFactory,
                                               validationElements, $q, zertoServiceFactory, globalStateModel, $http, vos, globalConstants,
                                               stepId, advancedVmReplicationSettingsModel, publicCloudSettingsService, createBackupService,
                                               vpgService, vmsService, createVpgRecoveryService, networksService, storageService, createVpgRecoveryAwsService) {

            var createVPGWizardModel = {};

            createVPGWizardModel._setValidationState = function (step, isValid) {
                if (isValid) {
                    step.stateIcon = VPGWizardStepStates.VALID;
                    step.isEnabled = true;
                } else {
                    step.stateIcon = vpgService.isInEditMode() ? VPGWizardStepStates.INVALID : VPGWizardStepStates.INITIAL;
                    step.isEnabled = vpgService.isInEditMode();
                }

            };
            createVPGWizardModel.serverValidationMap = {};
            createVPGWizardModel.serverValidationMap[stepId.INIT] = [new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.LocalDuplicateVpgName)];
            createVPGWizardModel.serverValidationMap[stepId.REPLICATION] = [new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryHost),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryDatastoreVm),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.JournalSpaceConfiguredForVm),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.AllowedCreationOfSelfProtectedVpg),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.ValidateZorg),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.AWSUpperLimitOnSourceVm),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.DuplicateVpgName),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.ProtectedVmName),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.DefaultComputeResourceCanSeeDefaultJournalDatastore),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.DefaultComputeResourceCanSeeDefaultRecoveryDatastore),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.VmComputeResourceCanSeeVmRecoveryDatastore),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryOrgVdc),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.ReverseReplicationValidation),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.OneToManyBCValidation)
            ];
            createVPGWizardModel.serverValidationMap[stepId.STORAGE] = [new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.ZeroDiskOnSourceVm),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.VcdPreseedDisks),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryDatastoreVolume),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.VmComputeResourceCanSeeVolumeRecoveryDatastore)];

            createVPGWizardModel.serverValidationMap[stepId.RECOVERY] = [new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.FolNetwork),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.FotNetwork)];

            createVPGWizardModel.serverValidationMap[stepId.NICS] = [new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.NicIpSetting)];

            createVPGWizardModel.serverValidationMap[stepId.BACKUP] = [new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.BackupScheduler),
                new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.BakupCompetabilty)];

            createVPGWizardModel.serverValidation = function (step) {
                var deferred = $q.defer();
                var validationTokens = createVPGWizardModel.serverValidationMap[step.id];
                var defaultVpgSettings = _.cloneDeep(createVPGModel.data.defaultVpgSettings);

                if (!defaultVpgSettings) {
                    defaultVpgSettings = {};
                    defaultVpgSettings.Config = new vos.VpgConfigurationVisualObject();
                }
                defaultVpgSettings.Config.Name = vpgService.getVpgName();

                if (createVPGModel.data.selectedZORG) {
                    defaultVpgSettings.Config.ZertoOrganizationIdentifier = createVPGModel.data.selectedZORG.Identifier;
                }
                zertoServiceFactory.ValidateProtectionGroup(createVPGModel.getProtectionGroupId(), defaultVpgSettings.Config, createVPGModel.getCreateValidationFlags(), validationTokens, createVPGModel.isReverse()).then(function (result) {
                    deferred.resolve(result);
                });
                return deferred.promise;
            };

            createVPGWizardModel.validateInitialStep = function (step) {

                step.validationComponents = [];
                var result = false;
                var vpgName = vpgService.getVpgName();
                if (vpgName && vpgName !== '') {
                    result = true;
                } else {
                    step.validationComponents.push({
                        id: validationElements.VPGNAME,
                        error: $translate.instant('CREATE_VPG_INITIAL.NAME_INVALID')
                    });
                }

                createVPGWizardModel._setValidationState(step, result);
                return result;
            };

            createVPGWizardModel.checkZeroDiskInVms = function (vms) {
                return _.some(vms, function (vm) {
                    return (vm.SizeInMb === 0);
                });
            };

            createVPGWizardModel.validateSelectVMsStep = function (step) {
                step.validationComponents = [];
                var selectedVms = vmsService.getSelectedVms();

                var result = false;
                if (!_.isEmpty(selectedVms)) {
                    if (createVPGWizardModel.checkZeroDiskInVms(selectedVms)) {
                        step.validationComponents.push({
                            id: 'selectedVms',
                            error: $translate.instant('CREATE_VPG_SELECT_VMS.ZERO_SIZE')
                        });
                    } else {
                        result = true;
                    }
                } else {
                    step.validationComponents.push({
                        id: 'selectedVms',
                        error: $translate.instant('CREATE_VPG_SELECT_VMS.NONE_SELECTED')
                    });
                }

                createVPGWizardModel._setValidationState(step, result);
                return result;
            };

            createVPGWizardModel.validateReplicationStep = function (step) {
                var vpgSettings = vpgService.getVpgSettings(),
                    targetSite = vpgService.getTargetSite(),
                    selectedVms = !_.isEmpty(vmsService.getSelectedVms()) ? vmsService.getSelectedVms() : vmsService.getProtectedVms(),
                    initialSelectedVms = vmsService.getInitializedSelectedVms(),
                    sourceSiteType = vpgService.getSourceSiteType(),
                    targetOrgvDC = vpgService.getTargetOrgVdc(),
                    minimumJournalIntervalInMinutes = storageService.getMinimalJournalLengthInMinutes(),
                    targetSiteType = vpgService.getTargetSiteType();

                var minMaxJournalLengthInMinutes = {
                    HOURS: {min: 60, max: 23 * 60}, // type: 2
                    DAYS: {min: 1440, max: 30 * 1440} // type: 1
                };

                //var data = createVPGModel.data;
                step.validationComponents = [];

                var result = true;
                step.validationError = [];

                var failIf = failHelperFactory.failHelper(
                    step.validationError, function () {
                        result = false;
                    }, step.validationComponents);

                if (!vpgSettings) {
                    result = false;
                }
                if (targetSite) {
                    if (targetSiteType && vpgSettings && vpgSettings.Config && vpgSettings.Config.Defaults) {

                        if (targetSiteType.value === enums.VpgEntityType.VCVpg || targetSiteType.value === enums.VpgEntityType.HyperV) {
                            if (sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp) {
                                failIf(_.isEmpty(selectedVms), 'CREATE_VPG_REPLICATION.VM_SETTINGS_ERROR');
                                failIf(!advancedVmReplicationSettingsModel.validateVms(initialSelectedVms, selectedVms), 'CREATE_VPG_REPLICATION.VM_SETTINGS_ERROR');
                            } else {
                                failIf(_.isEmpty(selectedVms), 'CREATE_VPG_REPLICATION.VM_SETTINGS_ERROR');
                                failIf(!advancedVmReplicationSettingsModel.validateVms(initialSelectedVms, selectedVms), 'CREATE_VPG_REPLICATION.VM_SETTINGS_ERROR');
                            }
                        }
                        else if (targetSiteType.value === enums.VpgEntityType.VCDvApp) {
                            failIf(!targetOrgvDC, 'CREATE_VPG_REPLICATION.ERROR_ORDVDC', validationElements.ORGVDC);
                            step.validationError = undefined;
                        }
                    } else {
                        failIf(!targetSiteType, 'CREATE_VPG_REPLICATION.ERROR_SITE_TYPE', validationElements.SITETYPE);
                        step.validationError = undefined;
                    }

                } else {
                    failIf(!targetSite, 'CREATE_VPG_REPLICATION.ERROR_TARGET_SITE', validationElements.RECOVERYSITE);
                    step.validationError = undefined;
                }

                if (!vpgService.isZssp()) {
                    failIf(vpgSettings && vpgSettings.PotentialZertoOrganization && vpgSettings.PotentialZertoOrganization.length > 1 && !createVPGModel.getSelectedZorg(), 'CREATE_VPG_REPLICATION.ERROR_ZORG', validationElements.ZORG);
                }

                if (!createVPGModel.getIsSlaCustom()) {
                    if (!vpgSettings.isTmp) {
                        if (minimumJournalIntervalInMinutes) {
                            failIf(minimumJournalIntervalInMinutes < minMaxJournalLengthInMinutes.HOURS.min || minimumJournalIntervalInMinutes > minMaxJournalLengthInMinutes.DAYS.max,
                                'CREATE_VPG_REPLICATION.ERROR_JOURNAL_HISTORY_TIME',
                                validationElements.JOURNAL_HISTORY_TIME);
                        } else {
                            failIf(isNaN(minimumJournalIntervalInMinutes), 'CREATE_VPG_REPLICATION.ERROR_JOURNAL_HISTORY_TIME', validationElements.JOURNAL_HISTORY_TIME);
                        }
                    }
                }

                //check if vpg setting been requested successfully
                if (createVPGModel.getVpgDefaultSettingIsRejected()) {
                    result = false; //if not
                }

                createVPGWizardModel._setValidationState(step, result);
                //step.validationError = undefined;
                return result;
            };

            createVPGWizardModel.validateStorageStep = function (step) {
                //var data = createVPGModel.data;
                var vpgSettings = vpgService.getVpgSettings(),
                    targetSiteType = vpgService.getTargetSiteType();

                var result = true;
                step.validationError = [];

                var failIf = failHelperFactory.failHelper(
                    step.validationError, function () {
                        result = false;
                    });

                if (!vpgSettings) {
                    result = false;
                }

                if (step && targetSiteType && vpgSettings.Config) {
                    var selectedVms = vmsService.getInitializedSelectedVms();
                    if (targetSiteType.value === enums.VpgEntityType.VCDvApp) {
                        // if target site is vcdVapp

                        result = !!selectedVms && !!selectedVms.length;
                        _.forEach(selectedVms, function (vm) {
                            _.forEach(vm.Volumes, function (volume) {
                                if (!volume.InternalVolumeManagementSettings || !volume.InternalVolumeManagementSettings.Settings || !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination ||
                                    (!volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore && !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk && !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore)) {

                                    result = false;
                                }
                            });
                        });

                    } else if (targetSiteType.value !== enums.VpgEntityType.Aws && targetSiteType.value !== enums.VpgEntityType.Azure) { // if target site is vc/Hyperv
                        result = !!selectedVms && !!selectedVms.length;
                        _.forEach(selectedVms, function (vm) {
                            _.forEach(vm.Volumes, function (volume) {
                                if (!volume.InternalVolumeManagementSettings || !volume.InternalVolumeManagementSettings.Settings || !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination || !volume.TargetAddress ||
                                    (!volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore && !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk && !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.RawDevice && !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.StoragePod)) {

                                    result = false;
                                }
                            });
                        });
                    }

                    if (!result) {
                        failIf(true, 'CREATE_VPG_REPLICATION.ERROR_VOLUME_REPLICATION_DESTINATION');
                    }
                } else {
                    result = false;
                }

                createVPGWizardModel._setValidationState(step, result);
                return result;
            };

            createVPGWizardModel.validateRecoveryStep = function (step) {

                var minValueInSeconds = 300, maxValueInSeconds = 6000;
                var targetSiteType = vpgService.getTargetSiteType(),
                    selectedVms = vmsService.getInitializedSelectedVms(),
                    isZssp = vpgService.isZssp(),
                    configurationFlags = vpgService.getConfigurationFlags(),
                    selectedVCDVapp = vmsService.getSelectedVcdVapp(),
                    recoveryVappSettings = vpgService.getRecoveryVappSettings(),
                    scriptingSettings = vpgService.getScriptingSettings(),
                    awsVpgFailoverCloudSettings = publicCloudSettingsService.getPublicCloudFailoverSettings(),
                    awsVpgFailoverTestCloudSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings(),
                    vpgSettings = vpgService.getVpgSettings();

                //var data = createVPGModel.data;
                step.validationComponents = [];
                var result = true;
                step.validationError = [];

                var failIf = failHelperFactory.failHelper(
                    step.validationError, function () {
                        result = false;
                    }, step.validationComponents);

                if (targetSiteType && !vpgSettings.isTmp) {
                    if (targetSiteType.value !== enums.VpgEntityType.HyperV &&
                        (targetSiteType.value === enums.VpgEntityType.VCVpg) &&
                        (!isZssp) &&
                        (configurationFlags && configurationFlags.IsVmFolderConfigurable)) {
                        //validate folder per vm
                        if (vpgSettings.Config && !_.isEmpty(selectedVms)) {
                            var validateVmFolder = _.some(selectedVms, function (vm) {
                                return !vm.TargetFolder;
                            });
                            failIf(validateVmFolder, 'CREATE_VPG_RECOVERY.ERROR_RECOVERY_FOLDER');
                        }

                    }
                    if (targetSiteType.value === enums.VpgEntityType.VCDvApp) {
                        if (selectedVCDVapp) {
                            if (!recoveryVappSettings) {
                                result = false;
                            } else {
                                if (recoveryVappSettings.VCDVappSettings) {
                                    _.forEach(recoveryVappSettings.VCDVappSettings.OrgVdcNetworkMapping, function (item) {
                                        failIf(!item.RecoveryOrgVdcNetworkValue, 'CREATE_VPG_RECOVERY.ERROR_VCDVAPP_FOL_NETWORK');
                                        failIf(!item.RecoveryTestOrgVdcNetworkValue, 'CREATE_VPG_RECOVERY.ERROR_VCDVAPP_TEST_NETWORK');
                                        failIf(!item.ReverseReplicationTestOrgVdcNetworkValue, 'CREATE_VPG_RECOVERY.ERROR_VCDVAPP_REVERSE_TEST_NETWORK');
                                    });
                                }
                            }
                        }
                        else {
                            failIf(!networksService.getDefaultFailoverNetwork(), 'CREATE_VPG_RECOVERY.ERROR_FAILOVER_NETWORK', validationElements.DEFAULT_FAILOVER_NETWORK);
                            failIf(!networksService.getDefaultTestNetwork(), 'CREATE_VPG_RECOVERY.ERROR_TEST_NETWORK', validationElements.DEFAULT_TEST_NETWORK);
                        }
                    }

                    if (vpgService.isPublicCloud()) {
                        if (_.isNullOrUndefined(awsVpgFailoverCloudSettings)) {
                            result = false;
                        } else {
                            var failoverSettings = publicCloudSettingsService.getPublicCloudFailoverSettings();
                            var failoverTestSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings();


                            awsVpgFailoverCloudSettings.Pcn = createVpgRecoveryAwsService.findPcnInPotentials(failoverSettings.Pcn);
                            awsVpgFailoverTestCloudSettings.Pcn =  createVpgRecoveryAwsService.findPcnInPotentials(failoverTestSettings.Pcn);

                            var failoverSecurityGroup = awsVpgFailoverCloudSettings.SecurityGroups;
                            var testSecurityGroup = awsVpgFailoverTestCloudSettings.SecurityGroups;

                            failIf(!awsVpgFailoverCloudSettings.Pcn, 'CREATE_VPG_RECOVERY.ERROR_AWS_FAILOVER_PCN', validationElements.PCN_FAILOVER);
                            failIf(!awsVpgFailoverTestCloudSettings.Pcn, 'CREATE_VPG_RECOVERY.ERROR_AWS_TEST_PCN', validationElements.PCN_TEST);

                            failIf(!awsVpgFailoverCloudSettings.Subnet, 'CREATE_VPG_RECOVERY.ERROR_AWS_FAILOVER_SUBNET', validationElements.SUBNET_FAILOVER);
                            failIf(!awsVpgFailoverTestCloudSettings.Subnet, 'CREATE_VPG_RECOVERY.ERROR_AWS_TEST_SUBNET', validationElements.SUBNET_TEST);

                            failIf(!awsVpgFailoverCloudSettings.PublicCloudInstanceTypeVisualObject, vpgService.isAws() ? 'CREATE_VPG_RECOVERY.ERROR_AWS_FAILOVER_INSTANCE' : 'CREATE_VPG_RECOVERY.ERROR_AZURE_FAILOVER_INSTANCE', validationElements.INSTANCE_FAILOVER);
                            failIf(!awsVpgFailoverTestCloudSettings.PublicCloudInstanceTypeVisualObject, vpgService.isAws() ? 'CREATE_VPG_RECOVERY.ERROR_AWS_TEST_INSTANCE' : 'CREATE_VPG_RECOVERY.ERROR_AZURE_TEST_INSTANCE', validationElements.INSTANCE_TEST);
                            failIf(!vpgService.isInEditMode() && !createVpgRecoveryAwsService.lastAWSFailoverSavedPcn, '');
                            failIf(!vpgService.isInEditMode() && !createVpgRecoveryAwsService.lastAWSTestSavedPcn, ''); //this is bug 20736, need to remove it after BE changed the default settings




                            if (vpgService.isAws()) {
                                failIf(failoverSecurityGroup && failoverSecurityGroup.length === 0, 'CREATE_VPG_RECOVERY.ERROR_AWS_FAILOVER_GROUP', validationElements.SECURITY_FAILOVER);
                                failIf(testSecurityGroup && testSecurityGroup.length === 0, 'CREATE_VPG_RECOVERY.ERROR_AWS_TEST_GROUP', validationElements.SECURITY_TEST);
                            }
                        }
                    }


                    //var scrp = data.defaultVpgSettings.Config.Configuration.ScriptingSettings;
                    if (scriptingSettings) {
                        //PRE_SCRIPT
                        failIf(scriptingSettings.PreRecoveryScript.Command && !scriptingSettings.PreRecoveryScript.TimeoutInSeconds, 'CREATE_VPG_RECOVERY.ERROR_PRE_SCRIPT', validationElements.PRE_SCRIPT_TIMEOUT);
                        failIf(scriptingSettings.PreRecoveryScript.Command && scriptingSettings.PreRecoveryScript.TimeoutInSeconds && (scriptingSettings.PreRecoveryScript.TimeoutInSeconds < minValueInSeconds || scriptingSettings.PreRecoveryScript.TimeoutInSeconds > maxValueInSeconds), 'CREATE_VPG_RECOVERY.ERROR_PRE_SCRIPT', validationElements.PRE_SCRIPT_TIMEOUT);

                        //POST_SCRIPT
                        failIf(scriptingSettings.PostRecoveryScript.Command && !scriptingSettings.PostRecoveryScript.TimeoutInSeconds, 'CREATE_VPG_RECOVERY.ERROR_POST_SCRIPT', validationElements.POST_SCRIPT_TIMEOUT);
                        failIf(scriptingSettings.PostRecoveryScript.Command && scriptingSettings.PostRecoveryScript.TimeoutInSeconds && (scriptingSettings.PostRecoveryScript.TimeoutInSeconds < minValueInSeconds || scriptingSettings.PostRecoveryScript.TimeoutInSeconds > maxValueInSeconds), 'CREATE_VPG_RECOVERY.ERROR_POST_SCRIPT', validationElements.POST_SCRIPT_TIMEOUT);
                    }


                    createVPGWizardModel._setValidationState(step, result);
                    return result;
                }
                else {
                    result = false;
                }
            };

            createVPGWizardModel.validateNICsStep = function (step) {

                var vpgSettings = vpgService.getVpgSettings();
                var entitiesDefined = !!(vpgSettings && vpgSettings.Entities);
                var result = entitiesDefined;
                step.validationError = [];

                var failIf = failHelperFactory.failHelper(
                    step.validationError, function () {
                        result = false;
                    });

                if (entitiesDefined && vpgSettings.Entities.Target !== enums.VpgEntityType.VCDvApp) {
                    failIf(!networksService.validateVCNics(), 'CREATE_VPG_NICS.NICS_TABLE_ERROR');
                }
                if (entitiesDefined && vpgSettings.Entities.Source !== enums.VpgEntityType.VCDvApp && vpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp) {
                    failIf(!networksService.validateVCDNics(), 'CREATE_VPG_NICS.NICS_TABLE_ERROR');
                }

                createVPGWizardModel._setValidationState(step, result);
                return result;
            };

            createVPGWizardModel.validateBackupStep = function (step) {

                var retryTimes = {min: 1, max: 9999};
                var waitingTimesBetweenRetries = {min: 1, max: 9999};

                var data = createVPGModel.data;
                step.validationComponents = [];
                var result = true;
                step.validationError = [];

                var failIf = failHelperFactory.failHelper(
                    step.validationError, function () {
                        result = false;
                    }, step.validationComponents);

                if (data.defaultVpgSettings && data.defaultVpgSettings.TargetSiteInfo) {
                    if (data.defaultVpgSettings.Config.Configuration.IsBackupEnabled) {
                        // check if selected target is in potentials due to bug 26242
                        failIf(!data.defaultVpgSettings.Config.Configuration.Backup.Target.SelectedTarget || !createBackupService.isBackupTargetExistsInPotentials(data.defaultVpgSettings.Config.Configuration.Backup.Target.SelectedTarget) ||
                            data.defaultVpgSettings.Config.Configuration.Backup.Target.SelectedTarget.Identifier === globalConstants.NONE_REPOSITORY, 'CREATE_VPG_BACKUP.ERROR_REP', validationElements.REPOSITORY);

                        if (data.enableBackupScripts) {
                            var scpt = data.defaultVpgSettings.Config.Configuration.Backup.Scripting.PostScript;
                            failIf(scpt.Command && !angular.isNumber(scpt.TimeoutInSeconds), 'CREATE_VPG_BACKUP.ERROR_POST', validationElements.BACKUP_SCRIPT_TIMEOUT);
                            failIf(scpt.Command && (parseInt(scpt.TimeoutInSeconds) < 1 || parseInt(scpt.TimeoutInSeconds) > 6000), 'CREATE_VPG_BACKUP.ERROR_POST', validationElements.BACKUP_SCRIPT_TIMEOUT);
                        }
                        if (data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.ShouldRetryOnFailure) {
                            failIf(!data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.RetryTimes, 'CREATE_VPG_BACKUP.ERROR_RETRY', validationElements.RETRY_TIMES);
                            failIf(data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.RetryTimes < retryTimes.min, 'CREATE_VPG_BACKUP.ERROR_RETRY', validationElements.RETRY_TIMES);
                            failIf(data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.RetryTimes > retryTimes.max, 'CREATE_VPG_BACKUP.ERROR_RETRY', validationElements.RETRY_TIMES);

                            failIf(!data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.RetryIntervalInMinutes, 'CREATE_VPG_BACKUP.ERROR_INTERVAL', validationElements.RETRY_MINUTES);
                            failIf(data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.RetryIntervalInMinutes < waitingTimesBetweenRetries.min, 'CREATE_VPG_BACKUP.ERROR_INTERVAL', validationElements.RETRY_MINUTES);
                            failIf(data.defaultVpgSettings.Config.Configuration.Backup.Scheduler.Retry.RetryIntervalInMinutes > waitingTimesBetweenRetries.max, 'CREATE_VPG_BACKUP.ERROR_INTERVAL', validationElements.RETRY_MINUTES);
                        }
                    } else {
                        result = true;
                    }
                } else {
                    result = false;
                }

                step.validationError = undefined;
                createVPGWizardModel._setValidationState(step, result);
                return result;
            };

            createVPGWizardModel.validateSummaryStep = function (step) {
                var data = createVPGModel.data;
                var result = false;

                if (data.defaultVpgSettings && data.defaultVpgSettings.Config.Configuration.Backup) {
                    result = true;
                }

                createVPGWizardModel._setValidationState(step, result);
                return result;
            };

            createVPGWizardModel.getSteps = function (edit) {
                var steps = angular.copy(createVPGWizardModel.steps(edit));

                if (edit && vpgService.isPublicCloud()) {
                    _.remove(steps, {stepTitle: $translate.instant('CREATE_VPG.STEP_NICS')});
                }

                return steps;
            };

            createVPGWizardModel.steps = function (edit) {
                return [
                    {
                        class: '',
                        id: stepId.INIT,
                        isEnabled: edit,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_GENERAL'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/initial/create-vpg-initial.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateInitialStep,
                        isServerValid: createVPGWizardModel.serverValidation,
                        validationComponents: []
                    },
                    {
                        class: '',
                        id: stepId.VMS,
                        isEnabled: edit,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_VMS'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/vms/create-vpg-select-vms.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateSelectVMsStep,
                        validationComponents: []
                    },
                    {
                        class: '',
                        isEnabled: edit,
                        id: stepId.REPLICATION,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_REPLICATION'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/replication/create-vpg-replication.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateReplicationStep,
                        isServerValid: createVPGWizardModel.serverValidation,
                        validationComponents: []
                    },

                    {
                        class: '',
                        isEnabled: edit,
                        id: stepId.STORAGE,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_STORAGE'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/storage/create-vpg-storage.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateStorageStep,
                        isServerValid: createVPGWizardModel.serverValidation,
                        validationComponents: []

                    },
                    {
                        class: '',
                        isEnabled: edit,
                        id: stepId.RECOVERY,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_RECOVERY'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/recovery/create-vpg-recovery.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateRecoveryStep,
                        isServerValid: createVPGWizardModel.serverValidation,
                        validationComponents: []
                    },
                    {
                        class: '',
                        isEnabled: edit,
                        id: stepId.NICS,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_NICS'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/nics/create-vpg-nics.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateNICsStep,
                        isServerValid: createVPGWizardModel.serverValidation,
                        validationComponents: []
                    },
                    {
                        class: '',
                        index: 7,
                        isEnabled: edit,
                        id: stepId.BACKUP,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_BACKUP'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/backup/create-vpg-backup.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateBackupStep,
                        isServerValid: createVPGWizardModel.serverValidation,
                        validationComponents: []
                    },
                    {
                        class: '',
                        id: stepId.SUMMARY,
                        isEnabled: edit,
                        stateIcon: VPGWizardStepStates.INITIAL,
                        stepTitle: $translate.instant('CREATE_VPG.STEP_SUMMARY'),
                        template: '<ng-include src="\'scripts/core/create_vpg/steps/summary/create-vpg-summary.html\'"></ng-include>',
                        isValid: createVPGWizardModel.validateSummaryStep,
                        validationComponents: []
                    }
                ];
            };

            return createVPGWizardModel;
        }
    );
