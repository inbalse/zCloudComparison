'use strict';

angular.module('zvmApp.core')
    .constant('publicCloudVmSettingsCons', {
        FAILOVER_PCN: 'FailoverPcn',
        FAILOVER_SUBNET: 'FailoverSubnet',
        FAILOVER_SETTINGS: 'FailoverSettings',
        FAILOVER_TEST_PCN: 'FailoverTestPcn',
        FAILOVER_TEST_SUBNET: 'FailoverTestSubnet',
        FAILOVER_TEST_SETTINGS: 'FailoverTestSettings',
        FAILOVER_SECURITY_GROUPS: 'FailoverSecurityGroups',
        FAILOVER_TEST_SECURITY_GROUPS: 'FailoverTestSecurityGroups',
        FAILOVER_PRIVATE_IP: 'FailoverPrivateIp',
        FAILOVER_TEST_PRIVATE_IP: 'FailoverTestPrivateIp',
        FAILOVER_TEST_TOOLTIP_INFO: 'Failover Test VNet is empty',
        FAILOVER_TOOLTIP_INFO: 'Failover/Move VNet is empty'


    })
    .service('publicCloudVmSettingsService', function (zSlickGridFilterTypes, publicCloudVmSettingsModel, $filter, $translate,zNotificationService, zNotificationConstant,
                                                       enums, vpgService, createVpgRecoveryAwsService, publicCloudVmSettingsCons) {

        var publicCloudVmSettingsService = this;

        var notifier = zNotificationService.getNotifier(zNotificationConstant.PUBLIC_CLOUD_AZURE_AWS_NOTIFICATION);

        publicCloudVmSettingsService.isButtonSaveDisabled = false;
        var potentialPublicCloudPcns = vpgService.getTargetSiteInfo().PotentialPublicCloudPcns.PotentialPcns;
        var vpgSettingsState;

        publicCloudVmSettingsService.setVpgSettingsState = function (vpgSettings) {
            vpgSettingsState = vpgSettings;
        };

        _.each(potentialPublicCloudPcns, function (potential) {
            potential.Pcn.display = potential.Pcn.Name;
        });

        var getPotential = function (id) {
            if(!_.isNullOrUndefined(id)) {
                return _.find(potentialPublicCloudPcns, function (potential) {
                    return potential.Pcn.Id.Identifier === id.Identifier;
                });
            }

            return potentialPublicCloudPcns[0];
        };

        var addDisplayProp = function (collection) {
            _.each(collection, function (item) {
                item.display = item.Name;
            });
        };

        var getAzureVNetEditor = function (gridPcnProp, gridSubnetProp, gripPropSecurityGroup, typeProp) {
            return $filter('zInlineDropdownEditor')({
                className: 'azure-vnet-inline-dropdown',
                optionsCollection: potentialPublicCloudPcns,
                loadValue: function (item) {
                    return item.CloudVmSettings[typeProp].Pcn;
                },
                uiSelectModel: function (item) {
                   return item.CloudVmSettings[typeProp].Pcn;
                },
                applyValue: function (item, value, prop) {
                    if (!_.isNullOrUndefined(value)) {
                        item[gridPcnProp] = value[prop];
                        item.CloudVmSettings[typeProp].Pcn = value;

                        var potential = getPotential(value.Id);
                        addDisplayProp(potential.Subnets);

                        var defaultSubnet = createVpgRecoveryAwsService.getDefaultSubnet(potential.Subnets, potential.DefaultSubnet);

                        item[gridSubnetProp] = defaultSubnet.Name;
                        item.CloudVmSettings[typeProp].Subnet = defaultSubnet;
                    } else {
                        item[gridPcnProp] = value;
                        item.CloudVmSettings[typeProp].Pcn = value;
                        item[gridSubnetProp] = value;
                        item.CloudVmSettings[typeProp].Subnet = value;
                    }
                },
                propName: 'Name',
                innerItemAsItem: 'Pcn'
            });
        };

        var getSubnetEditor = function (gridProp, typeProp) {
            return $filter('zInlineDropdownEditor')({
                className: 'azure-subnet-inline-dropdown',
                optionsCollection: function (item) {
                    var potential = getPotential(item.CloudVmSettings[typeProp].Pcn.Id);
                    addDisplayProp(potential.Subnets);
                    return potential.Subnets;
                },
                loadValue: function (item) {
                    return item.CloudVmSettings[typeProp].Subnet;
                },
                uiSelectModel: function (item) {
                   return item.CloudVmSettings[typeProp].Subnet;
                },
                applyValue: function (item, value, prop) {
                    if(!_.isNullOrUndefined(value)) {
                        item[gridProp] = value[prop];
                        item.CloudVmSettings[typeProp].Subnet = value;
                    }
                },
                propName: 'Name'
            });
        };

        var getSecurityGroupsEditor = function (gridProp, typeProp) {
            return $filter('zInlineDropdownEditor')({
                className: 'azure-security-groups-inline-dropdown',
                optionsCollection: function () {
                    var potential = getPotential();
                    addDisplayProp(potential.SecurityGroups);
                    return potential.SecurityGroups;
                },
                loadValue: function (item) {
                    return item.CloudVmSettings[typeProp].SecurityGroups[0];
                },
                uiSelectModel: function (item) {
                   return item.CloudVmSettings[typeProp].SecurityGroups[0];
                },
                applyValue: function (item, value) {
                    if(!_.isNullOrUndefined(value)) {
                        item[gridProp] = [value];
                        item.CloudVmSettings[typeProp].SecurityGroups = [value];
                    }
                },
                propName: 'Name'
            });
        };

        var getCellEditableObj = function (item, typeProp, message) {
            return {
                isEditEnabled: !_.isNullOrUndefined(item.CloudVmSettings[typeProp].Pcn),
                errorMessage: message,
                leftFixer: 7
            };
        };

        var checkValidationVmsSettings = function () {
            var VMs = vpgSettingsState.Config.VirtualMachines,
                VMLength = VMs.length;

            for (var i = 0; i < VMLength; i++) {
                if (_.isNullOrUndefined(VMs[i].CloudVmSettings[publicCloudVmSettingsCons.FAILOVER_SETTINGS].Pcn) ||
                    _.isNullOrUndefined(VMs[i].CloudVmSettings[publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS].Pcn)) {
                    return true;
                }
            }

            return false;
        };

        var getCellValidation = function (item, isCheckButtonValidity) {
            if(isCheckButtonValidity) {
                notifier.notify({value: checkValidationVmsSettings(), key: zNotificationConstant.PUBLIC_CLOUD_AZURE_AWS_NOTIFICATION});
            }

            return !_.isNullOrUndefined(item) && item !== '';
        };

        publicCloudVmSettingsService.getColumnsDefByPublicCloudType = function (publicCloudType) {
            var columns = null;

            switch (publicCloudType.value) {
                case enums.VpgEntityType.Aws :
                    columns = [

                        {
                            name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.VM_NAME'),
                            views: ['Failover/Move', 'TEST'],
                            field: 'Name',
                            filter: zSlickGridFilterTypes.WILDCARD
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AWS.FAILOVER_VPC'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_PCN,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getAzureVNetEditor(publicCloudVmSettingsCons.FAILOVER_PCN, publicCloudVmSettingsCons.FAILOVER_SUBNET,
                                publicCloudVmSettingsCons.FAILOVER_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item, true);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_SUBNET'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_SUBNET,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSubnetEditor(publicCloudVmSettingsCons.FAILOVER_SUBNET, publicCloudVmSettingsCons.FAILOVER_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item);
                            },
                            zCellEditable: function (item) {
                                return getCellEditableObj(item, publicCloudVmSettingsCons.FAILOVER_SETTINGS, publicCloudVmSettingsCons.FAILOVER_TOOLTIP_INFO);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_GROUPS'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_SECURITY_GROUPS,
                            formatter: $filter('publicCloudSecurityGroupsFormatter'),
                            filter: zSlickGridFilterTypes.WILDCARD

                            //todo : create multi select drop down for AWS SECURITY GROUPS
                            // cssClass: 'editable-cell',
                            // editor: getSecurityGroupsEditor(publicCloudVmSettingsCons.FAILOVER_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_SETTINGS),
                            // zCellEditable: function (item) {
                            //     return getCellEditableObj(item, publicCloudVmSettingsCons.FAILOVER_SETTINGS, publicCloudVmSettingsCons.FAILOVER_TOOLTIP_INFO);
                            // }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_IP'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_PRIVATE_IP,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: $filter('publicCloudIpEditor')(publicCloudVmSettingsCons.FAILOVER_PRIVATE_IP, publicCloudVmSettingsCons.FAILOVER_SETTINGS)
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AWS.FOL_INSTANCE_TYPE'),
                            views: ['Failover/Move'],
                            field: 'FailoverInstanceType',
                            filter: zSlickGridFilterTypes.WILDCARD
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AWS.FAILOVER_TEST_VPC'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_PCN,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getAzureVNetEditor(publicCloudVmSettingsCons.FAILOVER_TEST_PCN, publicCloudVmSettingsCons.FAILOVER_TEST_SUBNET,
                                publicCloudVmSettingsCons.FAILOVER_TEST_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item, true);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_TEST_SUBNET'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_SUBNET,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSubnetEditor(publicCloudVmSettingsCons.FAILOVER_TEST_SUBNET, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item);
                            },
                            zCellEditable: function (item) {
                                return getCellEditableObj(item, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS, publicCloudVmSettingsCons.FAILOVER_TEST_TOOLTIP_INFO);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_TEST_GROUPS'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_SECURITY_GROUPS,
                            formatter: $filter('publicCloudSecurityGroupsFormatter'),
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSecurityGroupsEditor(publicCloudVmSettingsCons.FAILOVER_TEST_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS),
                            zCellEditable: function (item) {
                                return getCellEditableObj(item, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS, publicCloudVmSettingsCons.FAILOVER_TEST_TOOLTIP_INFO);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_TEST_IP'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_PRIVATE_IP,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: $filter('publicCloudIpEditor')(publicCloudVmSettingsCons.FAILOVER_TEST_PRIVATE_IP, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS)
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AWS.TEST_INSTANCE_TYPE'),
                            views: ['TEST'],
                            field: 'TestInstanceType',
                            filter: zSlickGridFilterTypes.WILDCARD
                        }
                    ];
                    break;
                case enums.VpgEntityType.Azure :
                    columns = [
                        {
                            name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.VM_NAME'),
                            views: ['Failover/Move', 'TEST'],
                            field: 'Name',
                            filter: zSlickGridFilterTypes.WILDCARD
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AZURE.FAILOVER_MOVE_VNET'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_PCN,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getAzureVNetEditor(publicCloudVmSettingsCons.FAILOVER_PCN, publicCloudVmSettingsCons.FAILOVER_SUBNET,
                                publicCloudVmSettingsCons.FAILOVER_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item, true);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_SUBNET'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_SUBNET,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSubnetEditor(publicCloudVmSettingsCons.FAILOVER_SUBNET, publicCloudVmSettingsCons.FAILOVER_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item);
                            },
                            zCellEditable: function (item) {
                                return getCellEditableObj(item, publicCloudVmSettingsCons.FAILOVER_SETTINGS, publicCloudVmSettingsCons.FAILOVER_TOOLTIP_INFO);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_GROUP'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_SECURITY_GROUPS,
                            formatter: $filter('publicCloudSecurityGroupsFormatter'),
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSecurityGroupsEditor(publicCloudVmSettingsCons.FAILOVER_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_SETTINGS)
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_IP'),
                            views: ['Failover/Move'],
                            field: publicCloudVmSettingsCons.FAILOVER_PRIVATE_IP,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: $filter('publicCloudIpEditor')(publicCloudVmSettingsCons.FAILOVER_PRIVATE_IP, publicCloudVmSettingsCons.FAILOVER_SETTINGS)
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AZURE.FOL_INSTANCE_SIZE'),
                            views: ['Failover/Move'],
                            field: 'FailoverInstanceType',
                            filter: zSlickGridFilterTypes.WILDCARD
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AZURE.FAILOVER_TEST_VNET'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_PCN,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getAzureVNetEditor(publicCloudVmSettingsCons.FAILOVER_TEST_PCN, publicCloudVmSettingsCons.FAILOVER_TEST_SUBNET,
                                publicCloudVmSettingsCons.FAILOVER_TEST_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item, true);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_TEST_SUBNET'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_SUBNET,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSubnetEditor(publicCloudVmSettingsCons.FAILOVER_TEST_SUBNET, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS),
                            zCellValidation: function (item) {
                                return getCellValidation(item);
                            },
                            zCellEditable: function (item) {
                                return getCellEditableObj(item, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS, publicCloudVmSettingsCons.FAILOVER_TEST_TOOLTIP_INFO);
                            }
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_TEST_GROUP'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_SECURITY_GROUPS,
                            formatter: $filter('publicCloudSecurityGroupsFormatter'),
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: getSecurityGroupsEditor(publicCloudVmSettingsCons.FAILOVER_TEST_SECURITY_GROUPS, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS)
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.COMMON.FAILOVER_TEST_IP'),
                            views: ['TEST'],
                            field: publicCloudVmSettingsCons.FAILOVER_TEST_PRIVATE_IP,
                            filter: zSlickGridFilterTypes.WILDCARD,
                            cssClass: 'editable-cell',
                            editor: $filter('publicCloudIpEditor')(publicCloudVmSettingsCons.FAILOVER_TEST_PRIVATE_IP, publicCloudVmSettingsCons.FAILOVER_TEST_SETTINGS)
                        },
                        {
                            name: $translate.instant('PUBLIC_CLOUD_NETWORK_SETTINGS.AZURE.TEST_INSTANCE_SIZE'),
                            views: ['TEST'],
                            field: 'TestInstanceType',
                            filter: zSlickGridFilterTypes.WILDCARD
                        }
                    ];
                    break;
            }

            return columns;
        };

        publicCloudVmSettingsService.getViewByValueDef = function () {
            return [
                {
                    id: 'Failover/Move',
                    text: 'Failover/Move'
                },
                {
                    id: 'TEST',
                    text: 'Test'
                }
            ];
        };

        publicCloudVmSettingsService.getGroupByValueDef = function () {
            return [
                {
                    id: '',
                    text: $translate.instant('GROUP_BY_LIST.NONE')
                },
                {
                    id: 'Name',
                    text: $translate.instant('GROUP_BY_LIST.VM_NAME')
                }
            ];
        };

        publicCloudVmSettingsService.saveDataInGrid = function (bulkVmObject, selectedVms, gridData) {
            var bulkVm = _.cloneDeep(bulkVmObject);
            var nextVmFailoverSettings = {}, bulmVmFailoverSettings = bulkVm.CloudVmSettings.FailoverSettings,
                nextVmFailoverTestSettings = {}, bulmVmFailoverTestSettings = bulkVm.CloudVmSettings.FailoverTestSettings;
            _.forEach(gridData, function (nextVm) {
                if (_.find(selectedVms, {'Name': nextVm.Name})) {
                    nextVmFailoverSettings = nextVm.CloudVmSettings.FailoverSettings;
                    nextVmFailoverTestSettings = nextVm.CloudVmSettings.FailoverTestSettings;
                    if (bulmVmFailoverSettings.Pcn) {
                        nextVmFailoverSettings.Pcn = bulmVmFailoverSettings.Pcn;
                        if (vpgService.isAzure() || (bulmVmFailoverSettings.SecurityGroups && bulmVmFailoverSettings.SecurityGroups.length)) {
                            nextVmFailoverSettings.SecurityGroups = bulmVmFailoverSettings.SecurityGroups;
                        }
                        if (bulmVmFailoverSettings.Subnet) {
                            nextVmFailoverSettings.Subnet = bulmVmFailoverSettings.Subnet;
                        }
                    }
                    if (bulmVmFailoverTestSettings.Pcn) {
                        nextVmFailoverTestSettings.Pcn = bulmVmFailoverTestSettings.Pcn;
                        if (vpgService.isAzure() || (bulmVmFailoverTestSettings.SecurityGroups && bulmVmFailoverTestSettings.SecurityGroups.length)) {
                            nextVmFailoverTestSettings.SecurityGroups = bulmVmFailoverTestSettings.SecurityGroups;
                        }
                        if (bulmVmFailoverTestSettings.Subnet) {
                            nextVmFailoverTestSettings.Subnet = bulmVmFailoverTestSettings.Subnet;
                        }
                    }
                    if (bulmVmFailoverSettings.PublicCloudInstanceTypeVisualObject) {
                        nextVmFailoverSettings.PublicCloudInstanceTypeVisualObject = bulmVmFailoverSettings.PublicCloudInstanceTypeVisualObject;
                    }
                    if (bulmVmFailoverTestSettings.PublicCloudInstanceTypeVisualObject) {
                        nextVmFailoverTestSettings.PublicCloudInstanceTypeVisualObject = bulmVmFailoverTestSettings.PublicCloudInstanceTypeVisualObject;
                    }
                    if (selectedVms.length === 1) {
                        nextVmFailoverSettings.PrimaryIp = bulmVmFailoverSettings.PrimaryIp;
                        nextVmFailoverTestSettings.PrimaryIp = bulmVmFailoverTestSettings.PrimaryIp;
                    }
                }
            });
        };

        publicCloudVmSettingsService.processData = function (gridData) {
            return publicCloudVmSettingsModel.processData(gridData);
        };

    });

