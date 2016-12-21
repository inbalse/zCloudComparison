'use strict';

angular.module('zvmApp.core')
    .controller('publicCloudNetworkEditController', function ($scope, $translate, oneVm, isBulk,
                                                              createVpgRecoveryAwsService, publicCloudSettingsService,
                                                              publicCloudNetworkEditFactory,
                                                              publicCloudNetworkEditService,
                                                              publicCloudHelper, vpgService) {

        $scope.loading = true;
        $scope.data = {
            isAws: vpgService.isAws(),
            isAzure: vpgService.isAzure()
        };
        $scope.forms = {};
        $scope.partials = {
            aws: 'scripts/core/public_cloud_vm_settings/editor/partials/editor-aws.html',
            azure: 'scripts/core/public_cloud_vm_settings/editor/partials/editor-azure.html'
        };
        $scope.vmObject = {};
        $scope.FailoverPrivateIpDisabled = false;
        $scope.FailoverTestPrivateIpDisabled = false;

        var NO_PREFERENCE = 'No preference';
        var targetSiteInfo = publicCloudNetworkEditService.getTargetSiteInfo();

        $scope.pcnList = targetSiteInfo.PotentialPublicCloudPcns.PotentialPcns;

        $scope.groupsExtraSettings = {displayProp: 'Name', idProp: 'Id', externalIdProp: 'Id', enableSearch: true};

        $scope.initButtons = function () {
            $scope.buttons = [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.close,
                    disabled: false
                },
                {label: $translate.instant('MODAL.OK'), handler: $scope.save, disabled: false}
            ];
        };

        $scope.initData = function () {
            $scope.vmObject = oneVm;
            var defaultGroupNone = {
                Id: {
                    Identifier: 'None'
                },
                Name: 'None'
            };

            if ($scope.vmObject.CloudVmSettings.FailoverSettings.Pcn) {
                $scope.vmObject.CloudVmSettings.FailoverSettings.Pcn = createVpgRecoveryAwsService.findPcnInPotentials($scope.vmObject.CloudVmSettings.FailoverSettings.Pcn);
            }
            else {
                $scope.subnetsFailoverList = [];
                $scope.securityGroupsFailover = [];
            }

            if ($scope.vmObject.CloudVmSettings.FailoverTestSettings.Pcn) {
                $scope.vmObject.CloudVmSettings.FailoverTestSettings.Pcn = createVpgRecoveryAwsService.findPcnInPotentials($scope.vmObject.CloudVmSettings.FailoverTestSettings.Pcn);
            } else {
                $scope.subnetsFailoverTestList = [];
                $scope.securityGroupsFailoverTest = [];
            }

            $scope.data.failoverSecurityGroup = $scope.vmObject.CloudVmSettings.FailoverSettings.SecurityGroups[0];
            $scope.data.failoverTestSecurityGroup = $scope.vmObject.CloudVmSettings.FailoverTestSettings.SecurityGroups[0];


            if (_.isNullOrUndefined($scope.data.failoverSecurityGroup)) {
                $scope.data.failoverSecurityGroup = defaultGroupNone;
            }

            if (_.isNullOrUndefined($scope.data.failoverTestSecurityGroup)) {
                $scope.data.failoverTestSecurityGroup = defaultGroupNone;
            }

            $scope.isBulk = isBulk;
        };

        $scope.close = function () {
            publicCloudNetworkEditFactory.close();
        };

        $scope.save = function () {
            publicCloudNetworkEditFactory.save($scope.vmObject);
        };

        $scope.setSecuritySelected = function (collection, defaultSecurity) {
            _.forEach(collection, function (item) {
                if (item.Id.Identifier === defaultSecurity.Identifier) {
                    item.ticked = true;
                }
            });
        };

        $scope.setSecuritySelectedFromVm = function (collection, vmGroups) {
            _.forEach(vmGroups, function (group) {
                _.forEach(collection, function (item) {
                    if (item.Id.Identifier === group.Id.Identifier) {
                        item.ticked = true;
                    }
                });
            });
        };

        $scope.initInstanceLists = function () {
            $scope.familyTypes = publicCloudHelper.createFamilyInstanceList(targetSiteInfo.PotentialPublicCloudInstanceTypeVisualObjects);
            $scope.vmObject.selectedFolInstanceFamily = publicCloudHelper.selectFamilyFromInstance($scope.vmObject.CloudVmSettings.FailoverSettings.PublicCloudInstanceTypeVisualObject, $scope.familyTypes);
            $scope.vmObject.selectedTestInstanceFamily = publicCloudHelper.selectFamilyFromInstance($scope.vmObject.CloudVmSettings.FailoverTestSettings.PublicCloudInstanceTypeVisualObject, $scope.familyTypes);

            $scope.instanceFolList = $scope.vmObject.selectedFolInstanceFamily ? $scope.vmObject.selectedFolInstanceFamily.instances : [];
            $scope.instanceTestList = $scope.vmObject.selectedTestInstanceFamily ? $scope.vmObject.selectedTestInstanceFamily.instances : [];
        };

        $scope.familyInstanceFolChange = function (family) {
            $scope.instanceFolList = family.instances;
            $scope.vmObject.CloudVmSettings.FailoverSettings.PublicCloudInstanceTypeVisualObject = null;
        };

        $scope.familyInstanceTestChange = function (family) {
            $scope.instanceTestList = family.instances;
            $scope.vmObject.CloudVmSettings.FailoverTestSettings.PublicCloudInstanceTypeVisualObject = null;
        };

        var checkSecurityGroups = function (cloudSettings) {
            if ($scope.data.isAws && cloudSettings.Pcn && cloudSettings.SecurityGroups.length === 0) {
                $scope.buttons[1].disabled = true;
            } else {
                $scope.buttons[1].disabled = $scope.forms.vmsForm && !$scope.forms.vmsForm.$valid;
            }
        };

        $scope.failoverTestSecurityGroupChanged = function () {
            if ($scope.data.failoverTestSecurityGroup.Id.Identifier === 'None') {
                $scope.vmObject.CloudVmSettings.FailoverTestSettings.SecurityGroups = [];
            } else {
                $scope.vmObject.CloudVmSettings.FailoverTestSettings.SecurityGroups = [$scope.data.failoverTestSecurityGroup];
            }
        };

        $scope.failoverSecurityGroupChanged = function () {
            if ($scope.data.failoverSecurityGroup.Id.Identifier === 'None') {
                $scope.vmObject.CloudVmSettings.FailoverSettings.SecurityGroups = [];
            } else {
                $scope.vmObject.CloudVmSettings.FailoverSettings.SecurityGroups = [$scope.data.failoverSecurityGroup];
            }
        };

        //region watchers
        //failover subnet
        $scope.$watch('vmObject.CloudVmSettings.FailoverSettings.Subnet', function (value) {
            if (angular.isDefined(value) && !_.isNullOrUndefined($scope.vmObject.CloudVmSettings.FailoverSettings.Subnet)) {
                $scope.FailoverPrivateIpDisabled = $scope.vmObject.CloudVmSettings.FailoverSettings.Subnet.Name === NO_PREFERENCE;
            }
        });

        //failovertest subnet
        $scope.$watch('vmObject.CloudVmSettings.FailoverTestSettings.Subnet', function (value) {
            if (angular.isDefined(value) && !_.isNullOrUndefined($scope.vmObject.CloudVmSettings.FailoverTestSettings.Subnet)) {
                $scope.FailoverTestPrivateIpDisabled = $scope.vmObject.CloudVmSettings.FailoverTestSettings.Subnet.Name === NO_PREFERENCE;
            }
        });

        $scope.$watch('forms.vmsForm.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.buttons[1].disabled = !value;
            }
        });

        //failover group
        $scope.$watch('vmObject.CloudVmSettings.FailoverSettings.SecurityGroups.length', function () {
            checkSecurityGroups($scope.vmObject.CloudVmSettings.FailoverSettings);
        });

        //failover test group
        $scope.$watch('vmObject.CloudVmSettings.FailoverTestSettings.SecurityGroups.length', function () {
            checkSecurityGroups($scope.vmObject.CloudVmSettings.FailoverTestSettings);
        });

        $scope.$watch('vmObject.CloudVmSettings.FailoverSettings.Pcn', function (newPcn, oldPcn) {
            if (angular.isDefined(newPcn)) {
                var pcnData = publicCloudNetworkEditService.pcnChanged(newPcn, oldPcn, $scope.vmObject.CloudVmSettings.FailoverSettings);
                $scope.subnetsFailoverList = pcnData.subnetsList;
                $scope.securityGroupsFailover = pcnData.securityGroupsList;
            }
        });

        //Pcn failover test
        $scope.$watch('vmObject.CloudVmSettings.FailoverTestSettings.Pcn', function (newPcn, oldPcn) {
            if (angular.isDefined(newPcn)) {
                var pcnData = publicCloudNetworkEditService.pcnChanged(newPcn, oldPcn, $scope.vmObject.CloudVmSettings.FailoverTestSettings);
                $scope.subnetsFailoverTestList = pcnData.subnetsList;
                $scope.securityGroupsFailoverTest = pcnData.securityGroupsList;
            }
        });
        //endregion

        $scope.initButtons();
        $scope.initData();
        $scope.initInstanceLists();
        $scope.loading = false;

    });
