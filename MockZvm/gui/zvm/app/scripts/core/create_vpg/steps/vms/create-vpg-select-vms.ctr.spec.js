'use strict';

describe('createVPGSelectVMsController', function () {
    var scope, controller, createSelectVmsService, vmsService, vpgService, createVPGModel, _rootScope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope,_createVPGModel_, _vpgService_, _vmsService_) {
        _rootScope = $rootScope;
        scope = $rootScope.$new();
        vmsService = _vmsService_;
        vpgService = _vpgService_;
        createVPGModel = _createVPGModel_;

        createVPGModel.data = {
            sourceSiteType: {
                sourceType: 1
            },
            tmpVpgSettings: {
                vms: null
            },
            isReverseMode: false
        };
        createVPGModel.initialSitesInfo = {};

        inject(function (_createSelectVmsService_){
            createSelectVmsService = _createSelectVmsService_;
        });

        controller = $controller('createVPGSelectVMsController', {
            $scope: scope,
            createSelectVmsService: createSelectVmsService,
            vmsService: vmsService,
            vpgService: vpgService
        });

        scope.gridObj = {
            potentialsGrid: { updateData: function () {},
                updateSelectedItems: function () {},
                setSelectedRows: function () {}
            },
            selectedVMsGrid: { updateData: function () {},
                updateSelectedItems: function () {}
            }
        };

        spyOn(scope, '$watch').and.callThrough();
        spyOn(scope, '$emit').and.callThrough();
    }));

    it('should have props and funcs defined', function () {
        expect(scope.forms).toBeDefined();
        expect(scope.vcdVMsSize).toBeDefined();
        expect(scope.vcVMsSize).toBeDefined();
        expect(scope.checkedSelectedVms).toBeDefined();
        expect(scope.checkedPotentialVms).toBeDefined();
        expect(scope.selectedVcdVappsVMsGrid).toBeDefined();
        expect(scope.isVappDropdownEnabled).toBeDefined();
        expect(scope.selectedVms).toBeDefined();

        expect(scope.data.potentialVms).toBeDefined();
        expect(scope.data.selectedVcdVappVMs).toBeDefined();
        expect(scope.data.sourceSiteType).toBeDefined();
        expect(scope.data.isReverse).toBeDefined();

        expect(scope.vcType).toBeDefined();
        expect(scope.vcdVappType).toBeDefined();
        expect(scope.isShowVcTitle).toBeDefined();
        expect(scope.isShowVcdTitle).toBeDefined();
        expect(scope.partialViews).toBeDefined();

        expect(scope.potentialColumnOptions).toBeDefined();
        expect(scope.selectedGridRowClick).toBeDefined();
        expect(scope.selectedColumnOptions).toBeDefined();
        expect(scope.vcdVappVmsColumnOptions).toBeDefined();
        expect(scope.multiTargetExpandCollapseClicked).toBeDefined();
        expect(scope.setSelectedVcdVapp).toBeDefined();
        expect(scope.handleSourceTypeChange).toBeDefined();
        expect(scope.gridSelectionChange).toBeDefined();
        expect(scope.handleRemoveSelectedVmsClick).toBeDefined();
        expect(scope.handleRightButtonClick).toBeDefined();
        expect(scope.updateGridDataAndSelection).toBeDefined();
        expect(scope.handleBootOrderClicked).toBeDefined();

        expect(scope.gridSelectionChange).toBeDefined();
        expect(scope.clearDefaults).toBeDefined();
        expect(scope.setSelectedVcdVapp).toBeDefined();
        expect(scope.handelArrowsClickToMoveVms).toBeDefined();
    });


    it('should properly move vms from selected back to potentials', function () {
        var checkedSelectedVms = [{Id: {InternalVmName: 'test1'}, ProtectedVmVpgsInfo : {isProtected: false}}, {Id: {InternalVmName: 'test2'}, ProtectedVmVpgsInfo : {isProtected: false}}];
        var potentialVms = [{Id: {InternalVmName: 'test4'}, ProtectedVmVpgsInfo : {isProtected: false}}];

        scope.checkedSelectedVms = checkedSelectedVms;

            vmsService.setSelectedVms(checkedSelectedVms);
            vmsService.setPotentialVms(potentialVms);
            scope.handleRemoveSelectedVmsClick();

            expect(vmsService.getPotentialVms()).toEqual([ Object({ Id: Object({ InternalVmName: 'test4' }), ProtectedVmVpgsInfo: Object({ isProtected: false }) }), Object({ Id: Object({ InternalVmName: 'test1' }), ProtectedVmVpgsInfo: Object({ isProtected: false }) }), Object({ Id: Object({ InternalVmName: 'test2' }), ProtectedVmVpgsInfo: Object({ isProtected: false }) }) ]);
            expect(vmsService.getSelectedVms()).toEqual([]);
            expect(scope.checkedSelectedVms).toEqual([]);
    });

    it('should properly move vms from potentials to selected', function () {
        var checkedPotentialVms = [{Id: {InternalVmName: 'test1'}}, {Id: {InternalVmName: 'test2'}}];
        var selectedVms = [{Id: {InternalVmName: 'test1'}}, {Id: {InternalVmName: 'test2'}}, {Id: {InternalVmName: 'test3'}}];
        scope.checkedPotentialVms = checkedPotentialVms;

        vmsService.setSelectedVms(selectedVms);
        vmsService.setPotentialVms(checkedPotentialVms);
        scope.handleRightButtonClick();

        expect(vmsService.getPotentialVms()).toEqual([]);
        expect(vmsService.getSelectedVms()).toEqual([ Object({ Id: Object({ InternalVmName: 'test1' }), BootOrderGroup: 'Default' }), Object({ Id: Object({ InternalVmName: 'test2' }), BootOrderGroup: 'Default' }), Object({ Id: Object({ InternalVmName: 'test3' }), BootOrderGroup: 'Default' }), Object({ Id: Object({ InternalVmName: 'test1' }), BootOrderGroup: 'Default' }), Object({ Id: Object({ InternalVmName: 'test2' }), BootOrderGroup: 'Default' }) ]);
        expect(scope.checkedPotentialVms).toEqual([]);

    });

    it('should check manual update selection on grids', function () {

        var checkedSelectedVms = [{Id: {InternalVmName: 'test1'}, ProtectedVmVpgsInfo : {isProtected: false}}, {Id: {InternalVmName: 'test2'}, ProtectedVmVpgsInfo : {isProtected: false}}];
        var potentialVms = [{Id: {InternalVmName: 'test4'}, ProtectedVmVpgsInfo : {isProtected: false}}];

        scope.checkedSelectedVms = checkedSelectedVms;

        vmsService.setSelectedVms(checkedSelectedVms);
        vmsService.setPotentialVms(potentialVms);

        spyOn(scope.gridObj.potentialsGrid, 'updateData').and.callThrough();
        spyOn(scope.gridObj.potentialsGrid, 'updateSelectedItems').and.callThrough();

        spyOn(scope.gridObj.selectedVMsGrid, 'updateData').and.callThrough();
        spyOn(scope.gridObj.selectedVMsGrid, 'updateSelectedItems').and.callThrough();

        scope.updateGridDataAndSelection();

        expect(scope.gridObj.potentialsGrid.updateData).toHaveBeenCalledWith(potentialVms);
        expect(scope.gridObj.selectedVMsGrid.updateData).toHaveBeenCalledWith(checkedSelectedVms);

        expect(scope.gridObj.potentialsGrid.updateSelectedItems).toHaveBeenCalled();
        expect(scope.gridObj.selectedVMsGrid.updateSelectedItems).toHaveBeenCalled();

    });
});

