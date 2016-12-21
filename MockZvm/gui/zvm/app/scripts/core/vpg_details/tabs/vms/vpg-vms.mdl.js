/**
 * Created by liron on 11/03/2015.
 */
'use strict';
angular.module('zvmApp.core')

    .factory('vpgVmsModel', function ($filter, $translate, zSlickGridFilterTypes) {

        var vpgVmsModel = {};

        vpgVmsModel._processData = function (data, groups) {
            var processed = data;

            processed = _.forEach(processed, function (item) {
                item.id = JSON.stringify(item.InternalVirtualMachineId);
                item.groupObj = {display: vpgVmsModel._setGroupLabel(item, groups)};
                if (item.SourceHost && item.SourceHost.DisplayName) {
                    item.protectedObj = {display: item.SourceHost.DisplayName, value: item.SourceHost};
                } else {
                    item.protectedObj = {display: 'No Settings', value: item.SourceHost};
                }
                if (item.TargetHost && item.TargetHost.DisplayName) {
                    item.recoveryObj = {display: item.TargetHost.DisplayName, value: item.TargetHost};
                } else {
                    item.recoveryObj = {display: 'No Settings', value: item.TargetHost};
                }
                item.strorageProtectedObj = {display: item.SourceDatastore.DisplayName, value: item.SourceDatastore};
                if (item.TargetDatastore && item.TargetDatastore.DisplayName) {
                    item.vmRecoveryStorageObj = {
                        display: item.TargetDatastore.DisplayName,
                        value: item.TargetDatastore
                    };
                } else {
                    item.vmRecoveryStorageObj = {display: 'No Settings', value: item.TargetDatastore};
                }
                item.provisionedObj = {
                    display: $filter('storageMBToStringfilter')(item.StorageUsageInfo.ProvisionedStorageSizeInMB),
                    value: item.StorageUsageInfo.ProvisionedStorageSizeInMB
                };
                item.usedObj = {
                    display: $filter('storageMBToStringfilter')(item.StorageUsageInfo.UsedStorageSizeInMB),
                    value: item.StorageUsageInfo.UsedStorageSizeInMB
                };
                item.recoveryDataSizeObj = {
                    display: $filter('storageMBToStringfilter')(item.StorageUsageInfo.RecoveryStorageSizeInMB),
                    value: item.StorageUsageInfo.RecoveryStorageSizeInMB
                };

                vpgVmsModel._setNetworksLabels(item);

                if (item.TargetFolder && item.TargetFolder.DisplayName) {
                    item.folderObj = {display: item.TargetFolder.DisplayName, value: item.TargetFolder};
                } else {
                    item.folderObj = {display: 'No Settings', value: item.TargetFolder};
                }

                if (item.StorageProfile && item.StorageProfile.VCDStorageProfile && item.StorageProfile.VCDStorageProfile.DisplayName) {
                    item.storageProfileObj = {
                        display: item.StorageProfile.VCDStorageProfile.DisplayName,
                        value: item.StorageProfile
                    };
                } else {
                    item.storageProfileObj = {display: 'No Settings', value: item.StorageProfile};
                }

                if (item.CloudVmSettings) {

                    item.failoverPcnObj = {
                        display: item.CloudVmSettings.FailoverSettings.Pcn.Name,
                        value: item.CloudVmSettings.FailoverSettings.Pcn
                    };
                    item.failoverTestPcnObj = {
                        display: item.CloudVmSettings.FailoverTestSettings.Pcn.Name,
                        value: item.CloudVmSettings.FailoverTestSettings.Pcn
                    };
                    item.failoverSubnetObj = {
                        display: item.CloudVmSettings.FailoverSettings.Subnet.Name,
                        value: item.CloudVmSettings.FailoverSettings.Subnet
                    };
                    item.failoverTestSubnetObj = {
                        display: item.CloudVmSettings.FailoverTestSettings.Subnet.Name,
                        value: item.CloudVmSettings.FailoverTestSettings.Subnet
                    };

                    item.failoverSecurityGroups = {
                        display: prepareSecurityFroupsForDisplay(item.CloudVmSettings.FailoverSettings.SecurityGroups),
                        value: item.CloudVmSettings.FailoverSettings.SecurityGroups
                    };

                    item.failoverTestSecurityGroups = {
                        display: prepareSecurityFroupsForDisplay(item.CloudVmSettings.FailoverTestSettings.SecurityGroups),
                        value: item.CloudVmSettings.FailoverTestSettings.SecurityGroups
                    };
                }
            });

            return processed;
        };

        vpgVmsModel._setGroupLabel = function (vmItem, groups) {
            var name = '';
            _.forEach(groups, function (group) {
                if (group.Machines) {
                    _.forEach(group.Machines, function (vm) {
                        if (vm.Id.InternalVmName === vmItem.InternalVirtualMachineId.InternalVmName) {
                            name = group.Name;
                        }
                    });
                }
            });

            return name;
        };

        vpgVmsModel._setNetworksLabels = function (item) {
            var networks = item.NetworkInterfaces;
            if (networks && networks.length) {
                if ((networks[0].TestSettings && networks[0].TestSettings.VCDNetworkSettings) || (networks[0].FailoverSettings && networks[0].FailoverSettings.VCDNetworkSettings)) {
                    vpgVmsModel._setVCDNetworksLabels(item);
                } else {
                    vpgVmsModel._setVCNetworksLabels(item);
                }
            } else {
                item.failoverNetworkObj = {display: 'No Settings'};
                item.testNetworkObj = {display: 'No Settings'};
            }
        };

        vpgVmsModel._setVCNetworksLabels = function (item) {
            var networks = item.NetworkInterfaces;
            if (!networks || !networks.length) {
                item.failoverNetworkObj = {display: 'No adapters', value: networks};
                item.testNetworkObj = {display: 'No adapters', value: networks};
                return;
            }
            if (!(networks[0].FailoverSettings) || !(networks[0].FailoverSettings.VCenterNetworkSettings) || !(networks[0].FailoverSettings.VCenterNetworkSettings.RecoveryNetwork)) {
                item.failoverNetworkObj = {display: 'No Settings', value: networks[0].FailoverSettings};
            }
            if (!(networks[0].TestSettings) || !(networks[0].TestSettings.VCenterNetworkSettings) || !(networks[0].TestSettings.VCenterNetworkSettings.RecoveryNetwork)) {
                item.testNetworkObj = {display: 'No Settings', value: networks[0].TestSettings};
            }

            if (!angular.isDefined(item.failoverNetworkObj)) {
                item.failoverNetworkObj = {
                    display: networks[0].FailoverSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName,
                    value: networks[0].FailoverSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName
                };

                _.forEach(networks, function (network) {
                    if (network.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork && network.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName !== item.failoverNetworkObj.display) {
                        item.failoverNetworkObj = {
                            display: 'Multiple Values',
                            value: network.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork
                        };
                    }
                });
            }

            if (!angular.isDefined(item.testNetworkObj)) {
                item.testNetworkObj = {
                    display: networks[0].TestSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName,
                    value: networks[0].TestSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName
                };

                _.forEach(networks, function (network) {
                    if (network.TestSettings.VCenterNetworkSettings.RecoveryNetwork && network.TestSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName !== item.testNetworkObj.display) {
                        item.testNetworkObj = {
                            display: 'Multiple Values',
                            value: network.TestSettings.VCenterNetworkSettings.RecoveryNetwork
                        };
                    }
                });
            }
        };

        vpgVmsModel._setVCDNetworksLabels = function (item) {
            var networks = item.NetworkInterfaces;
            if (!networks || !networks.length) {
                item.failoverNetworkObj = {display: 'No adapters', value: networks};
                item.testNetworkObj = {display: 'No adapters', value: networks};
                return;
            }
            if (!(networks[0].FailoverSettings) || !(networks[0].FailoverSettings.VCDNetworkSettings)) {
                item.failoverNetworkObj = {display: 'No Settings', value: networks[0].FailoverSettings};
            }
            if (!(networks[0].TestSettings) || !(networks[0].TestSettings.VCDNetworkSettings)) {
                item.testNetworkObj = {display: 'No Settings', value: networks[0].TestSettings};
            }

            if (!angular.isDefined(item.failoverNetworkObj)) {
                item.failoverNetworkObj = {
                    display: networks[0].FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName,
                    value: networks[0].FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName
                };

                _.forEach(networks, function (network) {
                    if (network.FailoverSettings.VCDNetworkSettings && network.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName !== item.failoverNetworkObj.display) {
                        item.failoverNetworkObj = {
                            display: 'Multiple Values',
                            value: network.FailoverSettings.VCDNetworkSettings
                        };
                    }
                });
            }

            if (!angular.isDefined(item.testNetworkObj)) {
                item.testNetworkObj = {
                    display: networks[0].TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName,
                    value: networks[0].TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName
                };

                _.forEach(networks, function (network) {
                    if (network.TestSettings.VCDNetworkSettings && network.TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName !== item.testNetworkObj.display) {
                        item.testNetworkObj = {
                            display: 'Multiple Values',
                            value: network.TestSettings.VCDNetworkSettings
                        };
                    }
                });
            }
        };

        vpgVmsModel._setVCToVCColumns = function (isHyperv, isVmFolderConfigurable) {
            var recoveryName = isHyperv ? $translate.instant('VPG_DETAILS.VMS.COLUMNS.VM_RECOVERY_STORAGE') : $translate.instant('VPG_DETAILS.VMS.COLUMNS.VM_RECOVERY_DATATSTORE');
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'groupObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.HOST_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'protectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.HOST_RECOVERY'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'recoveryObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.STORAGE_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'strorageProtectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: recoveryName,
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'vmRecoveryStorageObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'provisionedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'usedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_DATA_SIZE'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'recoveryDataSizeObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FAILOVER_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverNetworkObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'testNetworkObj',
                    formatter: $filter('objectFormatter')
                }
            ];

            if (!isHyperv && isVmFolderConfigurable) {
                result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FOLDER'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'folderObj',
                    formatter: $filter('objectFormatter')
                });
            }

            return result;
        };

        vpgVmsModel._setVCToVCDColumns = function (isStorageProfileEnabled) {
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'groupObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.HOST_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'recoveryObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.STORAGE_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'strorageProtectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'provisionedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'usedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_DATA_SIZE'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'recoveryDataSizeObj',
                    formatter: $filter('objectFormatter')
                }
            ];

            if (isStorageProfileEnabled) {
                result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_STORAGE_PROFILE'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'storageProfileObj',
                    formatter: $filter('objectFormatter')
                });
            }

            result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FAILOVER_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverNetworkObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'testNetworkObj',
                    formatter: $filter('objectFormatter')
                });

            return result;
        };

        vpgVmsModel._setVCDToVCColumns = function (isHyperv, isVmFolderConfigurable) {
            var recoveryName = isHyperv ? $translate.instant('VPG_DETAILS.VMS.COLUMNS.VM_RECOVERY_STORAGE') : $translate.instant('VPG_DETAILS.VMS.COLUMNS.VM_RECOVERY_DATATSTORE');
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'groupObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.HOST_RECOVERY'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'recoveryObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.STORAGE_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'strorageProtectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: recoveryName,
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'vmRecoveryStorageObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'provisionedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'usedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_DATA_SIZE'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'recoveryDataSizeObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FAILOVER_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverNetworkObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'testNetworkObj',
                    formatter: $filter('objectFormatter')
                }
            ];

            if (!isHyperv && isVmFolderConfigurable) {
                result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FOLDER'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'folderObj',
                    formatter: $filter('objectFormatter')
                });
            }

            return result;
        };

        vpgVmsModel._setVCDToVCDColumns = function (isStorageProfileEnabled) {
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'groupObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.STORAGE_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'strorageProtectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'provisionedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'usedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_DATA_SIZE'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'recoveryDataSizeObj',
                    formatter: $filter('objectFormatter')
                }
            ];

            if (isStorageProfileEnabled) {
                result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_STORAGE_PROFILE'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'storageProfileObj',
                    formatter: $filter('objectFormatter')
                });
            }

            return result;
        };

        vpgVmsModel._setToAWSColumns = function (isVCDVapp) {
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'groupObj',
                    formatter: $filter('objectFormatter')
                }
            ];

            if (!isVCDVapp) {
                result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.HOST_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'protectedObj',
                    formatter: $filter('objectFormatter')
                });
            }
            result.push(
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.STORAGE_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'strorageProtectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'provisionedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'usedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_DATA_SIZE'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'recoveryDataSizeObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FO_MOVE_PCN'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverPcnObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FO_MOVE_SUBNET'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverSubnetObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FO_MOVE_SECURITY_GROUPS'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverSecurityGroups',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_PCN'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverTestPcnObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_SUBNET'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverTestSubnetObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_SECURITY_GROUPS'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverTestSecurityGroups',
                    formatter: $filter('objectFormatter'),
                    minWidth: 90
                }
            );

            return result;
        };

        vpgVmsModel._setToAzureColumns = function (isVCDVapp) {
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'groupObj',
                    formatter: $filter('objectFormatter')
                }
            ];

            if (!isVCDVapp) {
                result.push({
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.HOST_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'protectedObj',
                    formatter: $filter('objectFormatter')
                });
            }
            result.push(
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.STORAGE_PROTECTED'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'strorageProtectedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.PROVISIONED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'provisionedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.USED'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'usedObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.RECOVERY_DATA_SIZE'),
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    field: 'recoveryDataSizeObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FO_MOVE_VNET'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverPcnObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FO_MOVE_SUBNET'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverSubnetObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.FO_MOVE_SECURITY_GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverSecurityGroups',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_VNET'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverTestPcnObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_SUBNET'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverTestSubnetObj',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.TEST_SECURITY_GROUP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'failoverTestSecurityGroups',
                    formatter: $filter('objectFormatter'),
                    minWidth: 85
                }
            );

            return result;
        };

        vpgVmsModel._setAWSToVCColumns = function () {
            var result = [
                {
                    name: $translate.instant('VPG_DETAILS.VMS.COLUMNS.NAME'),
                    hideFromEditColumns: true,
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'Name'
                }
            ];

            return result;
        };

        function prepareSecurityFroupsForDisplay(securityGroups) {
            if (_.isEmpty(securityGroups)) {
                return 'None';
            }

            return '<div class="description-ellipsis"  content="' + _.map(securityGroups, 'Name').join(', ') +
                '" placement="left" trigger="manual" close="Yes" container="body" show="true" outside-close="true" z-popover>' +
                '<a href="javascript:void(0);">' + securityGroups[0].Name + '</a></div>';
        }

        return vpgVmsModel;
    });
