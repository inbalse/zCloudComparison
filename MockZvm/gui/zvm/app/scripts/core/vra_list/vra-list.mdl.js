'use strict';

angular.module('zvmApp.models')
    .factory('vraListModel', function ($translate, zertoServiceUpdaterFactory, enums,entityCases) {
        var vraListModel = {};
        vraListModel.isShowOnlyHostWithVraInstall = false;
        vraListModel.isEnableManageVrasEnabled = false;

        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetVraListScreen, []);
        var operation = 'GetVraListScreen';
        vraListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, operation, [], false, vraListModel._processData);
        };

        vraListModel.unregister = function (scope) {
            return zertoServiceUpdaterFactory.unregister(scope, operation, []);
        };

        vraListModel._generateVRAAddress = function (vraInfo) {
            if (vraInfo && vraInfo.VraInfo && vraInfo.VraInfo.IpConfiguration) {
                return vraInfo.VraInfo.IpConfiguration.Ip;
            }
            return '';
        };
        vraListModel._generateVRAVersion = function (vraInfo) {
            if (vraInfo && vraInfo.State && vraInfo.State.Status !== enums.VraStatusVisual.Removing) {

                if (vraListModel._isVersionNA(vraInfo.State.Status)) {
                    return $translate.instant('VRA_LIST.STATES_MAP.NA');
                } else {
                    return $translate.instant('VRA_LIST.STATES_MAP.' + vraInfo.State.UpgradeStatus);
                }
            }
            return '';
        };
        vraListModel._calculate = function (vraInfo, columnName) {

            var total = 0;

            if (vraInfo) {
                switch (columnName) {
                    case 'VPGs':
                        if (vraInfo.ProtectedCounters) {
                            total = total + parseInt(vraInfo.ProtectedCounters.Vpgs);
                        }
                        if (vraInfo.RecoveryCounters) {
                            total = total + parseInt(vraInfo.RecoveryCounters.Vpgs);
                        }

                        total = total - parseInt(vraInfo.SelfProtectedVpgs);
                        break;
                    case 'VMs':
                        if (vraInfo.ProtectedCounters) {
                            total = total + parseInt(vraInfo.ProtectedCounters.Vms);
                        }
                        if (vraInfo.RecoveryCounters) {
                            total = total + parseInt(vraInfo.RecoveryCounters.Vms);
                        }

                        break;
                    case 'Volumes':
                        if (vraInfo.ProtectedCounters) {
                            total = total + parseInt(vraInfo.ProtectedCounters.Volumes);
                        }
                        if (vraInfo.RecoveryCounters) {
                            total = total + parseInt(vraInfo.RecoveryCounters.Volumes);
                        }

                        break;
                    default:
                        break;
                }


            }
            return total;
        };
        vraListModel._isVersionNA = function (status) {
            return (status === enums.VraStatusVisual.NotInstalled || status === enums.VraStatusVisual.Installing || status === enums.VraStatusVisual.InstallationError);
        };

          //var bb = {"VraListTree":{"NodeType":0,"DisplayName":"Root","children":[{"NodeType":1,"DisplayName":"Clus","children":[{"NodeType":2,"DisplayName":"bs7bl02.zerto.local","children":[],"VraInfo":{"State":{"Status":5,"InstallOrUninstallProgress":100,"AlertStatus":2,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"GhostStatus":{"IsGhost":false},"MaintenanceStatus":{"MaintainedGroups":[],"State":1,"Progress":536870911},"UpgradeStatus":0,"UpgradeDetails":"","IsEditEnabled":true,"IsChangePasswordEnabled":false,"IsUpgradeEnabled":true,"IsUninstallEnabled":true,"IsChangeHostEnabled":false},"HostInfo":{"BaseComputeResourceIdentifier":{"InternalName":"host-10","Type":0,"ServerIdentifier":{"ServerGuid":"fc06f007-7e9b-4595-a653-3f1f4b0d9045"}},"ResourcePoolIdentifier":null,"DisplayName":"bs7bl02.zerto.local"},"VraInfo":{"Datastore":{"Id":{"InternalDatastoreName":"datastore-835","ServerIdentifier":{"ServerGuid":"fc06f007-7e9b-4595-a653-3f1f4b0d9045"}},"DatastoreClusterIdentifier":null,"DisplayName":"BS7BL02DatastoreNN - Shared  by all"},"StoragePod":null,"Network":{"Id":{"ServerIdentifier":{"ServerGuid":"fc06f007-7e9b-4595-a653-3f1f4b0d9045"},"InternalType":"Network","InternalName":"network-13"},"DisplayName":"VM Network"},"IpConfiguration":{"Ip":"","NetMask":"","DefaultGw":"","PeerNetwork":"","PeerNetMask":"","PeerGw":""},"InstalledVraVersion":"","IsDhcpConf":true,"BandwidthGroup":"default_group","MemoryInGB":3,"VraVM":{"DisplayName":"","Id":null}},"Version":{"Version":"5.1","Build":"799733","HostCredentialRequired":true},"LastError":"SSH authentication failure to bs7bl02.zerto.local.","IsPartOfCluster":false,"ProtectedCounters":null,"RecoveryCounters":null,"SelfProtectedVpgs":0,"OwningClusterName":""},"HostVersion":{"Version":"5.1","Build":"799733","HostCredentialRequired":true},"Selected":false}],"VraInfo":null,"HostVersion":null,"Selected":false},{"NodeType":1,"DisplayName":"Cluster2","children":[{"NodeType":2,"DisplayName":"172.20.147.11","children":[],"VraInfo":null,"HostVersion":{"Version":"5.1","Build":"1065491","HostCredentialRequired":true},"Selected":false},{"NodeType":2,"DisplayName":"172.20.147.12","children":[],"VraInfo":null,"HostVersion":{"Version":"5.1","Build":"1065491","HostCredentialRequired":true},"Selected":false}],"VraInfo":null,"HostVersion":null,"Selected":false}],"VraInfo":null,"HostVersion":null,"Selected":false},"CanInstallAdditionalVras":true,"LatestVraVersion":"4.0 Build 040006225","EnableManageVras":true}

        vraListModel._processData = function (data) {
            //data = bb;
            var processed = data.VraListTree.children;
            var flattenedData = [];
            var clusterName = '';

            _.forEach(processed, function (item) {
                if (item.NodeType === enums.VraListScreenTreeNodeVisualType.Cluster) {
                    clusterName = item.DisplayName;
                }

                if (item.NodeType === enums.VraListScreenTreeNodeVisualType.Host || item.NodeType === enums.VraListScreenTreeNodeVisualType.OrphanedHost) {
                    vraListModel._createItem(item, flattenedData, clusterName);
                } else if (item.children && item.children.length) {
                    _.forEach(item.children, function (childItem) {
                        if (childItem.NodeType === enums.VraListScreenTreeNodeVisualType.Host || childItem.NodeType === enums.VraListScreenTreeNodeVisualType.OrphanedHost) {
                            vraListModel._createItem(childItem, flattenedData, clusterName);
                        }
                    });
                }
            });

            if (vraListModel.isShowOnlyHostWithVraInstall) {
                flattenedData = _.filter(flattenedData, function (item) {
                    return (item.VraInfo && item.VraInfo.State &&
                            item.VraInfo.State.Status === enums.VraStatusVisual.Installed);
                });
            }

            return {
                EnableManageVras: data.EnableManageVras,
                CanInstallAdditionalVras: data.CanInstallAdditionalVras,
                LatestVraVersion: data.LatestVraVersion,
                EnablePairedSiteRouting: data.EnablePairedSiteRouting,
                VraListTree: flattenedData
            };
        };

        vraListModel._generateVRAStatusObject = function (value) {
            if (value.State.GhostStatus.IsGhost) {
                return {
                    display: $translate.instant('VRA_LIST.VRA_STATUS.GHOST_VRA'),
                    value: value.State,
                    className: 'vra-status-error',
                    filterValue: value.State.Status
                };
            } else {
                var result = {
                    display: $translate.instant('VRA_LIST.VRA_STATUS.' + value.State.Status),
                    value: value.State,
                    filterValue: value.State.Status
                };

                switch (value.State.Status) {
                    case enums.VraStatusVisual.Installed :
                    {
                        result.className = 'vra-status-normal';
                        break;
                    }
                    case enums.VraStatusVisual.NotInstalled :
                    {
                        result.className = 'vra-status-not-installed';
                        break;
                    }
                    case enums.VraStatusVisual.UnsupportedEsxVersion :
                    {
                        result.className = 'vra-status-warning';
                        break;
                    }
                    case enums.VraStatusVisual.HostPasswordChanged :
                    {
                        result.className = 'vra-status-warning';
                        break;
                    }
                    case enums.VraStatusVisual.UpdatingIpSettings :
                    {
                        result.className = 'vra-status-updating-ip-settings';
                        break;
                    }
                    case enums.VraStatusVisual.HostInMaintenanceMode :
                    {
                        result.className = 'vra-status-warning-blue';
                        break;
                    }
                    case enums.VraStatusVisual.Installing :
                    {
                        if (value.State.InstallOrUninstallProgress > 0) {
                            result.display = $translate.instant('VRA_LIST.VRA_STATUS.' + value.State.Status) + ' (' + value.State.InstallOrUninstallProgress + '%)';
                        }
                        result.isProgerrssBar = true;
                        break;
                    }
                    case enums.VraStatusVisual.Removing :
                    {
                        if (value.State.InstallOrUninstallProgress > 0) {
                            result.display = $translate.instant('VRA_LIST.VRA_STATUS.' + value.State.Status) + ' (' + value.State.InstallOrUninstallProgress + '%)';
                        }
                        result.isProgerrssBar = true;
                        break;
                    }
                    case enums.VraStatusVisual.InstallationError :
                    {
                        result.isInstallationError = true;
                        result.allowInstall = vraListModel.isEnableManageVrasEnabled;
                        result.className = 'vra-status-error';
                        result.event = 'funcRetryInstallClicked';
                        result.LastErrorTitle = value.LastError;
                        break;
                    }
                    case enums.VraStatusVisual.DuringChangeHost :
                    {
                        result.className = 'none';
                        break;
                    }
                    default :
                    {
                        return '';
                    }
                }
                return result;
            }
        };

        vraListModel._createItem = function (vraInfoValue, collection, clusterName) {
            var tempItem = {};

            if (vraInfoValue.VraInfo) {
                tempItem.id = vraInfoValue.VraInfo.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid + vraInfoValue.VraInfo.HostInfo.BaseComputeResourceIdentifier.InternalName;
                tempItem.ServerIdentifier = vraInfoValue.VraInfo.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier;
                tempItem.InternalName = vraInfoValue.VraInfo.HostInfo.BaseComputeResourceIdentifier.InternalName;
                tempItem.IsGhost = vraInfoValue.VraInfo.State.GhostStatus.IsGhost;
                tempItem.IsPartOfCluster = vraInfoValue.VraInfo.IsPartOfCluster;
                tempItem.IsEditEnabled = vraInfoValue.VraInfo.State.IsEditEnabled;
                tempItem.IsUninstallEnabled = vraInfoValue.VraInfo.State.IsUninstallEnabled;
                tempItem.IsUpgradeEnabled = vraInfoValue.VraInfo.State.IsUpgradeEnabled;
                tempItem.IsChangePasswordEnabled = vraInfoValue.VraInfo.State.IsChangePasswordEnabled;
                tempItem.IsChangeHostEnabled = vraInfoValue.VraInfo.State.IsChangeHostEnabled;
                tempItem.HostAddress = vraInfoValue.DisplayName;
                tempItem.HostVersion = vraInfoValue.VraInfo.Version.Version;
                tempItem.AlertStatus = vraInfoValue.VraInfo.State.AlertStatus;
                tempItem.VRAName = (vraInfoValue.VraInfo.VraInfo && vraInfoValue.VraInfo.VraInfo.VraVM) ? vraInfoValue.VraInfo.VraInfo.VraVM.DisplayName : '';
                tempItem.VRAStatus = vraListModel._generateVRAStatusObject(vraInfoValue.VraInfo);
                tempItem.VRAAddress = vraListModel._generateVRAAddress(vraInfoValue.VraInfo);
                tempItem.CurrentVersion = vraInfoValue.VraInfo.VraInfo ? vraInfoValue.VraInfo.VraInfo.InstalledVraVersion : '';
                tempItem.VRAVersion = {display: vraListModel._generateVRAVersion(vraInfoValue.VraInfo), currentVersion: tempItem.CurrentVersion};
                tempItem.VRAGroup = vraInfoValue.VraInfo.VraInfo ? vraInfoValue.VraInfo.VraInfo.BandwidthGroup : '';
                tempItem.VRARAM = vraInfoValue.VraInfo.VraInfo ? vraInfoValue.VraInfo.VraInfo.MemoryInGB : '';
                tempItem.DS = (vraInfoValue.VraInfo.VraInfo && vraInfoValue.VraInfo.VraInfo.Datastore) ? vraInfoValue.VraInfo.VraInfo.Datastore.DisplayName : '';
                tempItem.DSCluser = (vraInfoValue.VraInfo.VraInfo && vraInfoValue.VraInfo.VraInfo.StoragePod) ? vraInfoValue.VraInfo.VraInfo.StoragePod.DisplayName : '';
                tempItem.VCNetwork = (vraInfoValue.VraInfo.VraInfo && vraInfoValue.VraInfo.VraInfo.Network) ? vraInfoValue.VraInfo.VraInfo.Network.DisplayName : '';
                tempItem.NumVPGs = vraListModel._calculate(vraInfoValue.VraInfo, 'VPGs');
                tempItem.NumVMs = vraListModel._calculate(vraInfoValue.VraInfo, 'VMs');
                tempItem.NumVolumes = vraListModel._calculate(vraInfoValue.VraInfo, 'Volumes');
                tempItem.NumProtectedVPGs = vraInfoValue.VraInfo.ProtectedCounters ? vraInfoValue.VraInfo.ProtectedCounters.Vpgs : 0;
                tempItem.NumProtectedVMs = vraInfoValue.VraInfo.ProtectedCounters ? vraInfoValue.VraInfo.ProtectedCounters.Vms : 0;
                tempItem.NumProtectedVolumes = vraInfoValue.VraInfo.ProtectedCounters ? vraInfoValue.VraInfo.ProtectedCounters.Volumes : 0;
                tempItem.NumRecoveryVPGs = vraInfoValue.VraInfo.RecoveryCounters ? vraInfoValue.VraInfo.RecoveryCounters.Vpgs : 0;
                tempItem.NumRecoveryVMs = vraInfoValue.VraInfo.RecoveryCounters ? vraInfoValue.VraInfo.RecoveryCounters.Vms : 0;
                tempItem.NumRecoveryVolumes = vraInfoValue.VraInfo.RecoveryCounters ? vraInfoValue.VraInfo.RecoveryCounters.Volumes : 0;
                tempItem.VraInfo = vraInfoValue.VraInfo;
                tempItem.DisplayName = vraInfoValue.DisplayName;
                tempItem.Details = vraInfoValue.VraInfo.State.UpgradeDetails;
                tempItem.installedUsingSshKey = vraInfoValue.VraInfo.VraInfo.InstalledUsingSshKey;


                tempItem.vraIconsPropertyOptions = {
                    display:  tempItem.VRAName,
                    nameText: {
                        label:  tempItem.VRAName,
                        location: 'main/vra_details?id=' + tempItem.ServerIdentifier.ServerGuid + '&name=' + tempItem.InternalName,
                        type: vraListModel.isEnableManageVrasEnabled ? entityCases.caseHref : entityCases.caseText
                    },
                    deleteIcon: {
                        type: entityCases.caseDelete,
                        enabled: tempItem.IsUninstallEnabled
                    },
                    editIcon: {
                        type: entityCases.caseEdit,
                        enabled: tempItem.IsEditEnabled && vraListModel.isEnableManageVrasEnabled
                    }
                };


            } else {
                tempItem.id = vraInfoValue.DisplayName;
                tempItem.NodeType = vraInfoValue.NodeType;
                tempItem.HostAddress = vraInfoValue.DisplayName;
                tempItem.HostVersion = vraInfoValue.HostVersion.Version;
            }
            tempItem.ClusterName = clusterName;
            collection.push(tempItem);
        };

        vraListModel.showOnlyHostWithVraInstall = function (checked) {
            vraListModel.isShowOnlyHostWithVraInstall = checked;
            zertoServiceUpdaterFactory.update();
        };

        return vraListModel;
    });
