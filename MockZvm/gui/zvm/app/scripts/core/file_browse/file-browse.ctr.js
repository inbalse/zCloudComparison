'use strict';

angular.module('zvmApp.core')

    .controller('fileBrowseController', function ($scope, $timeout, $translate, $filter, vos, enums, fileBrowseFactory,
                                                  vpgService, zAlertFactory, createVPGModel, datastore, volume,
                                                  createVpgStorageService) {

        $scope.restrictionText = $translate.instant('FILE_BROWSE.RESTRICTION_TEXT', {
            file_type: (vpgService.isScvmm() ? 'VHDX\\VHD' : 'VMDK'),
            size: $filter('mbToStringConvertor')(volume.ProvisionedSizeInMB)
        });
        $scope.volume = volume;
        $scope.loading = true;
        $scope.busy = false;
        $scope.selectedNode = null;
        $scope.data = [
            {id: 'root', name: '', nodes: [], fullPath: '', isFile: false}
        ];
        $scope.nodeIndex = 0;


        //region ========================== button events ==========================
        $scope.save = function () {
            fileBrowseFactory.save($scope.path, $scope.datastore);
            $scope.close();
        };

        $scope.close = function () {
            fileBrowseFactory.close('close');
        };
        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.close,
                disabled: false
            },
            {label: $translate.instant('MODAL.SAVE'), handler: $scope.save, disabled: true}
        ];
        //endregion

        //region ========================== privates ==========================
        $scope._getIndex = function () {
            return $scope.nodeIndex += 1;
        };

        $scope._findNodeByName = function (nodes, name) {
            return _.find(nodes, function (item) {
                return item.name === name;
            });
        };

        $scope._appendFiles = function (target, fileObjects) {
            _.each(fileObjects.Files, function (item) {
                target.nodes.push({
                    id: 'node' + $scope._getIndex(),
                    name: item.FileName,
                    nodes: [],
                    disabled: !item.IsEnabled,
                    isFile: true,
                    fullPath: target.fullPath + '/' + item.FileName,
                    source: item
                });
            });
        };

        $scope._appendFolders = function (target, folderObjects) {
            _.each(folderObjects.SubFolders, function (item) {
                target.nodes.push({
                    id: 'node' + $scope._getIndex(),
                    name: item,
                    nodes: [],
                    disabled: false,
                    isFile: false,
                    fullPath: target.fullPath + '/' + item,
                    collapsed: true
                });
            });
        };

        $scope._appendNodes = function (target, data) {
            $scope._appendFiles(target, data);
            $scope._appendFolders(target, data);
        };

        $scope._browseWithPath = function (path) {
            if (createVPGModel.data.defaultVpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp) {

                var VirtualDataCenterId = new vos.VCDVirtualDatacenterIdentifier();
                VirtualDataCenterId.VCDId = createVPGModel.data.targetOrgvDC.VirtualDatacenter.Id.VCDId;

                return fileBrowseFactory.browseForVmdkFilesVcd(
                    createVPGModel.data.protectionGroupId,
                    createVPGModel.data.defaultVpgSettings.Config.OwnersId,
                    $scope.storageProfile,
                    path,
                    $scope.vmId,
                    volume.InternalVolumeManagementSettings.DiskLocationParams,
                    VirtualDataCenterId);
            } else {

                var datastoreIdentifier = new vos.DatastoreIdentifier();
                if (angular.isObject(datastore.Datastore.DatastoreClusterIdentifier)) {
                    datastoreIdentifier.InternalDatastoreName = datastore.Datastore.DatastoreClusterIdentifier.InternalName;
                    datastoreIdentifier.ServerIdentifier = datastore.Datastore.DatastoreClusterIdentifier.ServerIdentifier;
                } else {
                    datastoreIdentifier.InternalDatastoreName = datastore.Datastore.Id.InternalDatastoreName;
                    datastoreIdentifier.ServerIdentifier = datastore.Datastore.Id.ServerIdentifier;
                }

                return fileBrowseFactory.browseForVmdkFiles(createVPGModel.data.defaultVpgSettings.Config.ZertoOrganizationIdentifier,
                    createVPGModel.data.protectionGroupId,
                    createVPGModel.data.defaultVpgSettings.Config.OwnersId,
                    datastoreIdentifier,
                    path,
                    $scope.vmId,
                    volume.InternalVolumeManagementSettings.DiskLocationParams);
            }
        };
        //endregion     ===============================================================

        //region ========================== functions ==========================
        $scope.select = function (node) {

            if (node.disabled) {
                return;
            }

            if ($scope.selectedNode) {
                $scope.selectedNode.selected = false;
            }
            $scope.selectedNode = node;

            node.selected = !node.selected;

            if (!node.isFile) {
                $scope.path = undefined;
                node.collapsed = !node.collapsed;

                if (!node.modified) {
                    $scope.busy = true;
                    $scope._browseWithPath(node.fullPath).then($scope.onSubFolderBrowse, $scope.onBrowseError);
                }

            } else {
                $scope.path = node.source.VmdkFullPath;
                $scope.datastore = node.source.Datastore;
            }


        };

        $scope.onRootBrowse = function (result) {
            //if there is path we need to open all related branches
            var path = $scope.volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk.SpecificDisk.VmdkPath;

            $scope.data[0].modified = true;
            //simple recursion is for pussies! recursion with promises FTW!
            $scope.selectNodeRecursive(path, $scope.data[0], result, 0);


        };

        $scope.onSubFolderBrowse = function (result) {
            if (!$scope.selectedNode.isFile) {
                $scope.selectedNode.modified = true;
            }
            $scope._appendNodes($scope.selectedNode, result);
            $scope.busy = false;
        };

        $scope.onBrowseError = function (reason) {
            zAlertFactory.fail(reason.faultString, 'Code: ' + reason.faultCode, null);
            $scope.loading = false;
            fileBrowseFactory.close('close');
        };

        $scope.focusOnElement = function (nodeId) {
            $timeout(function () {
                var nodeElement = $('#' + nodeId);
                var $treeViewContainer = $('.tree-view-container');
                $treeViewContainer.scrollTop(nodeElement.offset().top - $treeViewContainer.height());
            }, 500);
        };

        $scope.selectNodeRecursive = function (path, parent, items, depth) {
            $scope._appendNodes(parent, items);

            var folders = [];
            if (angular.isDefined(path)) {
                folders = _.compact(path.split('/'));
            }

            if (depth < folders.length) {
                var currentPath = '';
                //clean and each
                var currentNode = null;

                for (var i = 0; i <= depth; i++) {
                    currentPath += '/' + folders[i];
                }

                currentNode = $scope._findNodeByName(parent.nodes, folders[depth]);

                if (currentNode) {
                    if (currentNode.isFile) {
                        $scope.path = currentNode.source.VmdkFullPath;
                        $scope.loading = false;

                        $scope.focusOnElement(currentNode.id);

                    } else {

                        currentNode.collapsed = false;
                        currentNode.modified = true;
                        //max depth reached in case of ''
                        if (currentPath !== '') {
                            $scope.loading = true;
                            $scope._browseWithPath(currentPath).then(function (result) {
                                $scope.selectNodeRecursive(path, currentNode, result, depth + 1);
                            }, $scope.onBrowseError);
                            //last folder
                        } else {
                            $scope.loading = false;
                        }
                    }

                    if (!currentNode.disabled) {
                        if ($scope.selectedNode) {
                            $scope.selectedNode.selected = false;
                        }

                        $scope.selectedNode = currentNode;
                        currentNode.selected = true;
                    }

                } else {
                    $scope.focusOnElement(parent.id);
                    $scope.loading = false;
                }

            } else {
                $scope.focusOnElement(parent.id);
                $scope.loading = false;
            }

        };

        $scope.init = function () {
            var foundVm = createVpgStorageService.findVmByVolume(volume);
            $scope.vmId = foundVm.InternalVirtualMachineId;
            $scope.storageProfile = (foundVm.StorageProfile && foundVm.StorageProfile.VCDStorageProfile ? foundVm.StorageProfile.VCDStorageProfile : null);
            $scope._browseWithPath(null).then($scope.onRootBrowse, $scope.onBrowseError);

        };
        //endregion     ===============================================================

        $scope.init();

        $scope.watchers = {
            path: $scope.$watch('path', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.buttons[1].disabled = angular.isUndefined(newValue);
                }
            })
        };
    });
