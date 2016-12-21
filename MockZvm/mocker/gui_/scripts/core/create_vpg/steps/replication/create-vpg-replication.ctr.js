'use strict';

angular.module('zvmApp.core')
    .controller('createVPGReplicationController', function ($scope, $translate, enums, advancedJournalSettingsFactory, advancedVmReplicationSettingsFactory, zAlertFactory,
                                                            advancedVcdVmReplicationSettingsFactory, vpgService, storageService, createVpgReplicationService) {

        $scope.forms = {};
        $scope.enums = enums;
        $scope.data = {
            isReverse: vpgService.isReverse(),
            isEdit: vpgService.isInEditMode(),
            isZssp: vpgService.isZssp(),
            isScvmm: vpgService.isScvmm(),
            isAws: vpgService.isAws(),
            isAzure: vpgService.isAzure(),
            isPublicCloud: (vpgService.isAws() || vpgService.isAzure())
        };

        /******************************
         * Handlers
         * */
        //Targets
        $scope.handleTargetSiteChange = function () {
            var previousTargetSite = vpgService.getTargetSite();

            vpgService.setInitSingleSiteType(false);
            vpgService.setTargetSiteType(null);
            $scope.data.targetSiteType = null;
            handleStepsForSelectedTargetSite(previousTargetSite, $scope.data.targetSite);
            initTargetSite($scope.data.targetSite);
        };

        $scope.handleSiteTypeChange = function () {
            var targetSite = vpgService.getTargetSite(),
                targetSiteType = $scope.data.targetSiteType;

            $scope.data.selectedTargetSiteIcon = createVpgReplicationService.getIconByTargetSite(targetSite);

            if (($scope.showSiteType || $scope.data.isEdit || $scope.data.isZssp) && targetSiteType === vpgService.getTargetSiteType()) {
                return;
            }

            if (!$scope.showSiteType && vpgService.getInitSingleSiteType()) {
                return;
            }

            if (!targetSiteType || !targetSite) {
                return;
            }

            vpgService.setTargetSiteType(targetSiteType);
            vpgService.setInitSingleSiteType(true);
            vpgService.getDefaultVPGSettings(targetSite, targetSiteType.value)
                .then(initViewData);

            $scope.$emit('wizard:FormValidationChanged');
        };

        $scope.handleZertoOrganizationChange = function () {
            //Due to bug 24162 changed ng-change to watcher, added logic to revert zorg or custom profile

            var oldZertoOrganizationIdentifier = vpgService.getZertoOrganizationIdentifier(),
                oldSelectedZORG = vpgService.getSelectedZorg(),
                selectedZORG = $scope.data.selectedZORG;

            vpgService.setZertoOrganizationIdentifier($scope.data.selectedZORG.Identifier);
            vpgService.setSelectedZorg(selectedZORG);

            var serviceProfile = storageService.getServiceProfile();
            if (_.isNullOrUndefined(serviceProfile)) {
                return;
            }

            if (selectedZORG.EnableCustomProfile) {
                storageService.toggleCustomServiceProfile(selectedZORG);
                return;
            }

            if (serviceProfile.Name !== 'Custom') {
                storageService.toggleCustomServiceProfile(selectedZORG);
                return;
            }

            zAlertFactory.warn($translate.instant('CREATE_VPG_REPLICATION.CUSTOM_SERVICE_PROFILE_WARNING_TITLE'),
                $translate.instant('CREATE_VPG_REPLICATION.CUSTOM_SERVICE_PROFILE_WARNING', {value: selectedZORG.OrganizationName}), function (event) {
                    if (event.target.name === zAlertFactory.buttons.OK) {
                        storageService.toggleCustomServiceProfile(oldSelectedZORG);

                        createVpgReplicationService.setServiceProfileIdentifier($scope.data.potentialServiceProfiles[0].Identifier);
                        return;
                    }
                    $scope.data.selectedZORG = oldSelectedZORG;
                    vpgService.setZertoOrganizationIdentifier(oldZertoOrganizationIdentifier);
                    vpgService.setSelectedZorg(oldSelectedZORG);
                });

        };

        $scope.getTrustedHtmlItem = function (item) {
            return _.escape(item);
        };

        var findSelectedDataStoreInPotentials = function (potentialsDatastores, selectedTargetDatastore) {
           return _.find(potentialsDatastores, {Datastore: { Id: { InternalDatastoreName: selectedTargetDatastore.Id.InternalDatastoreName}}});
        };

        var resetDataStore = function () {
            //clear data store if host is change (bug 18696)
            vpgService.setDefaultTargetDataStore(null);
            $scope.data.selectedTargetDatastore = null;
            createVpgReplicationService.clearDefaultDatastore();
        };

        //Host & Data store
        $scope.handleTargetHostChange = function () {
            var targetSite = vpgService.getTargetSite(),
                currentTargetHost = vpgService.getTargetHost();

            if (!$scope.data.selectedTargetHost || !targetSite) {
                return;
            }

            if (currentTargetHost === $scope.data.selectedTargetHost.ComputeResource) {
                return;
            }

            vpgService.setTargetHost($scope.data.selectedTargetHost);
            createVpgReplicationService.applyDefaultHost(createVpgReplicationService.getSelectedVms(), $scope.data.selectedTargetHost.ComputeResource);
            vpgService.getRecoveryComputeResources(vpgService.getProtectionGroupId(), targetSite.OwnersId.Id, $scope.data.selectedTargetHost.ComputeResource.BaseComputeResourceIdentifier)
                .then(function (computedResources) {
                    vpgService.applyRecoveryComputeResource(computedResources);

                    $scope.data.computeResources = computedResources;
                    $scope.handleSelectedServiceProfileChange();

                    if (!_.isNullOrUndefined($scope.data.selectedTargetDatastore)) {
                        var potentialDataStore = findSelectedDataStoreInPotentials(computedResources.Datastores, $scope.data.selectedTargetDatastore);
                        //check if find potential
                        if (_.isNullOrUndefined(potentialDataStore)) {
                            //reset the data store if doesn't exist in potentials
                            resetDataStore();
                        }else{
                            //set selected for next forward wizard actions
                            createVpgReplicationService.setSelectedDatastore(potentialDataStore.Datastore);
                        }
                    }

                    $scope.$emit('wizard:FormValidationChanged');
                });

            vpgService.handleChangingDefaultValues();
        };

        $scope.handleTargetDatastoreChange = function () {
            createVpgReplicationService.setSelectedDatastore($scope.data.selectedTargetDatastore);
            $scope.$emit('wizard:FormValidationChanged');
        };

        $scope.handleTargetVdcChange = function () {
            storageService.setTargetOrgVdc($scope.data.targetOrgvDC);
            vpgService.applyTargetVDC(true, $scope.data.targetOrgvDC, createVpgReplicationService.getSelectedVms());
        };


        //SLA
        $scope.handleSelectedServiceProfileChange = function () {
            var newServiceProfile, newJournalSize;
            if ($scope.data.isEdit) {
                newServiceProfile = _.find($scope.data.potentialServiceProfiles, {Identifier: $scope.data.selectedServiceProfileIdentifier});
                if (newServiceProfile) {
                    newJournalSize = newServiceProfile.MaxJournalSize;

                    // MaxJournalSizeInPercent : 0 (Unlimited Journal size)
                    // current journal size is unlimited && new journal size is limited --> show warning.
                    if (($scope.currentMaxJournalSize.MaxJournalSizeInPercent === 0 && newJournalSize.MaxJournalSizeInPercent > 0)) {
                        zAlertFactory.warn('Warning', $translate.instant('CREATE_VPG_REPLICATION.JOURNAL_SIZE_WARNING'),
                            null, [zAlertFactory.buttons.OK]);
                    }
                }
            }

            storageService.applyServiceProfile($scope.data.selectedServiceProfileIdentifier);
            $scope.data.isSlaCustom = storageService.getIsSlaCustom();

            if (!$scope.data.isSlaCustom) {
                setServiceProfileData();
            }

        };

        $scope.handleAdvancedJournalSettingsClicked = function () {
            advancedJournalSettingsFactory.openWindow()
                .then(function (journalData) {
                    storageService.setJournalSettings(journalData.manageJournalSettings);
                    storageService.setJournalLengthInMinutes(storageService.calculateMinimalJournalLengthInMinutes(journalData.defaultJournal.type, journalData.defaultJournal.value));
                    $scope.data.minimalJournalLenghtInMinutes = storageService.getJournalLengthInMinutes();
                    $scope.data.defaultJournal = journalData.defaultJournal;
                    $scope.data.journalMinMaxValue = createVpgReplicationService.getMinAndMaxValues(journalData.defaultJournal.type);
                })
                .finally(advancedJournalSettingsFactory.clear);
        };

        $scope.handleJournalTypeChange = function () {
            var journal = $scope.data.defaultJournal,
                journalHistoryObject = storageService.getJournalHistoryObject();

            if (!_.isNullOrUndefined(journalHistoryObject)) {
                if (journalHistoryObject.type === journal.type && journalHistoryObject.value === journal.value) {
                    return;
                }
            }

            $scope.data.journalMinMaxValue = createVpgReplicationService.getMinAndMaxValues(journal.type);
            $scope.data.defaultJournal = storageService.initJournalObject(storageService.getMinimalJournalLengthInMinutes(), journal.type);
            $scope.handleJournalValueChanged();
        };

        $scope.handleJournalValueChanged = function () {
            var journal = $scope.data.defaultJournal;
            journal.value = storageService.valueValidateForJournalHistory(journal.value, journal.type);
            storageService.setJournalLengthInMinutes(storageService.calculateMinimalJournalLengthInMinutes(journal.type, journal.value));
            $scope.data.minimalJournalLenghtInMinutes = storageService.getJournalLengthInMinutes();
        };

        $scope.handleRPOAlertValueChange = function () {
            storageService.setRPOThresholdInSeconds($scope.data.RPOAlertLabel.value);
        };

        $scope.handleRPOAlertTypeChange = function () {
            var inputValue = $scope.data.RPOAlertLabel;
            var targetType = $scope.data.RPOAlert;

            $scope.data.RPOAlertValuesOptions = createVpgReplicationService.getRPOAlertValuesOptions(targetType.type);
            $scope.data.RPOAlertLabel = _.find($scope.data.RPOAlertValuesOptions, {label: inputValue.label});

            //check if same label exist in RPOAlertValuesOptions
            if (_.isNullOrUndefined($scope.data.RPOAlertLabel)) {
                //if not set to first by default
                $scope.data.RPOAlertLabel = $scope.data.RPOAlertValuesOptions[0];
            }

            storageService.setRPOThresholdInSeconds($scope.data.RPOAlertLabel.value);
        };

        $scope.handleTestPeriodChange = function () {
            vpgService.setSelectedTestPeriod($scope.data.selectedTestPeriod);
        };

        //Advanced
        $scope.handleAdvancedVMSettingsClicked = function () {
            var vpgSettings = vpgService.getVpgSettings();
            if (vpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp) {
                advancedVcdVmReplicationSettingsFactory.openWindow()
                    .then(function (updatedVms) {
                        createVpgReplicationService.setSelectedVms(updatedVms);
                        createVpgReplicationService.updtaeStorageProfileForVms(updatedVms);
                    });
            } else {
                advancedVmReplicationSettingsFactory.openWindow(refreshValidations)
                    .then(function (updatedVms) {
                        createVpgReplicationService.setSelectedVms(updatedVms);
                        storageService.initVolumes(updatedVms);
                        advancedVmReplicationSettingsFactory.refreshValidations();
                    });
            }
        };

        $scope.handleCompressionChanged = function () {
            // zCheckbox call change function before changing the model
            vpgService.setWanCompression($scope.data.wanCompression);
        };


        /******************************
         * Wachers
         * */
        $scope.$watch('forms.replicationForm.$valid', function (value) {
            if ($scope.data.targetSiteType && $scope.data.targetSiteType.value === enums.VpgEntityType.VCDvApp) {
                $scope.data.isVCDTargetNotComplete = !value;
            } else {
                $scope.data.isVCDTargetNotComplete = false;
            }
            $scope.$emit('wizard:FormValidationChanged');
        });


        /******************************
         * Functions
         * */
        function initReplicationStep() {
            var targetSite = vpgService.getTargetSite(),
                targetSiteType = vpgService.getTargetSiteType(),
                siteInfo = vpgService.getInitialSitesInfo();


            //New
            if (!$scope.data.isEdit &&
                siteInfo.TargetSites &&
                siteInfo.TargetSites.length === 1 && siteInfo.TargetSites[0].IsConnected) {
                if (!targetSite) {
                    $scope.data.targetSite = siteInfo.TargetSites[0];
                    targetSite = siteInfo.TargetSites[0];
                    //todo: handle this case when opening the wizard (like the edit case) - see createVPGWizardModel.getSteps function
                    handleStepsForSelectedTargetSite(null, $scope.data.targetSite);
                }
                else {
                    $scope.data.targetSite = targetSite;
                    $scope.data.targetSiteType = targetSiteType;
                }
            }

            //Edit
            else if (targetSite) {
                $scope.data.targetSite = targetSite;
                $scope.data.targetSiteType = targetSiteType;
            }

            if($scope.data.targetSite){
                initTargetSite($scope.data.targetSite);
            }
            initViewData();

            var serviceProfile = storageService.getServiceProfile();
            var potentialServiceProfiles = storageService.getPotentialServiceProfiles();

            if ($scope.data.isEdit && !_.isNullOrUndefined(serviceProfile)) {
                var currentServiceProfileIdentifier = serviceProfile.SelectedIdentifier;
                $scope.currentMaxJournalSize = _.result(_.find(potentialServiceProfiles, {Identifier: currentServiceProfileIdentifier}), 'MaxJournalSize');
            }

            $scope.data.defaultJournal = storageService.initJournalObject(storageService.getMinimalJournalLengthInMinutes());
            $scope.data.journalMinMaxValue = createVpgReplicationService.getMinAndMaxValues($scope.data.defaultJournal.type);
        }

        function initTargetSite(targetSite) {
            var targetSiteType = $scope.data.targetSiteType,
                potentialSiteTypes;

            $scope.data.isAws = targetSite.VirtualizationProviderType === enums.VpgEntityType.Aws;
            $scope.data.isAzure = targetSite.VirtualizationProviderType === enums.VpgEntityType.Azure;
            $scope.data.isPublicCloud = $scope.data.isAzure || $scope.data.isAws;

            vpgService.setTargetSite(targetSite);
            vpgService.initTargetSiteTypeCollection(targetSite);
            potentialSiteTypes = vpgService.getPotentialSiteTypes();

            $scope.showSiteType = !vpgService.getVappIdentifier() && targetSite && potentialSiteTypes.length > 1;

            if (potentialSiteTypes.length === 1) {
                targetSiteType = potentialSiteTypes[0];
            }

            $scope.data.targetSiteType = targetSiteType;
            vpgService.setTargetSiteType(targetSiteType);
            $scope.data.showHostAndStorage = isShowHostAndStorage(targetSiteType);
            $scope.data.potentialSiteTypes = potentialSiteTypes;
            $scope.handleSiteTypeChange();
        }

        function initViewData() {
            initTargetsElements();
            initHostsAndDataStoresElements();
            initSlaElements();
            initRpoAlertElements();
            initLabelsAndFlags();
            initAdvancedElements();
            setServiceProfileData();
            $scope.data.showVcdStuff = isShowVcdStuff(vpgService.getTargetSiteType());
        }

        function findTargetHostFromPotentials(targetHost, potentials) {
            if (!_.isEmpty(potentials)) {
                return _.find(potentials, function (potentialHost) {
                    return _.isEqual(targetHost, potentialHost.ComputeResource);
                });
            }
            return null;
        }

        function initLabelsAndFlags() {
            var targetOrgVdc = vpgService.getTargetOrgVdc(),
                targetSiteType = vpgService.getTargetSiteType();

            $scope.data.storageLabel = $translate.instant('CREATE_VPG_REPLICATION.DATASTORE');
            $scope.data.datastoreOrStorageTooltip = $translate.instant('VPG_WIZARD.REPLICATION_DATASTORE');

            if (!_.isNullOrUndefined(targetSiteType)) {
                switch (targetSiteType.value) {
                    case enums.VpgEntityType.HyperV :
                        $scope.data.storageLabel = $translate.instant('CREATE_VPG_REPLICATION.STORAGE');
                        $scope.data.datastoreOrStorageTooltip = $translate.instant('VPG_WIZARD.REPLICATION_STORAGE');
                        break;
                    case enums.VpgEntityType.Aws :
                        break;
                    case enums.VpgEntityType.VCDvApp :
                        $scope.data.isVCDTargetNotComplete = _.isNullOrUndefined(targetOrgVdc);
                        break;
                    case enums.VpgEntityType.VCVpg :
                        break;
                }
            }

            $scope.data.selectedTargetSiteIcon = createVpgReplicationService.getIconByTargetSite($scope.data.targetSite);
        }

        function refreshValidations() {
            $scope.$emit('wizard:FormValidationChanged');
        }

        function initRpoAlertElements() {
            var rpoAlertObject = createVpgReplicationService.getRpoObject();
            $scope.data.RPOAlert = _.find(createVpgReplicationService.getRPOAlertOptions(), {type: rpoAlertObject.type});
            $scope.data.RPOAlertValuesOptions = createVpgReplicationService.getRPOAlertValuesOptions($scope.data.RPOAlert.type);
            $scope.data.RPOAlertLabel = _.find($scope.data.RPOAlertValuesOptions, {value: rpoAlertObject.value});
        }

        function isShowHostAndStorage(siteType) {
            if (!_.isNullOrUndefined(siteType)) {
                switch (siteType.value) {
                    case enums.VpgEntityType.VCDvApp:
                        return false;
                    case enums.VpgEntityType.Aws:
                        return false;
                    case enums.VpgEntityType.Azure:
                        return false;
                    default:
                        return true;
                }
            }
        }

        function isShowVcdStuff(siteType) {
            if (!_.isNullOrUndefined(siteType)) {
                switch (siteType.value) {
                    case enums.VpgEntityType.VCDvApp :
                        return true;
                    default:
                        return false;
                }
            }
            return false;
        }

        function handleStepsForSelectedTargetSite(previousTargetSite, selectedTargetSite) {

            //todo: create isPublicCloud function in a public cloud service and use it in all places
            function isPublicCloud(site) {
               return site && (site.VirtualizationProviderType === enums.VpgEntityType.Aws || site.VirtualizationProviderType === enums.VpgEntityType.Azure);
            }

            var isSelectedPublicCloud, isPreviousPublicCloud;
            isSelectedPublicCloud = isPublicCloud(selectedTargetSite);
            isPreviousPublicCloud = isPublicCloud(previousTargetSite);

            if (isPreviousPublicCloud && !isSelectedPublicCloud) {
                $scope.$parent.restoreSteps();
            } else if(!isPreviousPublicCloud && isSelectedPublicCloud){
                $scope.$parent.removePublicCloudSteps();
            }
        }

        //View - Inits
        function initTargetsElements() {
            $scope.data.initialSitesInfo = vpgService.getInitialSitesInfo();
            $scope.data.potentialSiteTypes = vpgService.getPotentialSiteTypes();
            $scope.data.potentialTargetHosts = vpgService.getPotentialTargetHosts();
            $scope.data.selectedTargetHost = findTargetHostFromPotentials(vpgService.getTargetHost(), $scope.data.potentialTargetHosts);

            $scope.data.potentialZertoOrganizations = vpgService.getPotentialZertoOrganization();
            $scope.data.selectedZORG = vpgService.getSelectedZorg();
            if ($scope.data.selectedZORG) {
                $scope.handleZertoOrganizationChange();
            }
            $scope.data.isShowZertoOrganizationList = createVpgReplicationService.checkIfShowZertoOrganizationList($scope.data.potentialZertoOrganizations) && !$scope.data.isZssp;
        }

        function initHostsAndDataStoresElements() {
            $scope.data.showHostAndStorage = isShowHostAndStorage(vpgService.getTargetSiteType());

            $scope.data.computeResources = vpgService.getComputeResources();
            $scope.data.selectedTargetDatastore = vpgService.getDefaultTargetDataStore();

            $scope.data.targetOrgvDC = storageService.getTargetOrgVdc();
            $scope.data.vcdVirtualDataCenters = storageService.getVCDVirtualDatacenters();
        }

        function initSlaElements() {
            $scope.data.RPOAlertTypeOptions = createVpgReplicationService.getRPOAlertOptions();
            $scope.data.defaultJournalHistoryCollection = storageService.getJournalHistoryTypes();
            $scope.data.defaultTestPeriodCollection = vpgService.getDefaultTestPeriodCollection();
            $scope.data.selectedTestPeriod = vpgService.getSelectedTestPeriod();
            $scope.data.potentialServiceProfiles = storageService.getPotentialServiceProfiles();
            $scope.data.selectedServiceProfile = storageService.getServiceProfile();
            $scope.data.selectedServiceProfileIdentifier = createVpgReplicationService.getSelectedServiceProfileIdentifier();

            $scope.data.isSlaCustom =
                !_.isNullOrUndefined($scope.data.selectedServiceProfile) ?
                    createVpgReplicationService.checkIfSelectedServiceProfileEditable($scope.data.selectedServiceProfile) :
                    storageService.getIsSlaCustom();
        }

        function initAdvancedElements() {
            $scope.data.isCompressionConfigurable = vpgService.isCompressionConfigurable();
            $scope.data.wanCompression = createVpgReplicationService.getWanCompression();
        }

        function setServiceProfileData() {
            $scope.data.minimalJournalLenghtInMinutes = storageService.getJournalLengthInMinutes();
            $scope.data.RPOThressholdInSeconds = storageService.getRPOThresholdInSeconds();
            $scope.data.selectedTestPeriod = vpgService.getSelectedTestPeriod();
        }

        /***********************
         * Init
         * */
        initReplicationStep();
    });
