'use strict';

angular.module('zvmApp.core')
    .factory('vraInstallFactory', function ($uibModal,zertoServiceFactory,zAlertFactory,$translate,vos) {
        var vraInstallFactory = {};

        $translate(['VRA_INSTALL.FAIL_TITLE','VRA_INSTALL.FAIL_DESC']).then(function (translations) {
            vraInstallFactory.translations = translations;
        });

        vraInstallFactory.showInstallVra = function (vraSelectedItem) {
            if(vraSelectedItem !== undefined) {
                vraInstallFactory.vraLastInstalled = vraSelectedItem;
            }
            zertoServiceFactory.GetAvailableHostsForInstallation().then(function(result){
                //var result =[{"HostInfo":{"BaseComputeResourceIdentifier":{"InternalName":"host-10","Type":0,"ServerIdentifier":{"ServerGuid":"fc06f007-7e9b-4595-a653-3f1f4b0d9045"}},"ResourcePoolIdentifier":null,"DisplayName":"bs7bl02.zerto.local"}, "VibSupported":true, "HostCredentialRequired":true}, {"HostInfo":{"BaseComputeResourceIdentifier":{"InternalName":"host-2931","Type":0,"ServerIdentifier":{"ServerGuid":"fc06f007-7e9b-4595-a653-3f1f4b0d9045"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.147.11"}, "VibSupported":true, "HostCredentialRequired":true},{"HostInfo":{"BaseComputeResourceIdentifier":{"InternalName":"host-2932","Type":0,"ServerIdentifier":{"ServerGuid":"fc06f007-7e9b-4595-a653-3f1f4b0d9045"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.147.12"},"VibSupported":true, "HostCredentialRequired":true}]
                //vraInstallFactory.createHostMock(result);

                if (result !== undefined && result.length === 0) {
                    zAlertFactory.fail(vraInstallFactory.translations['VRA_INSTALL.FAIL_TITLE'], vraInstallFactory.translations['VRA_INSTALL.FAIL_DESC']);
                } else {

                    vraInstallFactory.hosts = _.sortBy(result, function (host) {
                        return host.HostInfo.DisplayName;
                    });

                    openPopUpDialog();
                }
            });

        };

        vraInstallFactory.createHostMock = function(result){
            var item1 = new vos.HostVraInfoVisualObject();
            item1.HostInfo = new vos.ComputeResourceVisualObject();
            item1.HostInfo.DisplayName = 'Host 1';
            item1.HostInfo.BaseComputeResourceIdentifier = new vos.BaseComputeResourceIdentifier();
            item1.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = new vos.ServerIdentifier();
            item1.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid='09d0d3b4-78d0-47c1-ad38-d01887e6d589';
            item1.HostInfo.BaseComputeResourceIdentifier.InternalName = 'host-9';
            item1.HostCredentialRequired = false; //need to enter password
            item1.VibSupported = true;

            result.push(item1);

            var item2 = new vos.HostVraInfoVisualObject();
            item2.HostInfo = new vos.ComputeResourceVisualObject();
            item2.HostInfo.DisplayName = 'Host 2';
            item2.HostInfo.BaseComputeResourceIdentifier = new vos.BaseComputeResourceIdentifier();
            item2.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = new vos.ServerIdentifier();
            item2.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid='9sa8sajsas-78d0-47c1-ad38-sajsajkkasx';
            item2.HostInfo.BaseComputeResourceIdentifier.InternalName = 'host-12';
            item2.HostCredentialRequired = true; //need to enter password
            item1.VibSupported = true;
            result.push(item2);
            vraInstallFactory.hosts= result;
        };

        function openPopUpDialog () {

            //call the service that loads the hosts list - if it contains values then open the dialog if not show error

            vraInstallFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/vra_install/vra-install.html',
                windowClass: 'vra-install-modal',
                controller: 'vraInstallController',
                backdrop:'static'
            });
        }

        return vraInstallFactory;
  });
