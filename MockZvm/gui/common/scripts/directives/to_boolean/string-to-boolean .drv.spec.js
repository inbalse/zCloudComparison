'use strict';

describe('toBooleanDirective', function () {
    var elementHTML, scope, element;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $compile) {
        elementHTML = angular.element('<select ng-model="data" required="" string-to-boolean>' +
            '<option ng-repeat="item in items" value="{{item.value}}">' +
            '{{item.label}}' +
            '</option>' +
            '</select>');

        scope = $rootScope.$new();
        scope.data = true;
        scope.items = [
            {value: true, label: 'Yes'},
            {value: false, label: 'No'}
        ];
        element = $compile(elementHTML)(scope);
        scope.$digest();
    }));

    it('should return a boolean value', function () {
        expect(scope.data).toEqual(true);
    });
});
