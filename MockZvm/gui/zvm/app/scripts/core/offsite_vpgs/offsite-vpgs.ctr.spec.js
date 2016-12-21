'use strict';

describe('Offsite vpgs List Controller', function () {
    var scope, $controller, siteSettingsFactory,offSiteBackupFactory, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function($controller, $rootScope, _siteSettingsFactory_, _offSiteBackupFactory_) {
        scope = $rootScope.$new();
        siteSettingsFactory= _siteSettingsFactory_;
        offSiteBackupFactory = _offSiteBackupFactory_;
        $controller = $controller('offsiteVpgsListController', {$scope: scope, siteSettingsFactory: siteSettingsFactory});
    }));

    it("should check defined properties", function(){

        expect(scope.isRunEnabled).toBeFalsy();
        expect(scope.isAbortEnabled).toBeFalsy();
        expect(scope.viewByValues).toEqual([{id: 'General',text: 'General'},{id: 'Run Details',text: 'Run Details'}]);
        expect(scope.groupByValues).toEqual([{id: '',text: 'GROUP_BY_LIST.NONE'},{id: 'RepositoryName',text: 'OFF_SITE.REPOSITORY'}]);


    });

    it("should check defined functions", function () {
        expect(scope.export).toBeDefined();
        expect(scope.abortBackup).toBeDefined();
        expect(scope.runBackup).toBeDefined();
        expect(scope.selectedItemsChange).toBeDefined();
    });

    it('should check abort and run backup option are disabled when no items are selected', function() {
        scope.selectedItems = [];

        expect(offSiteBackupFactory.checkRunBackupEnabled(scope.selectedItems)).toBeFalsy();
        expect(offSiteBackupFactory.checkAbortBackupEnabled(scope.selectedItems)).toBeFalsy();
    });

    it('should check abort option is enabled when all items selected are abort enabled', function() {
        scope.selectedItems.push({IsAbortBackupEnabled : true});
        scope.selectedItems.push({IsAbortBackupEnabled : true});
        scope.selectedItems.push({IsAbortBackupEnabled : true});

        expect(offSiteBackupFactory.checkAbortBackupEnabled(scope.selectedItems)).toBeTruthy();
    });

    it('should check abort option is disabled when at least one item is abort disabled', function() {
        scope.selectedItems.push({IsAbortBackupEnabled : true});
        scope.selectedItems.push({IsAbortBackupEnabled : false});
        scope.selectedItems.push({IsAbortBackupEnabled : true});

        expect(offSiteBackupFactory.checkAbortBackupEnabled(scope.selectedItems)).toBeFalsy();
    });

    it('should check backup option is enabled when all items selected are backup enabled', function() {
        scope.selectedItems.push({IsBackupEnabled : true});
        scope.selectedItems.push({IsBackupEnabled : true});
        scope.selectedItems.push({IsBackupEnabled : true});

        expect(offSiteBackupFactory.checkRunBackupEnabled(scope.selectedItems)).toBeTruthy();
    });

    it('should check backup option is disabled when at least one item is backup disabled', function() {
        scope.selectedItems.push({IsBackupEnabled : true});
        scope.selectedItems.push({IsBackupEnabled : false});
        scope.selectedItems.push({IsBackupEnabled : true});

        expect(offSiteBackupFactory.checkRunBackupEnabled(scope.selectedItems)).toBeFalsy();
    });
});
