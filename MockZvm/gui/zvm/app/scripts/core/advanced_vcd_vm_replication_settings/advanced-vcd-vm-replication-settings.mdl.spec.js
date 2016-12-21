describe('advancedVcdVmReplicationSettingsModel}', function () {
    var model;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _advancedVcdVmReplicationSettingsModel_) {
        model = _advancedVcdVmReplicationSettingsModel_;
    }));


    it('should process an item properly', function () {
        var item = {
            InternalVirtualMachineId: {
                InternalVmName: 'InternalVmName1',
                ServerIdentifier: {ServerGuid: 'ServerGuid1'}
            },
            JournalHardLimit: 1024,
            JournalWarningThreshold: 1024,
            StorageProfile: null
        };

        model.processItem(item);

        expect(item).toEqual(
            {
                InternalVirtualMachineId: {
                    InternalVmName: 'InternalVmName1',
                    ServerIdentifier: {ServerGuid: 'ServerGuid1'}
                },
                JournalHardLimit: 1024,
                JournalWarningThreshold: 1024,
                StorageProfile: null,
                id: 'ServerGuid1InternalVmName1',
                StorageProfileObj: {display: '', value: ''},
                JournalHardLimitObj: {display: 'Unlimited', value: 1024},
                JournalWarningThresholdObj: {display: 'Unlimited', value: 1024}
            }
        )
    });


});
