'use strict';

describe('advancedJournalSettingsControllerTest', function () {
    var scope, controller, factory, vos, createVPGModel;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _advancedJournalSettingsFactory_, _vos_, $translate, _createVPGModel_) {
        scope = $rootScope.$new();
        createVPGModel = _createVPGModel_;
        //We do this because we need the real function
        createVPGModel.initJournalObject = _createVPGModel_.initJournalObject;
        factory = _advancedJournalSettingsFactory_;
        vos = _vos_;

        createVPGModel.data = {
            defaultJournal: {
                defaultJournalHistoryStepper: 24,
                historyTypeValue: 2
            },
            defaultVpgSettings: {
                Entities: {Target: 0},
                Id: {},
                Config: {
                    Configuration: {
                        MinimalJournalLenghtInMinutes: 240,
                        ManageJournalSettings: {
                            JournalWarningThresholdPerVM: {Limit: 10240, Type: 1},
                            JournalHardLimitPerVM: {Limit: 10240, Type: 1}
                        },
                        JournalHealthSettings: {
                            IsFeatureSupported: true,
                            IsEnabled: false,
                            JournalHealthInMinutes: 240
                        }
                    }
                }
            }
        };
        factory.originalData = {isReverse: false};
        controller = $controller('advancedJournalSettingsController', {
            $scope: scope,
            createVPGModel: createVPGModel,
            $translate: $translate,
            advancedJournalSettingsFactory: factory,
            vos: vos
        });
    }));

    describe('due to bug 23607, added tests to check the default datastore', function () {
        var resultMock, journalDatastore;
        beforeEach(function () {
            resultMock =
                [
                    {
                        "Datastore": {
                            "DatastoreClusterIdentifier": null,
                            "DisplayName": "[DS_Cluster_1]Cluster BK1-30 BK2BL2-14 DS1 (44.1GB free of 99.8GB)",
                            "Id": {
                                "InternalDatastoreName": "datastore-70",
                                "ServerIdentifier": {
                                    "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                                }
                            }
                        },
                        "IsEnabled": true
                    },
                    {
                        "Datastore": {
                            "DatastoreClusterIdentifier": {
                                "InternalName": "group-p71",
                                "ServerIdentifier": {
                                    "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                                }
                            },
                            "DisplayName": "DS_Cluster_1",
                            "Id": null
                        },
                        "IsEnabled": true
                    }
                ];
        });
        it('should set the journal datastore cluster when it was selected and in the potential list', function () {
            journalDatastore = {
                "DatastoreClusterIdentifier": null,
                "DisplayName": "[DS_Cluster_1]Cluster BK1-30 BK2BL2-14 DS1 (44.1GB free of 99.8GB)",
                "Id": {
                    "InternalDatastoreName": "datastore-70",
                    "ServerIdentifier": {
                        "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                    }
                }
            };

            createVPGModel.data.defaultVpgSettings.Config = {Configuration: {ManageJournalSettings: {JournalDatastore: journalDatastore}}};

            scope.getPotentialDatastoresResult(resultMock);

            expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalDatastore).toEqual(journalDatastore);
        });

        it('should set the journal datastore when it was selected and in the potential list', function () {
            journalDatastore = {
                "DatastoreClusterIdentifier": {
                    "InternalName": "group-p71",
                    "ServerIdentifier": {
                        "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                    }
                },
                "DisplayName": "DS_Cluster_1",
                "Id": null
            };

            createVPGModel.data.defaultVpgSettings.Config = {Configuration: {ManageJournalSettings: {JournalDatastore: journalDatastore}}};

            scope.getPotentialDatastoresResult(resultMock);

            expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalDatastore).toEqual(journalDatastore);
        });
    });

    it('should transfer MB to GB when opening the ui and there is a GB selection', function () {
        expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalHardLimitPerVM.Limit).toEqual(10240);
        expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalWarningThresholdPerVM.Limit).toEqual(10240)
    });

    it('should tranform from GB to MB when saving', function () {
        spyOn(factory, 'save');
        spyOn(scope, 'closeWindow');
        createVPGModel.data.defaultVpgSettings.Config = {
            Configuration: {
                ManageJournalSettings: {
                    JournalDatastore: {DisplayName: ''},
                    JournalWarningThresholdPerVM: {Limit: 102400, Type: 1},
                    JournalHardLimitPerVM: {Limit: 112640, Type: 1}
                },
                JournalHealthSettings: {
                    IsFeatureSupported: true,
                    IsEnabled: false,
                    JournalHealthInMinutes: 240
                }
            }
        };
        scope.handleSaveClicked();
        expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalHardLimitPerVM.Limit).toEqual(112640);
        expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalWarningThresholdPerVM.Limit).toEqual(102400);
        expect(createVPGModel.data.defaultVpgSettings.Config.Configuration.JournalHealthSettings.JournalHealthInMinutes).toEqual(240);
    });
});
