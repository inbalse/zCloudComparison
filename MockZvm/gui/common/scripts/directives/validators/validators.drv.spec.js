'use strict';

describe('validators', function () {
    var scope, element, compile, form;
    beforeEach(module('zvmTest'));


    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope;
        compile = $compile;

        element = angular.element(
            '<form name="form">' +
            '<input type="email" name="senderAccount" ng-model="model.from" email-empty-or-valid/>' +
            '<input type="text" name="sendTo" ng-model="model.addresses" to-addresses-empty-or-valid/>' +
            '</form>');

        scope.model = {
            port: 25, from: 'asd@asd.com', addresses: [
                {ToAddress: 'asd@asd.com'}
            ]
        };

        compile(element)(scope);

        scope.$digest();
        form = scope.form;
    }));

    describe('email can be empty or email', function () {
        it('should pass with empty', function () {
            form.senderAccount.$setViewValue('');
            expect(scope.model.from).toEqual('');
            expect(form.senderAccount.$valid).toBeTruthy();
        });
        it('should pass with email', function () {
            form.senderAccount.$setViewValue('zxc@zxc.com');
            expect(scope.model.from).toEqual('zxc@zxc.com');
            expect(form.senderAccount.$valid).toBeTruthy();
        });
    });

    describe('addresses can be empty or split by ;', function () {
        it('should pass with empty', function () {
            form.sendTo.$setViewValue('');
            expect(scope.model.addresses).toEqual([]);
            expect(form.sendTo.$valid).toBeTruthy();
        });
        it('should pass with spilt', function () {
            form.sendTo.$setViewValue('asd@asd.com;qwe@asd.ccom');
            expect(scope.model.addresses).toEqual([
                {ToAddress: 'asd@asd.com'},
                {ToAddress: 'qwe@asd.ccom'}
            ]);
            expect(form.sendTo.$valid).toBeTruthy();
        });
        it('should not pass with any other values that not an emails', function () {
            form.sendTo.$setViewValue('asd');
            expect(scope.model.addresses).toEqual(undefined);
            expect(form.sendTo.$valid).toBeFalsy();

            form.sendTo.$setViewValue('asd@');
            expect(scope.model.addresses).toEqual(undefined);
            expect(form.sendTo.$valid).toBeFalsy();

            form.sendTo.$setViewValue('asd@dsaf');
            expect(scope.model.addresses).toEqual(undefined);
            expect(form.sendTo.$valid).toBeFalsy();

            form.sendTo.$setViewValue('asd');
            expect(scope.model.addresses).toEqual(undefined);
            expect(form.sendTo.$valid).toBeFalsy();

            form.sendTo.$setViewValue('asd@asd.com;asd');
            expect(scope.model.addresses).toEqual(undefined);
            expect(form.sendTo.$valid).toBeFalsy();
        });

        it('should properly format data from model', function () {
            scope.model = {
                port: 25,
                from: 'asd@asd.com',
                addresses: [{ToAddress: 'asd@asd.com'}, {ToAddress: 'asd@asd.com'}, {ToAddress: 'asd@asd.com'}]
            };

            scope.$apply();

            expect(form.sendTo.$viewValue).toEqual('asd@asd.com;asd@asd.com;asd@asd.com');
            expect(form.sendTo.$valid).toBeTruthy();
        });
    })
});
