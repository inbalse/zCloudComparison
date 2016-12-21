'use strict';

angular.module('zvmApp.core')
    .factory('loginViewFactory', function ($rootScope, $translate, zertoServiceFactory, zAlertFactory, $state, amf,
                                           basil, globalStateModel, $http, zertoApi, analyticsEventsTypes) {
        var loginViewFactory = {};

        var remember;

        loginViewFactory.login = function (data) {
            remember = data.rememberMe;
            basil.set('zertoLoginRememberMe', remember);

            if (globalStateModel.data.IsPortal) {
                var str = btoa(data.zorgName + '\\' + data.username + ':' + data.password);

                $http.post('Session/Login', {stub: 'to convert request to POST'}, {
                    headers: {Authorization: 'Basic ' + str}
                }).then(loginViewFactory.loginSuccess, loginViewFactory.loginFail);
            } else {
                return zertoServiceFactory.LoginToVCenter(data.username, data.password).then(loginViewFactory.loginSuccess, loginViewFactory.loginFail);
            }
        };

        loginViewFactory.loginSuccess = function (result) {
            if (globalStateModel.data.IsPortal) {
                loginViewFactory.setSessionData(result.data.InternalIdentifier);
                $state.go('main.vpgs');
            } else {
                if (globalStateModel.vSphereData) {
                    globalStateModel.vSphereData.sessionId = result.InternalIdentifier;
                }
                loginViewFactory.setSessionData(result.InternalIdentifier);
                $state.go('loading');
            }

            $rootScope.$emit(analyticsEventsTypes.GENERAL.LOGIN);
        };
        loginViewFactory.setSessionData = function (identifier) {
            // save session to cookie
            globalStateModel.setSessionId(identifier, remember);
            amf.addHeader('DSRemoteCredentials', btoa(':' + identifier));
            zertoApi.addHeaders({'x-zerto-session': identifier});
        };

        loginViewFactory.loginFail = function (result) {
            if (angular.isUndefined(result.faultString) && angular.isDefined(result.statusText)) {
                zAlertFactory.fail($translate.instant('ERROR'), result.statusText + $translate.instant('ROLES_AND_PERMISSION_HINT'), null);
            } else {
                zAlertFactory.fail($translate.instant('ERROR'), result.faultString + $translate.instant('ROLES_AND_PERMISSION_HINT'), null);
            }
        };


        return loginViewFactory;
    });
