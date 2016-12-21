'use strict';

angular.module('zvmApp.core')
    .service('createVpgRecoveryScriptsService', function (vpgService) {
        var createVpgRecoveryScriptsService = this;

        createVpgRecoveryScriptsService.getPreRecoveryScripts = function () {
            return vpgService.getScriptingSettings().PreRecoveryScript;

        };
        createVpgRecoveryScriptsService.getPostRecoveryScripts = function () {
            return vpgService.getScriptingSettings().PostRecoveryScript;
        };

        createVpgRecoveryScriptsService.setPreRecoveryScripts = function (preRecoverySettings) {
            var tempSettings = vpgService.getScriptingSettings();
            tempSettings.PreRecoveryScript = preRecoverySettings;
            vpgService.setScriptingSettings(tempSettings);
        };

        createVpgRecoveryScriptsService.setPostRecoveryScripts = function (postRecoverySettings) {
            var tempSettings = vpgService.getScriptingSettings();
            tempSettings.PostRecoveryScript = postRecoverySettings;
            vpgService.setScriptingSettings(tempSettings);
        };
    });
