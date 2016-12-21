'use strict';

describe('restoreWizardModel', function () {
    var restoreWizardModel, modal, zertoServiceFactory, enums, zWizardStepStates;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _restoreWizardModel_, _zertoServiceFactory_, _enums_, _zWizardStepStates_) {
        modal = _$uibModal_;
        restoreWizardModel = _restoreWizardModel_;
        zertoServiceFactory = _zertoServiceFactory_;
        enums = _enums_;
        zWizardStepStates = _zWizardStepStates_;
    }));


    it('should have variables and functions defined', function () {
        expect(restoreWizardModel.getRestoreSelectionScreenByPlan).toBeDefined();
        expect(restoreWizardModel.onRestoreSelectionScreenResult).toBeDefined();
        expect(restoreWizardModel.getRestoreConfigurationScreen).toBeDefined();
        expect(restoreWizardModel.onRestoreConfigurationResult).toBeDefined();
        expect(restoreWizardModel.applyHostToAll).toBeDefined();
        expect(restoreWizardModel.applyDatastoreToAll).toBeDefined();
        expect(restoreWizardModel.applyPowerOnToAll).toBeDefined();
        expect(restoreWizardModel.applyChangesToSelectedVMs).toBeDefined();
        expect(restoreWizardModel.init).toBeDefined();
        expect(restoreWizardModel._setStepValid).toBeDefined();
        expect(restoreWizardModel.validateRestorePlan).toBeDefined();
        expect(restoreWizardModel.validateRestorePoint).toBeDefined();
        expect(restoreWizardModel.validateRestoreVmSettings).toBeDefined();
        expect(restoreWizardModel.validateRestoreSummary).toBeDefined();
        expect(restoreWizardModel.getSteps).toBeDefined();
        expect(restoreWizardModel.restoreFromBackup).toBeDefined();
        expect(restoreWizardModel.steps).toBeDefined();
    });


    it('should call zertoZervice with proper plan', function () {
        spyOn(zertoServiceFactory, 'GetRestoreSelectionScreenByVpgName').and.callThrough();
        restoreWizardModel.getRestoreSelectionScreenByPlan(1, {test: 1});
        expect(zertoServiceFactory.GetRestoreSelectionScreenByVpgName).toHaveBeenCalled();

        spyOn(zertoServiceFactory, 'GetRestoreSelectionScreenByTarget').and.callThrough();
        restoreWizardModel.getRestoreSelectionScreenByPlan(2, {test: 1});
        expect(zertoServiceFactory.GetRestoreSelectionScreenByTarget).toHaveBeenCalled();
    });

    it('should set result to data and insert ids', function () {
        restoreWizardModel.data = {};
        restoreWizardModel.onRestoreSelectionScreenResult({
            Instances: [
                {name: 'test'},
                {name: 'test'}
            ]
        });

        expect(angular.equals(restoreWizardModel.data, {
                "RestoreSelectionScreenVisualObject": {
                    "Instances": [{
                        "name": "test",
                        "VMsDisplay": {"display": "undefined/undefined"},
                        "VolumesDisplay": {"display": "undefined/undefined"},
                        "id": 0,
                        "PointInTime": {}
                    }, {
                        "name": "test",
                        "VMsDisplay": {"display": "undefined/undefined"},
                        "VolumesDisplay": {"display": "undefined/undefined"},
                        "id": 1,
                        "PointInTime": {}
                    }]
                }
            })
        ).toBeTruthy();
    });


    it('it should get restoreConfigurationScreen', function () {
        spyOn(zertoServiceFactory, 'GetRestoreConfigurationScreen').and.callThrough();
        restoreWizardModel.data = {
            selectedItems: [
                {SiteIdentifier: 'aa', BackupTargetIdentifier: 'vv', BackupJobIdentifier: '11'}
            ]
        };
        restoreWizardModel.getRestoreConfigurationScreen();

        expect(zertoServiceFactory.GetRestoreConfigurationScreen).toHaveBeenCalledWith('aa', 'vv', '11', enums.RestoreType.VC);
    });

    it('it should assign data on restoreConfiguration result', function () {
        restoreWizardModel.data = {
            restoreHost: {DisplayName: 'host'},
            restoreDatastore: {Datastore: {DisplayName: 'datastore1'}}
        };

        var result = {
            Configuration: {
                VirtualMachines: [
                    {
                        Volumes: [
                            {}
                        ], VNics: [
                        {},
                        {}
                    ]
                    },
                    {
                        Volumes: [
                            {},
                            {}
                        ], VNics: [
                        {}
                    ]
                    }
                ]
            }
        };

        restoreWizardModel.onRestoreConfigurationResult(result);

        var expectedEqual = [{
            "Volumes": [{
                "Destination": {
                    "Datastore": {
                        "Datastore": {
                            "DisplayName": "datastore1",
                            "value": "datastore1"
                        }
                    }
                }, "id": 0, "PointInTime": {}
            }],
            "VNics": [{"id": 0, "PointInTime": {}}, {"id": 1, "PointInTime": {}}],
            "VolumesDisplay": {"display": "undefined/undefined"},
            "ComputeResource": {"DisplayName": "host", "value": "host"},
            "Datastore": {"DisplayName": "datastore1", "value": "datastore1"},
            "id": 0,
            "PointInTime": {}
        }, {
            "Volumes": [{
                "Destination": {
                    "Datastore": {
                        "Datastore": {
                            "DisplayName": "datastore1",
                            "value": "datastore1"
                        }
                    }
                }, "id": 0, "PointInTime": {}
            }, {
                "Destination": {"Datastore": {"Datastore": {"DisplayName": "datastore1", "value": "datastore1"}}},
                "id": 1,
                "PointInTime": {}
            }],
            "VNics": [{"id": 0, "PointInTime": {}}],
            "VolumesDisplay": {"display": "undefined/undefined"},
            "ComputeResource": {"DisplayName": "host", "value": "host"},
            "Datastore": {"DisplayName": "datastore1", "value": "datastore1"},
            "id": 1,
            "PointInTime": {}
        }];

        expect(angular.equals(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, expectedEqual)).toBeTruthy();
    });

    describe('apply different changes functionality', function () {
        beforeEach(function () {
            restoreWizardModel.data = {
                restoreConfiguration: {
                    Configuration: {
                        VirtualMachines: [
                            {
                                Volumes: [
                                    {Destination: ''},
                                    {Destination: ''}
                                ]
                            },
                            {
                                Volumes: [
                                    {Destination: ''},
                                    {Destination: ''}
                                ]
                            }
                        ]
                    }
                }
            };
        });

        it('should apply host to all vms', function () {
            restoreWizardModel.applyHostToAll({DisplayName: 'host'});

            expect(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines).toEqual([{
                Volumes: [{Destination: ''}, {Destination: ''}],
                ComputeResource: {DisplayName: 'host', value: 'host'}
            }, {
                Volumes: [{Destination: ''}, {Destination: ''}],
                ComputeResource: {DisplayName: 'host', value: 'host'}
            }]);
        });

        it('should apply datastore to all vms', function () {
            restoreWizardModel.clearDatastoreToAll();

            var expectedEqual = [{
                Volumes: [{
                    Destination: null
                }, {Destination: null}],
                Datastore: null
            }, {
                Volumes: [{
                    Destination: null,
                }, {Destination: null}],
                Datastore: null
            }];

            expect(angular.equals(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines,
                expectedEqual)).toBeTruthy();
        });

        it('should clear datastore to all vms', function () {
            restoreWizardModel.applyDatastoreToAll({Datastore: {DisplayName: 'datastore'}});

            var expectedEqual = [{
                Volumes: [{
                    Destination: {
                        Datastore: {
                            Datastore: {
                                DisplayName: 'datastore',
                                value: 'datastore'
                            }
                        }
                    }
                }, {Destination: {Datastore: {Datastore: {DisplayName: 'datastore', value: 'datastore'}}}}],
                Datastore: {DisplayName: 'datastore', value: 'datastore'}
            }, {
                Volumes: [{
                    Destination: {
                        Datastore: {
                            Datastore: {
                                DisplayName: 'datastore',
                                value: 'datastore'
                            }
                        }
                    }
                }, {Destination: {Datastore: {Datastore: {DisplayName: 'datastore', value: 'datastore'}}}}],
                Datastore: {DisplayName: 'datastore', value: 'datastore'}
            }];

            expect(angular.equals(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines,
                expectedEqual)).toBeTruthy();
        });

        it('should apply powerOn on all machines', function () {
            restoreWizardModel.applyPowerOnToAll(true);

            expect(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines).toEqual([
                {
                    IsPowerOn: true, Volumes: [
                    {Destination: ''},
                    {Destination: ''}
                ]
                },
                {
                    IsPowerOn: true, Volumes: [
                    {Destination: ''},
                    {Destination: ''}
                ]
                }
            ]);
        });

    });

    it('should apply changes to vm', function () {
        var targets = [
            {OriginalName: '1'},
            {OriginalName: '2'}
        ];
        var result = {
            ComputeResource: 'ComputeResource',
            Datastore: 'Datastore',
            IsPowerOn: 'IsPowerOn'
        };
        restoreWizardModel.data = {
            restoreConfiguration: {
                Configuration: {
                    VirtualMachines: [
                        {
                            OriginalName: '1', Volumes: [
                            {},
                            {}
                        ]
                        },
                        {
                            OriginalName: '2', Volumes: [
                            {}
                        ]
                        },
                        {OriginalName: 'out'}
                    ]
                }
            }
        };
        restoreWizardModel.applyChangesToSelectedVMs(targets, result);


        expect(angular.equals(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines,
            [
                {
                    OriginalName: '1', Volumes: [
                    {Destination: {Datastore: {Datastore: 'Datastore'}}},
                    {Destination: {Datastore: {Datastore: 'Datastore'}}}
                ], ComputeResource: 'ComputeResource', Datastore: 'Datastore', IsPowerOn: 'IsPowerOn'
                },
                {
                    OriginalName: '2', Volumes: [
                    {Destination: {Datastore: {Datastore: 'Datastore'}}}
                ], ComputeResource: 'ComputeResource', Datastore: 'Datastore', IsPowerOn: 'IsPowerOn'
                },
                {OriginalName: 'out'}
            ]
        )).toBeTruthy();

    });

    it('should init data', function () {

        spyOn(zertoServiceFactory, 'GetPotentialRestoreSources').and.callThrough();
        restoreWizardModel.init();

        expect(restoreWizardModel.data).toEqual({
            selectedItems: [],
            restoreHost: null,
            restoreDatastore: null,
            planType: 1,
            selectedProtectionGroup: null,
            selectedRepository: null,
            selectedPointVMs: []
        });

        expect(zertoServiceFactory.GetPotentialRestoreSources).toHaveBeenCalled();
    });

    it('should properly set step valid', function () {
        var step = {};
        restoreWizardModel._setStepValid(step);

        expect(step).toEqual({stateIcon: zWizardStepStates.VALID, isEnabled: true});
    });

    it('should validate plan step', function () {
        var selectedProtectionGroup = {
            "selectedItems": [],
            "restoreHost": null,
            "restoreDatastore": null,
            "planType": 2,
            "selectedProtectionGroup": null,
            "selectedRepository": {
                "DisplayName": "repo_1",
                "BackupTargetIdentifier": {"Identifier": "56f80e3e-c09b-47ef-ad3c-3b835b05a4a0"},
                "SiteIdentifier": {"SiteGuid": "5c3b55a3-603c-4c8b-a384-114339f1eb96"}
            },
            "potentialSources": {
                "PotentialProtectionGroups": [{
                    "DisplayName": "Cool_Vpg_1276",
                    "Identifiers": [{"GroupGuid": "351992cf-eff1-4fec-b7c7-701a99cdb6eb"}],
                    "IsExists": true,
                    "$$hashKey": "0KN"
                }, {
                    "DisplayName": "Real_Vpg_007",
                    "Identifiers": [{"GroupGuid": "5633abbc-d990-4e0e-a62e-bc6ce5bfb4f5"}],
                    "IsExists": true,
                    "$$hashKey": "0KO"
                }],
                "PotentialRepositories": [{
                    "DisplayName": "repo_1",
                    "BackupTargetIdentifier": {"Identifier": "56f80e3e-c09b-47ef-ad3c-3b835b05a4a0"},
                    "SiteIdentifier": {"SiteGuid": "5c3b55a3-603c-4c8b-a384-114339f1eb96"},
                    "$$hashKey": "0KR"
                }, {
                    "DisplayName": "repo_2",
                    "BackupTargetIdentifier": {"Identifier": "e0001757-6f88-4342-931b-8e34857a28bc"},
                    "SiteIdentifier": {"SiteGuid": "5c3b55a3-603c-4c8b-a384-114339f1eb96"},
                    "$$hashKey": "0KS"
                }]
            }
        };

        restoreWizardModel.data = {};
        expect(restoreWizardModel.validateRestorePlan({})).toBeFalsy();
        restoreWizardModel.data = selectedProtectionGroup;
        expect(restoreWizardModel.validateRestorePlan({})).toBeTruthy();
    });

    it('should validate restore point', function () {
        restoreWizardModel.data = {selectedItems: []};
        expect(restoreWizardModel.validateRestorePoint({})).toBeFalsy();
        restoreWizardModel.data = {selectedItems: [{num: 1}, {num: 2}]};
        expect(restoreWizardModel.validateRestorePoint({})).toBeTruthy();
    });

    it('should validate vms settings - false', function () {
        restoreWizardModel.data = {};
        //nothing - false
        expect(restoreWizardModel.validateRestoreVmSettings({})).toBeFalsy();
        //no compute resource - false
        restoreWizardModel.data = {
            restoreConfiguration: {
                Configuration: {
                    VirtualMachines: [
                        {
                            Datastore: {name: 'name'}, Volumes: [
                            {Destination: {name: 'name'}}
                        ]
                        }
                    ]
                }
            }
        };
        expect(restoreWizardModel.validateRestoreVmSettings({})).toBeFalsy();

        //no datastore - false
        restoreWizardModel.data = {
            restoreConfiguration: {
                Configuration: {
                    VirtualMachines: [
                        {
                            ComputeResource: {name: 'name'}, Volumes: [
                            {Destination: {name: 'name'}}
                        ]
                        }
                    ]
                }
            }
        };
        expect(restoreWizardModel.validateRestoreVmSettings({})).toBeFalsy();
    });

    it('should validate volumes for vms settings', function () {
        //no volumes - false
        restoreWizardModel.data = {
            restoreConfiguration: {
                Configuration: {
                    VirtualMachines: [
                        {ComputeResource: {name: 'name'}, Datastore: {name: 'name'}, Volumes: []}
                    ]
                }
            }
        };

        expect(restoreWizardModel.validateRestoreVmSettings({})).toBeFalsy();

        //no destination in volumes - false
        restoreWizardModel.data = {
            restoreConfiguration: {
                Configuration: {
                    VirtualMachines: [
                        {
                            ComputeResource: {name: 'name'}, Datastore: {name: 'name'}, Volumes: [
                            {},
                            {}
                        ]
                        }
                    ]
                }
            }
        };

        expect(restoreWizardModel.validateRestoreVmSettings({})).toBeFalsy();
    });

    it('should validate vms settings - true', function () {
        //the settings are valid only when all needed properties exist
        restoreWizardModel.data = {
            restoreConfiguration: {
                Configuration: {
                    VirtualMachines: [
                        {
                            ComputeResource: {name: 'name'}, Datastore: {name: 'name'}, Volumes: [
                            {Destination: {name: 'name'}}
                        ]
                        }
                    ]
                }
            }
        };
        expect(restoreWizardModel.validateRestoreVmSettings({})).toBeTruthy();
    });
});
