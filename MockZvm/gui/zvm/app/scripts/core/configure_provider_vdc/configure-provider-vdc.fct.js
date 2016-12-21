'use strict';

angular.module('zvmApp.core')
    .factory('configureProviderVdcFactory', function ($uibModal, zertoServiceFactory, zAlertFactory, $translate, $q){
        var configureProviderVdcFactory = {};

        configureProviderVdcFactory.modalInstance = null;
        configureProviderVdcFactory.currentProviders = [];
        configureProviderVdcFactory.currentDatastores = [];

       /* var tempRes = {
            "Potential": [{
                "Id": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:providervdc:2bf31e3e-695a-44ec-a592-2a4345a401ac"
                },
                "DisplayName": "PVDC2",
                "Datastores": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-16",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DSII"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-18",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-13",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DS I"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-12",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (2)"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-15",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster BK1-14_15 IBM iSCSI vol2"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-14",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster BK1-14_15 IBM iSCSI vol1"
                }]
            }, {
                "Id": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:providervdc:3fa326df-5f00-4f85-b9e9-8fa1788d26a3"
                },
                "DisplayName": "PVDC3",
                "Datastores": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-16",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DSII"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-18",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-13",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DS I"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-12",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (2)"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-15",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster BK1-14_15 IBM iSCSI vol2"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-14",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster BK1-14_15 IBM iSCSI vol1"
                }]
            }, {
                "Id": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:providervdc:520d921c-929d-48bc-b21e-33f223392505"
                },
                "DisplayName": "PVDC",
                "Datastores": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-16",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DSII"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-18",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-13",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DS I"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-12",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (2)"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-15",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster BK1-14_15 IBM iSCSI vol2"
                }, {
                    "Id": {
                        "InternalDatastoreName": "datastore-14",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster BK1-14_15 IBM iSCSI vol1"
                }]
            }],
            "Current": [{
                "Id": {
                    "Id": "b62fb35b-086b-47d0-8127-a41d00fa5783",
                    "VCDId": "urn:vcloud:providervdc:2bf31e3e-695a-44ec-a592-2a4345a401ac"
                },
                "DisplayName": "PVDC2",
                "DatastoreSettings": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-13",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    },
                    "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DS I",
                    "PresentedAs": "Cluster IS-6-14 IS-6-15 iSCSI DS I",
                    "Enable": false,
                    "Journal": true,
                    "Preseed": false
                }]
            }, {
                "Id": {
                    "Id": "1f57799f-ad29-40dc-b253-a41d00fa5783",
                    "VCDId": "urn:vcloud:providervdc:3fa326df-5f00-4f85-b9e9-8fa1788d26a3"
                },
                "DisplayName": "PVDC3",
                "DatastoreSettings": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-13",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    },
                    "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DS I",
                    "PresentedAs": "Cluster IS-6-14 IS-6-15 iSCSI DS I",
                    "Enable": false,
                    "Journal": true,
                    "Preseed": false
                }]
            }, {
                "Id": {
                    "Id": "eb663aac-7f1a-418c-9146-a41d00fa5783",
                    "VCDId": "urn:vcloud:providervdc:520d921c-929d-48bc-b21e-33f223392505"
                },
                "DisplayName": "PVDC",
                "DatastoreSettings": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-13",
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
                    },
                    "DisplayName": "Cluster IS-6-14 IS-6-15 iSCSI DS I",
                    "PresentedAs": "Cluster IS-6-14 IS-6-15 iSCSI DS I",
                    "Enable": false,
                    "Journal": true,
                    "Preseed": false
                }]
            }],
            "UseOnly": false
        };*/

        configureProviderVdcFactory.open = function () {
            configureProviderVdcFactory.currentProviders = [];
            configureProviderVdcFactory.currentDatastores = [];
            configureProviderVdcFactory.deffer = $q.defer();
            zertoServiceFactory.GetVCDProviderVirtualDatacenters().then(function (result) {
                configureProviderVdcFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/configure_provider_vdc_2/configure-provider-vdc-2.html',
                    windowClass: 'configure-provider-vdc',
                    controller: 'configureProviderVdcControllerPopup',
                    resolve: {
                        result: function () {
                            return result; //tempRes
                        }
                    }
                });
            });
            return configureProviderVdcFactory.deffer.promise;
        };

        configureProviderVdcFactory.close = function () {
            configureProviderVdcFactory.modalInstance.dismiss('close');
            configureProviderVdcFactory.deffer.resolve('close');
        };

        configureProviderVdcFactory.save = function (data) {
            zertoServiceFactory.SetVCDProviderVirtualDatacenters(data).then(function () {
                configureProviderVdcFactory.modalInstance.dismiss('close');
                configureProviderVdcFactory.deffer.resolve('save');
            }, function(error) {
                var errorString = $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.CONFIGURE_PROVIDER_VDCS.ERROR_TEXT');
                if (error.faultString && error.faultString.length){
                    errorString = error.faultString;
                }
                zAlertFactory.fail(null, errorString);
            });
        };

        return configureProviderVdcFactory;
    });
