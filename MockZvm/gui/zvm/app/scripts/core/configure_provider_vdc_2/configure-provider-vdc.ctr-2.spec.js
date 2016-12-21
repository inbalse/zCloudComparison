'use strict';


describe('configureProviderVdcController2Test', function () {
    var popupController, scope, popupScope, data;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope) {
        popupScope = $rootScope.$new();

        data = {
            UseOnly: false,
            Potential: [
                {
                    Datastores: [
                        {
                            DisplayName: 'kkkkk', Id: {
                            InternalDatastoreName: 'llhihnb',
                            ServerIdentifier: {ServerGuid: 'gdtsv'}
                        }
                        },
                        {
                            DisplayName: 'mmmmm', Id: {
                            InternalDatastoreName: 'nnnnnnn',
                            ServerIdentifier: {ServerGuid: 'jhyum'}
                        }
                        }
                    ],
                    DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}
                }
            ],
            Current: [
                {
                    Datastores: [
                        {
                            DisplayName: 'kkkkk', Id: {
                            InternalDatastoreName: 'llhihnb',
                            ServerIdentifier: {ServerGuid: 'gdtsv'}
                        }
                        }
                    ], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}
                }
            ]
        };
        popupController = $controller('configureProviderVdcControllerPopup', {
            $scope: popupScope,
            result: data
        });
        scope = popupScope.$new();
    }));

    it('should init called and check init proccesData', function () {
        expect(scope.potentialProviders.length).toEqual(0);
        expect(scope.configureProviderVdcFactory.currentProviders.length).toEqual(1);
        expect(scope.potentialDatastores.length).toEqual(1);
        expect(scope.configureProviderVdcFactory.currentDatastores.length).toEqual(1);
    });

    it('should check if remove action enable', function () {
        expect(scope.isRemoveProviderEnable).toBeFalsy();
        expect(scope.isRemoveDatastoreEnable).toBeFalsy();
    });

    it('should check save button disable while selected datastore properties (journal, pressed , recovery volumns) are false', function () {
        scope.data = {
            UseOnly: false, Potential: [
                {
                    Datastores: [
                        {
                            DisplayName: 'kkkkk', Id: {
                            InternalDatastoreName: 'llhihnb',
                            ServerIdentifier: {ServerGuid: 'gdtsv'}
                        }
                        },
                        {
                            DisplayName: 'mmmmm', Id: {
                            InternalDatastoreName: 'nnnnnnn',
                            ServerIdentifier: {ServerGuid: 'jhyum'}
                        }
                        }
                    ],
                    DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}
                }
            ],
            Current: [
                {
                    Datastores: [
                        {
                            DisplayName: 'kkkkk', Id: {
                            InternalDatastoreName: 'llhihnb',
                            ServerIdentifier: {ServerGuid: 'gdtsv'}
                        }
                        }
                    ], DisplayName: 'ooooo', Id: {VCDId: 'iokspdb'}
                }
            ]
        };

        scope.init();

        scope.configureProviderVdcFactory.currentDatastores[0].Preseed = scope.configureProviderVdcFactory.currentDatastores[0].Enable = scope.configureProviderVdcFactory.currentDatastores[0].Journal = false;

        expect(scope.IsSaveEnable()).toBeFalsy();
    });
});

