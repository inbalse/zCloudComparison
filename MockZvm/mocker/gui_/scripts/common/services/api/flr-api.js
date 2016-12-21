'use strict';
/*
//
// WHEN SENDING QUERY STRING PARAMETERS USE THE PARAMS PARAMETER IN ZERTO API
//
 */
angular.module('zvmApp.services')
    .constant('fsItemTypes', {File: 'File', Folder: 'Folder', Partition: 'Partition', Disk: 'Disk'})
    .factory('flrApiFactory', function () {
        var flrApiFactory = {};
        flrApiFactory.PathInformationApi = function PathInformationApi(FullPath, PathItems) {
            this.FullPath = FullPath;
            this.PathItems = PathItems;
        };

        flrApiFactory.FlrMountApi = function FlrMountApi(FlrMountIdentifier, Link, OpenedTasks, VmIdentifier, CheckpointIdentifier, VmVolumeIdentifier) {
            this.FlrMountIdentifier = FlrMountIdentifier;
            this.Link = Link;
            this.OpenedTasks = OpenedTasks;
            this.VmIdentifier = VmIdentifier;
            this.CheckpointIdentifier = CheckpointIdentifier;
            this.VmVolumeIdentifier = VmVolumeIdentifier;
        };

        flrApiFactory.PathItemInformationApi = function PathItemInformationApi(FullPath, Link, ItemType, FileSize, IsReadOnly, CreationTime, LastAccessTime, LastWriteTime, IsFolder) {
            this.FullPath = FullPath;
            this.Link = Link;
            this.ItemType = ItemType;  // This is an FsItemTypes value
            this.FileSize = FileSize;  // In bytes; always 0 for ‘Folder’ item type
            this.IsReadOnly = IsReadOnly;
            this.CreationTime = CreationTime;
            this.LastAccessTime = LastAccessTime;
            this.LastWriteTime = LastWriteTime;
            this.IsFolder = IsFolder;
        };

        return {
            FlrMountApi: flrApiFactory,
            PathItemInformationApi: flrApiFactory.PathItemInformationApi,
            PathInformationApi: flrApiFactory.PathInformationApi
        };
    })
    .service('flrApiService', function ($q, $http, zertoApi, fsItemTypes, flrApiFactory, tweaksService, zSaveAs, zAlertFactory, zertoServiceUpdaterFactory, $rootScope, analyticsEventsTypes ) {
        var flrApiService = this;
        flrApiService.browse = function (FlrMountIdentifier, FullPath) {
            var deferred = $q.defer();
            var url = 'flrsessions/' + FlrMountIdentifier + '/';
            var params = {
                path: FullPath
            };

            zertoApi.makeRequestWrapper('GET', url, null, null, params)
                .then(function onSuccess(result) {
                    deferred.resolve(new flrApiFactory.PathInformationApi(result.FullPath, result.PathItems));
                }, function onError(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        flrApiService.mount = function (vpgIdentifier, VmIdentifier, CheckpointIdentifier, VmVolumeIdentifier) {
            var url = 'flrsessions/mount';
            var data = {
                VpgIdentifier: vpgIdentifier,
                VmIdentifier: VmIdentifier,
                CheckpointIdentifier: CheckpointIdentifier,
                VmVolumeIdentifier: VmVolumeIdentifier
            };

            return zertoApi.makeRequestWrapper('POST', url, data);
        };

        flrApiService.get = function (VmIdentifier, CheckpointIdentifier, VmVolumeIdentifier) {
            var _urlTemplate = 'FlrMounts?VmIdentifier=<%VmIdentifier%>&CheckpointIdentifier=<%CheckpointIdentifier%>&VmVolumeIdentifier=<%VmVolumeIdentifier%>';
            return zertoApi.makeRequestWrapper('GET', _urlTemplate({
                VmIdentifier: VmIdentifier,
                CheckpointIdentifier: CheckpointIdentifier,
                VmVolumeIdentifier: VmVolumeIdentifier
            }));
        };

        flrApiService.unmount = function (FlrMountIdentifier) {
            $rootScope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_FILE.UN_MOUNT);

            var _urlTemplate = _.template('flrsessions/<%=FlrMountIdentifier%>/unmount');
            return zertoApi.makeRequestWrapper('DELETE', _urlTemplate({FlrMountIdentifier: FlrMountIdentifier}));
        };

        flrApiService.requestDownload = function (FlrMountIdentifier, Compressed, Paths) {
            var _urlTemplate = _.template('flrsessions/<%=FlrMountIdentifier%>/Download');

            return zertoApi.makeRequestWrapper('POST',
                _urlTemplate({FlrMountIdentifier: FlrMountIdentifier}),
                {Compressed: Compressed, Paths: Paths});
        };

        flrApiService.startDownload = function (downloadFileName, downloadUrl) {
            var httpPath = _.trim(downloadUrl, '"');

            zSaveAs.download(downloadFileName, httpPath);
        };

        flrApiService.onFail = function (error) {
            zertoServiceUpdaterFactory.tick();
            if (error && error.HttpErroCode && error.HttpErroCode === 401) {
                zAlertFactory.fail('FLR', 'You do not have the correct set of permissions for this task.');
            }
            else if (error && error.Message) {
                zAlertFactory.fail(error.Message);
            }
            else if (error && error.faultString) {
                zAlertFactory.fail(error.faultString);
            }
            else if (error && error.faultCode) {
                zAlertFactory.fail(error.faultCode);
            }
            else {
                zAlertFactory.fail('Unknown error occurred. Please contact Zerto Support');
            }
        };

        flrApiService.onSuccess = function () {
            zertoServiceUpdaterFactory.tick();
        };
    })
    .constant('flrSessionStatusTypes', {
        NotMounted: 'NotMounted',
        MountInProgress: 'MountInProgress',
        MountReady: 'MountReady',
        UnmountInProgress: 'UnmountInProgress'
    })
    .factory('flrSessionsApiFactory', function () {
        var flrSessionsApiFactory = {};
        flrSessionsApiFactory.FlrSessionInformationApi = function (flrSessionId, flrSessionStatus, vmId, volumeId, checkPointId) {
            this.FlrSesisonId = flrSessionId;
            this.FlrSessionStatus = flrSessionStatus;
            this.VmId = vmId;
            this.VolumeId = volumeId;
            this.CheckPointId = checkPointId;
        };

        return {_self: flrSessionsApiFactory, FlrSessionInformationApi: flrSessionsApiFactory.FlrSessionInformationApi};
    })
    .service('flrSessionsApiService', function ($q, $http, zertoApi) {
        var flrSessionsApiService = this;

        flrSessionsApiService.get = function (sessionId) {
            var deferred = $q.defer();
            var _urlTemplate;
            var url = 'flrsessions';
            if (sessionId) {
                _urlTemplate = _.template('flrsessions?sessionId=<%=sessionId%>');
                url = _urlTemplate({sessionId: sessionId});
            }

            zertoApi.makeRequestWrapper('GET', url)
                .then(function onSuccess(result) {
                    deferred.resolve(result);
                }, function onError(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    });
