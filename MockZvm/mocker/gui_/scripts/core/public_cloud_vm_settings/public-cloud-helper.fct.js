'use strict';

angular.module('zvmApp.core')
    .factory('publicCloudHelper', function () {
        var publicCloudHelper = {};
        //ugly backend workaround - checking one of the instances for the enable disable instances
        publicCloudHelper.showInstanceTypes = function (list) {
            if (list.length) {
                return list[0].IsFeatureEnabled;
            }
            return false;
        };

        publicCloudHelper.createFamilyInstanceList = function (list) {
            var temp = _.groupBy(list, 'FamilyName');
            var newlist = [];

            _.forEach(temp, function (instances, familyName) {
                newlist.push({'FamilyName': familyName, 'instances': _.alphanumSortObjects(instances, 'Name')});
            });

            return newlist;
        };

        publicCloudHelper.selectFamilyFromInstance = function (instance, familyList) {
            if (!instance) {
                return undefined;
            }
            return _.find(familyList, {FamilyName: instance.FamilyName});
        };

        publicCloudHelper.selectFamilyFromInstanceIdentifier = function (instanceIdentifier, familyList) {
            if (!instanceIdentifier) {
                return undefined;
            }
            return _.find(familyList, function (family) {
                return _.find(family.instances, function (instance) {
                    if (instanceIdentifier.InstanceType === instance.Id.InstanceType) {
                        return true;
                    }
                });
            });
        };

        publicCloudHelper.selectInstanceByIdentifier = function (instanceIdentifier, instanceList) {
            return _.find(instanceList, function (instance) {
                if (instance.Id.InstanceType === instanceIdentifier) {
                    return true;
                }
            });
        };

        return publicCloudHelper;
    });
