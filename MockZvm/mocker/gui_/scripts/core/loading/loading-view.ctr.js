'use strict';

angular.module('zvmApp.core')
    .controller('loadingViewController', function (loadingViewService, globalStateModel) {
        loadingViewService.getInitialSessionValidation().then(function (result) {
            globalStateModel.init(result);
        });
    });
