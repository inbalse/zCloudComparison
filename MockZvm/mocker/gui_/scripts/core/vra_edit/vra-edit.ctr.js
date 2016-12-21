'use strict';
angular.module('zvmApp.core')
    .controller('vraEditController', function ($scope, $translate, vraEditFactory, vos, zertoServiceFactory, zAlertFactory, analyticsEventsTypes) {
        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.loading = true;
        $scope.forms = {};

        $scope.vraEditObject = {
            showPasswordText: false,
            password: '',
            hostCredentialsRequired: vraEditFactory.selectedVra.VraInfo.Version.HostCredentialRequired,
            vibSupported: vraEditFactory.selectedVra.VraInfo.Version.VibSupported,
            useCredentials: !vraEditFactory.selectedVra.installedUsingSshKey
        };

        //==========================================================================
        //  Init
        //==========================================================================

        $scope.initGroupList = function () {
            zertoServiceFactory.GetAllVrasBandwidthGroups().then(function (result) {
                $scope.vragroups = result;
                if (result.length === 1) {
                    $scope.vraEditObject.vraGroup = $scope.vragroups[0];
                }
                //load the data
                $scope.setEditParameters();
            });
        };

        $scope.initNetworkTypes = function () {
            $scope.networkTypes = [
                {label: 'DHCP', value: '0', isDisabled: false},
                {label: 'Static', value: '1', isDisabled: false}
            ];
            $scope.vraEditObject.networkType = $scope.networkTypes[1].value;

        };

        $scope.$watch('vraEditObject.networkType', function (value) {
            $scope.isNetworkDisabled = value === '0';
        });

        $scope.initButtons = function () {
            $scope.saveButton = {label: $translate.instant('MODAL.SAVE'), handler: $scope.save, disabled: true};
            $scope.buttons = [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.cancel,
                    disabled: false
                },
                $scope.saveButton
            ];
        };


        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.close = function () {
            $scope.cancel();
        };

        $scope.cancel = function () {
            vraEditFactory.modalInstance.dismiss('close');
        };

        $scope._handleWarnModalClick = function (event) {
            var useRsaKeyInsteadOfPassword, gaEventData = {};

            if (event.target.name === zAlertFactory.buttons.OK) {
                if (!$scope.vraEditObject.useCredentials) {
                    $scope.vraEditObject.password = '';
                }

                if (!$scope.vraEditObject.vibSupported) {
                    useRsaKeyInsteadOfPassword = false;
                } else {
                    useRsaKeyInsteadOfPassword = !($scope.vraEditObject.useCredentials && $scope.vraEditObject.hostCredentialsRequired);
                }

                //GA
                try {
                    gaEventData.configuration = $scope.networkTypes[$scope.vraEditObject.networkType].label;
                    gaEventData.useCredentials = $scope.vraEditObject.useCredentials;
                    gaEventData.vraGuid = $scope.getHostIdentifier().ServerIdentifier.ServerGuid;
                }
                catch (e){
                }
                $scope.$emit(analyticsEventsTypes.SETUP.EDIT_VRA.END, gaEventData);

                zertoServiceFactory.ChangeVraSettings($scope.getHostIdentifier(),
                    $scope.getVraIpConf($scope.vraEditObject),
                    $scope.vraEditObject.password,
                    $scope.vraEditObject.vraGroup,
                    useRsaKeyInsteadOfPassword)
                    .then($scope.cancel, function (result) {   //on failure
                        zAlertFactory.fail($translate.instant('VRA_EDIT.TITLE'), result.faultString);
                    });
            }
        };

        $scope.save = function () {
            zAlertFactory.warn('', $translate.instant('VRA_CHANGE_PASSWORD.TEXT_WARN_MODAL'), $scope._handleWarnModalClick);
        };

        $scope.createNewGroup = function (item) {
            $scope.vragroups.unshift(item);
            $scope.vraEditObject.vraGroup = $scope.vragroups[0];
            $scope.vraEditObject.newGroup = '';
        };

        //==========================================================================
        //  Helpers
        //==========================================================================
        $scope.getHostIdentifier = function () {
            return new vos.HostIdentifier(vraEditFactory.selectedVra.VraInfo.HostInfo.BaseComputeResourceIdentifier.InternalName, vraEditFactory.selectedVra.VraInfo.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier);
        };

        $scope.getVraIpConf = function (vraEditObject) {
            var vraIpConf = new vos.VraIpConf();

            if (vraEditObject.networkType === '1') {
                vraIpConf.DefaultGw = vraEditObject.DefaultGw;
                vraIpConf.Ip = vraEditObject.Ip;

                vraIpConf.NetMask = vraEditObject.NetMask;
            }
            return vraIpConf;
        };

        $scope.setEditParameters = function () {
            var selectedVra = vraEditFactory.selectedVra;
            $scope.vraEditObject.host = selectedVra.DisplayName;
            $scope.vraEditObject.vraGroup = selectedVra.VraInfo.VraInfo.BandwidthGroup;

            if (selectedVra.VraInfo.VraInfo.IsDhcpConf === true) {  //DHCP
                $scope.vraEditObject.networkType = $scope.networkTypes[0].value;
            } else {          //Static
                $scope.vraEditObject.networkType = $scope.networkTypes[1].value;
                $scope.networkTypes[0].isDisabled = true;
                $scope.isNetworkDisabled = false;
                $scope.vraEditObject.Ip = selectedVra.VraInfo.VraInfo.IpConfiguration.Ip;
                $scope.vraEditObject.NetMask = selectedVra.VraInfo.VraInfo.IpConfiguration.NetMask;
                $scope.vraEditObject.DefaultGw = selectedVra.VraInfo.VraInfo.IpConfiguration.DefaultGw;
            }
        };

        $scope.$watch('forms.vraForm.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.saveButton.disabled = !value;
            }
        });

        $scope.initButtons();
        $scope.initNetworkTypes();
        $scope.initGroupList();
        $scope.loading = false;

    });
