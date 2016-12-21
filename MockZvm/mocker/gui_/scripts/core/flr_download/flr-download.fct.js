'use strict';

angular.module('zvmApp.core')
    .factory('flrDownloadFactory', function (flrDownloadModel, flrDownloadSettingsModel, zertoWizardFactory, $rootScope, analyticsEventsTypes) {
        var flrDownloadFactory = zertoWizardFactory.createFactory('scripts/core/flr_download/flr-download.html', 'flr-download', 'flrDownloadController', 'static');

        flrDownloadFactory.open = function (sessionId, vpgIdentifier) {
            flrDownloadSettingsModel.model.sessionId = sessionId;
            flrDownloadSettingsModel.model.vpgIdentifier = vpgIdentifier;
            flrDownloadModel.init().then(function () {
                $rootScope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_FILE.DOWNLOAD.INITIAL);
                flrDownloadFactory.show();
            });
        };

        //GA
        flrDownloadFactory.sendEventToAnalytics = function (paths, totalSize) {
            var gaEventData = {};

            try {
                gaEventData.paths = paths;
                gaEventData.totalSize = totalSize;
            }
            catch (e) {
                gaEventData = {};
            }
            $rootScope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_FILE.DOWNLOAD.SEND, gaEventData);
        };
        flrDownloadFactory.trackInWizardTimeToAnalytics = function (isSuccess) {
            var gaEventData = {};

            try {
                gaEventData.wizardName = flrDownloadModel.wizardTitle;
                gaEventData.secondsInWizards = Math.floor(Math.abs(flrDownloadModel.startWizardTime - new Date()) / 1000);
                gaEventData.isSuccess = isSuccess;
            }
            catch (e) {
                gaEventData = {};
            }

            $rootScope.$emit(analyticsEventsTypes.WIZARD.TIME_SPENT, gaEventData);
        };

        return flrDownloadFactory.expose();
    });

