'use strict';

describe('zUniqueValid', function () {
    var scope, element, compile, position, form;
    beforeEach(function () {
        module('zvmTest');
        module('ui.bootstrap')
    });

    beforeEach(inject(function ($rootScope, $compile, $uibPosition) {
        scope = $rootScope;
        compile = $compile;
        position = $uibPosition;

        element = angular.element(
            '<form name="form">' +
            '<input required type="text" maxLength="20" ng-model="model" placeholder="Enter Name" ' +
            'data-collection="data.viewByValues" data-property-name="text" data-asterisk="true" data-error-message="View name already exists" data-placement="top" z-unique-valid/>' +
            '</form>');

        scope.collection = [{"id":"General","text":"General","$$hashKey":"00S"},{"id":"Performance","text":"Performance","$$hashKey":"00T"},{"id":"Backup","text":"Backup","$$hashKey":"00U"}];
        scope.propertyName = 'text';

        compile(element)(scope);

        scope.isValueExist = function(value) {
            return !_.contains(_.pluck(scope.collection, scope.propertyName), value);
        };

        scope.$digest();
        form = scope.form;
    }));

    it('should have property to be defined or not defined', function () {
        expect(scope.model).not.toBeDefined();
        expect(scope.collection).toBeDefined();
        expect(scope.propertyName).toBeDefined();
        expect(position.positionElements).toBeDefined();
    });

    it('should pass with empty', function () {
        form.$setValidity();
        expect(scope.model).not.toBeDefined();
        expect(form.$valid).toBeFalsy();
    });

    it('should pass with value not exists (valid)', function () {
        scope.model = 'test';
        scope.$digest();

        form.$setValidity('zInputValidation', scope.isValueExist(scope.model));
        expect(scope.model).toEqual('test');
        expect(form.$valid).toBeTruthy();
    });

    it('should pass with value that already exists (invalid)', function () {
        scope.model = 'General';
        scope.$digest();

        form.$setValidity('zInputValidation', scope.isValueExist(scope.model));
        expect(scope.model).toEqual('General');
        expect(form.$valid).toBeFalsy();
    });
});
