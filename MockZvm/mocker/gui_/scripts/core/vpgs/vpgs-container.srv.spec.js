'use strict';
describe('VPGS container service', function () {
    var vpgsContainerService, createVPGFactory, zertoServiceFactory, zAlertFactory, zsspCreateVpgFactory, stopFailoverTestFactory,
        deleteVpgFactory, resumeVpgFactory, globalStateModel, enums, window;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($window, _vpgsContainerService_, _createVPGFactory_, _zertoServiceFactory_, _resumeVpgFactory_, _deleteVpgFactory_, _stopFailoverTestFactory_,
                                _zsspCreateVpgFactory_, _globalStateModel_, _zAlertFactory_, _enums_) {
        vpgsContainerService = _vpgsContainerService_;
        createVPGFactory = _createVPGFactory_;
        zsspCreateVpgFactory = _zsspCreateVpgFactory_;
        globalStateModel = _globalStateModel_;
        zAlertFactory = _zAlertFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        resumeVpgFactory = _resumeVpgFactory_;
        deleteVpgFactory = _deleteVpgFactory_;
        stopFailoverTestFactory = _stopFailoverTestFactory_;
        enums = _enums_;
        window = $window;
        globalStateModel.data = {
            IsPortal: false
        };

    }));

    it('it should get and set selected vpgs ids', function () {
        var vpgs = [{Identifier: { GroupGuid: 1}}, {Identifier: { GroupGuid: 2}}, {Identifier: { GroupGuid: 3}}];
        vpgsContainerService.setSelectedVPGIds(vpgs);
        var result = vpgsContainerService.getSelectedVPGIds();
        expect(result).toEqual([1, 2, 3]);
    });

    it('should clear the selected vpgs', function () {
        var vpgs = [{Identifier: { GroupGuid: 1}}, {Identifier: { GroupGuid: 2}}, {Identifier: { GroupGuid: 3}}];
        vpgsContainerService.setSelectedVPGIds(vpgs);
        vpgsContainerService.clearSelectedVPGIds();
        var result = vpgsContainerService.getSelectedVPGIds();
        expect(result).toEqual([]);
    });

    it('should return is portal', function () {
        var result = vpgsContainerService.isPortal();
        expect(result).toEqual(globalStateModel.data.IsPortal);
    });

    it('should open create vpg portal', function () {
        globalStateModel.data.IsPortal = true;
        spyOn(zsspCreateVpgFactory, 'createPortalkNewVpg');
        vpgsContainerService.createVPG();
        expect(zsspCreateVpgFactory.createPortalkNewVpg).toHaveBeenCalled();
    });

    it('should open create vpg', function () {
        spyOn(createVPGFactory, 'openCreate');
        vpgsContainerService.createVPG();
        expect(createVPGFactory.openCreate).toHaveBeenCalled();
    });

    it('shouldn\'t open create vpg in aws', function () {
        spyOn(createVPGFactory, 'openCreate');
        spyOn(zAlertFactory, 'fail');
        globalStateModel.data.VirtualizationProviderType = enums.VpgEntityType.Aws;
        vpgsContainerService.createVPG();

        expect(createVPGFactory.openCreate).not.toHaveBeenCalled();
        expect(zAlertFactory.fail).toHaveBeenCalledWith('ACTIONS_BUTTON.CREATE_VPG', 'CREATE_VPG.BLOCK_PUBLIC_CLOUD');
    });

    it('shouldn\'t open create vpg in azure', function () {
        spyOn(createVPGFactory, 'openCreate');
        spyOn(zAlertFactory, 'fail');
        globalStateModel.data.VirtualizationProviderType = enums.VpgEntityType.Azure;
        vpgsContainerService.createVPG();

        expect(createVPGFactory.openCreate).not.toHaveBeenCalled();
        expect(zAlertFactory.fail).toHaveBeenCalledWith('ACTIONS_BUTTON.CREATE_VPG', 'CREATE_VPG.BLOCK_PUBLIC_CLOUD');
    });

    it('it should export', function () {
        spyOn(window, 'open');
        vpgsContainerService.export();
        expect(window.open).toHaveBeenCalledWith('/ZvmService/VpgList/GetVpgTextSummary');
    });

    it('it should edit vpg', function () {
        var id = 10;
        spyOn(createVPGFactory, 'openEdit');
        vpgsContainerService.editVPG(id);
        expect(createVPGFactory.openEdit).toHaveBeenCalledWith(id);
    });

    it('it should warn about pause vpgs', function () {
        spyOn(zAlertFactory, 'warn');
        vpgsContainerService.pauseVPGs();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should pause vpgs if user confirmed', function () {
        spyOn(zertoServiceFactory, 'PauseProtectionGroups');
        var vpgs = [{Identifier: 1}, {Identifier: 2}, {Identifier: 3}],
            event = {
                target: {
                    name: zAlertFactory.buttons.OK
                }
            };
        vpgsContainerService.responsePauseVPGS(vpgs, event);
        expect(zertoServiceFactory.PauseProtectionGroups).toHaveBeenCalledWith(vpgsContainerService.getProtectionGroupIdentifier(vpgs));
    });

    it('shouldn\'t pause vpgs if user declined', function () {
        spyOn(zertoServiceFactory, 'PauseProtectionGroups');
        var vpgs = [{Identifier: 1}, {Identifier: 2}, {Identifier: 3}],
            event = {
                target: {}
            };
        vpgsContainerService.responsePauseVPGS(vpgs, event);
        expect(zertoServiceFactory.PauseProtectionGroups).not.toHaveBeenCalledWith(vpgsContainerService.getProtectionGroupIdentifier(vpgs));
    });

    it('should show force sync warning', function () {
        spyOn(zAlertFactory, 'warn');
        vpgsContainerService.forceSync();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should force sync when user confirmed', function () {
        var identifier = 'abc',
            event = {
                target: {
                    name: zAlertFactory.buttons.OK
                }
            };
        spyOn(zertoServiceFactory, 'ForceProtectionGroupSync');
        vpgsContainerService.handleForceSync(identifier, event);
        expect(zertoServiceFactory.ForceProtectionGroupSync).toHaveBeenCalledWith(identifier);
    });

    it('should force sync when user confirmed', function () {
        var identifier = 'abc',
            event = {
                target: {}
            };
        spyOn(zertoServiceFactory, 'ForceProtectionGroupSync');
        vpgsContainerService.handleForceSync(identifier, event);
        expect(zertoServiceFactory.ForceProtectionGroupSync).not.toHaveBeenCalledWith(identifier);
    });

    it('should resume vpgs', function () {
        var vpgs = [{Identifier: 1}, {Identifier: 2}, {Identifier: 3}];
        spyOn(resumeVpgFactory, 'resume');
        vpgsContainerService.resumeVPGs(vpgs);

        var identifiers = vpgsContainerService.getProtectionGroupIdentifier(vpgs);

        expect(resumeVpgFactory.resume).toHaveBeenCalledWith(identifiers);
    });

    it('should stop failover test', function () {
        var vpgs = [{Identifier: 1}, {Identifier: 2}, {Identifier: 3}];
        spyOn(stopFailoverTestFactory, 'stopTestByIds');
        vpgsContainerService.stopFailOverTest(vpgs);

        var identifiers = vpgsContainerService.getProtectionGroupIdentifier(vpgs);

        expect(stopFailoverTestFactory.stopTestByIds).toHaveBeenCalledWith(identifiers);
    });

    it('should delete vpg', function () {
        spyOn(deleteVpgFactory, 'deleteVpgById');
        deleteVPG(enums.VpgEntityType.VCVpg, false);
    });

    it('should delete vpg aws', function () {
        spyOn(deleteVpgFactory, 'deleteVpgById');
        deleteVPG(enums.VpgEntityType.Aws, true);
    });

    it('should delete vpg azure', function () {
        spyOn(deleteVpgFactory, 'deleteVpgById');
        deleteVPG(enums.VpgEntityType.Azure, true);
    });

    function deleteVPG(type, isCloud) {
        var vpg = {
            Identifier: 1,
            State: {
                ButtonsState: {
                    RequiresForceToDelete: true
                }
            },
            Entities: {
                Target: type
            }
        };
        vpgsContainerService.deleteVPG(vpg);

        expect(deleteVpgFactory.deleteVpgById).toHaveBeenCalledWith(vpg.Identifier, vpg.Name, vpg.State.ButtonsState.RequiresForceToDelete, isCloud);
    }

    it('should check actions button state', function () {
        var items = [{Identifier: 1, State: {ButtonsState: {}, ActiveProcesses: {}}}, {
                Identifier: 2,
                State: {ButtonsState: {}, ActiveProcesses: {}}
            }],
            result = vpgsContainerService.checkActionButtonsState(items);

        expect(typeof result).toEqual('object');
    });

    it('should return vpgs identifiers', function () {
        var vpgs = [{Identifier: 1}, {VPGIdentifier: 2}, {ProtectionGroupId: 3}],
            result = vpgsContainerService.getProtectionGroupIdentifier(vpgs);

        expect(result).toEqual([1, 2, 3]);
    });

    it('should stop backup', function () {
        spyOn(zAlertFactory, 'warn');
        vpgsContainerService.stopBackup();
        expect(zAlertFactory.warn).toHaveBeenCalledWith('VPG_LIST.MORE_BUTTON.STOP_BACKUP', 'VPG_LIST.MORE_BUTTON.STOP_BACKUP_WARNING', jasmine.any(Function));
    });

    it('should run backup', function () {
        spyOn(zAlertFactory, 'warn');
        vpgsContainerService.runBackup();
        expect(zAlertFactory.warn).toHaveBeenCalledWith('VPG_LIST.MORE_BUTTON.RUN_BACKUP', 'VPG_LIST.MORE_BUTTON.RUN_BACKUP_WARNING', jasmine.any(Function));
    })
});
