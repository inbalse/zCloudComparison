'use strict';

describe('restoreVmSettingsController', function () {
    var controller, scope, restoreWizardModel, restoreBulkEditFactory, zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, vos, _restoreWizardModel_, _restoreBulkEditFactory_, _zertoServiceFactory_) {
        restoreBulkEditFactory = _restoreBulkEditFactory_;
        restoreWizardModel = _restoreWizardModel_;
        zertoServiceFactory = _zertoServiceFactory_;
        scope = $rootScope.$new();
        restoreWizardModel.data = {
            selectedItems: [
                {SiteIdentifier: new vos.SiteIdentifier('GUID')},
            ],
            restoreHost: {BaseComputeResourceIdentifier: 'BaseComputeResourceIdentifier'},
            restoreConfiguration: {
                Configuration: {VirtualMachines: [
                    {},
                    {}
                ]},
                PotentialRestoreMainEntities: {PotentialComputeResources: []}
            },
            potentialRestoreSecondaryEntities: {Datastores: []}
        };

        controller = $controller('restoreVmSettingsController', {$scope: scope, restoreWizardModel: restoreWizardModel, restoreBulkEditFactory: restoreBulkEditFactory, zertoServiceFactory: zertoServiceFactory});
        scope.grid.updateData = function () {
        };
        scope.data = restoreWizardModel.data;
        spyOn(scope.grid, 'updateData').and.callThrough();
    }));

    it('should have variables and functions defined', function () {
        expect(scope.isHyperV).toBeDefined();
        expect(scope.data).toBeDefined();
        expect(scope.grid).toBeDefined();
        expect(scope.selectedVmSettings).toBeDefined();
        expect(scope.potentialsForDatastores).toBeDefined();
        expect(scope.potentialsForHosts).toBeDefined();
        expect(scope.restoreVmsSettingsColumnDefs).toBeDefined();
        expect(scope.restoreVmsSettingsCustomOptions).toBeDefined();
        expect(scope.handleApplyVPGConfigurationClick).toBeDefined();
        expect(scope.handleEditSelectedClick).toBeDefined();
        expect(scope.getPotentialHosts).toBeDefined();
        expect(scope.selectedVmSettingsChange).toBeDefined();
        expect(scope.onRestoreHostChanged).toBeDefined();
        expect(scope.onRestoreDatastoreChanged).toBeDefined();
        expect(scope.onVCenterPotentialsResult).toBeDefined();
        expect(scope.updateGrid).toBeDefined();
    });

    it('should open bulk editor', function () {
        spyOn(restoreBulkEditFactory, 'openEdit').and.callThrough();

        scope.selectedVmSettings = {};
        scope.handleEditSelectedClick();

        expect(restoreBulkEditFactory.openEdit).toHaveBeenCalledWith({}, []);
    });

    it('should call zertoservice, apply host and update grid when host changed', function () {
        spyOn(zertoServiceFactory, 'GetVCenterPotentialRestoreSecondaryEntities').and.callThrough();
        spyOn(restoreWizardModel, 'applyHostToAll').and.callThrough();
        spyOn(scope, 'updateGrid').and.callThrough();
        scope.onRestoreHostChanged();

        expect(angular.equals(zertoServiceFactory.GetVCenterPotentialRestoreSecondaryEntities.calls.argsFor(0),
            [{SiteGuid: 'GUID'}, 'BaseComputeResourceIdentifier'])).toBeTruthy();
        expect(angular.equals(restoreWizardModel.applyHostToAll.calls.argsFor(0),
            [{BaseComputeResourceIdentifier: 'BaseComputeResourceIdentifier'}])).toBeTruthy();;
        expect(scope.updateGrid).toHaveBeenCalled();
    });

    it('should set data on restore host result', function () {
        scope.onVCenterPotentialsResult({Datastores: []});
        expect(scope.data.potentialRestoreSecondaryEntities).toEqual({Datastores: []});
        expect(scope.potentialsForDatastores).toEqual([]);
    });


    it('should reset the restore datastore when changing host', function(){
        restoreWizardModel.data.getVCenterPotentialRestoreSecondaryEntities = angular.noop;

        scope.data.restoreDatastore  = {"Datastore":{"Id":{"InternalDatastoreName":"datastore-11","ServerIdentifier":{"ServerGuid":"3549b9e2-ec00-4037-844b-d7b4c9f350cf"}},"DatastoreClusterIdentifier":null,"DisplayName":"BA8BL01-1314_VNX_DS","value":"BA8BL01-1314_VNX_DS"},"IsEnabled":true,"$$hashKey":"054"};
        scope.onRestoreHostChanged();

        expect(scope.data.restoreDatastore).toBeNull();

    });
    //it('should call apply datastore when changed to model and update grid', function () {
    //    scope.data.restoreDatastore = {Id: 'id'};
    //
    //    spyOn(restoreWizardModel, 'applyDatastoreToAll').and.callThrough();
    //    spyOn(scope, 'updateGrid').and.callThrough();
    //
    //    scope.onRestoreDatastoreChanged();
    //
    //    expect(restoreWizardModel.applyDatastoreToAll).toHaveBeenCalledWith({Id: 'id'});
    //    expect(scope.updateGrid).toHaveBeenCalled();
    //});

});
