'use strict';

angular.module('zvmApp.core')
    .service('loadingViewService', function ($q, zertoServiceFactory, vos, basil, globalStateModel, amf, zertoApi, zertoLoggerServiceFactory) {

        var loadingViewService = this;

        var initialLoadingAndGetSessionId = function () {

            var sessionId = new vos.SessionIdentifier();
            sessionId.ServerIdentifier = new vos.ServerIdentifier();

            //todo create better setter
            if (globalStateModel.data === null) {
                //default isPortal set if login from login view
                globalStateModel.setIsPortalFlag(false);
            }

            if (globalStateModel.isIframe) {
                sessionId.InternalIdentifier = globalStateModel.iframeData.sessionId;
                sessionId.ServerIdentifier.ServerGuid = globalStateModel.iframeData.serverGuid !== '' ? globalStateModel.iframeData.serverGuid : '00000000-0000-0000-0000-000000000000';
            } else if (globalStateModel.data.IsPortal) {
                sessionId.InternalIdentifier = globalStateModel.portalData ? globalStateModel.portalData.sessionId : globalStateModel.getSessionId();
            } else if (globalStateModel.isvSphere) {
                sessionId.InternalIdentifier = globalStateModel.vSphereData.sessionId.replace(/%22/g, '');
            } else {
                sessionId.InternalIdentifier = globalStateModel.getSessionId();
                if (!sessionId.InternalIdentifier) {
                    sessionId.InternalIdentifier = '00000000-0000-0000-0000-000000000000';
                }
            }

            //BE has to have this header when using amf.
            amf.addHeader('DSRemoteCredentials', btoa(':' + sessionId.InternalIdentifier));
            zertoApi.addHeaders({'x-zerto-session': sessionId.InternalIdentifier});

            return sessionId;
        };

        var setSessionBySiteType = function (result, sessionId) {
            if (result.IsPortal && globalStateModel.portalData) {
                //if its a portal first try to see if the session id is in the query string
                amf.addHeader('DSRemoteCredentials', btoa(':' + globalStateModel.portalData.sessionId));
                zertoApi.addHeaders({'x-zerto-session': globalStateModel.portalData.sessionId});
                basil.set('zertoSessionIdentifier', globalStateModel.portalData.sessionId);
                globalStateModel.setSessionId(globalStateModel.portalData.sessionId, true);
            } else if (globalStateModel.iframeData && globalStateModel.iframeData.sessionId) {
                amf.addHeader('DSRemoteCredentials', btoa(':' + globalStateModel.iframeData.sessionId));
                zertoApi.addHeaders({'x-zerto-session': globalStateModel.iframeData.sessionId});
            } else {
                amf.addHeader('DSRemoteCredentials', btoa(':' + sessionId.InternalIdentifier));
                zertoApi.addHeaders({'x-zerto-session': sessionId.InternalIdentifier});
            }
        };


        loadingViewService.getInitialSessionValidation = function () {
            var sessionId = initialLoadingAndGetSessionId(),
                deferred = $q.defer();

            zertoServiceFactory.GetInitialSessionValidation(sessionId).then(function (result) {
                if (result.IsSessionValid) {
                    setSessionBySiteType(result, sessionId);
                }

                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
                zertoLoggerServiceFactory.logError('GetInitialSessionValidation', sessionId, error);
            });

            return deferred.promise;
        };

        loadingViewService._private = {
            initialLoadingAndGetSessionId: initialLoadingAndGetSessionId,
            setSessionBySiteType: setSessionBySiteType
        };
    });
