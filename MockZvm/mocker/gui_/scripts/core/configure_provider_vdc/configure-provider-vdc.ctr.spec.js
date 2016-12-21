'use strict';

describe('configureProviderVdcControllerTest', function () {
    var controller, scope, data;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _$translate_, _$filter_, _configureProviderVdcFactory_) {
        scope = $rootScope.$new();

        data = {UseOnly: false, Potential: [
            {Datastores: [
                {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                    ServerIdentifier: {ServerGuid: 'gdtsv'}}}
            ], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}},
            {Datastores: [
                {DisplayName: 'lhfrd', Id: {InternalDatastoreName: 'kdeyjdf',
                    ServerIdentifier: {ServerGuid: 'wgjkd'}}}
            ], DisplayName: 'kuydf', Id: {VCDId: 'fdsfsd'}}
        ],
            Current: []};


        controller = $controller('configureProviderVdcController', {$scope: scope,
            result: data,
            $translate: _$translate_,
            configureProviderVdcFactory: _configureProviderVdcFactory_,
            $filter: _$filter_ });
    }));

    it('should init called and check init proccesData', function () {
        expect(scope.init).toHaveBeenCalled;
        expect(scope.data.Potential.length).toEqual(2);
        expect(scope.providerVdcsSelectedItems.length).toEqual(0);
        expect(scope.datastoreGridData.length).toEqual(0);
        expect(scope.datastoreSelectedItems.length).toEqual(0);
    });

    it('should check selected providerVdcs', function () {

        scope.data = {UseOnly: false, Potential: [
            {Datastores: [
                {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                    ServerIdentifier: {ServerGuid: 'gdtsv'}}},
                {DisplayName: 'mmmmm', Id: {InternalDatastoreName: 'nnnnnnn',
                    ServerIdentifier: {ServerGuid: 'jhyum'}}}
            ],
                DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
        ],
            Current: [
                {Datastores: [
                    {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                        ServerIdentifier: {ServerGuid: 'gdtsv'}}}
                ], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
            ]};

        scope.init();

        expect(scope.providerVdcsSelectedItems.length).toEqual(1);
        expect(scope.datastoreGridData.length).toEqual(2);
        expect(scope.datastoreSelectedItems.length).toEqual(1);
    });

    it('should check save button disable while UseOnly is true and no selected datastores', function () {
        scope.data = {UseOnly: true, Potential: [
            {Datastores: [
                {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                    ServerIdentifier: {ServerGuid: 'gdtsv'}}},
                {DisplayName: 'mmmmm', Id: {InternalDatastoreName: 'nnnnnnn',
                    ServerIdentifier: {ServerGuid: 'jhyum'}}}
            ],
                DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
        ],
            Current: [
                {Datastores: [], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
            ]};

        scope.init();

        // no datastoreselected
        expect(scope.IsSaveEnable()).toBeFalsy();
    });

    it('should check save button disable while selected datastore properties (journal, pressed , recovery volumns) are false', function () {
        scope.data = {UseOnly: false, Potential: [
            {Datastores: [
                {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                    ServerIdentifier: {ServerGuid: 'gdtsv'}}},
                {DisplayName: 'mmmmm', Id: {InternalDatastoreName: 'nnnnnnn',
                    ServerIdentifier: {ServerGuid: 'jhyum'}}}
            ],
                DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
        ],
            Current: [
                {Datastores: [
                    {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                        ServerIdentifier: {ServerGuid: 'gdtsv'}}}
                ], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
            ]};

        scope.init();

        scope.datastoreSelectedItems[0].Preseed = scope.datastoreSelectedItems[0].Enable = scope.datastoreSelectedItems[0].Journal = false;

        expect(scope.IsSaveEnable()).toBeFalsy();
    });

    //Error in dismiss function
   /* it('should check save data after changing the current', function () {

        scope.data = {UseOnly: false, Potential: [
            {Datastores: [
                {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                    ServerIdentifier: {ServerGuid: 'gdtsv'}}},
                {DisplayName: 'mmmmm', Id: {InternalDatastoreName: 'nnnnnnn',
                    ServerIdentifier: {ServerGuid: 'jhyum'}}}
            ],
                DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
        ],
            Current: [
                {Datastores: [
                    {DisplayName: 'kkkkk', Id: {InternalDatastoreName: 'llhihnb',
                        ServerIdentifier: {ServerGuid: 'gdtsv'}}}
                ], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}}
            ]};

        scope.init();

        scope.datastoreSelectedItems.push(scope.data.Potential[0].Datastores[1]);

        scope.handleSave();

        expect(scope.data.Current.length).toEqual(1);
        expect(scope.data.Current[0].Datastores.length).toEqual(2);
    });*/

});
