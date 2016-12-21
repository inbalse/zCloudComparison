'use strict';

//todo fix template url after separate to solutions zvm/zcm

xdescribe('journalLimitDirective', function () {
    var element, scope, enums;

    beforeEach(module('zvmTest'));

    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, $compile, _enums_) {
        var sc = $rootScope;
        enums = _enums_;
        sc.value = {Limit: 1, Type: enums.JournalLimitType.Megabytes};
        element = angular.element('<journal-limit value="value"></journal-limit>');
        $compile(element)(sc);
        scope = element.scope();
        scope.$digest();
        scope = scope.$$childHead;
    }));

    it('should compile', function () {
        expect(scope.settings).toBeDefined();
    });

    it('should have predefined settins', function () {
        expect(scope.settings.min).toEqual(10);
        expect(scope.settings.max).toEqual(Infinity);
        expect(scope.settings.sign).toEqual('GB');
    });

    it('should change the sign property when the value.Type is changed', function () {
        expect(scope.settings.sign).toBe('GB');
        scope.value.Type = enums.JournalLimitType.Percentage;
        scope.$digest();
        expect(scope.settings.sign).toBe('%');
    });

    it('should change the sign max when the value.Type is changed', function () {
        expect(scope.settings.max).toBe(Infinity);
        scope.value.Type = enums.JournalLimitType.Percentage;
        scope.$digest();
        expect(scope.settings.max).toBe(Infinity);
    });

    it('should change the sign min when the value.Type is changed', function () {
        expect(scope.settings.min).toBe(10);
        scope.value.Type = enums.JournalLimitType.Percentage;
        scope.$digest();
        expect(scope.settings.min).toBe(1);
    });

});
