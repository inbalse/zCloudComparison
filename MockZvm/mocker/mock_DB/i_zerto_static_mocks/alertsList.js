const chance = require('chance').Chance();

module.exports = (count) => {
    const alertsList = [];
    const severity = ['Error', 'Warning'];
    const types = ["VCenter", "VCD", "Scvmm", "Aws", "Azure"];
    const entityType = ['Zvm', 'Vra', 'Reports', 'CloudConnector', 'Storage', 'License', 'Zcm', 'VCD', 'Backup', 'AWS'];

    for (let i = 0; i < count; i++) {
        const id = chance.guid();
        alertsList.push({
            "alertIdentifier": id,
            "alertType": "VRA0028",
            "severity": severity[chance.integer({min: 0, max: severity.length - 1})],
            "description": chance.sentence({words: chance.integer({min: 2, max: 20})}),
            "site": {"name": chance.name(), "type": types[chance.integer({min: 0, max: types.length - 1})]},
            "entityType": entityType[chance.integer({min: 0, max: entityType.length - 1})],
            "affectedZorgs": [],
            "createdDate": (new Date().getTime() - chance.integer({min: 1, max: 9999}) * 1000)
        })
    }

    return alertsList;
};