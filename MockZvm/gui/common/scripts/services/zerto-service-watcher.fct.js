'use strict';

angular.module('zvmApp.services')
    .factory('zertoServiceWatcherFactory', function ($state, $translate, tweaksService, zAlertFactory, guiVisibleException) {
        var zertoServiceWatcher = {
            _accumulatedFaults: 0,
            _accumulatedTimeMS: 0,
            _lastTimeMS: 0,
            _timeThreshold: tweaksService.getTweak('t_timeThreshold', 35000),
            _faultsThreshold: tweaksService.getTweak('t_faultsThreshold', 6),
            _showServiceFailure: true
        };

        var _displayed = {};

        var errorHandler = function errorHandler(title, description, callback, buttons) {
            buttons = buttons || [zAlertFactory.buttons.OK];
            if (!_displayed[description]){
                _displayed[description] = true;
                zAlertFactory.fail(title, description, function(){
                    _displayed[description] = false;
                    if (callback){
                        callback();
                    }
                } , buttons);
            }
        };

         zertoServiceWatcher.serviceFaultHandler = function (event, isPortal) {
            if (event && !zertoServiceWatcher.stateBeingChanged) {
                switch (event.faultString) {
                    case guiVisibleException.INVALID_USERNAME_OR_PASSWORD_MESSAGE:
                        return; // Don't count as an error
                    case guiVisibleException.LICENSE_EXCEPTION:
                        if (isPortal) {
                            errorHandler($translate.instant('EXCEPTIONS.PORTAL_NOT_AVAILABLE.TITLE'),
                                         $translate.instant('EXCEPTIONS.PORTAL_NOT_AVAILABLE.DESC'),
                                         zertoServiceWatcher._handleClose);
                        } else {
                            errorHandler($translate.instant('EXCEPTIONS.LICENSE_TITLE'),
                                $translate.instant('EXCEPTIONS.LICENSE_ERROR'));
                            $state.go('license');
                        }
                        return;
                    case guiVisibleException.PERMISSION_TASK_DENIED:
                    case guiVisibleException.PERMISSION_DENIED:

                        //following the bug 27569 reset the _displayed obj when catch the exception from BE
                        if (_displayed[guiVisibleException.PERMISSION_TASK_DENIED]){
                            _displayed[guiVisibleException.PERMISSION_TASK_DENIED] = false;
                        }

                        errorHandler($translate.instant('EXCEPTIONS.PERMISSION_TITLE'),
                        $translate.instant('EXCEPTIONS.PERMISSION_ERROR'));
                        return;
                    case guiVisibleException.VCENTER_SESSION_EXPIRED:
                    case guiVisibleException.INVALID_SESSION_MESSAGE:
                        $state.go('login');
                        return;
                }

                if (event.faultString.indexOf(guiVisibleException.SESSION_EXPIRED) !== -1 ||
                    event.faultString.indexOf(guiVisibleException.UNDETERMINED_SESSION) !== -1 ||
                    event.faultString.indexOf(guiVisibleException.ZSSP_SESSION_EXPIRED) !== -1) {
                    $state.go('login');
                    return;
                }

                if (event.faultString.indexOf(guiVisibleException.ZORG_SESSION_INVALID) !== -1 ||
                    event.faultString.indexOf(guiVisibleException.ZORG_SESSION_EXPIRED) !== -1) {

                    errorHandler($translate.instant('ZSSP_VPG.WARNING'),
                        $translate.instant('ZSSP_VPG.WARNING_TEXT'));
                    $state.go('login');
                    return;
                }
            }

            zertoServiceWatcher.addFaultToCount();
        };

        zertoServiceWatcher._handleClose = function () {
            $state.go($state.$current, null, {reload: true});
        };

        zertoServiceWatcher.addFaultToCount = function () {
            var nowMS = new Date().getTime();
            zertoServiceWatcher._accumulatedFaults++;

            if (zertoServiceWatcher._accumulatedFaults === 1) {
                zertoServiceWatcher._accumulatedTimeMS = 0;
            } else {
                zertoServiceWatcher._accumulatedTimeMS += (nowMS - zertoServiceWatcher._lastTimeMS );
            }
            zertoServiceWatcher._lastTimeMS = nowMS;

            if (zertoServiceWatcher._accumulatedFaults >= zertoServiceWatcher._faultsThreshold) {
                zertoServiceWatcher._accumulatedFaults = 0;
                if (zertoServiceWatcher._accumulatedTimeMS < zertoServiceWatcher._timeThreshold) {
                    if (zertoServiceWatcher._showServiceFailure) {
                        errorHandler($translate.instant('EXCEPTIONS.MANAGER_NOT_RESPONDING.TITLE'),
                            $translate.instant('EXCEPTIONS.MANAGER_NOT_RESPONDING.DESC'),
                            zertoServiceWatcher._handleClose, [zAlertFactory.buttons.REFRESH]);
                    }
                }
            }
        };

        return zertoServiceWatcher;
    })
;
