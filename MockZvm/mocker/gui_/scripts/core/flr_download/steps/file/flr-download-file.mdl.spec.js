describe('flrDownloadFileModel', function () {
    var flrDownloadSettingsModel, flrDownloadFileModel, zWizardStepStates, flrApiFactory, fsItemTypes, busyOverlayService, flrApiService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_flrDownloadSettingsModel_, _flrDownloadFileModel_, _zWizardStepStates_, _flrApiFactory_, _fsItemTypes_, _flrApiService_, _busyOverlayService_) {
        flrDownloadFileModel = _flrDownloadFileModel_;
        zWizardStepStates = _zWizardStepStates_;
        flrApiFactory = _flrApiFactory_;
        fsItemTypes = _fsItemTypes_;
        flrDownloadSettingsModel = _flrDownloadSettingsModel_;
        busyOverlayService = _busyOverlayService_;
        flrApiService = _flrApiService_;
    }));

    it('should contain defined variables', function () {
        expect(flrDownloadFileModel.model).toBeDefined();
        expect(flrDownloadFileModel.toggleCheckbox).toBeDefined();
        expect(flrDownloadFileModel.expandCollapse).toBeDefined();
        expect(flrDownloadFileModel.validate).toBeDefined();
        expect(flrDownloadFileModel.revert).toBeDefined();
        expect(flrDownloadFileModel.treeHandler).toBeDefined();
    });

    it('should validate properly', function () {
        flrDownloadFileModel.validate();
        expect(flrDownloadFileModel.model.step.isEnabled).toBeFalsy();

        flrDownloadFileModel.model.selectedNodes = [{}];
        flrDownloadFileModel.validate();
        expect(flrDownloadFileModel.model.step.isEnabled).toBeTruthy();
    });

    it('should revert model', function () {
        flrDownloadFileModel.model.step.class = 'test';
        flrDownloadFileModel.model.step.isEnabled = true;
        flrDownloadFileModel.model.step.stateIcon = zWizardStepStates.VALID;
        flrDownloadFileModel.model.tree = [{}, {}];
        flrDownloadFileModel.model.selectedNodes = [{}];
        flrDownloadFileModel._self.loaded = true;
        flrDownloadFileModel.revert();

        expect(flrDownloadFileModel.model.step.class).toBe('');
        expect(flrDownloadFileModel.model.step.isEnabled).toBe(false);
        expect(flrDownloadFileModel.model.step.stateIcon).toBe(zWizardStepStates.INITIAL);
        expect(flrDownloadFileModel.model.tree).toEqual([]);
        expect(flrDownloadFileModel.model.selectedNodes).toEqual([]);
        expect(flrDownloadFileModel._self.loaded).toBeFalsy();
    });

    it('should generate index', function () {
        flrDownloadFileModel._self.generateIndex();
        expect(flrDownloadFileModel._self.nodeIndex).toBe(1);
    });

    it('should browseRoot with by calling api and popping busyOverlay', function () {
        spyOn(busyOverlayService, 'addOperation').and.callThrough();
        spyOn(flrApiService, 'browse').and.callThrough();

        flrDownloadSettingsModel.model.sessionId = 'test';

        flrDownloadFileModel.browseRoot();

        expect(busyOverlayService.addOperation).toHaveBeenCalledWith('flrApiService_browse');
        expect(flrApiService.browse).toHaveBeenCalledWith('test', '/');
    });

    it('should browse once', function () {
        expect(flrDownloadFileModel._self.loaded).toBeFalsy();
        flrDownloadFileModel.browseOnce();

        expect(flrDownloadFileModel._self.loaded).toBeTruthy();
        flrDownloadFileModel.browseOnce();
    });

    it('should return file name from a path', function () {
        var result = flrDownloadFileModel._self.getFileName({FullPath: 'asdf\\asdf\\test.txt'});
        expect(result).toBe('test.txt');
    });

    it('should return path', function () {
        var result = flrDownloadFileModel._self.getFilePath({FullPath: 'asdf\\asdf\\test.txt'});
        expect(result).toBe('asdf\\asdf');
    });

    it('should should create a files tree', function () {
        flrDownloadSettingsModel.model.VolumeId = 'VolumeId';
        spyOn(flrDownloadFileModel._self, 'getFileName').and.callThrough();
        spyOn(flrDownloadFileModel._self, 'getFilePath').and.callThrough();

        var path = '/';
        var result = new flrApiFactory.PathInformationApi('/', [
            new flrApiFactory.PathItemInformationApi(path + 'Folder', 'Link', fsItemTypes.Folder, 0, true, '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', true),
            new flrApiFactory.PathItemInformationApi(path + 'Folder', 'Link', fsItemTypes.Folder, 0, true, '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', true),
            new flrApiFactory.PathItemInformationApi(path + 'file1.tmp', 'Link', fsItemTypes.File, 1024, true, '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', false),
            new flrApiFactory.PathItemInformationApi(path + 'file2.tmp', 'Link', fsItemTypes.File, 2048, true, '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', '\/Date(1432050174531)\/', false)
        ]);
        flrDownloadFileModel._self.onBrowseSuccess(result);

        expect(flrDownloadFileModel.model.busy).toBeFalsy();
        expect(flrDownloadFileModel.model.selectedNodes).toEqual([]);
        expect(flrDownloadFileModel.model.tree[0].id).toEqual('root');
        expect(flrDownloadFileModel.model.tree[0].name).toEqual('VolumeId');
        expect(flrDownloadFileModel.model.tree[0].fullPath).toEqual('');
        expect(flrDownloadFileModel.model.tree[0].isFile).toBeFalsy();
        expect(flrDownloadFileModel.model.tree[0].modified).toBeTruthy();
        expect(flrDownloadFileModel._self.getFileName.calls.count()).toEqual(result.PathItems.length - 1);
        expect(flrDownloadFileModel._self.getFilePath.calls.count()).toEqual(result.PathItems.length - 1);
        expect(flrDownloadFileModel._self.modifiedNode.nodes.length).toBe(3);
    });

    it('should toggle file by removing or adding node', function () {
        spyOn(flrDownloadFileModel._self, 'removeNode');
        spyOn(flrDownloadFileModel._self, 'addNode');

        flrDownloadFileModel.toggleCheckbox({selected: true, checkStatus: "checked"});
        expect(flrDownloadFileModel._self.removeNode).toHaveBeenCalled();

        flrDownloadFileModel.toggleCheckbox({selected: false, checkStatus: "unchecked"});
        expect(flrDownloadFileModel._self.addNode).toHaveBeenCalled();
    });

    it('should expand|collapse node by modifying its properties and call for BE and busyOverlay', function () {
        spyOn(busyOverlayService, 'addOperation');
        spyOn(flrApiService, 'browse').and.callThrough();
        flrDownloadSettingsModel.model.sessionId = 'test';
        //initially all nodes are collapsed and not modified
        var node = {collapsed: true, modified: false, fullPath: 'testPath/'};

        flrDownloadFileModel.expandCollapse(node);

        expect(node.collapsed).toBeFalsy();
        expect(flrDownloadFileModel._self.modifiedNode).toEqual(node);
        expect(node.modified).toBeTruthy();

        flrDownloadFileModel.expandCollapse(node);

        expect(node.collapsed).toBeTruthy();
        expect(flrDownloadFileModel._self.modifiedNode).toEqual(node);
        expect(node.modified).toBeTruthy();

        expect(busyOverlayService.addOperation).toHaveBeenCalledWith('flrApiService_browse');
        expect(flrApiService.browse).toHaveBeenCalledWith('test', encodeURIComponent('testPath/')); //we need to encode url (UTF-8) before sending to BE

        expect(flrApiService.browse.calls.count()).toBe(1);
    });

    it('should recursively remove selected nodes', function () {
        spyOn(flrDownloadFileModel._self, 'removeNode');

        var treeRoot = {
            selected: true, // don't care
            nodes: [{selected: true, nodes: []}]
        };

        flrDownloadFileModel.treeHandler.removeNodesRecursive(treeRoot);
        expect(flrDownloadFileModel._self.removeNode).toHaveBeenCalled();
    });

    it('should recursively add un-selected nodes', function () {
        spyOn(flrDownloadFileModel._self, 'addNode');

        var treeRoot = {
            selected: false, // don't care
            nodes: [{selected: false, nodes: []}]
        };

        flrDownloadFileModel.treeHandler.addNodesRecursive(treeRoot);
        expect(flrDownloadFileModel._self.addNode).toHaveBeenCalled();
    });

    it('should aggregate selected files for selected-files-view', function () {
        flrDownloadFileModel.model.selectedNodes = [];
        var tree = [{
            selected: false,
            isRoot: true,
            nodes: [{
                selected: true,
                isRoot: false,
                nodes: [{selected: true, nodes: []}]
            }, {
                selected: true,
                isRoot: false,
                nodes: [{selected: true, nodes: []}]
            }, {
                selected: false,
                isRoot: false,
                nodes: [{
                    selected: false, nodes: [{
                        selected: true,
                        isRoot: false,
                        nodes: []
                    }, {
                        selected: false,
                        isRoot: false,
                        nodes: []
                    }]
                }]
            }]
        }];
        flrDownloadFileModel.treeHandler.aggregateSelectedFilesForView(tree);
        expect(flrDownloadFileModel.model.selectedNodes.length).toBe(3);
    });
});
