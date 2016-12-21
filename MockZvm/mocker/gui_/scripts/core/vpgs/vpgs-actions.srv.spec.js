'use strict';

describe('VPGS actions service', function () {
    var vpgsActionsService, zAlertFactory, zertoServiceFactory, vpgsContainerBtnStateService, commitVpgFactory, resumeVpgFactory,
        deleteVpgFactory, createVPGFactory, stopFailoverTestFactory, enums, vpgsListEvents, entityEvents, rootScope, analyticsEventsTypes;

    app.value('Idle', {
        watch: function () {
        }
    });

    beforeEach(module('zvmApp.services'));
    beforeEach(module('zvmApp.constant'));
    beforeEach(module('zvmApp.core'));
    beforeEach(module('zvmApp.dataCollection'));
    beforeEach(module('zvmApp.filters'));
    beforeEach(module('pascalprecht.translate'));
    beforeEach(module('zvmApp.directives'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function (_vpgsActionsService_, _zAlertFactory_, _zertoServiceFactory_, _vpgsContainerBtnStateService_, _commitVpgFactory_, _resumeVpgFactory_,
                                _deleteVpgFactory_, _createVPGFactory_, _stopFailoverTestFactory_, _enums_, _vpgsListEvents_, _entityEvents_, $rootScope, _analyticsEventsTypes_) {

        vpgsActionsService = _vpgsActionsService_;
        zAlertFactory = _zAlertFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        vpgsContainerBtnStateService = _vpgsContainerBtnStateService_;
        resumeVpgFactory = _resumeVpgFactory_;
        deleteVpgFactory = _deleteVpgFactory_;
        createVPGFactory = _createVPGFactory_;
        commitVpgFactory = _commitVpgFactory_;
        stopFailoverTestFactory = _stopFailoverTestFactory_;
        enums = _enums_;
        vpgsListEvents = _vpgsListEvents_;
        entityEvents = _entityEvents_;
        rootScope = $rootScope;
        analyticsEventsTypes = _analyticsEventsTypes_;
    }));

    it('should open vpg commit', function () {
        var vpg = {
            Identifier: 1
        };
        spyOn(commitVpgFactory, 'open');
        vpgsActionsService.execute(vpg, vpgsListEvents.commit);
        expect(commitVpgFactory.open).toHaveBeenCalledWith(vpg.Identifier);
    });

    it('should open vpg resume', function () {
        var vpg = {
            Identifier: 1
        };
        spyOn(resumeVpgFactory, 'resume');
        vpgsActionsService.execute(vpg, vpgsListEvents.resume);
        expect(resumeVpgFactory.resume).toHaveBeenCalledWith([vpg.Identifier]);
    });

    it('should stop failover test', function () {
        var vpg = {
            Identifier: 1
        };
        spyOn(stopFailoverTestFactory, 'stopTestByIds');
        vpgsActionsService.execute(vpg, vpgsListEvents.stopFot);
        expect(stopFailoverTestFactory.stopTestByIds).toHaveBeenCalledWith([vpg.Identifier]);
    });

    it('should show abort backup warning', function () {
        var vpg = {};
        spyOn(zAlertFactory, 'warn');
        vpgsActionsService.execute(vpg, vpgsListEvents.stopBackup);
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should show abort clone warning', function () {
        var vpg = {};
        spyOn(zAlertFactory, 'warn');
        vpgsActionsService.execute(vpg, vpgsListEvents.stopClone);
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should show move rollback warning', function () {
        var vpg = {};
        spyOn(zAlertFactory, 'warn');
        vpgsActionsService.execute(vpg, vpgsListEvents.rollback);
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should abort backup if user confirmed', function () {
        var vpg = {
                Identifier: 1
            },
            event = {
                target: {
                    name: zAlertFactory.buttons.OK
                }
            };
        testAbortBackup(event, vpg);
        expect(zertoServiceFactory.AbortBackups).toHaveBeenCalledWith([vpg.Identifier]);
    });

    it('shouldn\'t abort backup if user didnt\'t confirmed', function () {
        var event = {
            target: {}
        };

        testAbortBackup(event);
        expect(zertoServiceFactory.AbortBackups).not.toHaveBeenCalled();
    });

    function testAbortBackup(event, vpg) {
        spyOn(zertoServiceFactory, 'AbortBackups');
        vpgsActionsService.responseAbortBackup(vpg, event);
    }

    it('should abort clone if user confirmed', function () {
        var vpg = {
                Identifier: 1
            },
            event = {
                target: {
                    name: zAlertFactory.buttons.OK
                }
            };
        testAbortClone(event, vpg);
        expect(zertoServiceFactory.AbortClone).toHaveBeenCalledWith(vpg.Identifier);
    });

    it('shouldn\'t abort clone if user didnt\'t confirmed', function () {
        var event = {
            target: {}
        };

        testAbortClone(event);
        expect(zertoServiceFactory.AbortClone).not.toHaveBeenCalled();
    });

    function testAbortClone(event, vpg) {
        spyOn(zertoServiceFactory, 'AbortClone');
        vpgsActionsService.responseAbortClone(vpg, event);
    }

    it('should move rollback if user confirmed', function () {
        var vpg = {
                Identifier: 1
            },
            event = {
                target: {
                    name: zAlertFactory.buttons.OK
                }
            };
        testMoveRollback(event, vpg);
        expect(zertoServiceFactory.MoveRollback).toHaveBeenCalledWith(vpg.Identifier);
    });

    it('shouldn\'t move rollback if user didnt\'t confirmed', function () {
        var event = {
            target: {}
        };

        testMoveRollback(event);
        expect(zertoServiceFactory.MoveRollback).not.toHaveBeenCalled();
    });

    function testMoveRollback(event, vpg) {
        spyOn(zertoServiceFactory, 'MoveRollback');
        vpgsActionsService.responseRollback(vpg, event);
    }


    it('should edit vpg if enabled', function () {
        var vpg = {
            Identifier: 1
        };
        vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled = function () {
            return true;
        };
        spyOn(createVPGFactory, 'openEdit');
        vpgsActionsService.execute(vpg, entityEvents.editEntity);
        expect(createVPGFactory.openEdit).toHaveBeenCalledWith(vpg.Identifier);
    });


    it('should delete vpg if enabled', function () {
        var vpg = {
            Identifier: 1,
            State: {
                ButtonsState: {
                    RequiresForceToDelete: true
                }
            },
            Entities: {
                Target: enums.VpgEntityType.Aws
            }
        };
        vpgsContainerBtnStateService.checkSelectedForDeleteEnabled = function () {
            return true;
        };

        spyOn(deleteVpgFactory, 'deleteVpgById');
        vpgsActionsService.execute(vpg, entityEvents.deleteEntity);
        expect(deleteVpgFactory.deleteVpgById).toHaveBeenCalledWith(vpg.Identifier, vpg.Name, vpg.State.ButtonsState.RequiresForceToDelete, true);
    });

    it('should delete vpg if enabled', function () {
        var vpg = {
            Identifier: 1,
            State: {
                ButtonsState: {
                    RequiresForceToDelete: true
                }
            },
            Entities: {
                Target: null
            }
        };

        testDeleteVpg(vpg, true, false, true);
    });

    it('shouldn\'t delete vpg if disabled', function () {
        var vpg = {
            Identifier: 1,
            State: {
                ButtonsState: {
                    RequiresForceToDelete: true
                }
            },
            Entities: {
                Target: null
            }
        };

        testDeleteVpg(vpg, false, false, false);
    });

    it('should pass true for third parameter if aws', function () {
        var vpg = {
            Identifier: 1,
            State: {
                ButtonsState: {
                    RequiresForceToDelete: true
                }
            },
            Entities: {
                Target: enums.VpgEntityType.Aws
            }
        };

        testDeleteVpg(vpg, true, true, true);
    });

    it('should pass true for third parameter if azure', function () {
        var vpg = {
            Identifier: 1,
            Name: 'vpg-ccc',
            State: {
                ButtonsState: {
                    RequiresForceToDelete: true
                }
            },
            Entities: {
                Target: enums.VpgEntityType.Azure
            }
        };

        testDeleteVpg(vpg, true, true, true);
    });


    function testDeleteVpg(vpg, isDeleteEnabled, isPublicCloud, shouldCallDelete) {
        vpgsContainerBtnStateService.checkSelectedForDeleteEnabled = function () {
            return isDeleteEnabled;
        };

        spyOn(deleteVpgFactory, 'deleteVpgById');
        vpgsActionsService.execute(vpg, entityEvents.deleteEntity);
        if (shouldCallDelete) {
            expect(deleteVpgFactory.deleteVpgById).toHaveBeenCalledWith(vpg.Identifier, vpg.Name, vpg.State.ButtonsState.RequiresForceToDelete, isPublicCloud);
            return;
        }
        expect(deleteVpgFactory.deleteVpgById).not.toHaveBeenCalled();
    }


    it('verify stop failover test triggers an google analytics event', function () {
        var vpg = {
            Identifier: 1
        };
        spyOn(rootScope,'$emit');
        spyOn(stopFailoverTestFactory, 'stopTestByIds').and.callFake(function () {});

        vpgsActionsService.execute(vpg, vpgsListEvents.stopFot);

        expect(rootScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.STOP_TEST);
    });
});
