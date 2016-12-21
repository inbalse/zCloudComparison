'use strict';

angular.module('zvmApp.core')
    .factory('deleteVpgFactory', function (zAlertFactory, zertoServiceFactory, $translate, globalStateModel) {
        var deleteVpgFactory = {};

        deleteVpgFactory.vpgId = null;
        deleteVpgFactory.hideKeepDisks = false;

        deleteVpgFactory.deleteVpgById = function (vpgId, vpgName, requiresForceToDelete, hideKeepDisks) {
            if (!vpgId) {
                throw 'VPG Identifier and VPG State are a must';
            }

            //save the VPG id until the user chooses course of action
            deleteVpgFactory.vpgId = vpgId;
            deleteVpgFactory.vpgName = vpgName;
            deleteVpgFactory.hideKeepDisks = hideKeepDisks;
            //there is a different flow when deleting VPG in Portal (not implementing this atm)
            if (globalStateModel.data.IsPortal) {
                zAlertFactory.warn($translate.instant('DELETE_VPG.PENDING_REMOVE_TITLE'),
                    $translate.instant('DELETE_VPG.PORTAL_DELETE_WARNING', {vpgNAme: deleteVpgFactory.vpgName}), deleteVpgFactory._handlePortalRemoveClick,
                    [zAlertFactory.buttons.OK, zAlertFactory.buttons.CANCEL]);
                return;
            }

            if (requiresForceToDelete) {
                zAlertFactory.warn($translate.instant('DELETE_VPG.PENDING_REMOVE_TITLE'),
                    $translate.instant('DELETE_VPG.PENDING_REMOVE_STATE', {vpgNAme: deleteVpgFactory.vpgName}), deleteVpgFactory._handleForceRemoveClick,
                    [zAlertFactory.buttons.CANCEL, $translate.instant('DELETE_VPG.RETRY_DELETE_BUTTON'), $translate.instant('DELETE_VPG.FORCE_DELETE_BUTTON')]);
            } else {
                deleteVpgFactory._createDeleteDialog();
            }
        };

        deleteVpgFactory._handlePortalRemoveClick = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.RemoveProtectionGroup(deleteVpgFactory.vpgId).then(null, deleteVpgFactory._errorHandler);
                deleteVpgFactory.vpgId = null;
            }
        };

        deleteVpgFactory._handleForceRemoveClick = function (event) {
            if (event.target.name === $translate.instant('DELETE_VPG.RETRY_DELETE_BUTTON')) {
                //regular remove
                deleteVpgFactory._createDeleteDialog();
            } else if (event.target.name === $translate.instant('DELETE_VPG.FORCE_DELETE_BUTTON')) {
                //force remove
                zertoServiceFactory.ForceRemoveProtectionGroup(deleteVpgFactory.vpgId).then(null, deleteVpgFactory._errorHandler);
                deleteVpgFactory.vpgId = null;
                deleteVpgFactory.hideKeepDisks = false;
            }
        };

        deleteVpgFactory._createDeleteDialog = function () {
            if (deleteVpgFactory.hideKeepDisks) {
                zAlertFactory.warn($translate.instant('DELETE_VPG.TITLE'), $translate.instant('DELETE_VPG.INFO_MESSAGE_PLAIN', {vpgNAme: deleteVpgFactory.vpgName}),
                    deleteVpgFactory._handleDeletePopupClose, [zAlertFactory.buttons.CANCEL,
                        zAlertFactory.buttons.DELETE], true);
            } else {
                zAlertFactory.warnCheck($translate.instant('DELETE_VPG.TITLE'), $translate.instant('DELETE_VPG.INFO_MESSAGE', {vpgNAme: deleteVpgFactory.vpgName}),
                    deleteVpgFactory._handleDeletePopupClose, $translate.instant('DELETE_VPG.KEEP_DISKS_CHECKBOX'), [zAlertFactory.buttons.CANCEL,
                        zAlertFactory.buttons.DELETE], true);
            }
        };

        deleteVpgFactory._handleDeletePopupClose = function (event) {
            if (event.target.name === zAlertFactory.buttons.DELETE) {
                if (event.selected) {
                    zertoServiceFactory.RemoveProtectionGroupKeepTargetDisks(deleteVpgFactory.vpgId).then(null, deleteVpgFactory._errorHandler);
                } else {
                    zertoServiceFactory.RemoveProtectionGroup(deleteVpgFactory.vpgId).then(null, deleteVpgFactory._errorHandler);
                }
            }
            deleteVpgFactory.vpgId = null;
            deleteVpgFactory.hideKeepDisks = false;
        };

        deleteVpgFactory._errorHandler = function (error) {
            if (error && error.faultString) {
                zAlertFactory.fail(null, error.faultString);
            } else {
                zAlertFactory.fail(null, $translate.instant('EXCEPTIONS.UNKNOWN'));
            }
        };

        return deleteVpgFactory;
    });
