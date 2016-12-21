'use strict';

angular.module('zvmApp.core')
    .service('createVpgNicNetworkEditorService', function (networksService, createVpgNicConstants) {
        var nicNetworkEditor = this,

            editorObject = {
                className: createVpgNicConstants.EDITOR_CLASSES.NETWORK.VC,
                optionsCollection: networksService.getNicNetworkCollection,
                uiSelectModel: getNicNetworkByType,
                applyValue: nicNetworkApplyValue,
                loadValue: getNicNetworkByType,
                searchEnabled: false
            };

        //We clone the object so each column filter will have differnet property
        nicNetworkEditor.getEditor = function (prop) {
            var cloned = _.clone(editorObject);
            cloned.propName = prop;
            return cloned;
        };

        function nicNetworkApplyValue(item, value, prop) {
            var itemProp = isTestNetwork(prop);
            item[itemProp].VCenterNetworkSettings.RecoveryNetwork = value;
            item[prop] = _.isNullOrUndefined(value) ? 'No Settings' : value.DisplayName;
        }

        function getNicNetworkByType(item, prop) {
            var itemProp = isTestNetwork(prop);
            if (_.isNullOrUndefined(item[itemProp])) {
                return null;
            }
            return item[itemProp].VCenterNetworkSettings.RecoveryNetwork;
        }

        function isTestNetwork(prop) {
            return _.isEqual(prop, createVpgNicConstants.COLUMNS.TEST_NETWORK) ?
                 createVpgNicConstants.EDITOR_SETTINGS.TEST_SETTINGS :
                 createVpgNicConstants.EDITOR_SETTINGS.FAILOVER_SETTINGS;
        }

    });
