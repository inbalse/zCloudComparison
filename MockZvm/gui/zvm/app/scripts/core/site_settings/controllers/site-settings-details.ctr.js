'use strict';

angular.module('zvmApp.core')
    .controller('siteDetailsController', function ($scope, $timeout, $translate, siteSettingsFactory, siteDetailsModel) {
        //region ========================== Variables ==========================
        $scope.forms = {};
        $scope.siteDetailsModel = siteDetailsModel;
        $scope.onlyNumbers = /^\d+$/;
        $scope.isPublicCloud = siteSettingsFactory.isPublicCloud;
        $scope.isAws = siteSettingsFactory.isAws;
        $scope.isAzure = siteSettingsFactory.isAzure;
        $scope.userNameText = $scope.isAws ? $translate.instant('SITE_SETTINGS.SITE_INFO.ACCESS_KEY') : $translate.instant('SITE_SETTINGS.SITE_INFO.USER_NAME');
        $scope.userPasswordText = $scope.isAws ? $translate.instant('SITE_SETTINGS.SITE_INFO.SECRET_KEY') : $translate.instant('SITE_SETTINGS.SITE_INFO.USER_PASSWORD');
        //endregion     ===============================================================

        $scope.$watch('forms.siteDetails.$valid', function (newValue) {
            siteDetailsModel.isValid = newValue;
            $scope.$emit(siteSettingsFactory.events.VALIDITY);
            siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.SITESETTINGS].valid = newValue;
        });

        $scope.$watch('forms.siteDetails.$dirty', function (newValue) {
            if(!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        //no need to unbind scope events
        $scope.$on('siteSettings:clearDirtyFlag', function(){
            $scope.forms.siteDetails.$setPristine();
        });
    });
