'use strict';

describe('navigationTabsFactory', function () {
    var factory;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_navigationTabsFactory_) {
        factory = _navigationTabsFactory_;
        factory.dynamicTabs = [
            {id: '1', active: false},
            {id: '2', active: false},
            {id: '3', active: false}
        ];

        factory.dynamicTabsAdded = function(){};
    }));

    it('should have functions defined', function () {
        expect(factory.dynamicTabs).toBeDefined();
        expect(factory.addTab).toBeDefined();
        expect(factory.removeTab).toBeDefined();
        expect(factory.selectTab).toBeDefined();
        expect(factory.getTab).toBeDefined();
    });

    it('should add tab properly', function () {
        factory.addTab({id: '1'});
        expect(factory.dynamicTabs.length).toEqual(3);
        factory.addTab({id: '4'});
        expect(factory.dynamicTabs.length).toEqual(4);
    });

    it('should remove tab', function () {
        factory.removeTab('1');
        expect(factory.dynamicTabs).toEqual([
            {id: '2', active: false},
            {id: '3', active: false}
        ]);
    });

    it('should select tab', function () {
        factory.selectTab('1');
        expect(factory.dynamicTabs[0].active).toBeTruthy();
    });

    it('should get tab', function () {
        expect(factory.getTab('1')).toEqual({id: '1', active: false});
    });
});
