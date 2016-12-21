'use strict';

angular.module('zvmApp.core')
    .factory('vpgSitesModel', function ($stateParams, $q, vos, enums, zertoServiceFactory, zertoServiceUpdaterFactory) {
        var vpgSitesModel = {};

        vpgSitesModel.SOURCE_SITE = 0;// slot position for graph
        vpgSitesModel.SOURCE = 1;// slot position for graph
        vpgSitesModel.VM = 2;// slot position for graph
        vpgSitesModel.TARGET = 3;// slot position for graph
        vpgSitesModel.TARGET_SITE = 4;// slot position for graph
        vpgSitesModel.TYPE_VM = 'vm';// type for changing VM icon
        vpgSitesModel.TYPE_HOST = 'host';// type for changing VRA icon
        vpgSitesModel.TYPE_GHOST = 'ghost';// type for changing VRA icon
        vpgSitesModel.TYPE_RESOURCE_POOL = 'resourcePool';
        vpgSitesModel.TYPE_AWS = 'aws';
        vpgSitesModel.TYPE_AZURE = 'azure';
        vpgSitesModel.TYPE_ORGVDC = 'orgvDC';
        vpgSitesModel.ALERT_TYPE_NONE = 'none';
        vpgSitesModel.ALERT_TYPE_ERROR = 'error';
        vpgSitesModel.ALERT_TYPE_WARNING = 'warning';
        vpgSitesModel.LINK_TYPE_REGULAR = 'link';
        vpgSitesModel.LINK_TYPE_ALERT = 'link-alert';
        vpgSitesModel.SOURCE_HOST = 'SourceHost'; //type of data
        vpgSitesModel.TARGET_HOST = 'TargetHost';
        vpgSitesModel.SOURCE_SITE_REF = 'SourceSite'; //type of data
        vpgSitesModel.TARGET_SITE_REF = 'TargetSite';
        vpgSitesModel.NODE_NAME_MAX_LENGTH = 24;
        vpgSitesModel.VM_NAME_MAX_LENGTH = 20;
        vpgSitesModel.GROUP_BY = vpgSitesModel.SOURCE_SITE_REF;

        vpgSitesModel.TARGET_SITE_AWS = false;
        vpgSitesModel.SOURCE_SITE_AWS = false;

        vpgSitesModel.TARGET_SITE_AZURE = false;
        vpgSitesModel.SOURCE_SITE_AZURE = false;

        var Link = function () {
            this.key = 0;
            this.source = {};
            this.target = {};
        };

        vpgSitesModel.get = function () {
            var deferred = $q.defer();
            var protectionGroupIdentifier = new vos.ProtectionGroupIdentifier($stateParams.id);
            zertoServiceFactory.GetProtectionGroupDetailsScreen(protectionGroupIdentifier).then(function (result) {
                deferred.resolve(vpgSitesModel._processData(result));
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        vpgSitesModel.register = function (scope) {
            var operation = 'GetProtectionGroupDetailsScreen';
            var protectionGroupIdentifier = new vos.ProtectionGroupIdentifier($stateParams.id);
            return zertoServiceUpdaterFactory.register(scope, operation, [protectionGroupIdentifier], false, vpgSitesModel._processData);
        };

        vpgSitesModel._processData = function (vpgData) {
            if (angular.isUndefined(vpgData.Topology) || !vpgData.Topology) {
                return null;
            }

            var groupedVMs = vpgSitesModel._groupByHost(vpgData, vpgSitesModel.GROUP_BY);

            var processed = {};
            processed.sites = {};

            vpgSitesModel.TARGET_SITE_AWS = vpgData.Entities.Target === enums.VpgEntityType.Aws;
            vpgSitesModel.SOURCE_SITE_AWS = vpgData.Entities.Source === enums.VpgEntityType.Aws;

            vpgSitesModel.TARGET_SITE_AZURE = vpgData.Entities.Target === enums.VpgEntityType.Azure;
            vpgSitesModel.SOURCE_SITE_AZURE = vpgData.Entities.Source === enums.VpgEntityType.Azure;

            processed.sites.source = vpgSitesModel._parseSite(vpgData.Topology.SourceSite, vpgData.Entities.Source, vpgData.SiteDetails.SiteName);
            processed.sites.target = vpgSitesModel._parseSite(vpgData.Topology.TargetSite, vpgData.Entities.Target, vpgData.SiteDetails.SiteName);

            vpgSitesModel._sourceSite = processed.sites.source;
            vpgSitesModel._targetSite = processed.sites.target;

            processed.links = vpgSitesModel._createLinks(groupedVMs, vpgData);

            var sourceSlot = vpgSitesModel._insertHostNodes(vpgData.Topology.SourceSite.Hosts, vpgSitesModel.SOURCE_HOST, vpgSitesModel.SOURCE);
            var targetSlot = vpgSitesModel._insertHostNodes(vpgData.Topology.TargetSite.Hosts, vpgSitesModel.TARGET_HOST, vpgSitesModel.TARGET);

            var vmsSlot = vpgSitesModel._insertVmsNodes(groupedVMs, vpgSitesModel.VM);
            vpgSitesModel._calcGroupHeight(sourceSlot, vpgSitesModel.SOURCE_HOST, groupedVMs);
            vpgSitesModel._calcGroupHeight(targetSlot, vpgSitesModel.TARGET_HOST, groupedVMs);
            processed.vmsCount = vmsSlot.length;
            processed.sourcesCount = sourceSlot.length;
            processed.targetsCount = targetSlot.length;
            processed.nodes = sourceSlot.concat(targetSlot).concat(vmsSlot);
            return processed;
        };

        vpgSitesModel._parseSite = function (data, type, thisSiteName) {
            var site = {};
            site.name = data.SiteName;
            site.location = data.SiteLocation;
            site.ip = data.SiteIp;
            site.type = type;
            site.alert = vpgSitesModel._getAlertType(data, data.Alerts);
            site.connected = data.IsConnected;
            site.data = data;
            site.thisSite = thisSiteName === data.SiteName;
            vpgSitesModel._applyShortName(site, site.name);
            return site;
        };

        vpgSitesModel._countVms = function (key, type, vms) {
            if (type === vpgSitesModel.TARGET_HOST && (vpgSitesModel.TARGET_SITE_AWS || vpgSitesModel.TARGET_SITE_AZURE || vpgSitesModel._hasOrgVdc(vpgSitesModel._targetSite.data.Hosts)  )) {
                return vms.length;
            } else if (type === vpgSitesModel.SOURCE_HOST && (vpgSitesModel.SOURCE_SITE_AWS || vpgSitesModel.SOURCE_SITE_AZURE || vpgSitesModel._hasOrgVdc(vpgSitesModel._sourceSite.data.Hosts)  )) {
                return vms.length;
            } else {
                var filtered = _.filter(vms, function (vm) {
                    return key === type + '-' + vpgSitesModel._getHostName(vm, type);
                });
                return filtered.length;
            }
        };

        vpgSitesModel._calcGroupHeight = function (nodes, type, vms) {
            var prevVMs = 0;
            _.forEach(nodes, function (node, index) {
                var countedVms = vpgSitesModel._countVms(node.key, type, vms);
                node.groupHeight = index === 0 ? 1 : (prevVMs + countedVms);
                prevVMs += countedVms;
            });
        };

        vpgSitesModel._createOrgVdcHost = function (type, item, slot) {
            var orgVdcNode = {};
            orgVdcNode.key = type + '-' + vpgSitesModel.TYPE_ORGVDC;
            orgVdcNode.type = vpgSitesModel.TYPE_ORGVDC;
            orgVdcNode.name = item.OrgVdc.DisplayName;
            orgVdcNode.title = item.OrgVdc.DisplayName;
            orgVdcNode.slot = slot;
            orgVdcNode.alert = vpgSitesModel._getHostAlertState(item);
            orgVdcNode.index = 1;
            orgVdcNode.data = item;//tooltip and any additional data will go here
            vpgSitesModel._applyShortName(orgVdcNode, orgVdcNode.name);
            return orgVdcNode;
        };

        vpgSitesModel._insertHostNodes = function (list, type, slot) {
            var nodes = [];

            if (vpgSitesModel._hasOrgVdc(list)) {
                var orgVdcNode = vpgSitesModel._createOrgVdcHost(type, list[0], slot);
                nodes.push(orgVdcNode);

            } else {
                _.forEach(list, function (item, index) {
                    var node = {};
                    node.key = type + '-' + vpgSitesModel._getHostName(item, 'Host');
                    node.type = vpgSitesModel._checkType(item);
                    node.name = vpgSitesModel._getDisplayName(item);
                    node.title = vpgSitesModel._getDisplayName(item);
                    node.slot = slot;
                    node.alert = vpgSitesModel._getHostAlertState(item);
                    node.index = index + 1;
                    node.data = item;//tooltip and any additional data will go here
                    vpgSitesModel._applyShortName(node, node.name);
                    nodes.push(node);
                });
            }
            return nodes;
        };

        vpgSitesModel._insertVmsNodes = function (list, slot) {
            var nodes = [];
            _.forEach(list, function (item, index) {
                var node = {};
                node.key = vpgSitesModel.VM + '-' + item.InternalVirtualMachineId.InternalVmName;
                node.name = item.Name;
                node.title = item.Name;
                node.slot = slot;
                node.index = index + 1;
                node.type = vpgSitesModel.TYPE_VM;
                node.data = item;//tooltip and any additional data will go here
                vpgSitesModel._applyShortName(node, node.name, true);
                nodes.push(node);
            });
            return nodes;
        };

        vpgSitesModel._linkTarget = function (link, vm, key, alert) {
            link.key = key;

            if (vpgSitesModel.TARGET_SITE_AWS) {
                link.target.key = vpgSitesModel.TYPE_AWS;
                link.target.type = vpgSitesModel.TARGET_SITE;
            } else if(vpgSitesModel.TARGET_SITE_AZURE){
                link.target.key = vpgSitesModel.TYPE_AZURE;
                link.target.type = vpgSitesModel.TARGET_SITE;
            } else if (vpgSitesModel._hasOrgVdc(vpgSitesModel._targetSite.data.Hosts)) {
                link.target.key = vpgSitesModel.TARGET_HOST + '-' + vpgSitesModel.TYPE_ORGVDC;
                link.target.type = vpgSitesModel.TARGET;
            } else {
                link.target.key = vpgSitesModel.TARGET_HOST + '-' + vpgSitesModel._getHostName(vm, vpgSitesModel.TARGET_HOST);
                link.target.type = vpgSitesModel.TARGET;
            }

            link.alert = alert ? vpgSitesModel.LINK_TYPE_ALERT : vpgSitesModel.LINK_TYPE_REGULAR;

            link.source.key = vpgSitesModel.VM + '-' + vm.InternalVirtualMachineId.InternalVmName;
            link.source.type = vpgSitesModel.VM;

            return link;
        };

        vpgSitesModel._linkSource = function (link, vm, key, alert) {
            link.key = key;
            if (vpgSitesModel.SOURCE_SITE_AWS) {
                link.source.key = vpgSitesModel.TYPE_AWS;
                link.source.type = vpgSitesModel.SOURCE_SITE;
            } else if(vpgSitesModel.SOURCE_SITE_AZURE){
                link.source.key = vpgSitesModel.TYPE_AZURE;
                link.source.type = vpgSitesModel.SOURCE_SITE;
            } else if (vpgSitesModel._hasOrgVdc(vpgSitesModel._sourceSite.data.Hosts)) {
                link.source.key = vpgSitesModel.SOURCE_HOST + '-' + vpgSitesModel.TYPE_ORGVDC;
                link.source.type = vpgSitesModel.SOURCE;
            } else {
                link.source.key = vpgSitesModel.SOURCE_HOST + '-' + vpgSitesModel._getHostName(vm, vpgSitesModel.SOURCE_HOST);
                link.source.type = vpgSitesModel.SOURCE;
            }
            link.alert = alert ? vpgSitesModel.LINK_TYPE_ALERT : vpgSitesModel.LINK_TYPE_REGULAR;

            link.target.key = vpgSitesModel.VM + '-' + vm.InternalVirtualMachineId.InternalVmName;
            link.target.type = vpgSitesModel.VM;
            return link;
        };

        vpgSitesModel._createLinks = function (vms) {
            var links = [];
            _.forEach(vms, function (vm) {
                if (vpgSitesModel.TARGET_SITE_AWS || vpgSitesModel.TARGET_SITE_AZURE || !(vpgSitesModel._targetSite.data.Hosts && vpgSitesModel._targetSite.data.Hosts.length === 0)) {

                    links.push(vpgSitesModel._linkTarget(new Link(), vm, links.length, !vpgSitesModel._targetSite.data.IsConnected));
                }
                if (vpgSitesModel.SOURCE_SITE_AWS || vpgSitesModel.SOURCE_SITE_AZURE || !(vpgSitesModel._sourceSite.data.Hosts && vpgSitesModel._sourceSite.data.Hosts.length === 0)) {
                    links.push(vpgSitesModel._linkSource(new Link(), vm, links.length, !vpgSitesModel._sourceSite.data.IsConnected));
                }

            });
            return links;
        };

        vpgSitesModel._hasOrgVdc = function (list) {
            return list && list.length > 0 && list[0].OrgVdc;
        };

        vpgSitesModel._getHostName = function (item, type) {
            if (item.OrgVdc) {
                return item.OrgVdc.DisplayName;
            }
            else if (item[type].BaseComputeResourceIdentifier && item[type].ResourcePoolIdentifier) {
                return item[type].BaseComputeResourceIdentifier.InternalName + '-' + item[type].ResourcePoolIdentifier.InternalName;
            } else if (item[type].BaseComputeResourceIdentifier) {
                return item[type].BaseComputeResourceIdentifier.InternalName;
            } else if (item[type].ResourcePoolIdentifier) {
                return item[type].ResourcePoolIdentifier.InternalName;
            }
        };

        vpgSitesModel._getDisplayName = function (item) {
            if (item.Host === null) {
                return item.DisplayName;
            } else {
                return item.Host.DisplayName;
            }
        };

        vpgSitesModel._applyShortName = function (target, name, isVM) {
            var max = isVM ? vpgSitesModel.VM_NAME_MAX_LENGTH : vpgSitesModel.NODE_NAME_MAX_LENGTH;
            if (name.length > max) {
                target.shortName = name.substring(0, max - 3) + '...';
            }
        };

        vpgSitesModel._checkType = function (item) {

            if (item.Host.ResourcePoolIdentifier) {
                return vpgSitesModel.TYPE_RESOURCE_POOL;
            } else if (item.IsGhost) {
                return vpgSitesModel.TYPE_GHOST;
            } else {
                return vpgSitesModel.TYPE_HOST;
            }
        };

        vpgSitesModel._getHostAlertState = function (item) {
            var alerts = item && item.Alerts ? item.Alerts : [];
            var rpAlerts = item && item.ResourcePoolAlerts ? item.ResourcePoolAlerts : [];
            if (alerts.length > 0) {
                return vpgSitesModel._getAlertType(item, alerts);
            }
            else if (rpAlerts.length > 0) {
                return vpgSitesModel._getAlertType(item, rpAlerts);
            }
            else {
                return vpgSitesModel.ALERT_TYPE_NONE;
            }
        };

        vpgSitesModel._getAlertType = function (item, alerts) {
            if (item.IsConnected === false || item.IsSiteToVraConnectionOk === false || item.IsVraToVraConnectionOk === false) {
                return vpgSitesModel.ALERT_TYPE_ERROR;
            }

            if (alerts && alerts.length > 0) {
                // find level = 1 = error else warning
                var error = _.find(alerts, function (alert) {
                    return alert.Level === enums.SystemStateAlertLevel.Error;
                });
                return error ? vpgSitesModel.ALERT_TYPE_ERROR : vpgSitesModel.ALERT_TYPE_WARNING;
            } else {
                return vpgSitesModel.ALERT_TYPE_NONE;
            }
        };

        vpgSitesModel._groupByHost = function (vpgData, siteType) {
            var originalVMs = angular.copy(vpgData.VpgConfiguration.VirtualMachines);
            if (originalVMs.length > 1 && vpgData.Topology[siteType].Hosts && vpgData.Topology[siteType].Hosts.length > 1) {
                var groupedVMs = [];
                _.forEach(vpgData.Topology[siteType].Hosts, function (host) {
                    var hostName = host.Host.BaseComputeResourceIdentifier.InternalName;
                    if (host.Host.BaseComputeResourceIdentifier && host.Host.ResourcePoolIdentifier) {
                        hostName = host.Host.BaseComputeResourceIdentifier.InternalName + '-' + host.Host.ResourcePoolIdentifier.InternalName;
                    }
                    var tempVMs = _.remove(originalVMs, function (vm) {
                        var vmHostName = vpgSitesModel._getHostName(vm, siteType === vpgSitesModel.SOURCE_SITE_REF ? vpgSitesModel.SOURCE_HOST : vpgSitesModel.TARGET_HOST);
                        return hostName === vmHostName;
                    });
                    groupedVMs = _.union(groupedVMs, tempVMs);
                });
                return groupedVMs;
            } else {
                return originalVMs;
            }
        };

        vpgSitesModel.setGroupBy = function (groupByType) {
            vpgSitesModel.GROUP_BY = groupByType;
        };

        vpgSitesModel._filterData = function () {
            //filter stub
        };
        //public
        vpgSitesModel.filter = function (key) {
            vpgSitesModel._filterData(key);
        };

        return vpgSitesModel;
    });
