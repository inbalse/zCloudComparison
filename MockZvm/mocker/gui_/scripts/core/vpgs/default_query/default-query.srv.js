'use strict';
angular.module('zvmApp.services')
    .constant('defaultQueryConstants', {
        PERSONAL_QUERY: 'personalQuery'
    })
    .factory('defaultQueryService', function (enums, zNotificationService, zNotificationConstant, vpgsCardsModel, basil, zTabsStateService, zTabsStateConstants,
                                              defaultQueryConstants) {
        var defaultQueryService = {},
            defaultQueryNotifier = zNotificationService.getNotifier(zNotificationConstant.RUN_DEFAULT_QUERY),
            personalQueryNotifier = zNotificationService.getNotifier(zNotificationConstant.RUN_PERSONAL_QUERY);

        defaultQueryService.isPersonalQueryMissing = function () {
            return _.isNullOrUndefined(basil.get(defaultQueryConstants.PERSONAL_QUERY));
        };

        defaultQueryService.getDefaultQueryNotifier = function () {
            return defaultQueryNotifier;
        };

        defaultQueryService.getPersonalQueryNotifier = function () {
            return personalQueryNotifier;
        };

        defaultQueryService.runDefaultQuery = function () {
            defaultQueryNotifier.notify({key: zNotificationConstant.RUN_DEFAULT_QUERY});
        };

        defaultQueryService.getPersonalQuery = function () {
            return basil.get(defaultQueryConstants.PERSONAL_QUERY);
        };

        defaultQueryService.setPersonalQuery = function (personalQuery) {
            basil.set(defaultQueryConstants.PERSONAL_QUERY, personalQuery);
        };

        defaultQueryService.runPersonalQuery = function () {
            var personalQuery = defaultQueryService.getPersonalQuery();
            personalQueryNotifier.notify({key: zNotificationConstant.RUN_PERSONAL_QUERY, value: personalQuery});
        };

        defaultQueryService.saveCurrentQuery = function () {
            var personalQuery = {
                filters: zTabsStateService.getTabFilters(zTabsStateConstants.LIST.VPGS),
                sort: zTabsStateService.getTabSort(zTabsStateConstants.LIST.VPGS) || vpgsCardsModel.getDefaultSortBy(),
                groupBy: zTabsStateService.getTabGroupBy(zTabsStateConstants.LIST.VPGS)
            };
            defaultQueryService.setPersonalQuery(personalQuery);
        };

        return defaultQueryService;
    });


