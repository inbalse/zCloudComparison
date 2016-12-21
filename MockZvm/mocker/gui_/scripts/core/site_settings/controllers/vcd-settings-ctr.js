'use strict';

angular.module('zvmApp.core')
    .controller('vcdSettingsController', function ($scope, siteSettingsFactory, siteVcdSettingsModel, configureProviderVdcFactory, staticRoutesFactory) {

        //=====================================================================================
        //  variables
        //=====================================================================================
        $scope.forms = {};
        //vCDProxyConfiguration data
        $scope.showAMPQPass = false;
        $scope.showVcdPassword = false;
        $scope.data = siteVcdSettingsModel.data;

        $scope.handleConfigureProviderVdc = function () {
            configureProviderVdcFactory.open().then(function(result){
                if(result === 'save'){
                    $scope.forms.cloudSettings.$dirty = true;
                }
            });
        };

        $scope.handleStaticRoutes = function () {
            staticRoutesFactory.openWindow().then(function(result){
                if(result === 'save'){
                    $scope.forms.cloudSettings.$dirty = true;
                }
            });
        };

        $scope.watchers = {};
        $scope.watchers.validity = $scope.$watch('forms.cloudSettings.$valid', function (newValue) {
            siteVcdSettingsModel.isValid = newValue;
            $scope.$emit(siteSettingsFactory.events.VALIDITY);
            siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.VCD].valid = newValue;
        });

        $scope.watchers.clearDirtyWatcher = $scope.$watch('forms.cloudSettings.$dirty', function (newValue) {
            if (newValue) {
                siteSettingsFactory.cloudSettingsChanged = newValue;
                $scope.watchers.clearDirtyWatcher();
            }
            if(!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        //no need to unbind scope events
        $scope.$on('siteSettings:clearDirtyFlag', function(){
            $scope.forms.cloudSettings.$setPristine();
        });
    });
