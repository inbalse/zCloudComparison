'use strict';

angular.module('zvmApp.core')
    .service('createVpgRecoveryAwsService', function (vpgService, vmsService, publicCloudSettingsService) {

        var createVpgRecoveryAwsService = this;
        createVpgRecoveryAwsService.lastAWSFailoverSavedPcn = null;
        createVpgRecoveryAwsService.lastAWSTestSavedPcn = null;

        createVpgRecoveryAwsService.findPcnInPotentials = function (pcn) {
            if (!_.isNullOrUndefined(pcn)) {
                var potentialsPcns = vpgService.getTargetSiteInfo().PotentialPublicCloudPcns.PotentialPcns;

                var potentialPcn = _.find(potentialsPcns, function (potentialPcn) {
                    return potentialPcn.Pcn.Id.Identifier === pcn.Id.Identifier;
                });

                if (!_.isNullOrUndefined(potentialPcn)) {
                    return potentialPcn.Pcn;
                }
            }
            return null;
        };

        createVpgRecoveryAwsService.getSecurityGroupsListPerPcn = function (pcn) {
            var potentialsPcns = vpgService.getTargetSiteInfo().PotentialPublicCloudPcns.PotentialPcns;

            return _.find(potentialsPcns, function (potentialPcn) {
                return potentialPcn.Pcn.Id.Identifier === pcn.Id.Identifier;
            }).SecurityGroups;
        };

        createVpgRecoveryAwsService.getSubnetData = function (currentPCN, cloudSettings) {
            var subnetsList, defaultSubnet, potentialsPcns;
            if(!_.isNullOrUndefined(currentPCN)) {
                potentialsPcns = vpgService.getTargetSiteInfo().PotentialPublicCloudPcns.PotentialPcns;

                var found = _.find(potentialsPcns, function (item) {
                    return item.Pcn.Id.Identifier === currentPCN.Id.Identifier;
                });

                subnetsList = found.Subnets;
                defaultSubnet = createVpgRecoveryAwsService.getDefaultSubnet(subnetsList, found.DefaultSubnet);
            } else {

                cloudSettings.Subnet = null;

                subnetsList = [];
                defaultSubnet = null;
            }

            return {
                subnetList: subnetsList,
                defaultSubnet: defaultSubnet
            };
        };

        createVpgRecoveryAwsService.initAwsLists = function () {
            createVpgRecoveryAwsService.lastAWSFailoverSavedPcn = null;
            createVpgRecoveryAwsService.lastAWSTestSavedPcn = null;
            var failoverSettings = publicCloudSettingsService.getPublicCloudFailoverSettings();
            var failoverTestSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings();

            publicCloudSettingsService.setPublicCloudFailoverPcn(createVpgRecoveryAwsService.findPcnInPotentials(failoverSettings.Pcn));
            publicCloudSettingsService.setPublicCloudFailoverTestPcn(createVpgRecoveryAwsService.findPcnInPotentials(failoverTestSettings.Pcn));
        };

        createVpgRecoveryAwsService.getPcnData = function (newValue, cloudSettings, isTest) {

            if (angular.isDefined(newValue)) {
                var subnetData = createVpgRecoveryAwsService.getSubnetData(newValue, cloudSettings);

                var subnetsList = angular.copy(subnetData.subnetList);
                var lastSavedPcnObj = isTest ? createVpgRecoveryAwsService.lastAWSTestSavedPcn : createVpgRecoveryAwsService.lastAWSFailoverSavedPcn;

                if (!_.isNullOrUndefined(newValue)) {
                    if (_.isNullOrUndefined(lastSavedPcnObj) || lastSavedPcnObj.Id.Identifier !== newValue.Id.Identifier) {
                        cloudSettings.Pcn = newValue;
                        cloudSettings.Subnet = subnetData.defaultSubnet;
                        updateLastSavedPcn(newValue, isTest);
                        vmsService.applyPublicCloudToVms();
                        vpgService.handleChangingDefaultValues();
                    }
                }

                var securityGroupsList = createVpgRecoveryAwsService.getSecurityGroupsListPerPcn(newValue);

                //Option to select "None" for Network Security Group (NSG) should be available - bug26504
                if (vpgService.isAzure()) {
                    addSecurityGroupNoneOption(cloudSettings, securityGroupsList);
                }

                return {
                    subnetsList: subnetsList,
                    subnet: cloudSettings.Subnet,
                    securityGroupsList: securityGroupsList,
                    securityGroups: cloudSettings.SecurityGroups
                };
            }
        };

        createVpgRecoveryAwsService.failoverSubnetChange = function (newValue) {
            var oldValue = publicCloudSettingsService.getPublicCloudFailoverSubnet();

            if(!_.isEqual(newValue, oldValue)){
                publicCloudSettingsService.setPublicCloudFailoverSubnet(newValue);
                vmsService.applyPublicCloudToVms();
                vpgService.handleChangingDefaultValues();
            }
        };

        createVpgRecoveryAwsService.failoverTestSubnetChange = function (newValue) {
            var oldValue = publicCloudSettingsService.getPublicCloudFailoverTestSubnet();

            if(!_.isEqual(newValue, oldValue)) {
                publicCloudSettingsService.setPublicCloudFailoverTestSubnet(newValue);
                vmsService.applyPublicCloudToVms();
                vpgService.handleChangingDefaultValues();
            }
        };

        createVpgRecoveryAwsService.instanceTypeDefaultsChange = function (value) {
            publicCloudSettingsService.setFailoverPublicCloudInstanceTypeVisualObject(value);
            vmsService.applyPublicCloudToVms();
            vpgService.handleChangingDefaultValues();
        };

        createVpgRecoveryAwsService.testInstanceTypeDefaultsChange = function (value) {
            publicCloudSettingsService.setFailoverTestPublicCloudInstanceTypeVisualObject(value);
            vmsService.applyPublicCloudToVms();
            vpgService.handleChangingDefaultValues();
        };

        createVpgRecoveryAwsService.securityGroupsChange = function (value) {
            publicCloudSettingsService.setPublicCloudFailoverSecurityGroups(checkIfSecurityGroupsSetToNoneAndChangeToEmptyArray(value));
            vmsService.applyPublicCloudToVms();
        };

        createVpgRecoveryAwsService.securityTestGroupsChange = function (value) {
            publicCloudSettingsService.setPublicCloudFailoverTestSecurityGroups(checkIfSecurityGroupsSetToNoneAndChangeToEmptyArray(value));
            vmsService.applyPublicCloudToVms();
        };

        createVpgRecoveryAwsService.setSecuritySelected = function (collection, defaultSecurity, securityObject) {
            if(!_.isNullOrUndefined(defaultSecurity)) {
                securityObject.SecurityGroups = [];
                _.forEach(collection, function (item) {
                    if (item.Id.Identifier === defaultSecurity.Identifier) {
                        securityObject.SecurityGroups.push(item);
                    }
                });
            }
        };

        createVpgRecoveryAwsService.getDefaultSubnet = function (subnetList, defaultSubnet) {
            if (defaultSubnet) {
                return _.find(subnetList, function (subnet) {
                    return subnet.Id.Identifier === defaultSubnet.Identifier;
                });
            }
            return null;
        };

        createVpgRecoveryAwsService.savePublicCloudVMs = function (result) {
            publicCloudSettingsService.savePublicCloudVMs(result);
        };

        createVpgRecoveryAwsService.isDifferentFailoverFamilyInstanceSelected = function (selectedInstanceFamily) {
            var failoverSettings = publicCloudSettingsService.getPublicCloudFailoverSettings();
            if (_.isNullOrUndefined(failoverSettings.PublicCloudInstanceTypeVisualObject)) {
                return true;
            }
            return !_.isEqual(failoverSettings.PublicCloudInstanceTypeVisualObject.FamilyName, selectedInstanceFamily.FamilyName);
        };

        createVpgRecoveryAwsService.isDifferentFailoverTestFamilyInstanceSelected = function (selectedInstanceFamily) {
            var failoverTestSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings();
            if (_.isNullOrUndefined(failoverTestSettings.PublicCloudInstanceTypeVisualObject)) {
                return true;
            }
            return !_.isEqual(failoverTestSettings.PublicCloudInstanceTypeVisualObject.FamilyName, selectedInstanceFamily.FamilyName);
        };

        //region Private
        function checkIfSecurityGroupsSetToNoneAndChangeToEmptyArray(value) {
            if (vpgService.isAzure()) {
                if (value[0].Id.Identifier === 'None') {
                    value = [];
                }
            }

            return value;
        }

        function addSecurityGroupNoneOption(cloudSettings, securityGroupsList) {
            var defaultGroupNone = {
                Id: {
                    Identifier: 'None'
                },
                Name: 'None'
            };

            //check if none already exist
            if (!_.contains(_.map(securityGroupsList, function (sg) { return sg.Id.Identifier; }), 'None')) {
                securityGroupsList.unshift(defaultGroupNone);
            }

            if (cloudSettings.SecurityGroups.length === 0) {
                cloudSettings.SecurityGroups = [defaultGroupNone];
            }
        }

        function updateLastSavedPcn(newPcn, isTest) {
            if (isTest) {
                createVpgRecoveryAwsService.lastAWSTestSavedPcn = newPcn;
            } else {
                createVpgRecoveryAwsService.lastAWSFailoverSavedPcn = newPcn;
            }
        }

        //endregion
    });
