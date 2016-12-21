'use strict';

angular.module('zvmApp.services')
    .factory('logoutFactory', function ($http, basil, amf, zertoServiceFactory, $location, $state, globalStateModel, analyticsEventsTypes, $rootScope) {
        var logoutFactory = {};
        //===========================================================================
        // Properties
        //===========================================================================
        logoutFactory._message = null;
        logoutFactory._getMessage = function () {
            if (!logoutFactory._message) {
                var serializer = new amf.Serializer();
                logoutFactory._message = serializer.writeMessage({'action': 'update'});
            }
            return logoutFactory._message;
        };
        //===========================================================================
        // privates
        //===========================================================================
        //this function is here to invoke immidiate update that will return with session exception
        //and navigate the GUI to the login screen
        logoutFactory._navigateToLogin = function () {
            $state.go('login');
        };

        logoutFactory._httpLogout = function () {
            $http({
                url: 'Session/LogoutRedirect',
                method: 'GET',
                data: logoutFactory._getMessage(),
                headers: {
                    'sessionId': globalStateModel.getSessionId(),
                    'Content-type': 'application/x-amf'
                }
            }).success(function (result) {
                if (result !== undefined && result !== null && result !== 'LoggedOut') {
                    window.location = result;
                } else {
                    globalStateModel.clearSession();
                    logoutFactory._navigateToLogin();
                }
            }).error(function () {
                globalStateModel.clearSession();
                logoutFactory._navigateToLogin();
            });
        };

        logoutFactory._httpLogoutWithoutRedirect = function () {
            $http({
                url: 'Session/LogoutWithoutRedirect',
                method: 'POST',
                data: logoutFactory._getMessage(),
                headers: {
                    'sessionId': globalStateModel.getSessionId(),
                    'Content-type': 'application/x-amf'
                }
            }).success(function (result) {
                globalStateModel.clearSession();
                $location.path(result); //result = 'logout.html'
            }).error(function () {
                globalStateModel.clearSession();
                $location.path('logout.html'); //result = 'logout.html'
                // called asynchronously if an error occurs
                // or server returns response with an error status.

            });
        };
        //===========================================================================
        // Publics
        //===========================================================================
        logoutFactory.logOut = function () {
            $rootScope.$emit(analyticsEventsTypes.GENERAL.LOGOUT);
            if (globalStateModel.data.IsPortal) {
                if (globalStateModel.isStandalonePortal) {
                    logoutFactory._httpLogout();
                } else {
                    logoutFactory._httpLogoutWithoutRedirect();
                }
            } else {
                globalStateModel.clearSession();
                logoutFactory._navigateToLogin();
            }
        };

        return logoutFactory;
    });

