const chance = require('chance').Chance();

module.exports = () => {
    return {
        "healthyVpgs": chance.integer({min: 0, max: 1000}),
        "alertedVpgs": chance.integer({min: 0, max: 1000}),
        "faultedVpgs": chance.integer({min: 0, max: 1000}),
        "averageActualRpoSeconds": chance.integer({min: -1, max: 172800}),
        "averageConfiguredRpoSeconds": chance.integer({min: -1, max: 172800}),
        "sitesCount": chance.integer({min: 0, max: 1000}),
        "vpgsCount": chance.integer({min: 0, max: 1000}),
        "vmsCount": chance.integer({min: 0, max: 1000}),
        "alertsCount": chance.integer({min: 0, max: 1000}),
        "tasksCount": chance.integer({min: 0, max: 1000}),
        "protectedDataMb": chance.integer({min: 1024, max: 198897})
    };
};