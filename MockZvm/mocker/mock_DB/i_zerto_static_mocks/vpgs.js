'use strict';

const chance = require('chance').Chance();
const _filter = require('lodash/filter');

module.exports = (count) => {
    const vpgsCollection = [];
    const types = ["VCenter", "VCD", "Scvmm", "Aws", "Azure"];
    const health = ['Healthy', 'Warned', 'Erroneous'];
    const status = ['Initializing', 'MeetingSLA', 'NotMeetingSLA', 'RpoNotMeetingSLA', 'HistoryNotMeetingSLA', 'FailingOver', 'Moving', 'Deleting', 'Recovered'];
    const subStatus = ['None', 'InitialSync', 'Creating', 'VolumeInitialSync', 'Sync', 'RecoveryPossible', 'DeltaSync', 'NeedsConfiguration', 'Error', 'EmptyProtectionGroup'];

    for (let i = 0; i < count; i++) {
        const id = chance.guid();
        vpgsCollection.push(
            {
                "vpgIdentifier": id,
                "detailsLink": {
                    "identifier": id,
                    "href": `http://127.0.0.1:4000/sites-view/v1/vpgs/${id}`,
                    "type": "VPG"
                },
                "vpgName": chance.name(),
                "vmsCount": chance.integer({min: 1, max: 127}),
                "protectedSite": {
                    "name": chance.name(),
                    "type": types[chance.integer({min: 0, max: types.length - 1})]
                },
                "recoverySite": {"name": chance.name(), "type": types[chance.integer({min: 0, max: types.length - 1})]},
                "actualRpoSeconds": chance.integer({min: -1, max: 172800}),
                "configuredRpoSeconds": chance.integer({min: 60, max: 172800}),
                "health": health[chance.integer({min: 0, max: health.length - 1})],
                "status": status[chance.integer({min: 0, max: status.length - 1})],
                "subStatus": subStatus[chance.integer({min: 0, max: subStatus.length - 1})],
                "runningTasks": []
            });
    }

    return {
        erroneousVpgs: _filter(vpgsCollection, {health: 'Erroneous'}).length,
        healthyVpgs: _filter(vpgsCollection, {health: 'Healthy'}).length,
        warnedVpgs: _filter(vpgsCollection, {health: 'Warned'}).length,
        vpgs: vpgsCollection
    }
};