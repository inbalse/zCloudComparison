'use strict';

describe('VPGS list controller', function () {
    var vpgsListCtrl, scope, vpgsListModel, zTabsStateConstants, vpgsActionsService;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data: {IsPortal: false}});
    }));

    beforeEach(inject(function ($controller, $rootScope, _vpgsListModel_, _zTabsStateConstants_, _vpgsActionsService_) {
        scope = $rootScope.$new();
        vpgsListModel = _vpgsListModel_;
        zTabsStateConstants = _zTabsStateConstants_;
        vpgsActionsService = _vpgsActionsService_;
        vpgsListCtrl = $controller("vpgsListController", {
            $scope: scope, vpgsListModel: vpgsListModel,
            zTabsStateConstants: zTabsStateConstants, vpgsActionsService: vpgsActionsService
        });
    }));

    it('expect grid props to be defined', function () {
        expect(vpgsListCtrl.gridObj.id).toBeDefined();

        expect(vpgsListCtrl.customOptions.columns).toBeDefined();
        expect(vpgsListCtrl.customOptions.defaultSortField).toBe('NameObj');
        expect(vpgsListCtrl.customOptions.showSearch).toBeTruthy();
        expect(vpgsListCtrl.customOptions.numOfViews).toBe(5);
        expect(vpgsListCtrl.viewByValues).toBeDefined();
    });

    it('should check a the row click event', function () {
        var vpgData = {vpg: 1},
            rows = [{x: 1}, {y: 2}],
            event = {
                preventDefault: angular.noop,
                target: {
                    value: 1
                }
            };
        vpgsListCtrl.gridObj.grid = {
            getDataItem: function () {
                return vpgData;
            }
        };


        spyOn(event, 'preventDefault');
        spyOn(vpgsActionsService, 'execute');
        spyOn(vpgsListCtrl.gridObj.grid, 'getDataItem').and.callThrough();

        vpgsListCtrl.rowClick(event, rows[0]);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(vpgsListCtrl.gridObj.grid.getDataItem).toHaveBeenCalledWith(rows[0]);
        expect(vpgsActionsService.execute).toHaveBeenCalledWith(vpgData, event.target.value);

    });

    it('should get vpgs', function () {
        var items = [{a: 1}, {b: 2}];
        vpgsListCtrl.onVpgsReceived(items);
        expect(vpgsListCtrl.data).toBeArray();

    });
});
