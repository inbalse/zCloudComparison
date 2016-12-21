'use strict';
angular.module('zvmApp.core')
    .controller('loginViewController', function ($scope, loginViewFactory, globalStateModel,
                                                 $translate, enums, basil, zNotificationService, zNotificationConstant) {
        $scope.user = {};

        var loginNotificationKey = zNotificationConstant.LOGIN_VIEW_NOTIFICATION;

        angular.element('usernameInput').checkAndTriggerAutoFillEvent();
        angular.element('passwordInput').checkAndTriggerAutoFillEvent();

        $scope.IsPortal = globalStateModel.data.IsPortal;
        $scope.loginViewFactory = loginViewFactory;
        $scope.helpTooltip = '';
        $scope.user.rememberMe = !!basil.get('zertoLoginRememberMe');

        if ($scope.IsPortal){
            $scope.title = $translate.instant('ZSSP_TITLE');
            $scope.helpTooltip = $translate.instant('LOGIN.ZSSP_LOGIN');
        }else{
            $scope.title = $translate.instant('VIRTUAL_MANAGER_TITLE');
            switch (globalStateModel.data.VirtualizationProviderType){
                case enums.VpgEntityType.Aws : {
                    $scope.helpTooltip = $translate.instant('LOGIN.AWS_LOGIN');
                    break;
                }
                case enums.VpgEntityType.HyperV : {
                    $scope.helpTooltip = $translate.instant('LOGIN.SCVMM_LOGIN');
                    break;
                }
                case enums.VpgEntityType.VCVpg : {
                    $scope.helpTooltip = $translate.instant('LOGIN.VMWARE_LOGIN');
                }
            }
        }

        //--------------------------- bug 26207 ------------------------------------//
        var subscriber = zNotificationService.getSubscriber(loginNotificationKey);

        //when session validation promise resolved update IsPortal prop with new result
        subscriber.promise.then(null, null, function () {
            $scope.IsPortal = globalStateModel.data.IsPortal;
        });

        $scope.$on('$destroy', function () {
            zNotificationService.unSubscribe(subscriber, loginNotificationKey, false);
        });

    });

