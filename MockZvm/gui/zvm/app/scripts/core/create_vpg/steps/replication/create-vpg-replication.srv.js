'use strict';

angular.module('zvmApp.core')
    .constant('CONSTANT', {
            'JOURNAL_LIMITS': {
                1: {min: 1, max: 30},
                2: {min: 1, max: 23}
            },
            'RPO_ALERTS_CONS': {
                SECONDS: {type: 0, label: 'Seconds'},
                MINUTES: {type: 1, label: 'Minutes'},
                HOURS: {type: 2, label: 'Hours'},
                DEFAULT_RPO: 300
            }
        }
    ) // Journal Types:  1 = days, 2 = hours
    .service('createVpgReplicationService', function (createVPGModel, vpgService, storageService, globalConstants, dataCollectionFactory, tweaksService,
                                                      enums, networksService, vmsService, CONSTANT) {

        var replicationService = this;

        replicationService.getSelectedServiceProfileIdentifier = function () {
            var sp = storageService.getServiceProfile();
            if (!_.isNullOrUndefined(sp)) {
                return getIdentifierFromPotentialServiceProfile(sp.SelectedIdentifier);
            }
            return null;
        };


        replicationService.checkIfSelectedServiceProfileEditable = function (serviceProfile) {
            if (!_.isNullOrUndefined(serviceProfile)) {
                var sp = storageService.getServiceProfileById(serviceProfile.SelectedIdentifier);
                return sp.IsEditable;
            }
            return false;
        };

        replicationService.setServiceProfileIdentifier = function (serviceProfileIdentifier) {
            var serviceProfile = storageService.getServiceProfile();
            if (!_.isNullOrUndefined(serviceProfile)) {
                serviceProfile.Identifier = serviceProfileIdentifier;
            }
        };

        replicationService.checkIfShowZertoOrganizationList = function (potentialZertoOrganizations) {

            if (_.isEmpty(potentialZertoOrganizations)) {
                return false;
            }

            if (potentialZertoOrganizations.length > 1) {
                return true;
            }

            else if (potentialZertoOrganizations.length === 1 &&
                potentialZertoOrganizations[0].Identifier.Guid !== globalConstants.NOZORG &&
                potentialZertoOrganizations[0].CrmIdentifier !== '00000000-0000-0000-0000-000000000000') {
                return true;
            }
        };

        replicationService.getRpoObject = function () {
            var rpoThresholdInSeconds = storageService.getRPOThresholdInSeconds(),
                defaultRpoAlertInSeconds = CONSTANT.RPO_ALERTS_CONS.DEFAULT_RPO;

            if (!_.isNullOrUndefined(rpoThresholdInSeconds)) {
                if (rpoThresholdInSeconds < 60) {
                    return {value: rpoThresholdInSeconds, type: CONSTANT.RPO_ALERTS_CONS.SECONDS.type};
                } else if (rpoThresholdInSeconds >= 60 && rpoThresholdInSeconds < 3600) {
                    return {value: rpoThresholdInSeconds, type: CONSTANT.RPO_ALERTS_CONS.MINUTES.type};
                } else {
                    return {value: rpoThresholdInSeconds, type: CONSTANT.RPO_ALERTS_CONS.HOURS.type};
                }
            }

            return {value: defaultRpoAlertInSeconds, type: 1};
        };

        replicationService.getMinAndMaxValues = function (type) {
            return CONSTANT.JOURNAL_LIMITS[type];
        };

        replicationService.getIconByTargetSite = function (targetSite) {
            if (!_.isEmpty(targetSite)) {
                switch (targetSite.VirtualizationProviderType) {
                    case enums.VpgEntityType.Aws :
                        return 'aws';
                    case enums.VpgEntityType.Azure :
                        return 'azure';
                    case enums.VpgEntityType.HyperV:
                        return 'hyperv';
                    default :
                        return 'vmware';
                }
            }
            return null;
        };

        replicationService.getRPOAlertOptions = function () {
            return [
                {type: CONSTANT.RPO_ALERTS_CONS.SECONDS.type, label: CONSTANT.RPO_ALERTS_CONS.SECONDS.label},
                {type: CONSTANT.RPO_ALERTS_CONS.MINUTES.type, label: CONSTANT.RPO_ALERTS_CONS.MINUTES.label},
                {type: CONSTANT.RPO_ALERTS_CONS.HOURS.type, label: CONSTANT.RPO_ALERTS_CONS.HOURS.label}
            ];
        };

        replicationService.getRPOAlertValuesOptions = function (type) {
            switch (type) {
                case 0:
                    return dataCollectionFactory.MAX_RPO_IN_SEC;
                case 1:
                    return dataCollectionFactory.MAX_RPO_IN_MIN;
                case 2:
                    return dataCollectionFactory.MAX_RPO_IN_HR;
            }
        };

        replicationService.applyDefaultHost = function (vms, targetHostComputeResources) {
            networksService.applyDefaultHost(vms, targetHostComputeResources);
        };

        replicationService.getWanCompression = function () {
            return networksService.getWanCompression();
        };

        replicationService.getSelectedVms = function () {
            return vmsService.getInitializedSelectedVms();
        };

        replicationService.setSelectedVms = function (vms) {
            vmsService.setInitializedSelectedVms(vms);
        };

        replicationService.setSelectedDatastore = function (ds) {
            vpgService.setDefaultTargetDataStore(ds);
            storageService.applyDefaultDatastore(replicationService.getSelectedVms(), ds);
            storageService.applyDefaultJournalDatastore();
            vpgService.handleChangingDefaultValues();
        };

        replicationService.clearDefaultDatastore = function () {
            storageService.clearDefaultDatastore(replicationService.getSelectedVms());
        };

        replicationService.updtaeStorageProfileForVms = function (vms) {
            _.forEach(vms, function (vm) {
                createVPGModel._updateStorageProfileForVM(vm);
            });
        };


        function getIdentifierFromPotentialServiceProfile(identifier) {
            var potentials = storageService.getPotentialServiceProfiles(),
                serviceProfile = _.find(potentials, function (sp) {
                    return _.isEqual(sp.Identifier.InternalId, identifier.InternalId);
                });

            return serviceProfile.Identifier;
        }
    });
