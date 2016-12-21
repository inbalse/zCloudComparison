'use strict';

angular.module('zvmApp.core')
    .service('createVpgNicMacEditorService', function (networksService, createVpgNicConstants) {
        var nicMacEditor = this,
            macAddressCollection = [{display: 'Reset'}],

            editorObject = {
                className: createVpgNicConstants.EDITOR_CLASSES.MAC,
                optionsCollection: macAddressCollection,
                uiSelectModel: getMacAddressVcdByType,
                applyValue: macAddressVcdApplyValue,
                loadValue: macAddressVcdLoadValue,
                serializeValue: macAddressSerializeValue,
                searchEnabled: false
            };

        //We clone the object so each column filter will have differnet property
        nicMacEditor.getEditor = function (prop) {
            var cloned = _.clone(editorObject);
            cloned.propName = prop;
            return cloned;
        };

        function macAddressVcdApplyValue(item, value, prop) {
            var itemProp = isTestMac(prop);

            item[itemProp].VCDNetworkSettings.NewMacAddress.MacAddress =
                _.isEqual(value, 'Reset') ? '' : value;

            if (value !== null) {
                item[prop] = value;
            }
        }

        function macAddressVcdLoadValue(item, prop) {
            macAddressCollection.splice(1, macAddressCollection.length);
            var display = getMacAddressVcdByType(item, prop);
            if (!_.contains(_.pluck(macAddressCollection, 'display'), display)) {
                macAddressCollection.push({display: display});
            }
            return display;
        }

        function macAddressSerializeValue(model) {
            return model.display;
        }

        function getMacAddressVcdByType(item, prop) {
            var itemProp = isTestMac(prop);

            if (_.isNullOrUndefined(item[itemProp])) {
                return null;
            }
            return item[itemProp].VCDNetworkSettings.NicInfo.MacAddress;
        }

        function isTestMac(prop) {
            return _.isEqual(prop, createVpgNicConstants.COLUMNS.VCD.TEST_MAC) ?
                createVpgNicConstants.EDITOR_SETTINGS.TEST_SETTINGS :
                createVpgNicConstants.EDITOR_SETTINGS.FAILOVER_SETTINGS;
        }
    });
