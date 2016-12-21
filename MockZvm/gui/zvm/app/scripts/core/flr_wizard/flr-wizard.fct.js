'use strict';

angular.module('zvmApp.core')
    .factory('flrWizardFactory', function (flrWizardModel, zertoWizardFactory, analyticsEventsTypes, $rootScope) {
        var flrWizardFactory = zertoWizardFactory
            .createFactory('scripts/core/flr_wizard/flr-wizard.html', 'flr-wizard', 'flrWizardController', 'static');

        flrWizardFactory.open = function () {
            flrWizardModel.init().then(flrWizardFactory.show);
        };

        //GA
        flrWizardFactory.sendMountEventToAnalytics = function() {
            $rootScope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_FILE.MOUNT.SEND);
        };
        flrWizardFactory.trackInWizardTimeToAnalytics = function (isSuccess) {
            $rootScope.$emit(analyticsEventsTypes.WIZARD.TIME_SPENT, {
                wizardName: flrWizardModel.wizardTitle,
                secondsInWizards: Math.floor(Math.abs(flrWizardModel.startWizardTime - new Date()) / 1000),
                isSuccess : isSuccess
            });
        };

        return flrWizardFactory.expose();
    });
