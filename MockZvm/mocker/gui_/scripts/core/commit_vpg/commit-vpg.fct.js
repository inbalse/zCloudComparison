'use strict';

angular.module('zvmApp.core')
    .factory('commitVpgFactory', function ($uibModal, zertoServiceFactory) {
        var commitVpgFactory = {},
            vpgInfoState = {};

        commitVpgFactory.getVpgInfoState = function () {
            return vpgInfoState;
        };

        commitVpgFactory.setVpgInfoState = function (vpgInfo) {
            vpgInfoState = vpgInfo;
        };

        commitVpgFactory.resetVpgInfoState = function () {
            vpgInfoState = null;
        };

        commitVpgFactory.modalInstance = null;

        commitVpgFactory.vpgId = null;

        commitVpgFactory.open = function (vpgId) {

            commitVpgFactory.vpgId = vpgId;
            // BE should fix bug 19365
            zertoServiceFactory.GetMinimalVpgList().then(function (result) {

                commitVpgFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/commit_vpg/commit-vpg.html',
                    windowClass: 'commit-vpg',
                    controller: 'commitVpgController',
                    backdrop: 'static',
                    resolve: {
                        vpgId: function () {
                            return commitVpgFactory.vpgId;
                        },
                        isReversePossible: function () {
                            return commitVpgFactory.isReversePossible(result.ProtectionGroups, vpgId.GroupGuid);
                        },
                        vpgActionStatus: function () {
                            return getVpgActionStatus(result.ProtectionGroups, vpgId.GroupGuid);
                        }
                    }
                });
            });

        };

        var findCurrentVpg = function (collection, groupId) {
            return _.find(collection, function (item) {
                return item.Identifier.GroupGuid === groupId;
            });
        };

        var getVpgActionStatus = function (collection, groupId) {
            var vpg = findCurrentVpg(collection, groupId);
            try {
                return vpg.State.Status;
            }
            catch (e) {
                return null;
            }
        };

        commitVpgFactory.isReversePossible = function (collection, groupId) {
            var vpg = findCurrentVpg(collection, groupId);
            try {
                return vpg.State.IsProtectedSiteConnected;
            }
            catch (e) {
                return false;
            }
        };

        commitVpgFactory._close = function () {
            commitVpgFactory.modalInstance.dismiss('close');
            commitVpgFactory.vpgId = null;
        };

        return commitVpgFactory;
    });
