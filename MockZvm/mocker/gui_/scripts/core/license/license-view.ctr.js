'use strict';
angular.module('zvmApp.core')
    .controller('licenseViewController', function ($scope, zertoServiceFactory, zertoServiceUpdaterFactory, vos, globalStateModel, enums,
                                                   zAlertFactory, $state, $interval, busyOverlayService, $translate,
                                                   guiVisibleException, loadingViewService, zertoLoggerServiceFactory) {

        //===========================================================================
        // Properties
        //===========================================================================
        $scope.LICENSE = 'license';
        $scope.PAIR = 'pair';
        $scope.isPublicCloud = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws ||
            globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;

        $scope.title = $scope.isPublicCloud ? $translate.instant('LICENSE.PUBLIC_CLOUD_TITLE') : $translate.instant('LICENSE.TITLE');

        $scope.checked = $scope.LICENSE;
        $scope.forms = {};
        $scope.values = {};

        $scope.loading = true;

        // according to bug27304  when remove license KEY the zertoServiceUpdaterFactory._operationsQueue still has 2 VQ operation
        zertoServiceUpdaterFactory.unregisterAll('GetSummaryScreenInformation');
        zertoServiceUpdaterFactory.unregisterAll('GetSummaryMinimal');

        //===========================================================================
        // User Interaction handlers
        //===========================================================================
        $scope.submitForm = function () {
            if ($scope.checked === $scope.LICENSE) {
                $scope.sendLicense($scope.values.license);
            } else if ($scope.checked === $scope.PAIR) {
                $scope.sendPair($scope.values.hostName, $scope.values.port);
            }
        };

        //===========================================================================
        // Internal functions
        //===========================================================================
        $scope.sendPair = function (hostName, port) {
            var pairValue = new vos.SiteConnectionParameters();
            pairValue.Hostname = hostName;
            pairValue.Port = port;
            busyOverlayService.addOperation('licenseViewPair');
            zertoServiceFactory.Pair(pairValue).then(function () {
            }, function (reason) {
                busyOverlayService.removeOperation('licenseViewPair');
                if(guiVisibleException.PERMISSION_TASK_DENIED !== reason.faultString){
                    zAlertFactory.fail('Error', reason.faultString, null);
                }
            });
        };

        $scope.sendLicense = function (key) {
            var licenseValue = new vos.LicenseKey();
            licenseValue.Key = key;

            busyOverlayService.addOperation('licenseViewSend');
            zertoServiceFactory.SaveLicense(licenseValue).then(function () {
            }, function (reason) {
                busyOverlayService.removeOperation('licenseViewSend');
                if(guiVisibleException.PERMISSION_TASK_DENIED !== reason.faultString) {
                    zAlertFactory.fail('Error Occurred!', reason.faultString, null);
                }
            });
        };

        //===========================================================================
        // Get data from server
        //===========================================================================
        zertoServiceFactory.GetSitePairingScreen().then(function (result) {
            $scope.values.port = result.DefaultPortNumber;
            $scope.loading = false;
        }, function (reason) {
            $scope.loading = false;
            zertoLoggerServiceFactory.logError('GetSitePairingScreen', null, reason);
        });

        //===============================================================
        // Fix the stuck license screen issue
        //===============================================================
        $scope.onLicenseUpdate = function (result) {
            if (result.HasLicence) {
                $interval.cancel(interval);
                busyOverlayService.removeOperation('licenseViewPair');
                busyOverlayService.removeOperation('licenseViewSend');
                globalStateModel.init(result);
            }
        };

        var interval = $interval(function(){
            loadingViewService.getInitialSessionValidation().then($scope.onLicenseUpdate);
        }, 3000);
    });

