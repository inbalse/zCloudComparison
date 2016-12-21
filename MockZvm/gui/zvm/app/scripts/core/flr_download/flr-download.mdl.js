'use strict';

angular.module('zvmApp.core')
    .factory('flrDownloadModel', function (zertoWizardFactory) {
        var flrDownloadModel = zertoWizardFactory.createModel();

        flrDownloadModel.wizardTitle = 'Flr - Download';
        flrDownloadModel.startWizardTime = new Date();
        flrDownloadModel.isDownloadSuccessfully = false;

        return flrDownloadModel;
    });
