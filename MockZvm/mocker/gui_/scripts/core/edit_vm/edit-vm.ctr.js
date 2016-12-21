'use strict';

angular.module('zvmApp.core')
    .controller('editVmController', function ($scope, editVmFactory, $translate, vm, objectTransformHelpersService,
                                              zertoServiceFactory, createVPGHelperFactory, zAlertFactory, selectedVms, vpgService, vmsService, storageService) {

        $scope.representativeVm = vm;
        $scope.data = {
            isScvmm: vpgService.isScvmm(),
            isSlaCustom: storageService.getIsSlaCustom(),
            isReverse: vpgService.isReverse(),
            copiedSelectedVms: _.cloneDeep(vmsService.getInitializedSelectedVms()),
            potentialTargetHosts: vpgService.getPotentialTargetHosts(),
            selectedVmsTitle: selectedVms.length > 1 ? $translate.instant('EDIT_VM.TITLE_VMS', {vmsCount: selectedVms.length}) : $translate.instant('EDIT_VM.TITLE_VM')
        };

        $scope.handleTargetHostChanged = function () {
            var vpgId = vpgService.getProtectionGroupId();
            var baseComp = $scope.representativeVm.TargetHost.BaseComputeResourceIdentifier;
            var owner = vpgService.getTargetSite().OwnersId.Id;

            //we have this hack because the getPotentialJournalDatastores needs target host per vm(consult with ori)
            _.forEach($scope.data.copiedSelectedVms, function (value) {
                value.TargetHost = $scope.representativeVm.TargetHost;
            });

            _.each(selectedVms, function (vm) {
                vm.TargetHost = $scope.representativeVm.TargetHost;
            });

            if ($scope.data.isReverse) {
                zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(vpgId, baseComp).then(function (result) {
                    $scope.potentialResrouce = result;
                    $scope.initJournalDatastore();
                    $scope.initTargetDatastore();
                });
            } else {
                zertoServiceFactory.GetRecoveryComputeResource(vpgId, owner, baseComp).then(function (result) {
                    $scope.potentialResrouce = result;
                    $scope.initJournalDatastore();
                    $scope.initTargetDatastore();
                });
            }
        };

        $scope.initTargetDatastore = function () {
            //target datastore
            if ($scope.representativeVm.TargetDatastore && !_.isNullOrUndefined($scope.potentialResrouce)) {

                var recoveryDatastore = _.find($scope.potentialResrouce.Datastores, function (datastore) {
                    return _.isEqual($scope.representativeVm.TargetDatastore.Id, datastore.Datastore.Id);
                });
                $scope.representativeVm.TargetDatastore = _.isNullOrUndefined(recoveryDatastore) ? null : recoveryDatastore.Datastore;
            }
        };

        $scope.initJournalDatastore = function () {
            var defaultConfig = _.cloneDeep(vpgService.getVpgConfig());
            var protectionGroupId = vpgService.getProtectionGroupId();

            defaultConfig.VirtualMachines = selectedVms;

            editVmFactory.getPotentialJournalDatastores(protectionGroupId, defaultConfig).then(function (result) {
                $scope.data.potentialJournalDatastores = result;

                //target journal datastore
                if (!_.isNullOrUndefined($scope.data.potentialJournalDatastores) && !_.isNullOrUndefined($scope.representativeVm.JournalDatastores)) {
                    var ds = _.find($scope.data.potentialJournalDatastores, function (datastore) {
                        return !_.isEmpty($scope.representativeVm.JournalDatastores) && _.isEqual($scope.representativeVm.JournalDatastores[0].Id, datastore.Datastore.Id);
                    });

                    if (_.isNullOrUndefined(ds)) {
                        $scope.representativeVm.JournalDatastores.length = 0;
                    } else {
                        $scope.representativeVm.JournalDatastores[0] = ds.Datastore;
                    }

                }
            });
        };
        //$scope.initJournalDatastore();

        objectTransformHelpersService.JournalLimitTypeMBtoGB($scope.representativeVm.JournalHardLimit);
        objectTransformHelpersService.JournalLimitTypeMBtoGB($scope.representativeVm.JournalWarningThreshold);

        $scope.initButtons = function () {
            $scope.saveButton = {
                label: $translate.instant('MODAL.OK'),
                handler: $scope.handleSaveClick,
                disabled: false
            };
            $scope.buttons = [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.handleCancelClick,
                    disabled: false
                },
                $scope.saveButton
            ];
            $scope.recoveryTextLabel = $scope.data.isScvmm ? $translate.instant('EDIT_VM.RECOVERY_STORAGE') : $translate.instant('EDIT_VM.RECOVERY_DATASTORE');
            $scope.journalTextLabel = $scope.data.isScvmm ? $translate.instant('EDIT_VM.JOURNAL_STORAGE') : $translate.instant('EDIT_VM.JOURNAL_DATASTORE');
        };

        $scope.handleSaveClick = function () {
            var totalVolumeGB = createVPGHelperFactory.calculateTotalVolumesInGB([vm]);
            if (createVPGHelperFactory.validateLimits($scope.representativeVm.JournalHardLimit, $scope.representativeVm.JournalWarningThreshold, totalVolumeGB)) {
                objectTransformHelpersService.JournalLimitTypeGBtoMB($scope.representativeVm.JournalHardLimit);
                objectTransformHelpersService.JournalLimitTypeGBtoMB($scope.representativeVm.JournalWarningThreshold);
                editVmFactory.save($scope.representativeVm);
            } else {
                zAlertFactory.fail('Error', $translate.instant('ADVANCED_JOURNAL_SETTINGS.LIMIT_ERROR'));
            }
        };

        $scope.handleCancelClick = function () {
            $scope.close();
        };

        $scope.close = function () {
            editVmFactory.closeWindow('close');
        };

        //Bug 23949 - GUI: user cannot save changes in Advanced VM settings (create VPG wizard), Save button doesn't work
        //has to be down here, there is no hoisting on scope
        $scope.initButtons();

        function initEditVmModal() {
            var targetHost = createVPGHelperFactory.findTargetHost($scope.representativeVm.TargetHost, vpgService.getVpgSettings());
            if (targetHost) {
                $scope.representativeVm.TargetHost = targetHost.ComputeResource;
                $scope.handleTargetHostChanged();
            }
        }

        initEditVmModal();
    });
