'use strict';

angular.module('zvmApp.core')
    .factory('flrWizardModel', function (zertoWizardFactory) {
        var flrWizardModel = zertoWizardFactory.createModel();

        flrWizardModel.wizardTitle = 'Flr - mount';
        flrWizardModel.startWizardTime = new Date();

        return flrWizardModel;
    });
