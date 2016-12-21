const chance = require('chance').Chance();

module.exports = (count) => {
    const tasksList = [];
    const taskName = ['FailOverTest'];
    const types = ["VCenter", "VCD", "Scvmm", "Aws", "Azure"];
    const status = ['FirstUnusedValue', 'InProgress', 'WaitingForUserInput', 'Paused', 'Failed', 'Stopped', 'Completed', 'Cancelling'];

    for (let i = 0; i < count; i++) {
        const id = chance.guid();
        const relatedSiteList = [];
        const relatedVpgsList = [];

        for (let j = 0; j < chance.integer({min: 1, max: 5}); j++) {
            relatedSiteList.push({
                "name": chance.name(),
                "type": types[chance.integer({min: 0, max: types.length - 1})]
            });
        }

        for (let j = 0; j < chance.integer({min: 1, max: 5}); j++) {
            relatedVpgsList.push(chance.name());
        }

        tasksList.push({
            "taskIdentifier": id,
            "taskName": taskName[chance.integer({min: 0, max: taskName.length - 1})],
            "progress": chance.integer({min: 5, max: 100}),
            "status": status[chance.integer({min: 0, max: status.length - 1})],
            "started": (new Date().getTime() - chance.integer({min: 1, max: 9999}) * 1000),
            "completedDate": new Date(),
            "initiatedBy": chance.name(),
            "relatedSiteList": relatedSiteList,
            "relatedVpgsList": relatedVpgsList
        });
    }

    return tasksList;
};