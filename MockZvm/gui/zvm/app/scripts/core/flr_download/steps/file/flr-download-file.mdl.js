'use strict';

angular.module('zvmApp.core')
    .constant('flrConstant', {
        GRID_PATH_COLUMN_FIELD: 'path'
    })
    .factory('flrDownloadFileModel', function ($filter, entityCases, zEntitiesService, zWizardStepStates, zAlertFactory, busyOverlayService,
                                               flrApiService, zSlickGridFilterTypes, flrDownloadModel, flrDownloadSettingsModel, $translate, flrConstant) {

        var pathDelimiter = '\\';
        var initialPath = '/';

        //TODO Denis: refactor to best practise like ( flr-wizard-vm.mdl and flr-wizard-restorepoint.mdl )

        var flrDownloadFileModel = {};
        flrDownloadFileModel.busyOverlayKey = 'flrApiService_browse';
        flrDownloadFileModel.loaded = false;
        flrDownloadFileModel.nodeIndex = 0;
        flrDownloadFileModel.model = {};
        flrDownloadFileModel.treeHandler = {};
        flrDownloadFileModel.model.tree = [];
        flrDownloadFileModel.model.potentialVolumes = [];
        flrDownloadFileModel.model.selectedNodes = [];
        flrDownloadFileModel.model.options = {
            showSearch: false,
            showGroupBy: false,
            showCheckbox: false,
            columns: [
                {
                    name: 'Name', id: 'nameObject', field: 'nameObject', filter: zSlickGridFilterTypes.WILDCARD,
                    formatter: $filter('zEntitiesFormatter')(zEntitiesService.createParams('flr', null, null, 'remove'))
                },
                {
                    name: 'Path',
                    id: flrConstant.GRID_PATH_COLUMN_FIELD,
                    field: flrConstant.GRID_PATH_COLUMN_FIELD,
                    filter: zSlickGridFilterTypes.WILDCARD,
                    formatter: $filter('flrPathPopoverFormatter')
                }]
        };

        flrDownloadFileModel.validate = function () {
            flrDownloadFileModel.model.step.isEnabled = flrDownloadFileModel.model.selectedNodes.length > 0;
            flrDownloadFileModel.model.step.stateIcon = flrDownloadFileModel.model.step.isEnabled ? zWizardStepStates.VALID : zWizardStepStates.INITIAL;
            return flrDownloadFileModel.model.step.isEnabled;
        };

        flrDownloadFileModel.model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'FILES',
            stepTitle: $translate.instant('FLR.DOWNLOAD.FILE.TITLE'),
            template: '<ng-include src="\'scripts/core/flr_download/steps/file/flr-download-file.html\'"></ng-include>',
            isValid: flrDownloadFileModel.validate,
            validationError: $translate.instant('FLR.DOWNLOAD.FILE.NO_FILES_ERROR')
        };

        flrDownloadFileModel.revert = function () {
            flrDownloadFileModel.model.step.class = '';
            flrDownloadFileModel.model.step.isEnabled = false;
            flrDownloadFileModel.model.step.stateIcon = zWizardStepStates.INITIAL;
            flrDownloadFileModel.model.tree = [];
            flrDownloadFileModel.model.selectedNodes = [];
            flrDownloadFileModel.loaded = false;
            flrDownloadFileModel.nodeIndex = 0;
        };

        flrDownloadFileModel.browseRoot = function () {
            busyOverlayService.addOperation(flrDownloadFileModel.busyOverlayKey);
            flrApiService.browse(flrDownloadSettingsModel.model.sessionId, initialPath)
                .then(flrDownloadFileModel.onBrowseSuccess, function () {
                    busyOverlayService.removeOperation(flrDownloadFileModel.busyOverlayKey);
                });
        };

        flrDownloadFileModel.browseOnce = function () {
            if (!flrDownloadFileModel.loaded) {
                flrDownloadFileModel.browseRoot();
                flrDownloadFileModel.loaded = true;
            }
        };

        flrDownloadFileModel.generateIndex = function () {
            return flrDownloadFileModel.nodeIndex += 1;
        };

        flrDownloadFileModel.getFileName = function (item) {
            var split = item.FullPath.split(pathDelimiter);
            return split.pop();
        };

        flrDownloadFileModel.getFilePath = function (item) {
            var split = item.FullPath.split(pathDelimiter);
            split.pop();
            return split.join(pathDelimiter);
        };

        flrDownloadFileModel.modifiedNode = null;

        flrDownloadFileModel.onBrowseSuccess = function (result) {
            var basePath = '\\' + flrDownloadSettingsModel.model.VolumeId;
            busyOverlayService.removeOperation(flrDownloadFileModel.busyOverlayKey);
            if (result.FullPath === initialPath) {
                var rootFolderSize = 0;
                if (result.PathItems && result.PathItems.length > 0) {
                    result.PathItems.forEach(function (item) {
                        rootFolderSize += item.FileSize;
                    });
                }
                flrDownloadFileModel.model.selectedNodes = [];
                flrDownloadFileModel.model.tree = [{
                    id: 'root',
                    name: flrDownloadSettingsModel.model.VolumeId,
                    nameObject: {
                        display: flrDownloadSettingsModel.model.VolumeId,
                        nameText: {
                            label: flrDownloadSettingsModel.model.VolumeId,
                            location: '',
                            type: entityCases.caseText
                        },
                        deleteIcon: {
                            type: entityCases.caseDelete,
                            enabled: true
                        },
                        fileType: {
                            type: 'volume'
                        }
                    },
                    nodes: [],
                    fullPath: '',
                    isFile: false,
                    isRoot: true,
                    modified: true,
                    selected: false,
                    checkStatus: 'unchecked',
                    size: rootFolderSize
                }];

                flrDownloadFileModel.modifiedNode = flrDownloadFileModel.model.tree[0];
            }

            //we need to pass on first item always = _.rest
            _.forEach(_.rest(result.PathItems), function (item) {
                var fileName = flrDownloadFileModel.getFileName(item);
                var path = flrDownloadFileModel.getFilePath(item);


                flrDownloadFileModel.modifiedNode.nodes.push(
                    {
                        id: 'node' + flrDownloadFileModel.generateIndex(),
                        name: fileName,
                        nameObject: {
                            display: fileName,
                            nameText: {
                                label: fileName,
                                location: '',
                                type: entityCases.caseText
                            },
                            deleteIcon: {
                                type: entityCases.caseDelete,
                                enabled: true
                            },
                            fileType: {
                                type: item.IsFolder ? 'folder' : 'file'
                            }
                        },
                        path: basePath + path,
                        nodes: [],
                        isFile: !item.IsFolder,
                        fullPath: item.FullPath,
                        size: item.IsFolder ? 'N/A' : item.FileSize,
                        dateCreated: $filter('zDateFilter')(item.CreationTime),
                        dateModified: $filter('zDateFilter')(item.LastWriteTime),
                        dateAccessed: $filter('zDateFilter')(item.LastAccessTime),
                        collapsed: true,
                        selected: flrDownloadFileModel.modifiedNode.selected,
                        modified: false,
                        checkStatus: flrDownloadFileModel.modifiedNode.selected ? 'checked' : 'unchecked'
                    }
                );
            });
        };

        flrDownloadFileModel.previousNode = null;

        flrDownloadFileModel.addNode = function (node) {
            _.find(flrDownloadFileModel.model.selectedNodes, function (currentNode) {
                if (currentNode.id === node.id) {
                    node.selected = true;
                    return;
                }
            });
        };

        flrDownloadFileModel.removeNode = function (node) {
            _.remove(flrDownloadFileModel.model.selectedNodes, function (item) {
                var isEqual = (item.id === node.id);
                if (isEqual) {
                    node.selected = false;
                }
                return isEqual;
            });

            node.selected = false;
        };

        flrDownloadFileModel.expandCollapse = function (node) {
            node.collapsed = !node.collapsed;
            flrDownloadFileModel.modifiedNode = node;
            if (!node.modified) {
                node.modified = true;
                busyOverlayService.addOperation(flrDownloadFileModel.busyOverlayKey);
                flrApiService.browse(flrDownloadSettingsModel.model.sessionId, encodeURIComponent(node.fullPath))
                    .then(flrDownloadFileModel.onBrowseSuccess, flrApiService.onFail)
                    .finally(function () {
                        //when selecting the root folder, we should get the sizes of inner files. therefore, we need to re-calculate sizes when expanding each folder.
                        flrDownloadFileModel.treeHandler.propagateCheckFromParent(node.nodes, node.checkStatus);
                        flrDownloadFileModel.treeHandler.verifyAllParentsCheckStatus(flrDownloadFileModel.model.tree);
                        flrDownloadFileModel.model.selectedNodes = [];
                        flrDownloadFileModel.treeHandler.aggregateSelectedFilesForView(flrDownloadFileModel.model.tree);
                    });
            }
        };

        flrDownloadModel.addModel({revert: flrDownloadFileModel.revert});

        flrDownloadFileModel.toggleCheckbox = function (node) {
            if (node.checkStatus === 'checked') {
                node.checkStatus = 'unchecked';
                node.selected = false;
                flrDownloadFileModel.removeNode(node);
            } else {
                node.checkStatus = 'checked';
                node.selected = true;
                flrDownloadFileModel.addNode(node);
                if (!node.isFile) {
                    flrDownloadFileModel.treeHandler.removeNodesRecursive(node);
                }
            }

            flrDownloadFileModel.treeHandler.propagateCheckFromParent(node.nodes, node.checkStatus);
            flrDownloadFileModel.treeHandler.verifyAllParentsCheckStatus(flrDownloadFileModel.model.tree);
            flrDownloadFileModel.model.selectedNodes = [];
            flrDownloadFileModel.treeHandler.aggregateSelectedFilesForView(flrDownloadFileModel.model.tree);
        };

        /************************************
         * treeHandler methods
         * */
        flrDownloadFileModel.treeHandler.verifyAllParentsCheckStatus = function (nodes) {
            var retVal = '';
            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];

                if (node.nodes && node.nodes.length > 0) {
                    node.checkStatus = flrDownloadFileModel.treeHandler.verifyAllParentsCheckStatus(node.nodes);
                    if (node.checkStatus === 'checked') {
                        node.selected = true;
                        flrDownloadFileModel.addNode(node);
                    } else {
                        node.selected = false;
                        flrDownloadFileModel.removeNode(node);
                    }
                }
                if (retVal === '') {
                    retVal = node.checkStatus;
                }
                if (retVal !== node.checkStatus) {
                    return 'partlyChecked';
                }
            }
            return retVal;
        };

        flrDownloadFileModel.treeHandler.propagateCheckFromParent = function (nodes, status) {
            if (angular.isUndefined(nodes) || angular.isUndefined(status)) {
                return;
            }
            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];
                node.checkStatus = status;
                if (status === 'checked') {
                    node.selected = true;
                    flrDownloadFileModel.addNode(node);
                    if (!node.isFile) {
                        flrDownloadFileModel.treeHandler.removeNodesRecursive(node);
                    }
                } else {
                    node.selected = false;
                    flrDownloadFileModel.removeNode(node);
                    if (!node.isFile) {
                        flrDownloadFileModel.treeHandler.addNodesRecursive(node);
                    }
                }

                if (node.nodes) {
                    flrDownloadFileModel.treeHandler.propagateCheckFromParent(node.nodes, status);
                }
            }
        };

        flrDownloadFileModel.treeHandler.removeNodesRecursive = function (node) {
            _.forEach(node.nodes, function (item) {

                if (item.selected) {
                    flrDownloadFileModel.removeNode(item);
                }

                if (item.nodes.length > 0) {
                    flrDownloadFileModel.treeHandler.removeNodesRecursive(item);
                }
            });
        };

        flrDownloadFileModel.treeHandler.addNodesRecursive = function (node) {
            _.forEach(node.nodes, function (item) {

                if (!item.selected) {
                    flrDownloadFileModel.addNode(item);
                }

                if (item.nodes.length > 0) {
                    flrDownloadFileModel.treeHandler.addNodesRecursive(item);
                }
            });
        };

        flrDownloadFileModel.treeHandler.aggregateSelectedFilesForView = function (nodes) {
            //after selecting the files, this method will build the view for the "selected files"
            //if the whole library was selected, the view will include only the library. (and will not show the library content)
            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];

                if (node.nodes && node.nodes.length > 0) {
                    if (node.selected && !node.isRoot && node.nodes.length > 1) {
                        flrDownloadFileModel.model.selectedNodes.push(node);
                    } else {
                        flrDownloadFileModel.treeHandler.aggregateSelectedFilesForView(node.nodes);
                    }
                } else {
                    if (node.selected) {
                        flrDownloadFileModel.model.selectedNodes.push(node);
                    }
                }
            }
        };

        /************************************
         * Handle N/A Problem
         * */
        flrDownloadFileModel.treeHandler.getSelectedFilesAndLibraries = function (nodes, selectedFiles, selectedLibraries) {
            //traverse the tree and collect all files (not libraries- only files)

            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];

                //has children nodes
                if (node.nodes && node.nodes.length > 0) {
                    if (node.selected && !node.isRoot && node.isFile) {
                        selectedFiles.push(node);
                    } else {
                        if (node.selected && !node.isRoot) {
                            selectedLibraries.push(node);
                        }
                        flrDownloadFileModel.treeHandler.getSelectedFilesAndLibraries(node.nodes, selectedFiles, selectedLibraries);
                    }
                }
                //has no children nodes
                else {
                    if (node.selected && node.isFile) {
                        selectedFiles.push(node);
                    }
                    if (node.selected && !node.isFile && !node.isRoot) {
                        selectedLibraries.push(node);
                    }
                }
            }
        };

        return {
            _self: flrDownloadFileModel,
            model: flrDownloadFileModel.model,
            revert: flrDownloadFileModel.revert,
            browseOnce: flrDownloadFileModel.browseOnce,
            browseRoot: flrDownloadFileModel.browseRoot,
            expandCollapse: flrDownloadFileModel.expandCollapse,
            validate: flrDownloadFileModel.validate,
            toggleCheckbox: flrDownloadFileModel.toggleCheckbox,
            treeHandler: flrDownloadFileModel.treeHandler
        };
    });
