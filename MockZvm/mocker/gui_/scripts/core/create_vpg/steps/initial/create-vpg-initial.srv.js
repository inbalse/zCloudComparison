'use strict';

angular.module('zvmApp.core')
    .service('createVpgInitialService', function (vpgService, enums, $translate) {

        var initialService = this;

        initialService.setVpgName = function (vpgName) {
            vpgService.setVpgName(vpgName);
        };

        initialService.getVpgName = vpgService.getVpgName;

        initialService.setPriority = function (priority) {
            vpgService.setPriority(priority);
        };
        initialService.getPriority = function () {
            var priority = vpgService.getPriority();
            return _.isNullOrUndefined(priority) ? getDefaultPriority() : priority;
        };

        initialService.getPriorityCollection = function () {
            var enumCollection = _.sortBy(enums.ProtectionGroupPriority, _.values).reverse();
            var priorityCollection;

            priorityCollection = _.map(enumCollection, function (item) {
                return {enum: item, label: $translate.instant('ENUM.PRIORITY.' + item)};
            });

            return priorityCollection;
        };
        function getDefaultPriority() {
            return enums.ProtectionGroupPriority.Medium;
        }
    });
