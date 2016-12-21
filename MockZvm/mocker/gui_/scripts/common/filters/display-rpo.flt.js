'use strict';
angular.module('zvmApp.filters')
    .filter('displayRPO', function ($filter,vpgCardDisplayRpoConstants) {
        return function (rpo) {
            if (rpo <= vpgCardDisplayRpoConstants.MIN_RPO || rpo >= vpgCardDisplayRpoConstants.MAX_RPO) {
                return 'NA'
            }

            var filteredRpo = $filter('zTimeSecondsFormatter')(rpo, 'HH:MM:SS', false, true);
            return rpo < 10 ? filteredRpo.replace(/^0+/, '') : filteredRpo;
        };
    });