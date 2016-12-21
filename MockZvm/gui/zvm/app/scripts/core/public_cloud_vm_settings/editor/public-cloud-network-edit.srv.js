'use strict';

angular.module('zvmApp.core')
    .service('publicCloudNetworkEditService', function (vpgService, createVpgRecoveryAwsService) {

        var publicCloudNetworkEditService = this;

        publicCloudNetworkEditService.pcnChanged = function (newPcn, oldPcn, cloudSettings) {
            var result, subnetsList, securityGroupsList;
            result = findSubListsInPcns(vpgService.getTargetSiteInfo().PotentialPublicCloudPcns.PotentialPcns, newPcn);
            subnetsList = angular.copy(result.subnetList);
            securityGroupsList = angular.copy(result.securityList);

            if(vpgService.isAzure()){
                securityGroupsList.unshift({
                    Id: {
                        Identifier: 'None'
                    },
                    Name: 'None'
                });
            }

            if (_.isNullOrUndefined(oldPcn) || newPcn.Id.Identifier !== oldPcn.Id.Identifier) {
                createVpgRecoveryAwsService.setSecuritySelected(securityGroupsList, result.defaultSecurity, cloudSettings);
                cloudSettings.Subnet = createVpgRecoveryAwsService.getDefaultSubnet(subnetsList, result.defaultSubnet);
            }
            return {
                subnetsList: subnetsList,
                securityGroupsList: securityGroupsList
            };
        };

        var findSubListsInPcns = function (collection, currentPCN) {
            if(!_.isNullOrUndefined(currentPCN)) {
                var subnetsList = [], securityList = [], defaultSubnet = {}, defaultSecurity = {};

                _.forEach(collection, function (item) {
                    if (item.Pcn.Id.Identifier === currentPCN.Id.Identifier) {
                        subnetsList = item.Subnets;
                        securityList = item.SecurityGroups;
                        defaultSecurity = item.DefaultSecurityGroup;
                        defaultSubnet = item.DefaultSubnet;
                    }
                });
                return {
                    subnetList: subnetsList,
                    securityList: securityList,
                    defaultSecurity: defaultSecurity,
                    defaultSubnet: defaultSubnet
                };
            }else {
                return {
                    subnetList: [],
                    securityList: [],
                    defaultSecurity: null,
                    defaultSubnet: null
                };
            }
        };

        publicCloudNetworkEditService.getTargetSiteInfo = function () {
            return vpgService.getTargetSiteInfo();
        };
    });
