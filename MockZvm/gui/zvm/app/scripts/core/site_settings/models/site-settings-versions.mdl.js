'use strict';

angular.module('zvmApp.core')
    .constant('HYPERVISOR_TYPE_CONST',{
        HYPER_V: 'Hyper-V',
        ESXI: 'ESXi',
        ESX_ESXi: 'ESX \/ ESXi'
    })
    .factory('siteSettingsVersionsModel', function (zertoServiceFactory, siteSettingsFactory, enums, HYPERVISOR_TYPE_CONST) {
        var siteSettingsVersionsModel = {};

        siteSettingsVersionsModel.model = {
            isScvmm: siteSettingsFactory.isScvmm,
            options: {
                columns: [
                    {
                        id: 'EsxVersion',
                        name: 'Version',
                        field: 'EsxVersion'
                    },
                    {
                        name: 'Supported Update',
                        id: 'EsxUpdate',
                        field: 'EsxUpdate'
                    }
                ],
                showSearch: false,
                showCheckbox: false
            },
            data: []
        };

        siteSettingsVersionsModel.generateVersion = function (item) {

            if(item.HypervisorType === enums.HypervisorType.Scvmm){
                return HYPERVISOR_TYPE_CONST.HYPER_V + ' ' + item.EsxVersion;
            }

            if (parseInt(item.EsxVersion) > 4) {
                return HYPERVISOR_TYPE_CONST.ESXI + ' ' + item.EsxVersion;
            }
            return HYPERVISOR_TYPE_CONST.ESX_ESXi + ' ' + item.EsxVersion;
        };

        siteSettingsVersionsModel.generateUpdate = function (data) {

            var updates = '';
            var esxNumber = data.EsxVersion;
            var updatesCount = data.EsxUpdate;
            //in version 4 there are no ga values
            if (esxNumber !== '4.0') {
                updates = updates + esxNumber + ', ';
            }
            //updates numbers starts from 1 until the esxupdate count
            for (var i = 1; i <= updatesCount; i++) {
                updates = updates + esxNumber + 'U' + i + ', ';
            }
            //remove the last ", " from the string
            updates = updates.substr(0, updates.length - 2);
            return updates;
        };

        siteSettingsVersionsModel.init = function () {

            zertoServiceFactory.GetSupportedEsxUpdates().then(function (result) {
                siteSettingsVersionsModel.model.data = [];
                _.forEach(result.SupportedEsxUpdatesStrings, function (item, index) {
                    var version = siteSettingsVersionsModel.generateVersion(item);
                    var update = siteSettingsVersionsModel.generateUpdate(item);
                    siteSettingsVersionsModel.model.data.push({id: index, EsxVersion: version, EsxUpdate: update});
                });
            });
        };

        return {
            _self: siteSettingsVersionsModel,
            model: siteSettingsVersionsModel.model,
            init: siteSettingsVersionsModel.init
        };
    });
