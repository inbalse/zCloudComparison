'use strict';

angular.module('zvmApp.filters')
    .filter('retentionPolicyEnum', function (enums, $translate) {
        return function (enumValue) {

            switch (enumValue) {
                case enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Standard:
                    return $translate.instant('ENUM.RETENTION_POLICY.STANDARD');
                case enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended:
                    return $translate.instant('ENUM.RETENTION_POLICY.EXTENDED');
                default:
                    return enumValue;
            }
        };
    });