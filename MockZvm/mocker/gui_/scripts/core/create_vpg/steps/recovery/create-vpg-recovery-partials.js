'use strict';

angular.module('zvmApp.directives')
    .directive('vcdVappPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/vcd-vapp.html'
        };
    })
    .directive('vappNetworkMappingPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/vapp-network-mapping.html'
        };
    })
    .directive('publicCloudPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/publicCloud.html'
        };
    })
    .directive('failoverTestNetworksPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/failover-test-network.html'
        };
    })
    .directive('failoverLiveNetworksPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/failover-live-network.html'
        };
    })
    .directive('recoveryScriptPrePartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/recovery-script-pre.html'
        };
    })
    .directive('recoveryScriptPostPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/recovery-script-post.html'
        };
    })
    .directive('vmFolderPartial', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/core/create_vpg/steps/recovery/partials/vm-folder.html'
        };
    });
