'use strict';
describe('VPGS progress service', function () {
    var vpgsProgressService, vpg;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_vpgsProgressService_) {
        vpgsProgressService = _vpgsProgressService_;

        vpg = {
            State: {
                ActiveProcesses: {}
            }
        };
    }));

    describe('Test convert task', function () {

        it('should set pause task', function () {
            vpg.State.ActiveProcesses.Paused = {
                ProgressValue: 50
            };
            testProcess(vpg, 'VPG_LIST.TASKS.PAUSED', 50);
        });

        it('should set running backup task', function () {
            vpg.State.ActiveProcesses.RunningBackup = {
                ProgressValue: 50
            };
            testProcess(vpg, 'VPG_LIST.TASKS.RUNNING_BACKUP', 50);
        });


        it('should set clone task', function () {
            vpg.State.ActiveProcesses.RunningClone = {
                ProgressValue: 50
            };

            testProcess(vpg, 'VPG_LIST.TASKS.RUNNING_CLONE', 50);
        });

        it('should set FOT task', function () {
            vpg.State.ActiveProcesses.RunningFailOverTest = {
                ProgressValue: 50
            };
            testProcess(vpg, 'VPG_LIST.TASKS.RUNNING_FAILOVER_TEST', 50);
        });

        it('should set FOT task', function () {
            vpg.State.ActiveProcesses.VpgUpdate = {
                ProgressValue: 50
            };
            testProcess(vpg, 'VPG_LIST.TASKS.VPG_UPDATE', 50);
        });


        it('should set recover rollback', function () {
            vpg = {
                State: {
                    ActiveProcesses: {},
                    IsRecoverRollbackEnabled: true
                }
            };

            testProcess(vpg, 'Failover over', 0);
        });

        it('should set updating vpg operation object', function () {
            vpg.State.ActiveProcesses.VpgUpdate = {
                ProgressValue: 50,
                StopEnabled: true
            };

            var result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.progressValue).toEqual(50);
            expect(result.operation.showProgress).toBeTruthy();
        });


        it('should set backup operation object', function () {
            vpg.State.ActiveProcesses.RunningBackup = {
                ProgressValue: 50,
                StopEnabled: true
            };

            var result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.progressValue).toEqual(50);
            expect(result.operation.showProgress).toBeTruthy();
            expect(result.operation.stopBackupButton).toBeTruthy();

            vpg.State.ActiveProcesses.RunningBackup.ProgressValue = 0;
            vpg.State.ActiveProcesses.RunningBackup.StopEnabled = false;
            result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.showProgress).toBeFalsy();
            expect(result.operation.stopBackupButton).toBeFalsy();
        });

        it('should set failover test operation object', function () {
            vpg.State.ActiveProcesses.RunningFailOverTest = {
                ProgressValue: 50,
                StopEnabled: true
            };

            var result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.progressValue).toEqual(50);
            expect(result.operation.showProgress).toBeTruthy();
            expect(result.operation.stopTestButton).toBeTruthy();

            vpg.State.ActiveProcesses.RunningFailOverTest.ProgressValue = 0;
            vpg.State.ActiveProcesses.RunningFailOverTest.StopEnabled = false;
            result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.showProgress).toBeFalsy();
            expect(result.operation.stopTestButton).toBeFalsy();
        });


        it('should set clone operation object', function () {
            vpg.State.ActiveProcesses.RunningClone = {
                ProgressValue: 50,
                StopEnabled: true
            };

            var result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.progressValue).toEqual(50);
            expect(result.operation.showProgress).toBeTruthy();
            expect(result.operation.stopCloneButton).toBeTruthy();

            vpg.State.ActiveProcesses.RunningClone.ProgressValue = 0;
            vpg.State.ActiveProcesses.RunningClone.StopEnabled = false;
            result = vpgsProgressService.convertTaskData(vpg);
            expect(result.operation.showProgress).toBeFalsy();
            expect(result.operation.stopCloneButton).toBeFalsy();
        });

        function testProcess(vpg, key, value) {
            var result = vpgsProgressService.convertTaskData(vpg);
            expect(result.process).toEqual({
                display: key,
                value: value,
                sortValue: key
            });
        }
    });

    describe('Test convert state', function () {

        it('test state data', function () {
            vpg.State = {
                VPGTimebombInfo: {
                    TimeLeftInSeconds: 4124
                }
            };
            // ProgressObject: {
            //     ProgressPercentage: 32
            // }

            var result = vpgsProgressService.convertStateData(vpg);
            expect(result).toEqual({
                display: 'Protection paused for another 1 hour, 8 minutes, 44 seconds', value: 0, showProgress: false,
                filterValue: 'Protection paused for another 1 hour, 8 minutes, 44 seconds'
            });
            vpg.State.ProgressObject = {
                ProgressPercentage: 32
            };
            result = vpgsProgressService.convertStateData(vpg);
            expect(result).toEqual({
                display: 'Protection paused for another 1 hour, 8 minutes, 44 seconds',
                value: 32,
                showProgress: true,
                filterValue: 'Protection paused for another 1 hour, 8 minutes, 44 seconds'
            });

            vpg.State = {
                SubStatus: 5
            };

            result = vpgsProgressService.convertStateData(vpg);
            expect(result).toEqual({
                display: 'ENUM.VPG_VISUAL_SUB_STATUS.5',
                value: 0,
                showProgress: false,
                filterValue: 'ENUM.VPG_VISUAL_SUB_STATUS.5'
            });
        });
    });
});
