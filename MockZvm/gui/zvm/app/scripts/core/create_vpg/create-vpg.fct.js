'use strict';

angular.module('zvmApp.core')
    .factory('createVPGFactory', function ($uibModal, createVPGInitCreateService, createVPGInitEditService, createVPGWizardModel,
                                           navigationTabsFactory, $translate, $q, zAlertFactory, $rootScope, analyticsEventsTypes) {
        var createVPGFactory = {};

        createVPGFactory.openCreate = function (optionalId, vpgName) {
            return createVPGInitCreateService.isCreateVPGAllowed().then(function (isAllowed) {
                if (!isAllowed) {
                    zAlertFactory.fail('Create VPG', 'You do not have the correct set of permissions for this task.');
                    return;
                }

                return createVPGInitCreateService.init(optionalId, vpgName).then(function () {
                    return openModal(false,'CREATE_VPG.CREATE_TITLE');
                });
            });
        };

        createVPGFactory.openEdit = function (id, optionalVmIdToAdd) {
            return createVPGInitEditService.init(id, optionalVmIdToAdd).then(function () {
                return openModal(true,'CREATE_VPG.EDIT_TITLE');
            });
        };

        createVPGFactory.openEditReverse = function (id, config) {
            return createVPGInitEditService.initReverse(id, config).then(function () {
                return openModal(true, 'CREATE_VPG.EDIT_REVERSE_TITLE');
            });
        };


        //region ZSSP
        createVPGFactory.openCreateNewVpgPortal = function (config, vpgName, vapp) {
            return createVPGInitCreateService.initZssp(config, vpgName, vapp).then(function () {
                return openModal(false, 'CREATE_VPG.CREATE_TITLE');
            });
        };
        //endregion


        //region vSphere
        createVPGFactory.vSphereCreateNewVPGVappContext = function (vappId) {
            createVPGFactory.openCreate(vappId).then(function () {
                //todo : remove vapp tab ???
            });
        };

        createVPGFactory.vSphereCreateNewVPG = function (vmId) {
            createVPGFactory.openCreate(vmId).then(function () {
                navigationTabsFactory.removeTab(vmId.ServerIdentifier.ServerGuid);
            });
        };

        createVPGFactory.vSphereProtectStandalone = function (vmName, vmId) {
            createVPGFactory.openCreate(vmId, vmName).then(function () {
                navigationTabsFactory.removeTab(vmId.ServerIdentifier.ServerGuid);
            });
        };
        //endregion

        //===========================================================================
        // Helper functions
        //===========================================================================
        createVPGFactory.closeModal = function (value) {
            sendToAnalytics(true);
            createVPGFactory.modalInstance.close(value);
        };
        createVPGFactory.dismissModal = function () {
            sendToAnalytics(false);
            createVPGFactory.modalInstance.dismiss();
        };

        function sendToAnalytics(isSuccess) {
            $rootScope.$emit(analyticsEventsTypes.WIZARD.TIME_SPENT, {
                wizardName: createVPGFactory.wizardTitle,
                secondsInWizards: Math.floor(Math.abs(createVPGFactory.startWizardTime - new Date()) / 1000),
                isSuccess : isSuccess
            });
        }

        return createVPGFactory;

        function openModal(isEdit,title) {
            createVPGFactory.startWizardTime = new Date();
            createVPGFactory.wizardTitle = $translate.instant(title);

            var modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/create_vpg/create-vpg.html',
                windowClass: 'create-vpg-style' + (isEdit ? ' edit-vpg-style' : ''),
                controller: 'createVPGController',
                backdrop: 'static',
                resolve: {
                    steps: function () {
                        return createVPGWizardModel.getSteps(isEdit);
                    },
                    title: function () {
                        return $translate.instant(title);
                    }
                }
            });

            createVPGFactory.modalInstance = modalInstance;
            return modalInstance.result;

        }
    });
