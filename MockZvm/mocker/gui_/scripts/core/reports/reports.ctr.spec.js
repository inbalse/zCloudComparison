'use strict';

describe('Reports view controller', function () {
    var controller, testScope, analyticsEventsTypes;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data: {VirtualizationProviderType: null}});
    }));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate, _analyticsEventsTypes_) {
        testScope = $rootScope.$new();
        analyticsEventsTypes = _analyticsEventsTypes_;

        controller = $controller('reportsController', {
            $scope: testScope,
            $translate: $translate
        });
    }));

    it('should have functions defined on scope', function () {
        expect(testScope.handleDropdownClick).toBeDefined();
    });

    it('verify that select report triggers an google analytics event', function () {
        function getSelectedItemIndex(menuItems, textTitle) {
            return _.findIndex(menuItems, function (item) {
                return textTitle === item.title;
            });
        }

        var event = {
                currentTarget: {text: "Outbound Protection Over Time"}
            };
        testScope.menuItems = [
            {
                route: 'main.reports.outboundprotection',
                title: "Outbound Protection Over Time",
                visible: true,
                tooltip: "The amount of data configured for protection vs. the amount of data actually protected to a selected site or to all sites for a selected time range."
            }
        ];

        spyOn(testScope, '$emit');
        testScope.handleDropdownClick(event);
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.REPORTS, event.currentTarget.text, getSelectedItemIndex(testScope.menuItems, event.currentTarget.text));
    });
});
