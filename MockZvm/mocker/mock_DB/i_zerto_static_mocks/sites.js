'use strict';

const chance = require('chance').Chance();
const _uniqBy = require('lodash/uniqBy');

module.exports = (sitesCount) => {
    const sites = [];
    const topology = [];

    const types = ["VCenter", "VCD", "Scvmm", "Aws", "Azure"];
    const status = ['Connected', 'Disconnected ', 'Disabled'];

    for (let i = 0; i < sitesCount; i++) {
        const id = chance.guid();
        sites.push({
            "siteIdentifier": id,
            "name": chance.name(),
            "type": types[chance.integer({min: 0, max: types.length - 1})],
            "version": "5.0.0",
            "isTransmissionEnabled": chance.bool(),
            "zorgsCount": chance.integer({min: 0, max: 10}),
            "zvmIp": chance.ip(),
            "isConnected": chance.bool(),
            "lastConnected": chance.date()
        });
    }


    for (let i = 0; i < sitesCount; i++) {
        let outgoingToSites = [];
        let incomingFromSites = [];

        const numOfBridges = 5;

        for (let j = 0; j < chance.integer({min: 1, max: numOfBridges}); j++) {

            const randomSiteIndex = chance.integer({min: 0, max: sitesCount - 1});

            incomingFromSites.push({
                "siteIdentifier": sites[randomSiteIndex].siteIdentifier,
                "directedVpgsCount": chance.integer({min: numOfBridges, max: 100})
            });
        }

        for (let k = 0; k < chance.integer({min: 1, max: 1}); k++) {

            const randomSiteIndex = chance.integer({min: 0, max: sitesCount - 1});

            outgoingToSites.push({
                "siteIdentifier": sites[randomSiteIndex].siteIdentifier,
                "directedVpgsCount": chance.integer({min: 1, max: 100})
            });
        }

        outgoingToSites = _uniqBy(outgoingToSites,  'siteIdentifier');
        incomingFromSites = _uniqBy(incomingFromSites,  'siteIdentifier');

        topology.push({
            connectionStatus: status[chance.integer({min: 0, max: status.length - 1})],
            incomingFromSites: incomingFromSites,
            lastConnected: chance.date(),
            name: chance.name(),
            outgoingToSites: outgoingToSites,
            selfVpgsCount: chance.integer({min: 0, max: 100}),
            siteIdentifier: sites[i].siteIdentifier,
            type: types[chance.integer({min: 0, max: types.length - 1})],
            version: "5.0.0",
            zvmIp: chance.ip()
        });
    }

    return {
        sites: sites,
        topology: topology
    }
};