'use strict';

angular.module('zvmApp.services')
    .factory('globalStateModel', function ($rootScope, $state, zertoServiceFactory, vos, enums, Idle, $http, basil, analyticsEventsTypes, zertoLoggerServiceFactory, tweaksService, gaTweaks) {

        var globalStateModel = {};

        /** @type {vos.InitialSessionValidation} */
        globalStateModel.data = null;

        globalStateModel.previousState = null;
        globalStateModel.previousParams = null;

        globalStateModel.vAppIdentifier = null;
        globalStateModel.vmIdentifier = null;

        //get session id from local storage or from session storage
        var _sessionId = basil.get('zertoSessionIdentifier') !== null ? basil.get('zertoSessionIdentifier') : basil.sessionStorage.get('zertoSessionIdentifier');
        //get last session id
        globalStateModel.getSessionId = function () {
            return _sessionId;
        };

        globalStateModel.setSessionId = function (sessionId, remember) {
            _sessionId = sessionId;//set session id
            if (remember) {//check if need to save in storage
                basil.set('zertoSessionIdentifier', sessionId);
            } else {
                //remove from storage if remember unchecked
                basil.remove('zertoSessionIdentifier');
                //store in session storage
                basil.sessionStorage.set('zertoSessionIdentifier', sessionId);
            }
        };

        globalStateModel.clearSession = function () {
            _sessionId = '00000000-0000-0000-0000-000000000000';
            basil.remove('zertoSessionIdentifier');
            basil.sessionStorage.remove('zertoSessionIdentifier');
        };

        //check if session id exist
        if (!_sessionId) {
            _sessionId = '00000000-0000-0000-0000-000000000000';
        }

        globalStateModel.init = function (value) {
            globalStateModel.data = {
                IsPortal: value.IsPortal,
                VirtualizationProviderType: value.VirtualizationProviderType,
                HasLicence: value.HasLicence,
                IsSessionValid: value.IsSessionValid,
                IsCreateSupportTicketEnabled: value.IsCreateSupportTicketEnabled,
                HashedLicense: value.SiteKey,
                SiteIdentifier: value.SiteIdentifier
            };

            globalStateModel._redirectBasedOnState();

            if(globalStateModel.data.HasLicence || globalStateModel.data.IsPortal) {
                globalStateModel._startAnalyticsIfConfigured();
            }

            if (globalStateModel.data.IsPortal) {
                //event for knowing that we are Isportal
                $rootScope.$broadcast('IsPortalChanged');

                globalStateModel._initializeKeepalive();
            }
        };

        globalStateModel.setIsPortalFlag = function (isPortal) {
            if (globalStateModel.data === null) {
                globalStateModel.data = {IsPortal: isPortal};
            } else {
                globalStateModel.data.IsPortal = isPortal;
            }
        };

        globalStateModel._initializeKeepalive = function () {
            $rootScope.$on('Keepalive', function () {
                var sessionId = basil.get('zertoSessionIdentifier');
                if (!sessionId) {
                    sessionId = basil.sessionStorage.get('zertoSessionIdentifier');
                }
                if (sessionId) {
                    var req = {
                        method: 'POST',
                        url: '/ZvmService/GUI/Session/SessionKeepAlive',
                        headers: {
                            'Content-Type': 'application/x-amf',
                            'sessionId': sessionId
                        },
                        data: {action: 'update'}
                    };

                    $http(req).error(function (err) {
                        zertoLoggerServiceFactory.logError('/ZvmService/GUI/Session/SessionKeepAlive', req.data, err);
                    });
                }
            });
            Idle.watch();
        };

        globalStateModel._redirectBasedOnState = function () {
            if (!globalStateModel.data.IsSessionValid) {
                $state.go('login');
            } else if (!globalStateModel.data.HasLicence) {
                $state.go('license');

            } else if (globalStateModel.data.IsPortal) {
                $state.go('main.vpgs');
            } else if (globalStateModel.isvSphere) {
                if (globalStateModel.vSphereData.screenType === 'summary') {
                    $state.go(globalStateModel.getDefaultRoute());
                } else if (globalStateModel.vSphereData.screenType === 'details') {
                    globalStateModel.vmIdentifier = globalStateModel._getVmId(globalStateModel.vSphereData);
                    zertoServiceFactory.GetVirtualMachineContextInfo(globalStateModel._getVmId(globalStateModel.vSphereData)).then(globalStateModel._onContextInfoResult);
                }
            } else {
                if (globalStateModel.previousParams) {
                    $state.go(globalStateModel._findNextState(), globalStateModel.previousParams);
                } else {
                    $state.go(globalStateModel._findNextState());
                }
                globalStateModel._clearPrevious();
            }
        };

        globalStateModel._onContextInfoResult = function (result) {
            //todo Denis: one to many vSphere Client
            if (result.ProtectionGroupDetails && result.ProtectionGroupDetails.ProtectionGroupId) {
                $state.go('main.vpg_details', {id: result.ProtectionGroupDetails.ProtectionGroupId.GroupGuid});
            } else {
                if (globalStateModel.vSphereData.screenType === 'details') {
                    $state.go('main.vm_quick_start');
                }
            }
        };

        globalStateModel._clearPrevious = function () {
            globalStateModel.previousState = null;
            globalStateModel.previousParams = null;
        };

        globalStateModel.getDefaultRoute = function () {
            //Bug 25986 - ZSSP, Dashboard is opened when closing a VPG view tab with msg 'ZVM is not responding
            return globalStateModel.data.IsPortal ? 'main.vpgs' : 'main.dashboard';
        };

        globalStateModel._findNextState = function () {
            if (globalStateModel.previousState && globalStateModel.previousState !== 'loading' && globalStateModel.previousState !== 'license' && globalStateModel.previousState !== 'login' && globalStateModel.previousState !== '') {
                return globalStateModel.previousState;
            } else {
                return globalStateModel.getDefaultRoute();
            }
        };

        globalStateModel._getVmId = function (value) {
            var vmId = new vos.VMIdentifier();
            vmId.InternalVmName = value.moref.split(':')[1];
            vmId.ServerIdentifier = new vos.ServerIdentifier();
            vmId.ServerIdentifier.ServerGuid = value.serverGuid;

            return vmId;
        };

        globalStateModel._getVappId = function (value) {
            var vappId = new vos.VAppIdentifier();
            vappId.InternalVAppName = value.moref.split(':')[1];
            vappId.ServerIdentifier = new vos.ServerIdentifier();
            vappId.ServerIdentifier.ServerGuid = value.serverGuid;

            return vappId;
        };

        globalStateModel._startAnalyticsIfConfigured = function () {
            var isGAInZsspEnabled = tweaksService.getTweak(gaTweaks.isZsspEnabled, true);

            zertoServiceFactory.GetAdvancedSiteSettings().then(function (siteSettings) {
                //disable analytics in ZSSP
                if ((siteSettings && siteSettings.IsCallHomeEnabled) || (globalStateModel.data.IsPortal && isGAInZsspEnabled)){
                    $rootScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.START);
                }
            });
        };

        globalStateModel.isIframe = false;
        globalStateModel.iframeData = {};

        return globalStateModel;
    });
