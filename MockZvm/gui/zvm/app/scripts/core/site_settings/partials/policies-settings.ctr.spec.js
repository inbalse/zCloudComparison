'use strict';

describe('policies settings Controller', function () {
    var ctrl, testScope, testSiteSettingsFactory, testzAlertFactory, globalStateModel, translate;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($rootScope, $controller, _siteSettingsFactory_, _policiesConstants_, zAlertFactory, _vos_, $translate) {
        testScope = $rootScope.$new();
        testzAlertFactory = jasmine.createSpyObj('zAlertFactory', ['info']);
        translate = $translate;
        var data = new _vos_.AdvancedSiteSettings();

        testSiteSettingsFactory = {};
        testSiteSettingsFactory.settings = data;

        ctrl = $controller('policiesSettingsController', {
            $scope: testScope,
            siteSettingsFactory: testSiteSettingsFactory,
            policiesConstants: _policiesConstants_,
            zAlertFactory: testzAlertFactory,
            $translate: translate
        });
    }));

    it('should check all object and function to be defined', function () {
        expect(testScope.commitPolicySelected).toBeDefined();
        expect(testScope.defaultTimeoutMinutesValue).toBeDefined();
        expect(testScope.maxDefaultTimeoutMinutes).toBeDefined();
        expect(testScope.replicationPauseInMinutesCollection).toBeDefined();
        expect(testScope.updateModel).toBeDefined();
        expect(testScope.validateDefaultTimeout).toBeDefined();
    });

    it('should check that setData() assigns proper values', function () {
        expect(angular.equals(testScope.data, testSiteSettingsFactory.settings)).toBeTruthy();
    });

    it('should check that initData() assigns proper (commit value)', function () {
        testScope.data.MoveCommitWaitInSec = 600;
        testScope.initData(testScope.data);

        expect(testScope.defaultTimeoutMinutesValue).toEqual(10);
        expect(testScope.commitPolicySelected).toEqual('SITE_SETTINGS.POLICIES.COMMIT');
    });

    it('should check that initData() assigns proper (rollback value)', function () {
        testScope.data.MoveCommitWaitInSec = -1;
        testScope.data.MoveRollbackWaitInSec = 1200;
        testScope.initData(testScope.data);

        expect(testScope.defaultTimeoutMinutesValue).toEqual(20);
        expect(testScope.commitPolicySelected).toEqual('SITE_SETTINGS.POLICIES.ROLLBACK');
    });

    it('should check update model function', function () {
        testScope.updateModel(translate.instant('SITE_SETTINGS.POLICIES.COMMIT'), 10);

        expect(testScope.data.MoveCommitWaitInSec).toEqual(600);
        expect(testScope.data.MoveRollbackWaitInSec).toEqual(-1);
    });

    it('should check update model function 2', function () {
        testScope.updateModel(translate.instant('SITE_SETTINGS.POLICIES.ROLLBACK'), 10);

        expect(testScope.data.MoveCommitWaitInSec).toEqual(-1);
        expect(testScope.data.MoveRollbackWaitInSec).toEqual(600);
    });

    it('should show info alert while self replication is not selected', function () {
        testScope.data.AllowCreationOfSelfProtectedVpg = false;
        testScope.handleEnableRepSelfChange();

        expect(testzAlertFactory.info).toHaveBeenCalled();
    });
});
