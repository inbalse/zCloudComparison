'use strict';

angular.module('zvmApp.core')

    .controller('vraDetailsController', function ($scope, $state, $stateParams, $translate, enums, vraEditFactory,
                                                  vraDetailsFactory, checkActiveState, zAlertFactory, changeVmRecoveryVraFactory,
                                                  navigationTabsFactory, vraListModel, zertoServiceFactory, vraChangePasswordFactory,
                                                  vraUpgradeFactory, vos, globalStateModel, guiVisibleException) {

        $scope.enums = enums;
        $scope.tabs = [
            //status tab does not needs translation..
            {route: 'main.vra_details.status', active: false, title: 'status'},
            {route: 'main.vra_details.vpgs', active: false, title: $translate.instant('VRA_DETAILS.TABS.VPGS')},
            {route: 'main.vra_details.vms', active: false, title: $translate.instant('VRA_DETAILS.TABS.VMS')},
            {
                route: 'main.vra_details.parameters',
                active: false,
                title: $translate.instant('VRA_DETAILS.TABS.PARAMETERS')
            }
        ];

        $scope.edit = function () {
            //get the list of vras - and choose from it the vra
            zertoServiceFactory.GetVraListScreen().then(function (result) {
                var vraList = vraListModel._processData(result).VraListTree;
                var vra = _.find(vraList, {VRAName: $scope.vraData.Config.Info.VraVM.DisplayName});
                if (vra) {
                    vraEditFactory.showVraEdit(vra);
                }
            });
        };

        $scope.changeHostPassword = function (e) {
            if (angular.isDefined($scope.vraData)) {
                var temp = [];
                if ($scope.vraData.State.IsEditEnabled && $scope.vraData.Summary.HostVersion.HostCredentialRequired) {
                    var hostIdent = new vos.HostIdentifier();
                    hostIdent.ServerIdentifier = $scope.vraData.Summary.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier;
                    hostIdent.InternalHostName = $scope.vraData.Summary.HostInfo.BaseComputeResourceIdentifier.InternalName;
                    temp.push(hostIdent);
                }
                if (temp.length !== 0) {
                    vraChangePasswordFactory.showVraChangePasswordWindow(temp);
                }
            }

            e.preventDefault();
        };

        $scope.changeVmRecoveryVRA = function () {
            changeVmRecoveryVraFactory.open($scope.vraData.Summary.HostInfo.BaseComputeResourceIdentifier);
        };

        $scope.upgrade = function () {
            zertoServiceFactory.GetVraListScreen().then(function (result) {
                var vraList = vraListModel._processData(result).VraListTree;
                var vra = _.find(vraList, {VRAName: $scope.vraData.Config.Info.VraVM.DisplayName});
                if (vra) {
                    vraUpgradeFactory.showVraUpgrade([vra], result.LatestVraVersion);
                }
            });

        };


        $scope.uninstall = function () {
            if ($scope.vraData.Summary.RecoveryCounters && $scope.vraData.Summary.RecoveryCounters.Vpgs &&
                $scope.vraData.Summary.RecoveryCounters.Vpgs.length > 0) {
                zAlertFactory.fail($translate.instant('VRA_LIST.UNINSTALL_HEADLINE'), $translate.instant('VRA_LIST.UNINSTALL_RECOVERY'));
            } else {
                zAlertFactory.warn($translate.instant('VRA_LIST.UNINSTALL_HEADLINE'), $scope.getUninstallAlertText(), $scope._handleUninstallClick);
            }
        };

        $scope.repair = function (e) {
            e.preventDefault();
            zAlertFactory.warn('not implemented yet');
        };
        $scope.install = function (e) {
            e.preventDefault();
            zAlertFactory.warn('not implemented yet');
        };
        $scope.set = function (e) {
            e.preventDefault();
            zAlertFactory.warn('not implemented yet');
        };
        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });

        $scope._handleUninstallClick = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                var sendVRAs = [];
                sendVRAs.push($scope._getVRAHostIdentifier($scope.vraData.Summary.HostInfo.BaseComputeResourceIdentifier));

                zertoServiceFactory.UninstallVras(sendVRAs).then(function () {
                }, function (result) {
                    zAlertFactory.fail($translate.instant('VRA_LIST.UNINSTALL_HEADLINE'), result.faultString);
                });
            }
        };

        $scope._getVRAHostIdentifier = function (item) {
            var result = new vos.HostIdentifier();

            result.ServerIdentifier = item.ServerIdentifier;
            result.InternalHostName = item.InternalName;

            return result;
        };

        $scope.getUninstallAlertText = function () {
            var result = $translate.instant('VRA_LIST.UNINSTALL_NORMALLY');
            var containGhost = false;
            var containCluster = false;


            if ($scope.vraData.State.GhostStatus && $scope.vraData.State.GhostStatus.IsGhost) {
                containGhost = true;
            }
            if ($scope.vraData.Summary.OwningClusterName !== '') {
                containCluster = true;
            }

            var points = '';
            var sign = containGhost && containCluster ? '- ' : '';
            if (containGhost) {
                points = sign + $translate.instant('VRA_LIST.UNINSTALL_GHOSTS');
            }
            if (containCluster) {
                if (points) {
                    points = points + '<br/>';
                }

                if (globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV) {
                    points = points + sign + $translate.instant('VRA_LIST.UNINSTALL_CLUSTER_HYPERV');
                } else {
                    points = points + sign + $translate.instant('VRA_LIST.UNINSTALL_CLUSTER');
                }
            }

            if (points) {
                if (containGhost && containCluster) {
                    result = result + '<br/>' + $translate.instant('VRA_LIST.NOTE') + points;
                } else {
                    result = result + '<br/><br/>' + points;
                }
            }

            result = result + '<br/><br/>' + $translate.instant('VRA_LIST.UNINSTALL_QUESTION');
            return result;
        };


        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (_.contains(fromState.name, 'main.vra_details') && !_.contains(toState.name, 'main.vra_details') ||
                (_.contains(fromState.name, 'main.vra_details') && _.contains(toState.name, 'main.vra_details') && (fromParams.id !== toParams.id || fromParams.name !== toParams.name))) {
                vraDetailsFactory.unregisterDetails();
                vraDetailsFactory.unregisterEvents();
            }
        });

        $scope.setEvents = function (result) {
            $scope.vraActivities = result;
        };

        function _setLabelVersion(installedVraVersion) {
            var label = parseFloat(globalStateModel.siteVersion) <= parseFloat(installedVraVersion) ?
                $translate.instant('VRA_DETAILS.PARAMETERS.GENERAL.LATEST') :
                $translate.instant('VRA_DETAILS.PARAMETERS.GENERAL.OUTDATED');

            $scope.vraVersionInfo = label + ' (' + installedVraVersion + ')';
        }

        function _setVpgsArrowsDirection(vpgs){
            var countDirection = _.groupBy(vpgs, 'Direction');
            $scope.vpgsOutgoingDirection = angular.isDefined(countDirection[enums.ProtectionGroupStateVisual.Protected]) ? countDirection[enums.ProtectionGroupStateVisual.Protected].length : 0;
            $scope.vpgsIncomingDirection =  angular.isDefined(countDirection[enums.ProtectionGroupStateVisual.Recovery]) ? countDirection[enums.ProtectionGroupStateVisual.Recovery].length : 0;
            $scope.vpgsSelfDirection = angular.isDefined(countDirection[enums.ProtectionGroupStateVisual.SelfProtected]) ? countDirection[enums.ProtectionGroupStateVisual.SelfProtected].length : 0;
        }

        function _setVmsArrowsDirection(vms){
            var countDirection = _.groupBy(vms, 'Direction');
            $scope.vmsOutgoingDirection = angular.isDefined(countDirection[enums.ProtectionGroupStateVisual.Protected]) ? countDirection[enums.ProtectionGroupStateVisual.Protected].length : 0;
            $scope.vmsIncomingDirection =  angular.isDefined(countDirection[enums.ProtectionGroupStateVisual.Recovery]) ? countDirection[enums.ProtectionGroupStateVisual.Recovery].length : 0;
            $scope.vmsSelfDirection = angular.isDefined(countDirection[enums.ProtectionGroupStateVisual.SelfProtected]) ? countDirection[enums.ProtectionGroupStateVisual.SelfProtected].length : 0;
        }

        $scope.onSuccess = function (result) {
            $scope.vraData = result;
            $scope.upgradeTooltip = result.State.IsUpgradeEnabled ? $translate.instant('VRA_MORE_ACTION.ACTIONS.UPGRADE') : result.State.UpgradeDetails;


            $scope.showProgress = $scope.vraData.State.Status === enums.VraStatusVisual.Installing || $scope.vraData.State.Status === enums.VraStatusVisual.Removing || $scope.vraData.State.Status === enums.VraStatusVisual.DuringChangeHost || $scope.vraData.State.Status === enums.VraStatusVisual.UpdatingIpSettings;
            $scope.progress = $scope.vraData.State.InstallOrUninstallProgress;

            navigationTabsFactory.addTab({
                id: $stateParams.id,
                name: $stateParams.name,
                route: 'main.vra_details({id: "' + $stateParams.id + '", name: "' + $stateParams.name + '"})',
                active: false,
                title: 'VRA: ' + $scope.vraData.Config.Info.VraVM.DisplayName
            });

            navigationTabsFactory.selectTab($state.params.id, $state.params.name);

            checkActiveState.byPartialName($scope.tabs);
            $scope.isUninstallEnabled = $scope.vraData.State.IsUninstallEnabled;

            if ($scope.vraData.State.Status === enums.VraStatusVisual.NotInstalled) {
                navigationTabsFactory.removeTab($stateParams.id, $stateParams.name);
                $state.go('main.setup.vras');
            }

            _setLabelVersion($scope.vraData.Config.Info.InstalledVraVersion);
            _setVpgsArrowsDirection($scope.vraData.Usage.VPGs);
            _setVmsArrowsDirection($scope.vraData.Usage.VMs);
        };

        $scope.onFail = function (reason) {
            //defaults
            var title = $translate.instant('VRA_DETAILS.VRA_ERROR.TITLE_ERROR');
            var descriptions = 'Unknown error occurred.';

            //todo: refactoring needed here for better error handling
            if (reason && reason.faultCode === 'Server.Processing' && reason.faultString === guiVisibleException.HOST_DOESNT_EXIST) {
                descriptions = $translate.instant('VRA_DETAILS.VRA_ERROR.HOST_DOESNT_EXIST');

            } else if (reason && reason.faultCode === 'Server.Processing' && reason.faultString === guiVisibleException.VRA_NOT_INSTALLED) {
                descriptions = $translate.instant('VRA_DETAILS.VRA_ERROR.VRA_NOT_INSTALLED');
            }

            zAlertFactory.fail(title, descriptions, function () {
                navigationTabsFactory.removeTab($stateParams.id, $stateParams.name);
                $state.go('main.setup.vras');
            });
        };

        vraDetailsFactory.initDetailsFactory($stateParams.name, $stateParams.id);

        vraDetailsFactory.registerToDetails($scope).then(null, $scope.onFail, $scope.onSuccess);

        vraDetailsFactory.registerToEvents($scope, $stateParams.id, $stateParams.name).then(null, null, $scope.setEvents);
    });
