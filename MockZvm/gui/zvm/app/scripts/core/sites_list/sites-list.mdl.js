'use strict';

angular.module('zvmApp.models')
    .factory('sitesListModel', function (zertoServiceUpdaterFactory, $filter) {
        var sitesListModel = {};
        var operation = 'GetPeerListScreen';

        sitesListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, operation, [], false, sitesListModel.processData);
        };

        sitesListModel.updateNow = function () {
            zertoServiceUpdaterFactory.update();
        };

        sitesListModel.processData = function (data) {
            var processed = data.PeerSites;
            var result = {};

            processed = _.forEach(processed, function (item) {
                item.id = item.SiteId.SiteGuid;
                item.VersionObj = {
                    display: sitesListModel._versionToString(item.ZertoVersion),
                    value: item.ZertoVersion,
                    filterValue: sitesListModel._versionToString(item.ZertoVersion)
                };
                item.OutgoingBandWidthObj = {
                    display: $filter('mbToStringConvertorFilter')(item.OutgoingBandWidth),
                    value: item.OutgoingBandWidth
                };
                item.IncomingThroughputInMBObj = {
                    display: $filter('mbToStringConvertorFilter')(item.IncomingThroughputInMB),
                    value: item.IncomingThroughputInMB
                };
                item.ProvisionedStorageInMBObj = {
                    display: $filter('mbToStringConvertorFilter')(item.ProvisionedStorageInMB),
                    value: item.ProvisionedStorageInMB
                };
                item.UsedStorageInMBObj = {
                    display: $filter('mbToStringConvertorFilter')(item.UsedStorageInMB),
                    value: item.UsedStorageInMB
                };
            });
            result.IsPairEnabled = data.State.IsPairEnabled;
            result.IsUnPairEnabled = data.State.IsUnPairEnabled;
            result.list = processed;

            return result;
        };

        sitesListModel._versionToString = function (version) {
            var update = version.Update;
            var patch = 0;

            if (version.Update / 10 >= 1) {
                update = Math.round(version.Update / 10);
                patch = version.Update % 10;
            }

            return _.template('<%=major%>.<%=minor%> <%=update%> <%=patch%>')({
                major: version.Major,
                minor: version.Minor,
                update: version.Update !== Number.MAX_VALUE && version.Update > 0 ? 'U' + update : '',
                patch: patch > 0 ? 'P' + patch : ''
            });

            //return version.Major + '.' + version.Minor + ' ' + (version.Update === 0 ? '' : ('U' + version.Update));
        };

        return sitesListModel;
    });
