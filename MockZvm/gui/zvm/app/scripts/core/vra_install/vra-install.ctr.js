'use strict';
angular.module('zvmApp.core')
    .controller('vraInstallController', function ($scope, $translate, vraInstallFactory, vos, zertoServiceFactory, zAlertFactory,
                                                  globalStateModel, enums, configurePairedSiteRoutingModel, analyticsEventsTypes) {
        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.loading = true;
        $scope.forms = {};
        var index;

        //check if has selected vra in vra list
        if (!_.isEmpty(vraInstallFactory.preSelectedVraHostsAdress)) {
            //find pre selected host in potentials hosts list
            index = _.findIndex(vraInstallFactory.hosts, function (host) {
                return host.HostInfo.DisplayName === vraInstallFactory.preSelectedVraHostsAdress;
            });
        }

        $scope.vraInstallObject = {
            vraIpConf: {},
            NetMask: '255.255.255.0',
            showPasswordText: false,
            amountRam: 3,
            host: !_.isEmpty(vraInstallFactory.preSelectedVraHostsAdress) ? vraInstallFactory.hosts[index] : vraInstallFactory.preSelectedVraHostsAdress //pre selected vra if exist
        };

        $scope.hostList = vraInstallFactory.hosts;
        $scope.isUserNamePasswordRequired = false;
        $scope.VibUseCredentials = {isVibUseCredentialsSelected: false};


        $scope.getHostIdentifier = function () {
            var tempHost = angular.fromJson($scope.vraInstallObject.host);
            return new vos.HostIdentifier(tempHost.HostInfo.BaseComputeResourceIdentifier.InternalName, tempHost.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier);
        };

        $scope.changedHost = function () {

            var tempHost = angular.fromJson($scope.vraInstallObject.host);
            if (tempHost.HostCredentialRequired === true) {
                $scope.isUserNamePasswordEnabled = true;
            } else {
                $scope.isUserNamePasswordEnabled = false;
                $scope.vraInstallObject.password = '';
            }

            //reset model to null when host is change (Bug 25957)
            $scope.vraInstallObject.dataStore = null;
            $scope.vraInstallObject.network = null;

            $scope.isUserNamePasswordRequired = $scope.isUserNamePasswordEnabled && (!tempHost.VibSupported || $scope.VibUseCredentials.isVibUseCredentialsSelected) && globalStateModel.data.VirtualizationProviderType !== enums.VpgEntityType.HyperV;

            zertoServiceFactory.GetHostEntitiesForVraInstall($scope.getHostIdentifier()).then(function (result) {
                //var result = {"Datastores":[{"Datastore":{"Id":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"datastore1 (358MB free of 0.50GB)"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore (48.1GB free of 149GB)"},"IsEnabled":true}],"Networks":[{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"Network","InternalName":"network-11"},"DisplayName":"VM Network"},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-34"},"DisplayName":"dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-145"},"DisplayName":"dvs.VCDVSNoamNetworkIso-f9a84b4e-7bc1-434d-8a38-b0c4e47a357b"},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-378"},"DisplayName":"dvs.VCDVSKobi network-5028025c-0916-4b72-8a8d-b21d3a4942fe"},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-21"},"DisplayName":"dvPortGroup"}],"DescendantHosts":[],"PotentialFolders":[{"Id":{"InternalFolderName":"group-v131","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"[Default]ZertoRecoveryFolder"},{"Id":{"InternalFolderName":"group-v387","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Zerto_guy_7445af2c-7bed-4b59-8de6-96a48daa4f91"},{"Id":{"InternalFolderName":"group-v183","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Zerto_guy_7e24c83d-299d-42d7-b863-d833a66b1e0b"},{"Id":{"InternalFolderName":"group-v215","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Zerto_org_e8385638-4a6d-459f-b704-c43662cd6ab6"},{"Id":{"InternalFolderName":"group-v142","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vcd"},{"Id":{"InternalFolderName":"group-v143","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Service VMs"},{"Id":{"InternalFolderName":"group-v28","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vcloud"},{"Id":{"InternalFolderName":"group-v41","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"NoamOrgInc (043816c2-b470-4be7-807a-2cb3e3567cee)"},{"Id":{"InternalFolderName":"group-v42","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"NoamOrgVCD2 (22759e18-f8b0-499e-a90b-0652cc2f0724)"},{"Id":{"InternalFolderName":"group-v48","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"NoamVcdVapp4 (7c6a7547-4140-4176-a7f8-669e4bb060e4)"},{"Id":{"InternalFolderName":"group-v43","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vApp_system_1 (87817a3c-cbbc-446d-8497-2ee07d11404e)"},{"Id":{"InternalFolderName":"group-v29","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"ORG (d446e662-c129-487a-a594-8d2f06550ec1)"},{"Id":{"InternalFolderName":"group-v30","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"orgvdc (2c7e1564-54f8-4b29-960e-23be9f24dd74)"},{"Id":{"InternalFolderName":"group-v318","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Guy_vApp(3) (1303db43-aba9-47aa-a143-df492f0500c5)"},{"Id":{"InternalFolderName":"group-v373","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"kobi-vapp-test (b52cf07a-80ff-40f0-a16d-780b6a7e4624)"},{"Id":{"InternalFolderName":"group-v129","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"naom vm (15bc6809-8ccd-4595-91ab-420c6a9af690)"},{"Id":{"InternalFolderName":"group-v351","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vApp_liron2 (9bc61db3-35b7-4ed4-8aea-be4ccf8499d3)"},{"Id":{"InternalFolderName":"group-v31","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Service VMs"},{"Id":{"InternalFolderName":"group-v3","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"/"}],"AssociatedRawDevices":[{"Destination":{"Device":{"InternalDeviceName":"naa.60050768028180700000000000000190","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInKb":157286400,"SizeInBytes":161061273600,"DeviceName":"/vmfs/devices/disks/naa.60050768028180700000000000000190","DevicePath":"/vmfs/devices/disks/naa.60050768028180700000000000000190","Mode":1},"DisplayName":"IBM iSCSI Disk (naa.60050768028180700000000000000190) - virtual","IsEnabled":true},{"Destination":{"Device":{"InternalDeviceName":"naa.60050768028180700000000000000190","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInKb":157286400,"SizeInBytes":161061273600,"DeviceName":"/vmfs/devices/disks/naa.60050768028180700000000000000190","DevicePath":"/vmfs/devices/disks/naa.60050768028180700000000000000190","Mode":2},"DisplayName":"IBM iSCSI Disk (naa.60050768028180700000000000000190) - physical","IsEnabled":true},{"Destination":{"Device":{"InternalDeviceName":"mpx.vmhba1:C0:T0:L0","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInKb":8388608,"SizeInBytes":8589934592,"DeviceName":"/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0","DevicePath":"/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0","Mode":1},"DisplayName":"Local VMware Disk (mpx.vmhba1:C0:T0:L0) - virtual","IsEnabled":true},{"Destination":{"Device":{"InternalDeviceName":"mpx.vmhba1:C0:T0:L0","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInKb":8388608,"SizeInBytes":8589934592,"DeviceName":"/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0","DevicePath":"/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0","Mode":2},"DisplayName":"Local VMware Disk (mpx.vmhba1:C0:T0:L0) - physical","IsEnabled":true}]};
                if (result !== undefined) {
                    $scope.dataStores = result.Datastores;
                    $scope.networks = result.Networks;

                    //if its for edit values then set the selected datastores and network
                    if ($scope.vraLastInstalled !== undefined) {
                        $scope.setSelectedDataStore();
                        $scope.setSelectedNetwork();
                    }
                }
            }, function (result) {
                zAlertFactory.fail('Error', result.faultString);
            });
        };

        if ($scope.vraInstallObject.host && $scope.vraInstallObject.host.HostInfo) {
            $scope.changedHost();
        }

        //==========================================================================
        //  Init
        //==========================================================================
        $scope.$watch('forms.vraForm.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.installButton.disabled = !value;
            }
        });

        $scope.$watch('vraInstallObject.networkType', function (value) {
            $scope.isNetworkDisabled = parseInt(value) === 0;
        });

        $scope.isVibUseCredentialsSelectedChanged = function () {
            $scope.isUserNamePasswordRequired = $scope.isUserNamePasswordEnabled && $scope.VibUseCredentials.isVibUseCredentialsSelected && globalStateModel.data.VirtualizationProviderType !== enums.VpgEntityType.HyperV;
        };

        $scope.initNetworkTypes = function () {
            $scope.networkTypes = [
                {label: 'DHCP', value: '0'},
                {label: 'Static', value: '1'}
            ];
            $scope.vraInstallObject.networkType = $scope.networkTypes[1].value;

        };

        $scope.initGroupList = function () {
            zertoServiceFactory.GetAllVrasBandwidthGroups().then(function (result) {
                $scope.vragroups = result;
                if (!_.isEmpty(result)) {
                    $scope.vraInstallObject.vraGroup = 'default_group';
                }
            });
        };

        $scope.createNewGroup = function (item) {
            $scope.vragroups.unshift(item);
            $scope.vraInstallObject.vraGroup = $scope.vragroups[0];
            $scope.vraInstallObject.newGroup = '';
        };

        //==========================================================================
        //  User interaction
        //==========================================================================

        $scope.close = function () {
            $scope.clearVraLastInstalled();
            vraInstallFactory.modalInstance.close();
        };

        $scope.cancel = function () {
            $scope.clearVraLastInstalled();
            vraInstallFactory.modalInstance.dismiss();
        };

        $scope.installHandler = function () {

            $scope.removeVM = false;
            $scope.installButton.disabled = true;

            if ($scope.isUserNamePasswordEnabled === true) {
                $scope.vraInstallObject.userName = 'root';
            } else {
                $scope.vraInstallObject.userName = null;
                $scope.vraInstallObject.password = null;
            }

            $scope.installVra();
        };

        $scope.enterPressEvent = function () {
            if (!$scope.installButton.disabled) {
                $scope.installHandler();
            }
        };

        $scope.initializeVraIPConfig = function (vra) {
            if (configurePairedSiteRoutingModel.usePairedSiteRouting &&
                !_.isEmpty(configurePairedSiteRoutingModel.pairedSiteRouting.PeerGw) &&
                !_.isEmpty(configurePairedSiteRoutingModel.pairedSiteRouting.PeerNetMask) &&
                !_.isEmpty(configurePairedSiteRoutingModel.pairedSiteRouting.PeerNetwork)) {

                vra.vraIpConf.PeerGw = configurePairedSiteRoutingModel.pairedSiteRouting.PeerGw;
                vra.vraIpConf.PeerNetMask = configurePairedSiteRoutingModel.pairedSiteRouting.PeerNetMask;
                vra.vraIpConf.PeerNetwork = configurePairedSiteRoutingModel.pairedSiteRouting.PeerNetwork;
            }
        };


        $scope.installVra = function () {
            var vraRam = parseInt($scope.vraInstallObject.amountRam),
                gaEventData = {};
            $scope.initializeVraIPConfig($scope.vraInstallObject);

            var installVraUsingVib = $scope.vraInstallObject.host.VibSupported && !$scope.VibUseCredentials.isVibUseCredentialsSelected;

            //GA
            try {
                gaEventData.configuration = $scope.networkTypes[$scope.vraInstallObject.networkType].label;
                gaEventData.useCredentials = $scope.VibUseCredentials.isVibUseCredentialsSelected;
                gaEventData.vraGuid = $scope.getHostIdentifier().ServerIdentifier.ServerGuid;
            }
            catch (e) {
                gaEventData = {};
            }
            $scope.$emit(analyticsEventsTypes.SETUP.NEW_VRA.END, gaEventData);

            zertoServiceFactory.InstallVraOnHost($scope.getHostIdentifier(),
                $scope.getDataStoreID(),
                $scope.getNetworkID(),
                $scope.getVraIpConf(),
                $scope.vraInstallObject.userName,
                $scope.vraInstallObject.password,
                vraRam, $scope.vraInstallObject.vraGroup,
                $scope.removeVM, installVraUsingVib).then(function () {   //on success
                $scope.close();
            }, function (result) {   //on failure
                if (result.faultString !== undefined && result.faultString.indexOf($translate.instant('VRA_INSTALL.REMOVE_VM')) !== -1) {
                    zAlertFactory.warn($translate.instant('VRA_INSTALL.TITLE'), $translate.instant('VRA_INSTALL.REMOVE_VM'), handleRemoveVmClick);
                } else if (result.faultString) {
                    zAlertFactory.warn($translate.instant('VRA_INSTALL.TITLE'), result.faultString, $scope._handleAlertClick, [zAlertFactory.buttons.OK, zAlertFactory.buttons.ABORT]);
                }

                $scope.installButton.disabled = false;
            });

        };

        $scope._handleAlertClick = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {

                var vraRam = parseInt($scope.vraInstallObject.amountRam);
                return zertoServiceFactory.InstallVraOnHost($scope.getHostIdentifier(),
                    $scope.getDataStoreID(),
                    $scope.getNetworkID(),
                    $scope.getVraIpConf(),
                    $scope.vraInstallObject.userName,
                    $scope.vraInstallObject.password,
                    vraRam, $scope.vraInstallObject.vraGroup,
                    true);
            }
        };


        function handleRemoveVmClick(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                $scope.removeVM = true;
                $scope.installVra();
            }
        }

        //==========================================================================
        //  Helpers
        //==========================================================================
        $scope.setEditParameters = function () {
            //select the correct host from list
            $scope.vraLastInstalled = vraInstallFactory.vraLastInstalled;
            var foundHost = $scope.findHostInList($scope.vraLastInstalled.HostInfo.BaseComputeResourceIdentifier);

            if (foundHost !== undefined) {
                $scope.vraInstallObject.host = foundHost;
            }

            $scope.vraInstallObject.vraGroup = $scope.vraLastInstalled.VraInfo.BandwidthGroup;
            $scope.vraInstallObject.amountRam = $scope.vraLastInstalled.VraInfo.MemoryInGB;

            if ($scope.vraLastInstalled.VraInfo.IsDhcpConf === true) {  //DHCP
                $scope.vraInstallObject.networkType = $scope.networkTypes[0].value;
            } else {          //Static
                $scope.vraInstallObject.networkType = $scope.networkTypes[1].value;
                $scope.isNetworkDisabled = false;
                $scope.vraInstallObject.Ip = $scope.vraLastInstalled.VraInfo.IpConfiguration.Ip;
                $scope.vraInstallObject.NetMask = $scope.vraLastInstalled.VraInfo.IpConfiguration.NetMask;
                $scope.vraInstallObject.DefaultGw = $scope.vraLastInstalled.VraInfo.IpConfiguration.DefaultGw;
            }

            $scope.changedHost();

        };

        $scope.findHostInList = function (BaseComputeResourceValue) {
            return _.find(vraInstallFactory.hosts, function (host) {
                return _.isEqual(host.HostInfo.BaseComputeResourceIdentifier, BaseComputeResourceValue);
            });
        };

        $scope.setSelectedNetwork = function () {
            var foundNetwork = $scope.findNetworkInList($scope.vraLastInstalled.VraInfo.Network.Id);

            if (foundNetwork !== undefined) {
                $scope.vraInstallObject.network = foundNetwork;
            }
        };

        $scope.findNetworkInList = function (IdValue) {
            return _.find($scope.networks, function (network) {
                return _.isEqual(network.Id, IdValue);
            });
        };

        $scope.setSelectedDataStore = function () {
            var foundDataStore = $scope.findDataStoreInList($scope.vraLastInstalled.VraInfo.Datastore.Id);

            if (foundDataStore !== undefined) {
                $scope.vraInstallObject.dataStore = foundDataStore;
            }
        };

        $scope.findDataStoreInList = function (IdValue) {
            return _.find($scope.dataStores, function (datastore) {
                return _.isEqual(datastore.Datastore.Id, IdValue);
            });
        };

        $scope.getVraIpConf = function () {
            var vraIpConf = new vos.VraIpConf();
            if ($scope.vraInstallObject.networkType === '1') {
                vraIpConf.DefaultGw = $scope.vraInstallObject.DefaultGw;
                vraIpConf.Ip = $scope.vraInstallObject.Ip;
                vraIpConf.NetMask = $scope.vraInstallObject.NetMask;
            }
            return vraIpConf;
        };

        $scope.getDataStoreID = function () {
            var tempDataStore = angular.fromJson($scope.vraInstallObject.dataStore).Datastore.Id;
            return new vos.DatastoreIdentifier(tempDataStore.InternalDatastoreName, tempDataStore.ServerIdentifier);
        };

        $scope.getNetworkID = function () {
            var tempNetwork = angular.fromJson($scope.vraInstallObject.network);
            return new vos.NetworkIdentifier(tempNetwork.Id.InternalName, tempNetwork.Id.InternalType, tempNetwork.Id.ServerIdentifier);
        };

        $scope.initButtons = function () {
            $scope.installButton = {
                label: $translate.instant('VRA_INSTALL.INSTALL'),
                handler: $scope.installHandler,
                disabled: true
            };
            $scope.buttons = [
                {
                    label: $translate.instant('VRA_INSTALL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.cancel,
                    disabled: false
                },
                $scope.installButton
            ];
            $scope.textLabel = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV ? $translate.instant('VRA_INSTALL.STORAGE') : $translate.instant('VRA_INSTALL.DATASTORE');
        };

        $scope.clearVraLastInstalled = function () {
            vraInstallFactory.vraLastInstalled = undefined;
        };

        $scope.initGroupList();
        $scope.initNetworkTypes();
        $scope.initButtons();
        if (vraInstallFactory.vraLastInstalled !== undefined) {
            $scope.setEditParameters();
        }
        $scope.loading = false;
    });
