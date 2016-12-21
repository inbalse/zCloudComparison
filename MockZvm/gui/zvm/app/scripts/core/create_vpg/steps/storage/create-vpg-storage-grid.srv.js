'use strict';

angular.module('zvmApp.core')
    .constant('gridIds', {
        vmware: 'create-vpg-storage-vmware',
        aws: 'create-vpg-storage-aws',
        azure: 'create-vpg-storage-azure',
        scvmm: 'create-vpg-storage-scvmm'
    })
    .constant('columnFields', {
        vmName: 'VMName',
        volume: 'Volume',
        sourceAddress: 'SourceAddress',
        targetAddressObj: 'targetAddressObj',
        provisionedSizeInMb: 'provisionedSizeObj',
        swap: 'Swap',
        thin: 'Thin'
    })
    .service('createVpgStorageGridService', function ($filter, $translate, vpgService, storageService, gridIds, columnFields, vos) {
        var storageGrid = this;

        storageGrid.init = function () {
            var gridObj = {
                id: getGridId(),
                data: getStorageVolumes()
            };

            gridObj.groupByValues = [
                {
                    id: '',
                    text: $translate.instant('GROUP_BY_LIST.NONE')
                },
                {
                    id: columnFields.vmName,
                    text: $translate.instant('CREATE_VPG_STORAGE.GRID.VM_NAME')
                }
            ];

            gridObj.customOptions = {
                columns: getColumnDefs(),
                showCheckbox: !(vpgService.isAws() || vpgService.isAzure()),
                showSearch: true,
                editCommandHandler: function (item, column, editCommand) {
                    handleCommand(item, column, editCommand);
                    gridObj.grid.commandQueue.push(editCommand);
                }
            };

            return gridObj;
        };

        function getGridId() {
            if (vpgService.isScvmm()) {
                return gridIds.scvmm;
            }
            else if (vpgService.isAws()) {
                return gridIds.aws;
            }
            else if (vpgService.isAzure()) {
                return gridIds.azure;
            }
            else {
                return gridIds.vmware;
            }
        }

        function getColumnDefs() {
            if (vpgService.isScvmm()) {
                return getScvmmColumnDefs();
            }
            else if (vpgService.isAws() || vpgService.isAzure()) {
                return getPublicCloudColumnDefs();
            }
            else {
                return getDefaultColumnDefs();
            }
        }

        function getScvmmColumnDefs() {
            return [
                {name: $translate.instant('CREATE_VPG_STORAGE.GRID.VM_NAME'), field: 'VMName', width: 250},
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.PROTECTED_VOLUME_LOCATION'),
                    field: columnFields.sourceAddress,
                    width: 200
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.RECOVERY_VOLUME_LOCATION'),
                    field: columnFields.targetAddressObj,
                    zCellValidation: function (volume) {
                        return isReplicationTargetValid(volume);
                    },
                    width: 200,
                    formatter: $filter('targetAddressFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.PROVISIONED'),
                    formatter: $filter('objectFormatter'),
                    field: columnFields.provisionedSizeInMb,
                    width: 100
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.TEMP_DATA'),
                    field: columnFields.swap,
                    width: 101,
                    formatter: $filter('iconClassFormatter')('checkbox'),
                    editor: $filter('checkboxOneClickEditor')(columnFields.swap)
                }
            ];
        }

        function getPublicCloudColumnDefs() {
            return [
                {name: $translate.instant('CREATE_VPG_STORAGE.GRID.VM_NAME'), field: 'VMName', width: 200},
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.PROTECTED_VOLUME_LOCATION'),
                    field: columnFields.sourceAddress,
                    width: 200
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.PROVISIONED'),
                    field: columnFields.provisionedSizeInMb,
                    width: 100,
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.TEMP_DATA'),
                    field: columnFields.swap,
                    width: 101,
                    formatter: $filter('iconClassFormatter')('checkbox'),
                    editor: $filter('checkboxOneClickEditor')(columnFields.swap)
                }];
        }

        function getDefaultColumnDefs() {
            return [
                {name: $translate.instant('CREATE_VPG_STORAGE.GRID.VM_NAME'), field: 'VMName', width: 200},
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.PROTECTED_VOLUME_LOCATION'),
                    field: columnFields.sourceAddress,
                    width: 200
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.RECOVERY_VOLUME_LOCATION'),
                    field: columnFields.targetAddressObj,
                    zCellValidation: function (volume) {
                        return isReplicationTargetValid(volume);
                    },
                    width: 200,
                    formatter: $filter('targetAddressFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.PROVISIONED'),
                    formatter: $filter('objectFormatter'),
                    field: columnFields.provisionedSizeInMb,
                    width: 100
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.THIN'),
                    field: columnFields.thin,
                    width: 50,
                    zCellEditable: function (rowItem) {
                        return {
                            isEditEnabled: isReplicationTargetValid(rowItem.TargetAddress),
                            errorMessage: $translate.instant('CREATE_VPG_STORAGE.GRID.RECOVERY_VOLUME_LOCATION_IS_EMPTY'),
                            leftFixer: 80
                        };
                    },
                    formatter: $filter('iconClassFormatter')('checkbox'),
                    editor: $filter('checkboxOneClickEditor')(columnFields.thin)
                },
                {
                    name: $translate.instant('CREATE_VPG_STORAGE.GRID.TEMP_DATA'),
                    field: columnFields.swap,
                    width: 101,
                    formatter: $filter('iconClassFormatter')('checkbox'),
                    editor: $filter('checkboxOneClickEditor')(columnFields.swap)
                }
            ];
        }

        function handleCommand(item, column, editCommand) {
            switch (column.field) {
                case columnFields.thin:
                    setThin(item, editCommand.serializedValue);
                    break;
                case columnFields.swap:
                    setSwap(item, editCommand.serializedValue);
                    break;
            }

            editCommand.execute();
        }

        function setThin(item, newValue) {
            item.Thin = newValue;
            var volumeReplicationDestination = item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination;

            if (volumeReplicationDestination.Datastore) {
                volumeReplicationDestination.Datastore.IsThin = newValue;
            }
            if (volumeReplicationDestination.StoragePod) {
                volumeReplicationDestination.StoragePod.IsThin = newValue;
            }
            if (volumeReplicationDestination.VCDDatastore) {
                volumeReplicationDestination.VCDDatastore.IsThin = newValue;
            }
        }

        function setSwap(item, newValue) {
            item.Swap = newValue;
            item.InternalVolumeManagementSettings.Settings.IsSwap = newValue;
        }

        function isReplicationTargetValid(targetAddress) {
            //if target site is vcd is always valid and cannot be empty
            return vpgService.isVcdVapp() || (!_.isNullOrUndefined(targetAddress) && targetAddress !== '');
        }

        function getStorageVolumes() {
            var volumes = storageService.getStorageVolumes();

            _.forEach(volumes, function (volume) {
                volume.InternalVolumeManagementSettings.Settings = volume.InternalVolumeManagementSettings.Settings || new vos.VolumeSettings(false, new vos.VolumeReplicationDestination());
                volume.provisionedSizeObj = {
                    value: volume.ProvisionedSizeInMB,
                    display: $filter('gridMbToStringConvertorFilter')(volume.ProvisionedSizeInMB)
                };
                //added due to bug 22332 - set the display value in targetAddressFormatter
                volume.targetAddressObj = {};
            });

            return volumes;
        }
    });
