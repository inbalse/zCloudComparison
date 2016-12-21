'use strict';

angular.module('zvmApp.core')
    .service('createVpgNicNetworkVCDEditorService', function ($translate, vpgService, createVpgNicConstants, enums) {
        var nicNetworkVCDEditor = this,
            displayProperty = 'NetworkName',
            editorObject = {
                className: createVpgNicConstants.EDITOR_CLASSES.NETWORK.VCD,
                optionsCollection: getNetworksList,
                uiSelectModel: getNicNetworkVcdByType,
                applyValue: nicNetworkVcdApplyValue,
                loadValue: getNicNetworkVcdByType,
                serializeValue: nicNetworkVcdSerializeValue,
                getItemDisplayProperty: getItemDisplayProperty,
                searchEnabled: false
            };

        //We clone the object so each column filter will have differnet property
        nicNetworkVCDEditor.getEditor = function (prop) {
            var cloned = _.clone(editorObject);
            cloned.propName = prop;
            return cloned;
        };

        function getItemDisplayProperty() {
            return displayProperty;
        }

        function nicNetworkVcdApplyValue(item, value, prop) {
            var itemProp = isTestNetwork(prop) ?
                 createVpgNicConstants.EDITOR_SETTINGS.TEST_SETTINGS :
                 createVpgNicConstants.EDITOR_SETTINGS.FAILOVER_SETTINGS;

            var displayProp = isTestNetwork(prop) ?
                 createVpgNicConstants.COLUMNS.TEST_IP :
                 createVpgNicConstants.COLUMNS.FAILOVER_IP;

            item[itemProp].VCDNetworkSettings.NicInfo.VappNetworkName = value;

            if (value === 'none') {
                item[itemProp].VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.None;
                item[displayProp] = $translate.instant('EDIT_NIC.NONE');
            }
            item[prop] = value;
        }

        function nicNetworkVcdSerializeValue(model) {
            return model[displayProperty];
        }

        function getNicNetworkVcdByType(item, prop) {
            var itemProp = isTestNetwork(prop) ?
                    createVpgNicConstants.EDITOR_SETTINGS.TEST_SETTINGS :
                    createVpgNicConstants.EDITOR_SETTINGS.FAILOVER_SETTINGS;
            return item[itemProp].VCDNetworkSettings.NicInfo.VappNetworkName;
        }

        function getNetworksList() {
            var resources = vpgService.getComputeResources();
            if (_.isNullOrUndefined(resources)) {
                return resources;
            }
            return resources.Networks;
        }

        function isTestNetwork(prop) {
            return _.isEqual(prop, createVpgNicConstants.COLUMNS.TEST_NETWORK);
        }
    });
