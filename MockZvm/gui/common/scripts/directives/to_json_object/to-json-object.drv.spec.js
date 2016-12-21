'use strict';

describe('toJsonObjectDirective', function () {
    var elementHTML, scope, element;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $compile, $templateCache) {
        elementHTML = angular.element('<select ng-model="data" required="" to-json-object>' +
            '<option ng-repeat="item in items" value="{{item.value}}">' +
            '{{item.label}}' +
            '</option>' +
            '</select>');

        scope = $rootScope.$new();
        scope.data = {value: 1, label: '1'};
        scope.items = [
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
            {value: 4, label: '4'}
        ];
        element = $compile(elementHTML)(scope);
        scope.$digest();
    }));

    it('should compile and not have $$hashKey because of the angular.toJson', function () {
        expect(scope.data).toEqual({value: 1, label: '1'});
    });
});
