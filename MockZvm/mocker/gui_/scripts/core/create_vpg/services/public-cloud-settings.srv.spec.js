'use strict';
describe('Create-VPG public settings service', function () {
    var publicCloudSettingsService, createVPGModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_publicCloudSettingsService_, _createVPGModel_) {
        createVPGModel = _createVPGModel_;
        publicCloudSettingsService = _publicCloudSettingsService_;

        spyOn(createVPGModel, 'savePublicCloudVMs').and.callFake(angular.noop);
    }));

    it('should check hasRecoveryCloudSettings function', function () {
        expect(publicCloudSettingsService.hasRecoveryCloudSettings()).toBeFalsy();
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings', {});
        expect(publicCloudSettingsService.hasRecoveryCloudSettings()).toBeTruthy();
    });

    it('should check setPublicCloudFailoverSettings function', function () {
        var cloudFailoverSettings = {settings:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverSettings()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings', undefined);
        publicCloudSettingsService.setPublicCloudFailoverSettings(cloudFailoverSettings);

        expect(publicCloudSettingsService.getPublicCloudFailoverSettings()).toBe(cloudFailoverSettings);
    });

    it('should check setPublicCloudFailoverPcn function', function () {
        var cloudFailoverPcn = {pcn:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverPcn()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.Pcn', undefined);
        publicCloudSettingsService.setPublicCloudFailoverPcn(cloudFailoverPcn);

        expect(publicCloudSettingsService.getPublicCloudFailoverPcn()).toBe(cloudFailoverPcn);
    });

    it('should check setFailoverPublicCloudInstanceTypeVisualObject function', function () {
        var failoverPublicCloudInstanceType = {instance:{}};

        expect(publicCloudSettingsService.getFailoverPublicCloudInstanceTypeVisualObject()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.PublicCloudInstanceTypeVisualObject', undefined);
        publicCloudSettingsService.setFailoverPublicCloudInstanceTypeVisualObject(failoverPublicCloudInstanceType);

        expect(publicCloudSettingsService.getFailoverPublicCloudInstanceTypeVisualObject()).toBe(failoverPublicCloudInstanceType);
    });

    it('should check setPublicCloudFailoverSecurityGroups function', function () {
        var failoverSecurityGroups = {groups:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverSecurityGroups()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.SecurityGroups', undefined);
        publicCloudSettingsService.setPublicCloudFailoverSecurityGroups(failoverSecurityGroups);

        expect(publicCloudSettingsService.getPublicCloudFailoverSecurityGroups()).toBe(failoverSecurityGroups);
    });

    it('should check setPublicCloudFailoverSubnet function', function () {
        var failoverSubnet = {subnet:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverSubnet()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.Subnet', undefined);
        publicCloudSettingsService.setPublicCloudFailoverSubnet(failoverSubnet);

        expect(publicCloudSettingsService.getPublicCloudFailoverSubnet()).toBe(failoverSubnet);
    });

    it('should check setPublicCloudFailoverTestSettings function', function () {
        var failoverTestSettings = {settings:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverTestSettings()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings', undefined);
        publicCloudSettingsService.setPublicCloudFailoverTestSettings(failoverTestSettings);

        expect(publicCloudSettingsService.getPublicCloudFailoverTestSettings()).toBe(failoverTestSettings);
    });

    it('should check setPublicCloudFailoverTestPcn function', function () {
        var failoverTestPcn = {pcn:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverTestPcn()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.Pcn', undefined);
        publicCloudSettingsService.setPublicCloudFailoverTestPcn(failoverTestPcn);

        expect(publicCloudSettingsService.getPublicCloudFailoverTestPcn()).toBe(failoverTestPcn);
    });


    it('should check setFailoverTestPublicCloudInstanceTypeVisualObject function', function () {
        var failoverTestInstanceType = {instance:{}};

        expect(publicCloudSettingsService.getFailoverTestPublicCloudInstanceTypeVisualObject()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.PublicCloudInstanceTypeVisualObject', undefined);
        publicCloudSettingsService.setFailoverTestPublicCloudInstanceTypeVisualObject(failoverTestInstanceType);

        expect(publicCloudSettingsService.getFailoverTestPublicCloudInstanceTypeVisualObject()).toBe(failoverTestInstanceType);
    });


    it('should check setPublicCloudFailoverTestSecurityGroups function', function () {
        var failoverTestSecurityGroups = {security:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverTestSecurityGroups()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.SecurityGroups', undefined);
        publicCloudSettingsService.setPublicCloudFailoverTestSecurityGroups(failoverTestSecurityGroups);

        expect(publicCloudSettingsService.getPublicCloudFailoverTestSecurityGroups()).toBe(failoverTestSecurityGroups);
    });

    it('should check setPublicCloudFailoverTestSubnet function', function () {
        var failoverTestSubnet = {subnet:{}};

        expect(publicCloudSettingsService.getPublicCloudFailoverTestSubnet()).toBeFalsy();

        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.Subnet', undefined);
        publicCloudSettingsService.setPublicCloudFailoverTestSubnet(failoverTestSubnet);

        expect(publicCloudSettingsService.getPublicCloudFailoverTestSubnet()).toBe(failoverTestSubnet);
    });

    it('should check savePublicCloudVMs function', function () {
        var publicCloudVMs = [{id:1},{id:2}];

        publicCloudSettingsService.savePublicCloudVMs(publicCloudVMs);

        expect(createVPGModel.savePublicCloudVMs).toHaveBeenCalledWith(publicCloudVMs);
    });
});
