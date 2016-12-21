'use strict';
angular.module('zvmApp.core')
    .controller('setupController', function ($scope, $translate, $state, checkActiveState,  globalStateModel, enums, summaryMinimalModel) {
        var isAws = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws;
        var isAzure = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;
        var isPublicCloud = isAws || isAzure;
        var isHyperV = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV;

        if (isPublicCloud) {
            $scope.titleText = $translate.instant('SETUP_PUBLIC_CLOUD_TOOLTIP_TEXT');
        } else if (isHyperV) {
            $scope.titleText = $translate.instant('SETUP_HYPERV_TOOLTIP_TEXT');
        } else {
            $scope.titleText = $translate.instant('SETUP_TOOLTIP_TEXT');
        }

        $scope.noStoragesText = isHyperV ?  $translate.instant('SETUP_TABS.NO_STORAGES') :
                                $translate.instant('SETUP_TABS.NO_DATASTORES');

        $scope.tabs = [
            {title: $translate.instant('SETUP_TABS.VRAS'), route: 'main.setup.vras', active: false, visible: !isPublicCloud ,tooltip:$translate.instant('SETUP_TABS.VRAS_TOOLTIP')},
            {title: globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV ? $translate.instant('SETUP_' +
            'TABS.STORAGES') : $translate.instant('SETUP_TABS.DATASTORES'), route: 'main.setup.datastores', active: false, visible: !isPublicCloud, tooltip:$translate.instant('SETUP_TABS.DATASTORES_TOOLTIP') },
            {title: $translate.instant('SETUP_TABS.REPOSIOTORIES'), route: 'main.setup.repositories', active: false, tooltip:$translate.instant('SETUP_TABS.REPOSIOTORY_TOOLTIP') }
        ];

        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });

        summaryMinimalModel.register($scope).then(null, null, function (result) {
            $scope.NumberOfRepositories = result.SummaryState.NumberOfRepositories;
            $scope.NumberOfVras = result.SummaryState.NumberOfVras;
            $scope.NumberOfStorages = result.SummaryState.NumberOfStorages;
        });

        var defaultSetupUrl = isPublicCloud ? 'main.setup.repositories' : 'main.setup.vras';
        $state.go(defaultSetupUrl);
    });
