'use strict';

describe('multiSiteProtectedVmsServiceSpec', function () {
    var service, createVPGModel, vmsService, vms;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_createVPGModel_, _vmsService_) {
        createVPGModel = _createVPGModel_;
        vmsService = _vmsService_;

        createVPGModel.data = {
            potentialVms: []
        };

        vms = [{
            Id: {InternalVmName: 'test1'},
            ProtectedVmVpgsInfo: {isProtected: false}
        }, {Id: {InternalVmName: 'test2'}, ProtectedVmVpgsInfo: {isProtected: false}}, {
            Id: {InternalVmName: 'test3'},
            ProtectedVmVpgsInfo: {isProtected: false}
        }, {Id: {InternalVmName: 'test4'}, ProtectedVmVpgsInfo: {isProtected: true}}, {
            Id: {InternalVmName: 'test5'},
            ProtectedVmVpgsInfo: {isProtected: true}
        }];

    }));

    beforeEach(inject(function (_multiSiteProtectedVmsService_) {
        service = _multiSiteProtectedVmsService_;
    }));

    it('should verify that all variables and function defined', function () {
        expect(service._private.getColumnsDef).toBeDefined();
        expect(service.getColumnOptions).toBeDefined();
        expect(service.getCustomFilterDef).toBeDefined();
        expect(service.getGridDataAfterFilterData).toBeDefined();
    });

    it('should check num of grid columns', function () {
        var numOfColumns = service._private.getColumnsDef().length;
        expect(numOfColumns).toEqual(6);
    });

    it('should check column options', function () {
        var columnObj = {
            showCheckbox: true,
            showSearch: true,
            columns: service._private.getColumnsDef(),
            defaultSortField: 'DisplayName'
        };

        expect(columnObj).toEqual(service.getColumnOptions());
    });

    it('should check filter function', function () {
        var filterOptions = service.getCustomFilterDef();
        service.setAllPotentialsVms(vms);

        expect(service.getGridDataAfterFilterData(filterOptions[0]).length).toEqual(5);
        expect(service.getGridDataAfterFilterData(filterOptions[1]).length).toEqual(3);
        expect(service.getGridDataAfterFilterData(filterOptions[2]).length).toEqual(2);
    });
});
