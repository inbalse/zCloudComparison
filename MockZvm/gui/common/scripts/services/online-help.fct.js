'use strict';

angular.module('zvmApp.services')
    .factory('onlineHelpFactory', function ($window, $translate, globalStateModel, $rootScope) {
        var onlineHelpFactory = {};

        onlineHelpFactory.showHelpPage = function (viewIdentifier) {
            var link = onlineHelpFactory.getLinkFromViewIdentifier(viewIdentifier),
                eventName = 'ANALYTICS::ONLINE_HELP';

            $rootScope.$emit(eventName, {link: link});
            window.open(link, '_blank', 'resizable=1');
        };

        onlineHelpFactory.getLinkFromViewIdentifier = function (viewIdentifier) {
            var prefix = globalStateModel.data && globalStateModel.data.IsPortal ? '/Help/ZSSP/' : '/Help/';
            return prefix + $translate.instant('ONLINE_HELP.' + viewIdentifier);
        };

        return onlineHelpFactory;
    });
