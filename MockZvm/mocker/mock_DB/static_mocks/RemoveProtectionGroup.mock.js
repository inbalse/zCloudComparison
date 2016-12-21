'use strict';

const _filter = require('lodash/filter');
const localStorage = require('localStorage');

module.exports = function RemoveProtectionGroup() {
    let result = localStorage.getItem('GetProtectionGroupListScreen.result');
    let id = {"GroupGuid": "2594a4db-e82f-4d99-af19-4105a90687b6"};

    if (result) {
        result.ProtectionGroups = _filter(result.ProtectionGroups, function (n) {
            return n.Identifier.GroupGuid !== id
        });
        localStorage.setItem('GetProtectionGroupListScreen.result', result);
    }
};
